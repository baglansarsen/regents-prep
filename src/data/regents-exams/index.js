import leJun2024 from './living-environment/june-2024'
import leAug2024 from './living-environment/august-2024'
import leJun2023 from './living-environment/june-2023'
import leAug2023 from './living-environment/august-2023'
import leJun2022 from './living-environment/june-2022'
import leAug2022 from './living-environment/august-2022'
import leJun2021 from './living-environment/june-2021'
import leAug2021 from './living-environment/august-2021'
import leJun2019 from './living-environment/june-2019'
import leAug2019 from './living-environment/august-2019'

import esJun2024 from './earth-science/june-2024'
import esAug2024 from './earth-science/august-2024'
import esJun2023 from './earth-science/june-2023'
import esAug2023 from './earth-science/august-2023'
import esJun2022 from './earth-science/june-2022'
import esAug2022 from './earth-science/august-2022'
import esJun2021 from './earth-science/june-2021'
import esAug2021 from './earth-science/august-2021'
import esJun2019 from './earth-science/june-2019'
import esAug2019 from './earth-science/august-2019'

export const REGENTS_EXAMS = {
  'living-environment': [
    leJun2024, leAug2024,
    leJun2023, leAug2023,
    leJun2022, leAug2022,
    leJun2021, leAug2021,
    leJun2019, leAug2019,
  ],
  'earth-science': [
    esJun2024, esAug2024,
    esJun2023, esAug2023,
    esJun2022, esAug2022,
    esJun2021, esAug2021,
    esJun2019, esAug2019,
  ],
}

export function getExam(id) {
  for (const exams of Object.values(REGENTS_EXAMS)) {
    const found = exams.find((e) => e.id === id)
    if (found) return found
  }
  return null
}
