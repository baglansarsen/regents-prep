/**
 * useClassroom — student-facing classroom hook
 *
 * Responsibilities:
 *   - Load the student's current classroom (if any) from their user doc
 *   - Resolve a join code → classroom preview (name, subject, teacher)
 *   - Join a classroom by code (writes membership + updates user doc)
 *   - Leave a classroom (removes membership + clears user doc)
 *
 * Data model
 * ──────────
 *   users/{uid}
 *     classId: string | null     ← which classroom this student is in
 *
 *   classrooms/{classId}
 *     teacherUid: string
 *     teacherName: string
 *     name: string               ← e.g. "Mr. Smith's Living Environment"
 *     subject: string            ← e.g. "living-environment"
 *     joinCode: string           ← 6-char uppercase, e.g. "BIO42X"
 *     createdAt: serverTimestamp
 *
 *   classrooms/{classId}/members/{uid}
 *     displayName: string
 *     photoURL: string | null
 *     joinedAt: serverTimestamp
 *
 *   joinCodes/{code}
 *     classId: string
 *     teacherUid: string
 */

import { useState, useEffect, useCallback } from 'react'
import {
  doc, getDoc, setDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

export function useClassroom(user) {
  const uid = user?.uid ?? null

  const [classroom,    setClassroom]    = useState(null)   // current classroom doc or null
  const [loading,      setLoading]      = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error,        setError]        = useState(null)

  // ── Load current classroom on mount / uid change ────────────────────────────
  useEffect(() => {
    if (!uid) { setClassroom(null); setLoading(false); return }
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const userSnap = await getDoc(doc(db, 'users', uid))
        const classId = userSnap.exists() ? (userSnap.data().classId ?? null) : null

        if (!classId) {
          if (!cancelled) { setClassroom(null); setLoading(false) }
          return
        }

        const classSnap = await getDoc(doc(db, 'classrooms', classId))
        if (!cancelled) {
          setClassroom(classSnap.exists() ? { id: classSnap.id, ...classSnap.data() } : null)
          setLoading(false)
        }
      } catch (e) {
        if (!cancelled) { setError(e.message); setLoading(false) }
      }
    }

    load()
    return () => { cancelled = true }
  }, [uid])

  // ── Resolve a join code → classroom preview ──────────────────────────────────
  // Returns { id, name, subject, teacherName } or null if code not found.
  const resolveCode = useCallback(async (rawCode) => {
    const code = rawCode.trim().toUpperCase()
    if (!code) return null
    try {
      const snap = await getDoc(doc(db, 'joinCodes', code))
      if (!snap.exists()) return null
      const { classId } = snap.data()
      const classSnap = await getDoc(doc(db, 'classrooms', classId))
      if (!classSnap.exists()) return null
      return { id: classId, ...classSnap.data() }
    } catch {
      return null
    }
  }, [])

  // ── Join a classroom ─────────────────────────────────────────────────────────
  // Returns 'success' | 'not_found' | 'already_member' | 'error'
  const joinClassroom = useCallback(async (rawCode) => {
    if (!uid || !user) return 'error'
    setActionLoading(true)
    setError(null)
    try {
      if (classroom) return 'already_member'

      const preview = await resolveCode(rawCode)
      if (!preview) { setActionLoading(false); return 'not_found' }

      const { id: classId } = preview

      // Write membership entry
      await setDoc(doc(db, 'classrooms', classId, 'members', uid), {
        displayName: user.displayName ?? 'Student',
        photoURL:    user.photoURL ?? null,
        joinedAt:    serverTimestamp(),
      })

      // Record classId on student's user doc so the teacher rule resolves
      await setDoc(doc(db, 'users', uid), { classId }, { merge: true })

      setClassroom(preview)
      return 'success'
    } catch (e) {
      setError(e.message)
      return 'error'
    } finally {
      setActionLoading(false)
    }
  }, [uid, user, classroom, resolveCode])

  // ── Leave a classroom ────────────────────────────────────────────────────────
  // Returns 'success' | 'not_member' | 'error'
  const leaveClassroom = useCallback(async () => {
    if (!uid || !classroom) return 'not_member'
    setActionLoading(true)
    setError(null)
    try {
      const classId = classroom.id

      // Remove membership entry
      await deleteDoc(doc(db, 'classrooms', classId, 'members', uid))

      // Clear classId from user doc
      await setDoc(doc(db, 'users', uid), { classId: null }, { merge: true })

      setClassroom(null)
      return 'success'
    } catch (e) {
      setError(e.message)
      return 'error'
    } finally {
      setActionLoading(false)
    }
  }, [uid, classroom])

  return {
    classroom,          // null if not in one
    loading,            // initial load
    actionLoading,      // join/leave in progress
    error,
    resolveCode,        // async (code) => preview | null
    joinClassroom,      // async (code) => status string
    leaveClassroom,     // async () => status string
  }
}
