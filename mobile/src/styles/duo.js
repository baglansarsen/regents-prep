// ─── Duolingo-style design system helpers ────────────────────────────────────

// Typography scale — use with <Text style={[T.h1, { color: C.text }]}>
export const T = {
  h1:    { fontFamily: 'Nunito_900Black',     fontSize: 28, letterSpacing: -0.3 },
  h2:    { fontFamily: 'Nunito_800ExtraBold', fontSize: 22 },
  h3:    { fontFamily: 'Nunito_700Bold',      fontSize: 17 },
  body:  { fontFamily: 'Nunito_700Bold',      fontSize: 15, lineHeight: 22 },
  small: { fontFamily: 'Nunito_600SemiBold',  fontSize: 13 },
  label: { fontFamily: 'Nunito_600SemiBold',  fontSize: 12, letterSpacing: 0.8, textTransform: 'uppercase' },
  btn:   { fontFamily: 'Nunito_800ExtraBold', fontSize: 15, letterSpacing: 0.5, textTransform: 'uppercase' },
  num:   { fontFamily: 'Nunito_900Black',     fontSize: 36 },
}

// 3D "Duo button" — returns style object for the touchable container
// Usage: <TouchableOpacity style={[duoBtn(C.brand, C.brandDark), { marginTop: 12 }]}>
export function duoBtn(color, darkColor, opts = {}) {
  return {
    backgroundColor: color,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderBottomWidth: 4,
    borderBottomColor: darkColor,
    alignItems: 'center',
    justifyContent: 'center',
    ...opts,
  }
}

// Outlined "Duo button" (secondary)
export function duoBtnOutline(color, opts = {}) {
  return {
    backgroundColor: 'transparent',
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderWidth: 2.5,
    borderColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    ...opts,
  }
}

// Card shadow — call inside makeStyles: { ...cardShadow(C), ...otherStyles }
export function cardShadow(shadowColor) {
  return {
    shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  }
}

// Pill tab style helper
export function pillTab(active, C) {
  return {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: active ? C.brand : C.surface2,
  }
}
