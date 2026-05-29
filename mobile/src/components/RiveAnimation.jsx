import React, { useRef, useEffect } from 'react'
import Rive, { Fit, Alignment } from 'rive-react-native'
import PET_RIVES from '../assets/petRives'

// State machine name must match what's in the .riv file.
// Convention: name your state machine "PetStateMachine" and the trigger input "state".
const STATE_MACHINE = 'PetStateMachine'
const STATE_INPUT   = 'state'

export default function RiveAnimation({ petType, animation = 'idle', size = 100 }) {
  const source = PET_RIVES[petType]
  const riveRef = useRef(null)

  useEffect(() => {
    riveRef.current?.setInputState(STATE_MACHINE, STATE_INPUT, animation)
  }, [animation])

  if (!source) return null

  return (
    <Rive
      ref={riveRef}
      resourceName={source}
      stateMachineName={STATE_MACHINE}
      fit={Fit.Contain}
      alignment={Alignment.Center}
      style={{ width: size, height: size }}
    />
  )
}
