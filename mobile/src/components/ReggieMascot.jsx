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
// Eyes that can blink (open-eyed looks). Happy/wink/sleep are already closed-ish.
export const BLINKABLE_EYES = ['open', 'look_up', 'sad', 'sparkle', undefined]

export default function ReggieMascot({ pose = 'idle', size = 120, avatar = false, blink = false, style }) {
  const xml = useMemo(() => {
    const base = POSES[pose] || POSES.idle
    const opts = blink && BLINKABLE_EYES.includes(base.eye) ? { ...base, eye: 'blink' } : base
    return avatar ? reggieAvatar(opts) : reggie(opts)
  }, [pose, avatar, blink])

  return <SvgXml xml={xml} width={size} height={size} style={style} />
}
