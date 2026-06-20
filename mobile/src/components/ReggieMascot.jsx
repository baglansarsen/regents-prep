import React, { useMemo } from 'react'
import { SvgXml } from 'react-native-svg'
import { reggie, avatar as reggieAvatar, POSES } from './reggie/reggieCharacter'

/**
 * Reggie the Dino — the full in-app mascot system (ported from the Regentify
 * Brand design project). Renders the free-standing character in any of its
 * moods, or a circular face avatar.
 *
 * Poses: idle · wave · celebrate · think · encourage · oops · sleep
 *   idle      — default presence (headers, resting hero, buddy slot)
 *   wave      — login / onboarding greeting
 *   celebrate — lesson complete, streak hit, perfect score
 *   think     — hints, "working on it"
 *   encourage — correct answer, "you've got this" nudges
 *   oops      — wrong answer, errors, empty states
 *   sleep     — out of hearts / idle timeout
 *
 * Back-compat: <ReggieMascot size={120} /> still renders idle, unchanged.
 */
export default function ReggieMascot({ pose = 'idle', size = 120, avatar = false, style }) {
  const xml = useMemo(() => {
    const opts = POSES[pose] || POSES.idle
    return avatar ? reggieAvatar(opts) : reggie(opts)
  }, [pose, avatar])

  return <SvgXml xml={xml} width={size} height={size} style={style} />
}
