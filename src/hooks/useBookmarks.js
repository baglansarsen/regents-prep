import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

function storageKey(uid) { return `regents_bookmarks_${uid ?? 'guest'}` }

function loadLocal(uid) {
  try { return new Set(JSON.parse(localStorage.getItem(storageKey(uid))) ?? []) } catch { return new Set() }
}

function saveLocal(uid, set) {
  try { localStorage.setItem(storageKey(uid), JSON.stringify([...set])) } catch {}
}

export function useBookmarks(uid) {
  const [bookmarkedIds, setBookmarkedIds] = useState(() => loadLocal(uid))

  // Load from Firestore on mount
  useEffect(() => {
    if (!uid) return
    getDoc(doc(db, 'users', uid, 'meta', 'bookmarks'))
      .then((snap) => {
        if (snap.exists()) {
          const ids = new Set(snap.data().ids ?? [])
          setBookmarkedIds(ids)
          saveLocal(uid, ids)
        }
      })
      .catch(() => {})
  }, [uid])

  const toggle = useCallback((questionId) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (next.has(questionId)) next.delete(questionId)
      else next.add(questionId)
      saveLocal(uid, next)
      if (uid) {
        setDoc(
          doc(db, 'users', uid, 'meta', 'bookmarks'),
          { ids: [...next] },
          { merge: true },
        ).catch(() => {})
      }
      return next
    })
  }, [uid])

  const remove = useCallback((questionId) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      next.delete(questionId)
      saveLocal(uid, next)
      if (uid) {
        setDoc(doc(db, 'users', uid, 'meta', 'bookmarks'), { ids: [...next] }, { merge: true }).catch(() => {})
      }
      return next
    })
  }, [uid])

  return { bookmarkedIds, toggle, remove }
}
