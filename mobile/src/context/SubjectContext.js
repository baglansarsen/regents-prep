import React, { createContext, useContext, useState } from 'react'
import { SUBJECTS } from '../../../src/data/subjects'

const SubjectContext = createContext()

export function SubjectProvider({ children }) {
  const [subject, setSubject] = useState(SUBJECTS.LIVING_ENVIRONMENT)
  return (
    <SubjectContext.Provider value={{ subject, setSubject }}>
      {children}
    </SubjectContext.Provider>
  )
}

export const useSubject = () => useContext(SubjectContext)
