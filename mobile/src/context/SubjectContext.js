import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { SUBJECTS } from '../../../src/data/subjects'

const SubjectContext = createContext()
const STORAGE_KEY = '@selected_subject'
const VALID = new Set(Object.values(SUBJECTS))

export function SubjectProvider({ children }) {
  const [subject, setSubjectState] = useState(SUBJECTS.LIVING_ENVIRONMENT)

  useEffect(() => {
    async function load() {
      const local = await AsyncStorage.getItem(STORAGE_KEY)
      if (local && VALID.has(local)) { setSubjectState(local); return }
      // Fallback: load from Firestore for cross-device restore
      const uid = auth.currentUser?.uid
      if (!uid || auth.currentUser?.isAnonymous) return
      try {
        const snap = await getDoc(doc(db, 'users', uid, 'meta', 'subject'))
        const remote = snap.data()?.value
        if (remote && VALID.has(remote)) {
          setSubjectState(remote)
          AsyncStorage.setItem(STORAGE_KEY, remote)
        }
      } catch {}
    }
    load()
  }, [])

  function setSubject(sub) {
    setSubjectState(sub)
    AsyncStorage.setItem(STORAGE_KEY, sub)
    // Sync to Firestore for cross-device persistence
    const uid = auth.currentUser?.uid
    if (uid && !auth.currentUser?.isAnonymous) {
      setDoc(doc(db, 'users', uid, 'meta', 'subject'), { value: sub }, { merge: true }).catch(() => {})
    }
  }

  return (
    <SubjectContext.Provider value={{ subject, setSubject }}>
      {children}
    </SubjectContext.Provider>
  )
}

export const useSubject = () => useContext(SubjectContext)
