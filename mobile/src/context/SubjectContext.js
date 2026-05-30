import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { SUBJECTS } from '../../../src/data/subjects'
import { useAuthContext } from './AuthContext'

const SubjectContext = createContext()
const STORAGE_KEY = '@selected_subject'
const VALID = new Set(Object.values(SUBJECTS))

export function SubjectProvider({ children }) {
  const { user } = useAuthContext()
  const [subject, setSubjectState] = useState(SUBJECTS.LIVING_ENVIRONMENT)

  useEffect(() => {
    async function load() {
      const local = await AsyncStorage.getItem(STORAGE_KEY)
      if (local && VALID.has(local)) { setSubjectState(local); return }

      // Fallback: load from Firestore for cross-device restore
      if (!user || user.isAnonymous) return
      try {
        const snap = await getDoc(doc(db, 'users', user.uid, 'meta', 'subject'))
        const remote = snap.data()?.value
        if (remote && VALID.has(remote)) {
          setSubjectState(remote)
          AsyncStorage.setItem(STORAGE_KEY, remote).catch(() => {})
        }
      } catch (e) {
        console.warn('[SubjectContext] Load failed:', e)
      }
    }
    load()
  }, [user?.uid])

  async function setSubject(sub) {
    if (!VALID.has(sub)) return
    setSubjectState(sub)
    await AsyncStorage.setItem(STORAGE_KEY, sub)

    // Sync to Firestore for cross-device persistence
    if (user && !user.isAnonymous) {
      setDoc(doc(db, 'users', user.uid, 'meta', 'subject'), {
        value: sub,
        updatedAt: new Date().toISOString()
      }, { merge: true }).catch(e => console.error('[SubjectContext] Sync failed:', e))
    }
  }

  return (
    <SubjectContext.Provider value={{ subject, setSubject }}>
      {children}
    </SubjectContext.Provider>
  )
}

export const useSubject = () => useContext(SubjectContext)
