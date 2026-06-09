import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove, collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function useClassroom(uid, user) {
  const [classrooms, setClassrooms] = useState([]) // owned classrooms (for teachers) or joined (for students)
  const [joinedClassroom, setJoinedClassroom] = useState(null) // classroom info for the joined classroom (for students)
  const [roster, setRoster] = useState([]) // student list (for teachers)
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Fetch classrooms
  const fetchClassrooms = useCallback(async () => {
    if (!uid) return
    setLoading(true)
    try {
      // If B2B teacher mode is enabled, fetch classrooms where teacherUid == uid
      const q = query(collection(db, 'classrooms'), where('teacherUid', '==', uid))
      const snap = await getDocs(q)
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setClassrooms(list)
      
      // Also look for classroom where user is enrolled (for student mode)
      const qStudent = query(collection(db, 'classrooms'), where('students', 'array-contains', uid))
      const snapStudent = await getDocs(qStudent)
      if (!snapStudent.empty) {
        const classData = { id: snapStudent.docs[0].id, ...snapStudent.docs[0].data() }
        setJoinedClassroom(classData)
        // Fetch assignments for joined classroom
        await fetchAssignments(classData.classCode)
      } else {
        setJoinedClassroom(null)
        setAssignments([])
      }
    } catch (err) {
      console.error('[useClassroom] fetchClassrooms error:', err)
    } finally {
      setLoading(false)
    }
  }, [uid])

  useEffect(() => {
    fetchClassrooms()
  }, [fetchClassrooms])

  // 2. Fetch assignments
  const fetchAssignments = useCallback(async (classCode) => {
    if (!classCode) return []
    try {
      const q = query(collection(db, 'assignments'), where('classCode', '==', classCode))
      const snap = await getDocs(q)
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setAssignments(list)
      return list
    } catch (err) {
      console.error('[useClassroom] fetchAssignments error:', err)
      return []
    }
  }, [])

  // 3. Create Classroom (B2B Teacher)
  const createClassroom = useCallback(async (className, subject) => {
    if (!uid) return null
    try {
      const subjectPrefix = (subject && typeof subject === 'string') ? subject.slice(0, 3).toUpperCase() : 'CLASS'
      const code = subjectPrefix + '-' + Math.random().toString(36).substring(2, 7).toUpperCase()
      const newClass = {
        classCode: code,
        teacherUid: uid,
        teacherName: user?.displayName || 'Teacher',
        className,
        subject,
        announcement: '',
        students: [],
        createdAt: new Date().toISOString()
      }
      await setDoc(doc(db, 'classrooms', code), newClass)
      await fetchClassrooms()
      return newClass
    } catch (err) {
      console.error('[useClassroom] createClassroom error:', err)
      return null
    }
  }, [uid, user, fetchClassrooms])

  // 4. Join Classroom (B2B Student)
  const joinClassroom = useCallback(async (classCode) => {
    if (!uid) return 'no_user'
    try {
      const ref = doc(db, 'classrooms', classCode)
      const snap = await getDoc(ref)
      if (!snap.exists()) return 'not_found'

      // Check if student is already in a different class
      const qStudent = query(collection(db, 'classrooms'), where('students', 'array-contains', uid))
      const studentSnap = await getDocs(qStudent)
      for (const d of studentSnap.docs) {
        if (d.id !== classCode) {
          // Leave old class
          await updateDoc(doc(db, 'classrooms', d.id), {
            students: arrayRemove(uid)
          })
        }
      }

      await updateDoc(ref, {
        students: arrayUnion(uid)
      })

      // Update student's school/rits user profile to B2B linked
      const classData = snap.data()
      await setDoc(doc(db, 'users', uid), { school: 'B2B Linked', classCode }, { merge: true })

      await fetchClassrooms()
      return 'success'
    } catch (err) {
      console.error('[useClassroom] joinClassroom error:', err)
      return 'error'
    }
  }, [uid, fetchClassrooms])

  // 5. Leave Classroom (B2B Student)
  const leaveClassroom = useCallback(async (classCode) => {
    if (!uid) return false
    try {
      await updateDoc(doc(db, 'classrooms', classCode), {
        students: arrayRemove(uid)
      })
      await setDoc(doc(db, 'users', uid), { school: 'Independent', classCode: null }, { merge: true })
      await fetchClassrooms()
      return true
    } catch (err) {
      console.error('[useClassroom] leaveClassroom error:', err)
      return false
    }
  }, [uid, fetchClassrooms])

  // 6. Publish Announcement (B2B Teacher)
  const publishAnnouncement = useCallback(async (classCode, text) => {
    try {
      await updateDoc(doc(db, 'classrooms', classCode), {
        announcement: text
      })
      await fetchClassrooms()
      return true
    } catch (err) {
      console.error('[useClassroom] publishAnnouncement error:', err)
      return false
    }
  }, [fetchClassrooms])

  // 7. Create Assignment (B2B Teacher)
  const createAssignment = useCallback(async (classCode, title, type, targetId, dueDate) => {
    try {
      const newAssign = {
        classCode,
        title,
        type, // 'lesson' | 'challenge' | 'exam'
        targetId,
        dueDate,
        completedStudents: [],
        createdAt: new Date().toISOString()
      }
      const ref = await addDoc(collection(db, 'assignments'), newAssign)
      await fetchAssignments(classCode)
      return { id: ref.id, ...newAssign }
    } catch (err) {
      console.error('[useClassroom] createAssignment error:', err)
      return null
    }
  }, [fetchAssignments])

  // 7b. Delete Assignment (B2B Teacher)
  const deleteAssignment = useCallback(async (assignmentId, classCode) => {
    try {
      await deleteDoc(doc(db, 'assignments', assignmentId))
      if (classCode) await fetchAssignments(classCode)
      return true
    } catch (err) {
      console.error('[useClassroom] deleteAssignment error:', err)
      return false
    }
  }, [fetchAssignments])

  // 8. Submit Assignment (B2B Student)
  const submitAssignment = useCallback(async (assignmentId) => {
    if (!uid) return false
    try {
      const ref = doc(db, 'assignments', assignmentId)
      await updateDoc(ref, {
        completedStudents: arrayUnion(uid)
      })
      if (joinedClassroom) {
        await fetchAssignments(joinedClassroom.classCode)
      }
      return true
    } catch (err) {
      console.error('[useClassroom] submitAssignment error:', err)
      return false
    }
  }, [uid, joinedClassroom, fetchAssignments])

  // 9. Fetch Classroom Roster & student detail aggregates (B2B Teacher)
  const fetchClassroomRoster = useCallback(async (classCode) => {
    if (!classCode) return []
    try {
      const snap = await getDoc(doc(db, 'classrooms', classCode))
      if (!snap.exists()) return []
      const classData = snap.data()
      const studentUids = classData.students || []

      const rosterList = []
      for (const sUid of studentUids) {
        // Get student user meta
        const userSnap = await getDoc(doc(db, 'users', sUid))
        const xpSnap = await getDoc(doc(db, 'users', sUid, 'meta', 'xp'))
        const progressSnap = await getDocs(collection(db, 'users', sUid, 'quizHistory'))
        
        let userData = { displayName: 'Student', school: 'Linked' }
        if (userSnap.exists()) userData = userSnap.data()

        let totalXP = 0
        if (xpSnap.exists()) totalXP = xpSnap.data().total ?? 0

        const history = progressSnap.docs.map(d => d.data())
        const totalQuizzes = history.length
        const avgScore = totalQuizzes > 0
          ? Math.round(history.reduce((acc, curr) => acc + (curr.pct || 0), 0) / totalQuizzes)
          : null

        rosterList.push({
          uid: sUid,
          displayName: userData.displayName || 'Independent student',
          xp: totalXP,
          streak: userData.streak || 0,
          totalQuizzes,
          avgScore,
          history
        })
      }
      setRoster(rosterList)
      return rosterList
    } catch (err) {
      console.error('[useClassroom] fetchClassroomRoster error:', err)
      return []
    }
  }, [])

  return {
    classrooms,
    joinedClassroom,
    roster,
    assignments,
    loading,
    createClassroom,
    joinClassroom,
    leaveClassroom,
    publishAnnouncement,
    createAssignment,
    deleteAssignment,
    submitAssignment,
    fetchClassroomRoster,
    fetchClassrooms,
    fetchAssignments
  }
}
