import leJun2025 from './living-environment/june-2025'
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

import esJun2025 from './earth-science/june-2025'
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

import chemJun2025 from './chemistry/june-2025'
import chemJun2024 from './chemistry/june-2024'
import chemAug2024 from './chemistry/august-2024'
import chemJun2023 from './chemistry/june-2023'
import chemAug2023 from './chemistry/august-2023'
import chemJun2022 from './chemistry/june-2022'
import chemAug2022 from './chemistry/august-2022'
import chemJun2019 from './chemistry/june-2019'
import chemAug2019 from './chemistry/august-2019'

import physJun2025 from './physics/june-2025'
import physJun2024 from './physics/june-2024'
import physJun2023 from './physics/june-2023'
import physJun2022 from './physics/june-2022'
import physJun2019 from './physics/june-2019'

import a1Jun2025 from './algebra-1/june-2025'
import a1Jun2024 from './algebra-1/june-2024'
import a1Aug2024 from './algebra-1/august-2024'
import a1Jun2023 from './algebra-1/june-2023'
import a1Aug2023 from './algebra-1/august-2023'
import a1Jun2022 from './algebra-1/june-2022'
import a1Aug2022 from './algebra-1/august-2022'
import a1Jun2021 from './algebra-1/june-2021'
import a1Jun2019 from './algebra-1/june-2019'
import a1Aug2019 from './algebra-1/august-2019'

import a2Jun2025 from './algebra-2/june-2025'
import a2Jun2024 from './algebra-2/june-2024'
import a2Aug2024 from './algebra-2/august-2024'
import a2Jun2023 from './algebra-2/june-2023'
import a2Aug2023 from './algebra-2/august-2023'
import a2Jun2022 from './algebra-2/june-2022'
import a2Aug2022 from './algebra-2/august-2022'
import a2Jun2019 from './algebra-2/june-2019'
import a2Aug2019 from './algebra-2/august-2019'

import geoJun2025 from './geometry/june-2025'
import geoJun2024 from './geometry/june-2024'
import geoAug2024 from './geometry/august-2024'
import geoJun2023 from './geometry/june-2023'
import geoAug2023 from './geometry/august-2023'
import geoJun2022 from './geometry/june-2022'
import geoAug2022 from './geometry/august-2022'
import geoJun2019 from './geometry/june-2019'
import geoAug2019 from './geometry/august-2019'

export const REGENTS_EXAMS = {
  'living-environment': [
    leJun2025,
    leJun2024, leAug2024,
    leJun2023, leAug2023,
    leJun2022, leAug2022,
    leJun2021, leAug2021,
    leJun2019, leAug2019,
  ],
  'earth-science': [
    esJun2025,
    esJun2024, esAug2024,
    esJun2023, esAug2023,
    esJun2022, esAug2022,
    esJun2021, esAug2021,
    esJun2019, esAug2019,
  ],
  'chemistry': [
    chemJun2025,
    chemJun2024, chemAug2024,
    chemJun2023, chemAug2023,
    chemJun2022, chemAug2022,
    chemJun2019, chemAug2019,
  ],
  'physics': [
    physJun2025,
    physJun2024,
    physJun2023,
    physJun2022,
    physJun2019,
  ],
  'algebra-1': [
    a1Jun2025,
    a1Jun2024, a1Aug2024,
    a1Jun2023, a1Aug2023,
    a1Jun2022, a1Aug2022,
    a1Jun2021,
    a1Jun2019, a1Aug2019,
  ],
  'algebra-2': [
    a2Jun2025,
    a2Jun2024, a2Aug2024,
    a2Jun2023, a2Aug2023,
    a2Jun2022, a2Aug2022,
    a2Jun2019, a2Aug2019,
  ],
  'geometry': [
    geoJun2025,
    geoJun2024, geoAug2024,
    geoJun2023, geoAug2023,
    geoJun2022, geoAug2022,
    geoJun2019, geoAug2019,
  ],
}

export function getExam(id) {
  for (const exams of Object.values(REGENTS_EXAMS)) {
    const found = exams.find((e) => e.id === id)
    if (found) return found
  }
  return null
}
