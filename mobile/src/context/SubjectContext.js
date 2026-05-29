import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SUBJECTS } from '../../../src/data/subjects'

const SubjectContext = createContext()
const STORAGE_KEY = '@selected_subject'
const VALID = new Set(Object.values(SUBJECTS))

export function SubjectProvider({ children }) {
  const [subject, setSubjectState] = useState(SUBJECTS.LIVING_ENVIRONMENT)

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(v => {
      if (v && VALID.has(v)) setSubjectState(v)
    })
  }, [])

  function setSubject(sub) {
    setSubjectState(sub)
    AsyncStorage.setItem(STORAGE_KEY, sub)
  }

  return (
    <SubjectContext.Provider value={{ subject, setSubject }}>
      {children}
    </SubjectContext.Provider>
  )
}

export const useSubject = () => useContext(SubjectContext)
