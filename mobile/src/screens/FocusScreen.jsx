import React from 'react'
import { useFocusScreenState } from '../hooks/useFocusScreenState'
import FocusDoneScreen from '../components/FocusScreen/FocusDoneScreen'
import FocusActiveScreen from '../components/FocusScreen/FocusActiveScreen'
import FocusSetupScreen from '../components/FocusScreen/FocusSetupScreen'

export default function FocusScreen({ navigation }) {
  const state = useFocusScreenState(navigation)

  if (state.isDone) return <FocusDoneScreen {...state} />
  if (state.isActive) return <FocusActiveScreen {...state} />
  return <FocusSetupScreen {...state} presets={state.FOCUS_PRESETS} />
}
