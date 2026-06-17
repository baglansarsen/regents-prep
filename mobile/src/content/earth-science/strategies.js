export const STRATEGIES = {
  'es-rocks': { // Rocks & the Rock Cycle (covers the Geology split)
    mentalPrep: [
      'Ground yourself with ESRT pages 6–7 (rock cycle diagram, mineral properties table) before this unit\'s questions.',
      'Remember the three rock families: igneous (cooled magma), sedimentary (deposited layers), metamorphic (heat/pressure).',
      'Remind yourself: texture tells you cooling rate — large crystals = slow cooling; tiny/no crystals = fast cooling.',
    ],
    answeringTechniques: [
      'Geology questions almost always require the Earth Science Reference Tables — identify which table before reading choices.',
      'For mineral identification, go through properties in order: luster → hardness → cleavage/fracture.',
      'Rock cycle questions: trace the arrows on the ESRT diagram to confirm the process (melting, compaction, etc.).',
    ],
    guessingStrategy: [
      'Large visible crystals → intrusive igneous (granite); tiny/no crystals → extrusive igneous (basalt).',
      'Sedimentary rocks always involve layers and deposition — if the answer describes water or layers, lean that way.',
      'Metamorphic rocks always involve existing rock + heat/pressure — if both are mentioned, that\'s your clue.',
    ],
    processOfElimination: [
      'Eliminate answers that mix intrusive and extrusive descriptions for the same rock sample.',
      'Remove choices that attribute foliation (banding/layering within a rock) to igneous rocks — it\'s a metamorphic feature.',
      'Drop choices that say mineral hardness can be determined by color alone — color is unreliable.',
    ],
    timeManagement: [
      'ESRT lookups add 15–20 seconds per question; locate the correct table before reading the answer choices.',
      'Mineral identification questions are usually quick once you know the table — do them first to bank time.',
      'Rock cycle diagram questions require tracing arrows; budget 30 seconds and move on if the path is unclear.',
    ],
  },

  'es-u2': { // Plate Tectonics
    mentalPrep: [
      'Orient yourself to the three boundary types: convergent (plates collide → mountains/trenches), divergent (plates separate → rift valleys/mid-ocean ridges), transform (plates slide → earthquakes).',
      'Recall that denser oceanic crust subducts beneath lighter continental crust at convergent boundaries.',
      'Remember: most volcanic and earthquake activity clusters at plate boundaries.',
    ],
    answeringTechniques: [
      'Boundary-type questions: identify what is formed (trench, ridge, rift) to name the boundary type.',
      'Seafloor spreading questions: use the ESRT magnetic reversal pattern — symmetric striping on both sides of a ridge confirms spreading.',
      'For subduction questions, the denser plate always goes under — check density or rock type in the question.',
    ],
    guessingStrategy: [
      'If a question mentions deep-sea trenches or island arcs, the answer almost certainly involves a convergent boundary and subduction.',
      'Mid-ocean ridges indicate divergent boundaries and seafloor spreading — use this when the setting is oceanic.',
      'Earthquakes at transform boundaries are shallow; those at subduction zones can be very deep.',
    ],
    processOfElimination: [
      'Remove choices that say continental crust subducts beneath oceanic crust — it\'s the reverse (denser oceanic goes under).',
      'Eliminate answers suggesting plate boundaries cause no seismic or volcanic activity.',
      'Drop choices that place mid-ocean ridges at convergent boundaries — ridges form where plates diverge.',
    ],
    timeManagement: [
      'Map-based plate boundary questions: identify the boundary type from the geographic feature shown before reading choices.',
      'Calculation questions (spreading rate = distance ÷ time) are straightforward; do them quickly using the formula.',
      'Multi-step subduction zone questions are the most complex — flag and return if under time pressure.',
    ],
  },

  'es-u3': { // Geologic Time
    mentalPrep: [
      'Anchor yourself to the ESRT Geologic History of New York State chart — nearly every geologic time question uses it.',
      'Recall the law of superposition: older layers are on the bottom, younger layers on top (unless disturbed).',
      'Remind yourself: index fossils = widespread species that lived a short time → excellent time markers.',
    ],
    answeringTechniques: [
      'Age of rock layer questions: use the ESRT geologic time chart, not mental recall — the numbers are complex.',
      'For cross-section diagrams, identify the oldest layer first (bottom), then trace disturbances (faults, intrusions) which are always younger than the layers they cut.',
      'Half-life questions: use the formula (amount remaining = original × (1/2)^n, where n = number of half-lives elapsed).',
    ],
    guessingStrategy: [
      'An intrusion (igneous rock cutting through layers) is always younger than the layers it cuts through.',
      'If a question asks about a mass extinction event, the Permian (largest) or Cretaceous (dinosaurs) are the most tested.',
      'When unsure about an era, Paleozoic = ancient marine life; Mesozoic = dinosaurs; Cenozoic = mammals.',
    ],
    processOfElimination: [
      'Eliminate answers that say rock layers are always in the order deposited — faulting and folding can invert them.',
      'Drop choices that confuse relative dating (older/younger) with absolute dating (actual years).',
      'Remove choices that claim radioactive decay speeds up or slows down with environmental conditions — it is constant.',
    ],
    timeManagement: [
      'ESRT geologic time chart lookups are essential; find the right column and row before answering.',
      'Half-life calculation questions are straightforward once you count the half-lives — do those early.',
      'Cross-section interpretation questions require methodical reading; if complex, flag and return.',
    ],
  },

  'es-u4': { // Meteorology
    mentalPrep: [
      'Orient yourself to pressure systems: air flows clockwise out of a High, counter-clockwise into a Low (Northern Hemisphere).',
      'Recall the dew point rule: when air temperature equals the dew point, condensation (fog, clouds, precipitation) occurs.',
      'Remind yourself: cold fronts bring sudden, brief storms; warm fronts bring slow, steady precipitation.',
    ],
    answeringTechniques: [
      'Weather map questions: trace isobars to find the center of the High or Low, then apply wind direction rules.',
      'Station model questions: decode symbol-by-symbol (temperature, dew point, cloud cover, wind direction/speed, pressure).',
      'Cloud type questions: match altitude first — cirro = high, alto = mid, strato = low/ground level.',
    ],
    guessingStrategy: [
      'If rapidly changing weather is described, the answer likely involves a cold front passage.',
      'When a question mentions "steady, prolonged rain," lean toward a warm front.',
      'Pressure and wind questions: higher pressure → clear weather; lower pressure → stormy conditions.',
    ],
    processOfElimination: [
      'Eliminate choices that place warm air rising on the cold side of a front — warm air rises over the cold air wedge.',
      'Remove answers saying relative humidity decreases as temperature drops — it actually increases.',
      'Drop choices that reverse the wind direction around a High or Low (clockwise out of High is non-negotiable).',
    ],
    timeManagement: [
      'Station model decoding is the most time-consuming meteorology task; if you know all symbols well, it\'s fast — if not, flag it.',
      'Large regional weather map questions may require reading several features; answer simpler questions on the same map first.',
      'Definition questions (what is a front?) are quick — answer those immediately.',
    ],
  },

  'es-u5': { // Climate
    mentalPrep: [
      'Separate weather (short-term, local) from climate (long-term average patterns for a region) before every question.',
      'Recall the main factors controlling climate: latitude, elevation, proximity to large water bodies, and ocean currents.',
      'Remind yourself: the greenhouse effect is natural; enhanced greenhouse effect (from CO₂, CH₄) drives climate change.',
    ],
    answeringTechniques: [
      'Climate zone questions: use latitude as the first filter — lower latitude = warmer and more solar energy received.',
      'For climate change questions, identify the mechanism: more greenhouse gases → more heat trapped → rising temperatures.',
      'Insolation questions: use the ESRT solar angle data — higher angle = more energy per unit area.',
    ],
    guessingStrategy: [
      'When unsure about why two locations at the same latitude have different climates, the answer usually involves ocean currents or elevation.',
      'Questions about past climate evidence most often reference ice cores, tree rings, or fossil pollen.',
      'If a question asks what would happen if CO₂ doubled, the answer involves temperature increase and related chain effects.',
    ],
    processOfElimination: [
      'Eliminate choices that confuse the ozone layer (UV protection) with the greenhouse effect (heat trapping) — they are different phenomena.',
      'Drop answers that say coastal areas have more extreme temperatures than inland areas — it\'s the opposite.',
      'Remove choices that claim latitude alone determines climate — elevation and ocean proximity also matter greatly.',
    ],
    timeManagement: [
      'ESRT insolation/climate data questions require finding the right table; locate it before answering.',
      'Climate graph interpretation (temperature and precipitation bar graphs) — read both axes before answering.',
      'Conceptual climate change questions are usually quick once you understand cause and effect; prioritize them.',
    ],
  },

  'es-solar': { // Solar System & Earth Motions (covers the Astronomy split)
    mentalPrep: [
      'Anchor yourself to the ESRT: the Luminosity vs. Surface Temperature (H-R diagram) and the Characteristics of Stars table are essential for this unit.',
      'Recall the stellar life cycle: nebula → main sequence star → (depending on mass) red giant → white dwarf OR supergiant → supernova → neutron star/black hole.',
      'Remind yourself: the universe is ~13.8 billion years old; our Sun is a middle-aged main sequence star.',
    ],
    answeringTechniques: [
      'H-R diagram questions: locate the star by temperature (x-axis, right = cooler) and luminosity (y-axis, up = brighter).',
      'For Moon phase questions, draw a quick sketch of the Sun-Earth-Moon alignment to determine the phase.',
      'Seasons questions: seasons are caused by Earth\'s axial tilt, NOT by distance from the Sun.',
    ],
    guessingStrategy: [
      'If a question asks about the brightest star in the sky (most luminous), look toward the top-left of the H-R diagram.',
      'Questions about the most common type of star in the universe → main sequence stars are the correct lean.',
      'When unsure about a planet\'s characteristics, inner planets (Mercury–Mars) are rocky; outer planets are gas/ice giants.',
    ],
    processOfElimination: [
      'Eliminate choices that say seasons are caused by Earth\'s changing distance from the Sun — axial tilt is the cause.',
      'Drop answers claiming the Moon produces its own light — it reflects sunlight.',
      'Remove choices that place our Sun in the red giant or white dwarf category — it is a main sequence star.',
    ],
    timeManagement: [
      'H-R diagram questions require careful axis reading; take 15 seconds to orient yourself before answering.',
      'Moon phase and season questions are quick if you can visualize the geometry — do those early.',
      'Stellar evolution sequence questions (what comes after a red giant?) are fast recall — answer immediately.',
    ],
  },

  'es-u7': { // Water Cycle
    mentalPrep: [
      'Trace the water cycle steps mentally: evaporation → condensation → precipitation → runoff/infiltration → transpiration.',
      'Recall that the driving energy for the water cycle is solar radiation (evaporation) and gravity (runoff).',
      'Remind yourself: impermeable surfaces (pavement, rock) increase runoff; permeable surfaces (soil, vegetation) increase infiltration.',
    ],
    answeringTechniques: [
      'Water cycle stage questions: identify what process moves water from one reservoir to another in the described scenario.',
      'Watershed questions: all water within a drainage basin flows toward the same outlet — trace downhill.',
      'For groundwater questions, identify the water table and what factors raise or lower it (precipitation, pumping, drought).',
    ],
    guessingStrategy: [
      'If a question describes water moving from land surface to atmosphere without precipitation, the answer involves evaporation or transpiration.',
      'When a question asks what increases flooding risk, choices involving impermeable surfaces or steep slopes are correct.',
      'Drought questions almost always involve decreased infiltration and groundwater recharge.',
    ],
    processOfElimination: [
      'Eliminate choices that confuse evaporation (liquid → gas from water surface) with transpiration (gas release from plants).',
      'Drop answers that say runoff is the same as infiltration — runoff stays on the surface, infiltration goes into the ground.',
      'Remove choices claiming deforestation decreases runoff — removing trees reduces infiltration and increases runoff.',
    ],
    timeManagement: [
      'Water cycle diagram questions are usually fast — trace the arrow to name the process.',
      'Groundwater/watershed questions may require reading the cross-section carefully; budget extra time.',
      'Simple definition questions (what is infiltration?) — answer immediately, no table needed.',
    ],
  },

  'es-sp': { // Data, Maps & Reference Tables (science practices)
    mentalPrep: [
      'The Earth Science Reference Tables (ESRT) can answer most questions — know what each chart holds so you can find data fast.',
      'For any graph/data table: name the x and y variables + units, then state the trend ("as X increases, Y ___") before reading the choices.',
      'Anchor yourself to the ESRT topographic map symbols and the contour line rules before this unit\'s questions.',
      'Recall the four contour rules: lines never cross; lines close around high points (hills); V-shapes point upstream in valleys; closer lines = steeper slope.',
      'Remind yourself: latitude lines run east-west; longitude lines run north-south.',
    ],
    answeringTechniques: [
      'Elevation questions: trace the contour line from a known value and count the contour interval to reach the point.',
      'Gradient (slope) questions: use the formula Gradient = change in elevation ÷ horizontal distance. The ESRT confirms the formula.',
      'Profile (cross-section) questions: plot each contour crossing on the profile grid, then connect the points smoothly.',
    ],
    guessingStrategy: [
      'When unsure about water flow direction, water always flows perpendicular to contour lines and downhill.',
      'If a question asks which side of a hill is steeper, the side with closer contour lines is always steeper.',
      'Latitude/longitude questions: if given a location in New York, latitude is roughly 40°–45° N and longitude is roughly 72°–79° W.',
    ],
    processOfElimination: [
      'Eliminate choices that say contour lines can cross — they never cross (that would mean one point has two elevations).',
      'Drop answers that claim water flows parallel to contour lines — flow is always perpendicular.',
      'Remove choices giving a gradient without dividing by distance — gradient is a rate, not a raw elevation difference.',
    ],
    timeManagement: [
      'Topographic profile questions take the most time in this unit — do them last if time is limited.',
      'Gradient calculation is fast with the formula; locate it on the ESRT first.',
      'Latitude/longitude identification questions are quick — answer those immediately.',
    ],
  },
}
