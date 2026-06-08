// Minimal Firebase mock — keeps tests fast and hermetic
export const db = {}

export const doc = jest.fn(() => ({}))
export const getDoc = jest.fn(() => Promise.resolve({ exists: () => false, data: () => ({}) }))
export const setDoc = jest.fn(() => Promise.resolve())
