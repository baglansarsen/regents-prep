export const STRATEGIES = {
  'es-plateboundaries': { // Plate Boundaries (split out of Plate Tectonics)
    mentalPrep: [
      'Fix the three boundary types before anything else: convergent (plates collide), divergent (plates separate), transform (plates slide past).',
      'Recall what each boundary type builds: convergent → mountains/trenches/subduction; divergent → rift valleys/mid-ocean ridges; transform → lateral faults, no volcanism.',
      'Denser oceanic crust always subducts beneath lighter continental crust at convergent boundaries — never the reverse.',
    ],
    answeringTechniques: [
      'Identify the resulting feature first (trench, ridge, rift, fault) — that names the boundary type.',
      'Continental-continental convergence (no subduction) builds the tallest mountain ranges via crumpling, not volcanism.',
      'Use the ESRT magnetic-reversal striping pattern to confirm seafloor spreading at a divergent boundary.',
    ],
    guessingStrategy: [
      'Deep-sea trenches or island arcs → convergent boundary with subduction.',
      'Mid-ocean ridges → divergent boundary and seafloor spreading.',
      'A fault with earthquakes but no volcanoes or major mountain-building → transform boundary.',
    ],
    processOfElimination: [
      'Eliminate any choice with continental crust subducting beneath oceanic crust — it\'s always the reverse.',
      'Drop answers placing mid-ocean ridges at convergent boundaries.',
      'Remove choices claiming transform boundaries build mountains or produce major volcanism.',
    ],
    timeManagement: [
      'Map-based questions: name the resulting feature before reading choices — it settles the boundary type immediately.',
      'Seafloor-age/spreading-rate calculations are formula-driven; do them quickly once you have the numbers.',
      'Diagram questions showing all three boundary types side by side reward matching feature-to-type fast.',
    ],
  },

  'es-earthquakes': { // Earthquakes & Seismic Waves (split out of Plate Tectonics)
    mentalPrep: [
      'P-waves (primary) travel through solids AND liquids; S-waves (secondary) only travel through solids.',
      'Distance to an epicenter comes from the ESRT travel-time graph: P-S arrival-time difference maps directly to distance.',
      'Earthquake magnitude and damage are related but not identical — depth, distance, and local geology all affect damage.',
    ],
    answeringTechniques: [
      'Distance-to-epicenter problems: read the P-wave and S-wave travel-time curves off the ESRT graph at the given distance, then work forward or backward from arrival times.',
      'Locating an epicenter from multiple stations: each station\'s distance defines a circle; the epicenter is where three circles intersect.',
      'S-wave shadow zones on the far side of Earth are the direct evidence that the outer core is liquid.',
    ],
    guessingStrategy: [
      'If a wave "disappears" partway through Earth, it\'s an S-wave meeting a liquid layer (the outer core).',
      'A bigger P-S time gap always means a greater distance to the epicenter — never the reverse.',
      '"Constant rate of decay" style facts belong to radioactive dating, not seismic waves — don\'t mix them up.',
    ],
    processOfElimination: [
      'Eliminate any choice claiming S-waves travel through the outer core — they cannot travel through a liquid.',
      'Drop answers that reverse the P-S relationship (S-waves are NOT faster or first-arriving).',
      'Remove choices treating magnitude alone as the sole predictor of damage.',
    ],
    timeManagement: [
      'ESRT travel-time graph reads are quick once you know which axis is which — practice this specific lookup.',
      'Triangulation/epicenter-location questions take longer; sketch the three circles rather than trying to reason it out in your head.',
      'Wave-behavior conceptual questions (why S-waves stop) are fast recall — answer those immediately.',
    ],
  },

  'es-interior': { // Evidence for Earth's Interior (split out of Plate Tectonics)
    mentalPrep: [
      'Layer order from the surface in: crust → mantle (plastic asthenosphere, then stiffer lower mantle) → liquid outer core → solid inner core.',
      'The two counterintuitive facts examiners love: the outer core is liquid but the (hotter, higher-pressure) inner core is solid.',
      'Nearly everything we know about Earth\'s interior comes from indirect seismic-wave evidence, not direct sampling.',
    ],
    answeringTechniques: [
      'Match wave behavior to the boundary it reveals: P-waves refracting/slowing = crossing a density/state boundary; S-waves disappearing = entering a liquid.',
      'Convection in the mantle/outer core is the inferred driver of plate motion — pair "convection currents" with "asthenosphere" or "outer core," not the rigid crust.',
      'Composition-and-state diagram questions: pair rocky/solid with the outer layers and iron-nickel/liquid-then-solid with the core layers, in that order.',
    ],
    guessingStrategy: [
      'A property described as "inferred from seismic waves" is testing this unit, even if the raw topic tag says something else.',
      'Extreme pressure keeping something solid despite extreme heat → inner core, every time.',
      'Any reference to Earth\'s magnetic field being generated by convection points to the liquid outer core.',
    ],
    processOfElimination: [
      'Eliminate any answer with a solid outer core or a liquid inner core — that reverses the one fact tested most often here.',
      'Drop choices claiming the crust or lithosphere drives convection — that happens in the plastic mantle/outer core, not the rigid layers.',
      'Remove options that describe direct sampling of the core — no drill has ever reached it; all evidence here is indirect.',
    ],
    timeManagement: [
      'Layer-labeling diagram questions are fast once the order is memorized — answer those first.',
      'Wave-behavior reasoning ("why does this wave do X") takes a moment to reconstruct the chain of logic; don\'t rush it.',
      'Save cross-section "which layer" questions with unfamiliar labeling for a second pass if the diagram is unclear.',
    ],
  },

  'es-reldate': { // Relative Dating (split out of Geologic Time)
    mentalPrep: [
      'Four core principles, always in this order of use: superposition (bottom = oldest), original horizontality (started flat), crosscutting relationships (the cutter is younger), inclusions (the fragment is older than what holds it).',
      'Relative dating tells you the ORDER of events, never a number of years — that\'s radioactive dating\'s job.',
      'Unconformities are missing time — a gap in the rock record from erosion or non-deposition, not a normal layer.',
    ],
    answeringTechniques: [
      'On any cross section, find the oldest undisturbed layer first (lowest), then work upward, then place intrusions/faults using crosscutting relationships.',
      'Tilted or folded layers were disturbed AFTER deposition — original horizontality tells you they started flat.',
      'An intrusion or fault is always younger than every layer it cuts through, no exceptions.',
    ],
    guessingStrategy: [
      'If a feature "cuts through" other layers, it\'s the youngest thing in the picture.',
      'A layer described as "not overturned" means superposition applies directly — don\'t overthink it.',
      'Correlating layers between two locations usually points to matching index fossils or a shared distinctive layer (like volcanic ash).',
    ],
    processOfElimination: [
      'Eliminate any answer sequencing an intrusion or fault as OLDER than the layers it cuts.',
      'Drop choices assuming layers are always found in their original deposition order — folding and faulting can invert them.',
      'Remove options that confuse relative order (older/younger) with an actual age in years.',
    ],
    timeManagement: [
      'Simple "which layer is oldest" superposition questions are the fastest points in this unit — answer those immediately.',
      'Multi-event cross sections (layers + intrusion + fault + unconformity) take longer; work oldest-to-youngest methodically rather than guessing the order.',
      'Correlation-between-locations questions reward matching a labeled marker layer or fossil across the two columns — scan for that first.',
    ],
  },

  'es-radiodate': { // Radioactive Dating (split out of Geologic Time)
    mentalPrep: [
      'Radioactive decay rate (half-life) is constant — it never speeds up or slows down with heat, pressure, or chemistry.',
      'Age is calculated from the parent-to-daughter isotope ratio TODAY, using the known half-life.',
      'Different isotopes suit different timescales: Carbon-14 (short half-life) for young/organic material; Uranium-238 or Potassium-40 (long half-lives) for ancient rock.',
    ],
    answeringTechniques: [
      'Equal parent and daughter amounts (50:50) always means exactly one half-life has passed.',
      'Percent-remaining-after-N-half-lives questions: remaining = 100% × (1/2)^N — after 3 half-lives, 12.5% remains.',
      'Picking the right isotope for a dating job: match the ROCK\'S AGE to the isotope\'s half-life — a half-life much shorter or longer than the age gives an unreliable result.',
    ],
    guessingStrategy: [
      'If the question mentions a very young sample (thousands of years), lean toward Carbon-14.',
      'If it mentions billions of years, lean toward Uranium-238 or Potassium-40.',
      'A "ratio of parent to daughter" phrase is almost always this unit, not relative dating.',
    ],
    processOfElimination: [
      'Eliminate any answer suggesting decay rate changes with temperature, pressure, or the passage of time — it\'s always constant.',
      'Drop choices using atmospheric carbon ratios to date ROCKS — that method is for once-living organic material only.',
      'Remove options that confuse "half the parent remains" with "half the age has passed" without checking the half-life count.',
    ],
    timeManagement: [
      'Half-life fraction problems (1/2, 1/4, 1/8...) are formulaic — count the halvings and move fast.',
      'Isotope-selection questions reward quickly comparing the sample\'s age to each isotope\'s half-life — eliminate mismatches first.',
      'Word problems describing a decay scenario in prose take longer to parse; extract the parent:daughter ratio and number of half-lives before calculating.',
    ],
  },

  'es-fossils': { // Fossils & Correlation (split out of Geologic Time)
    mentalPrep: [
      'A good index fossil is widespread geographically, existed for a short time span, and is common/easy to identify.',
      'Correlation means matching rock layers between different locations — by index fossils, matching rock types, or a shared marker layer (like volcanic ash).',
      'The fossil record shows a progression from simpler to more complex organisms over geologic time — direct evidence for evolution.',
    ],
    answeringTechniques: [
      'Index-fossil questions: match the organism to its (short) time range on the ESRT, then read off the geologic period.',
      'Correlation-between-outcrops questions: look for the SAME fossil or the SAME distinctive layer (like an ash bed) appearing in both columns.',
      'Volcanic ash is an especially good time marker because it\'s deposited rapidly over a huge area — the layer is the same age everywhere it\'s found.',
    ],
    guessingStrategy: [
      'An organism described as short-lived and widespread is being set up as an index fossil.',
      'If two far-apart locations share an identical fossil or rock sequence, the answer is almost always about correlation.',
      'Extinction-boundary questions (like an iridium layer) usually point to a sudden environmental catastrophe, not gradual change.',
    ],
    processOfElimination: [
      'Eliminate any "index fossil" answer choice describing a long-lived or geographically limited organism — that fails the definition.',
      'Drop options claiming correlation requires layers to be the exact same rock type — matching fossils or marker layers is what matters, not lithology alone.',
      'Remove choices that reverse the fossil-complexity trend (implying older rocks show MORE complex life than younger ones).',
    ],
    timeManagement: [
      'ESRT fossil-range lookups are quick once you know which chart to use — locate it before reading choices.',
      'Correlation diagrams with several rock columns take longer to scan; look for the one shared, distinctive marker first rather than comparing every layer.',
      'Definition-style questions (what makes a good index fossil?) are fast recall — answer those immediately.',
    ],
  },
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

  'es-weathervar': { // Weather Variables (split out of Meteorology)
    mentalPrep: [
      'Recall the dew point rule: when air temperature equals the dew point, condensation (fog, clouds, precipitation) occurs.',
      'Air pressure, temperature, and wind are all connected: rising air cools and can form clouds; sinking air warms and clears skies.',
      'The Coriolis effect (from Earth\'s rotation) deflects wind and ocean currents — right in the Northern Hemisphere, left in the Southern.',
    ],
    answeringTechniques: [
      'Station model questions: decode symbol-by-symbol (temperature, dew point, cloud cover, wind direction/speed, pressure).',
      'Cloud type questions: match altitude first — cirro = high, alto = mid, strato = low/ground level.',
      'Greenhouse gas questions: nitrogen and oxygen make up 99% of the atmosphere but are NOT greenhouse gases — water vapor, CO₂, and methane are.',
    ],
    guessingStrategy: [
      'Pressure and wind questions: higher pressure → clear weather; lower pressure → stormy conditions.',
      'If a question asks about ozone, remember its role is UV protection in the stratosphere, not heat-trapping.',
      'A question about "increasing snowfall" from a lake usually points to lake-effect processes, not a general storm.',
    ],
    processOfElimination: [
      'Eliminate choices attributing the Coriolis effect to Earth\'s tilt — it\'s always rotation.',
      'Remove answers saying relative humidity decreases as temperature drops — it actually increases (at constant moisture).',
      'Drop choices treating nitrogen or oxygen as greenhouse gases.',
    ],
    timeManagement: [
      'Station model decoding is the most time-consuming task here; if you know all symbols well, it\'s fast — if not, flag it.',
      'Definition/vocabulary questions (what is the Coriolis effect?) are quick — answer those immediately.',
      'Layer-of-the-atmosphere questions (troposphere, stratosphere, mesosphere) reward memorizing the temperature-vs-altitude pattern.',
    ],
  },

  'es-moisture': { // Moisture & Humidity (split out of Meteorology)
    mentalPrep: [
      'Relative humidity compares actual moisture to the maximum the air could hold at that temperature — not moisture in isolation.',
      'The wet-bulb depression (dry-bulb minus wet-bulb) is the key input to both the ESRT relative humidity and dewpoint tables.',
      'When dry-bulb equals wet-bulb, relative humidity is 100% (saturation) — no depression, no drying evaporation.',
    ],
    answeringTechniques: [
      'Always calculate the depression first (dry-bulb − wet-bulb), then use it as a coordinate in the correct ESRT table.',
      'Condensation releases latent heat (2260 J/g); evaporation requires the same amount as input — don\'t mix up which direction energy flows.',
      'Evapotranspiration = evaporation (from water bodies) + transpiration (from plants) — together they explain nearly all atmospheric water vapor.',
    ],
    guessingStrategy: [
      'A larger wet-bulb depression always means drier air (lower relative humidity), never the reverse.',
      'If a question asks about water entering the atmosphere without precipitation or condensation, evaporation or transpiration is the answer.',
      'Fog and dew form when air cools to its dew point — no depression, so RH is high.',
    ],
    processOfElimination: [
      'Eliminate any answer that subtracts wet-bulb and dry-bulb in the wrong order — depression is always dry-bulb minus wet-bulb.',
      'Drop choices confusing the relative humidity table with the dewpoint table — check which one the question asks for.',
      'Remove answers claiming evaporation releases heat — evaporation absorbs heat; condensation releases it.',
    ],
    timeManagement: [
      'ESRT table lookups are fast once you have the depression calculated — do that step first, every time.',
      'Word problems describing humidity qualitatively (not asking for a number) are quicker — reason from the depression conceptually.',
      'Double-check units and which reading is dry-bulb vs. wet-bulb before committing to a table lookup.',
    ],
  },

  'es-fronts': { // Air Masses, Fronts & Maps (split out of Meteorology)
    mentalPrep: [
      'Air mass naming uses two letters: moisture first (m = maritime, c = continental), temperature second (T = tropical, P = polar).',
      'Cold fronts bring sudden, brief, intense weather; warm fronts bring slow, steady, prolonged precipitation.',
      'Isobars are lines of equal pressure — closely spaced isobars mean a steep pressure gradient and strong winds.',
    ],
    answeringTechniques: [
      'Weather map questions: trace isobars to find the center of the High or Low, then apply the wind-direction rule (clockwise out of a High, counterclockwise into a Low, Northern Hemisphere).',
      'Occluded fronts form when a fast cold front catches up to a warm front — sequence questions test that order.',
      'Front-passage questions: identify what\'s "ahead of," "at," and "behind" the front — conditions differ at each stage.',
    ],
    guessingStrategy: [
      'Rapidly changing weather → cold front passage. Steady, prolonged rain → warm front.',
      'A description of warm, moist air from the Gulf of Mexico or Caribbean is almost always maritime tropical (mT).',
      'Closely packed isobars on a map → strong winds, regardless of what else the question describes.',
    ],
    processOfElimination: [
      'Eliminate choices placing warm air rising on the cold side of a front — warm air always rises over the cold air wedge.',
      'Drop choices that reverse wind direction around a High or Low.',
      'Remove options describing continental air masses as warm and humid — continental means dry.',
    ],
    timeManagement: [
      'Large regional weather map questions may require reading several features; answer the simpler sub-questions on the same map first.',
      'Front-type identification from a cross-section diagram is fast once you spot which air mass is overriding the other.',
      'Definition questions (what is a front? what is an air mass?) are quick — answer those immediately.',
    ],
  },

  'es-storms': { // Storms & Severe Weather (split out of Meteorology)
    mentalPrep: [
      'Lake-effect snow forms when cold, dry air crosses a relatively warm lake, picking up moisture that then falls as heavy snow downwind.',
      'Severe weather (thunderstorms, tornadoes, hurricanes) forms along strong temperature/moisture contrasts — usually at or near fronts.',
      'Know your severe-weather symbols on a station model — they\'re tested directly, not just conceptually.',
    ],
    answeringTechniques: [
      'Lake-effect questions: check wind direction relative to the lake — snow is heaviest downwind of the lake, not upwind.',
      'Storm-preparation questions match the hazard to the correct action (board windows for hurricanes, seek shelter for tornadoes).',
      'Severe weather symbol questions: match the icon to its meaning directly from the ESRT weather symbols key.',
    ],
    guessingStrategy: [
      'A NY city known for heavy winter snowfall near a Great Lake (Buffalo, Oswego, Watertown) points to lake-effect snow.',
      'If a storm forms right at or just behind a fast-moving cold front, think severe thunderstorms.',
      'Storm intensity questions usually hinge on available moisture and temperature contrast — more of both, more severe.',
    ],
    processOfElimination: [
      'Eliminate answers describing lake-effect snow occurring on the upwind (source) side of a lake.',
      'Drop generic "bad weather" answers that don\'t match the specific hazard named in the question.',
      'Remove choices mismatching a hazard with an unrelated safety action (e.g. "seek higher ground" for a tornado).',
    ],
    timeManagement: [
      'Symbol-identification questions are fast recall — answer immediately if you know the ESRT key.',
      'Scenario questions (why does city X get more snow than city Y?) take a moment to reason through wind direction and lake position.',
    ],
  },

  'es-water': { // The Water Cycle (split out of Water Cycle & Oceans)
    mentalPrep: [
      'Trace the water cycle steps mentally: evaporation → condensation → precipitation → runoff/infiltration → transpiration.',
      'The driving energy for the water cycle is solar radiation (evaporation) plus gravity (runoff and stream flow).',
      'Sediment size and stream velocity are linked: faster streams carry/erode larger particles; as velocity drops, the largest particles are deposited first.',
    ],
    answeringTechniques: [
      'Water cycle stage questions: identify what process moves water from one reservoir to another in the described scenario.',
      'Stream-erosion questions: abrasion (particle-to-particle collision) rounds sediment; the transport agent and distance determine how rounded/sorted it becomes.',
      'Deposition-order questions: as a stream slows (entering a lake, ocean, or flatter gradient), largest/heaviest particles settle first, finest particles travel farthest.',
    ],
    guessingStrategy: [
      'If a question describes water moving from land/ocean surface to atmosphere without precipitation, the answer involves evaporation or transpiration.',
      'Stream curve questions: erosion happens on the outside of a bend (faster current), deposition on the inside (slower current).',
      'A "V-shaped valley" points to a young, actively down-cutting stream; a wide flat valley points to an older, meandering one.',
    ],
    processOfElimination: [
      'Eliminate choices that confuse evaporation (liquid → gas from a water surface) with transpiration (gas release from plants).',
      'Drop answers claiming the finest sediment (clay) deposits first or closest to shore — it travels farthest and settles last.',
      'Remove options describing dissolution as the main cause of pebble rounding — abrasion (mechanical) is responsible, not dissolving.',
    ],
    timeManagement: [
      'Water cycle diagram questions are usually fast — trace the arrow to name the process.',
      'Sediment-size/velocity graph questions are formulaic once you know "faster = coarser, slower = finer" — apply it directly.',
      'Simple definition questions (what is infiltration?) — answer immediately, no table needed.',
    ],
  },

  'es-groundwater': { // Groundwater & Porosity (split out of Water Cycle & Oceans)
    mentalPrep: [
      'Porosity = how much open space a material has; permeability = how easily water flows through those spaces — related but distinct.',
      'Smaller, more uniform (well-sorted) particles generally increase porosity but can reduce permeability if the pores aren\'t well connected.',
      'Capillarity (capillary rise) is strongest in fine-grained material with narrow pores — the opposite of where permeability is highest.',
    ],
    answeringTechniques: [
      'Infiltration-vs-runoff questions: gentle slope + permeable soil = maximum infiltration; steep slope + impermeable material = maximum runoff.',
      'Comparing soil samples: coarse sand has the largest, best-connected pores → highest permeability, lowest capillarity.',
      'Clay has the smallest pores → lowest permeability but highest capillarity, which is why clay soils drain poorly but retain moisture.',
    ],
    guessingStrategy: [
      'When a question asks which soil lets water pass fastest, lean toward the coarsest, most uniform particle size.',
      'When it asks which material holds water against gravity best, lean toward the finest particle size (clay).',
      'Deforestation or clear-cutting almost always increases runoff and decreases infiltration in these questions.',
    ],
    processOfElimination: [
      'Eliminate choices treating porosity and permeability as identical — a material can be porous without being permeable.',
      'Drop answers that pair "steep slope" with "maximum infiltration," or "impermeable material" with "maximum infiltration."',
      'Remove options claiming fine clay has the greatest permeability — it has the greatest capillarity, not permeability.',
    ],
    timeManagement: [
      'Soil-comparison questions are quick once you\'ve fixed the coarse-vs-fine relationships above — apply them directly.',
      'Cross-section/water-table diagrams take longer to read; identify the water table line first before answering.',
    ],
  },

  'es-climatefactors': { // Climate Factors (split out of Climate & Atmosphere)
    mentalPrep: [
      'The main factors controlling regional climate: latitude, elevation, proximity to large water bodies, and ocean currents.',
      'Water\'s high specific heat means coastal areas have smaller annual temperature ranges than inland areas at the same latitude.',
      'Warm ocean currents raise coastal temperatures on the side of a continent they flow toward; cold currents lower them.',
    ],
    answeringTechniques: [
      'Climate-comparison questions: check latitude first (more direct sunlight near the equator), then adjust for elevation, water proximity, and currents.',
      'Rain-shadow questions: the windward side of a mountain is wetter (rising, cooling air); the leeward side is drier (descending, warming air).',
      'Ocean current questions: match warm currents to the routes flowing away from the equator, cold currents to routes flowing toward it.',
    ],
    guessingStrategy: [
      'Two locations at the same latitude with different climates → the answer usually involves ocean currents, elevation, or distance from the coast.',
      'A coastal city with a small annual temperature range vs. an inland city with a large one → specific heat of water is the explanation.',
      'Snow on a high-elevation peak near the equator → elevation, not latitude, is the climate factor at play.',
    ],
    processOfElimination: [
      'Eliminate choices claiming coastal areas have MORE extreme temperature swings than inland areas — it\'s the opposite.',
      'Drop answers that say latitude alone determines climate — elevation, ocean proximity, and currents all matter too.',
      'Remove options describing the leeward side of a mountain as wetter than the windward side.',
    ],
    timeManagement: [
      'Latitude-based reasoning is usually fastest — start there before considering secondary factors.',
      'Climate graph interpretation (temperature and precipitation bar graphs) — read both axes before answering.',
      'Multi-factor questions (elevation + currents + latitude all mentioned) take longer; address one factor at a time.',
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

  'es-hazards': { // Natural Hazards & Risk
    mentalPrep: [
      'Keep the vocabulary straight before anything else: hazard = the natural event/process; exposure = who/what is in its path; vulnerability = how much harm results; risk = all three combined.',
      'Remember hazard distribution isn\'t random — it maps onto plate boundaries (earthquakes, volcanoes), floodplains (flooding), and steep saturated slopes (landslides).',
      'Two identical-magnitude hazards can produce very different risk depending on population density and construction standards — the hazard didn\'t change, the exposure did.',
    ],
    answeringTechniques: [
      'When a question distinguishes hazard from risk, find the part of the stem describing exposure/vulnerability (people, buildings, land use) — that\'s the risk half.',
      'For mitigation-technology questions (early-warning systems, building codes), ask what specifically the technology buys: usually time to evacuate or resistance to damage, not prevention of the hazard itself.',
      'Cause-and-effect chains matter: match the specific trigger described (fault rupture, seafloor displacement, saturated slope) to its named hazard rather than a general "natural disaster" answer.',
    ],
    guessingStrategy: [
      'If the stem mentions a floodplain, coastline, or steep saturated slope, the correct answer is almost always the hazard tied to that specific setting (flood, tsunami, landslide) — not a generic one.',
      'Answers describing consequences of BOTH more people and weaker buildings are usually the risk-side answer; answers about the event itself are the hazard-side answer.',
      'When a technology choice is offered, the one that increases warning time or engineered resistance beats one that just sounds high-tech.',
    ],
    processOfElimination: [
      'Eliminate choices that treat hazard and risk as interchangeable — they measure two different things.',
      'Drop answers claiming a location with zero natural hazards can still have hazard-driven risk — risk requires a hazard to begin with.',
      'Remove choices reversing cause and effect (e.g. saying dense population causes earthquakes, rather than increasing their risk).',
    ],
    timeManagement: [
      'Vocabulary-precision questions (lahar vs. caldera vs. fumarole, hazard vs. risk) are fast recall once the definitions are solid — answer those first.',
      'Plate-boundary-to-hazard reasoning questions take a moment to trace the mechanism; don\'t rush past the setup.',
      'Mitigation/technology questions are usually straightforward "what does this actually protect against" — don\'t overthink them.',
    ],
  },

  'es-climchange': { // Global Climate Change
    mentalPrep: [
      'Separate the mechanism (greenhouse effect — natural and necessary) from the trend (enhanced/human-driven warming from added CO₂) before answering anything.',
      'Know the two big feedback ideas: ice-albedo (less ice → more absorbed sunlight → more warming) and thermal expansion + land-ice melt driving sea-level rise.',
      'Keep proxy data straight: ice cores, tree rings, and sediment layers all record past temperature/precipitation in their thickness or composition — that\'s how we know about climate before direct measurements.',
    ],
    answeringTechniques: [
      'Rate-of-change questions are the exam\'s favorite way to test human vs. natural causation: natural cycles (Milankovitch) act over tens of thousands of years; the recent CO₂/temperature rise happened in about a century.',
      'Mitigation vs. adaptation: mitigation reduces the CAUSE (cutting emissions); adaptation adjusts to the EFFECT (sea walls, drought-resistant crops). Ask which one the choice targets.',
      'Ocean acidification questions: trace the chain — CO₂ dissolves in seawater → forms carbonic acid → lowers pH. Don\'t confuse it with warming, a separate (related) effect of the same excess CO₂.',
    ],
    guessingStrategy: [
      'If a question is really about the RATE of change rather than whether change happens at all, human causation is almost always the intended answer.',
      'When a strategy reduces emissions or fossil fuel use, it\'s mitigation; when it helps people/systems cope with a changed climate, it\'s adaptation.',
      'Melting SEA ice barely changes sea level (it displaces its own weight already); melting LAND ice (glaciers, ice sheets) does — watch for that distinction.',
    ],
    processOfElimination: [
      'Eliminate choices citing the ozone layer or UV protection when the question is about heat-trapping gases — those are different phenomena.',
      'Drop answers that reverse the ice-albedo feedback (claiming ice absorbs more sunlight than open water — it\'s the opposite).',
      'Remove choices treating a single volcanic eruption or a short-term weather event as evidence for or against long-term climate trends.',
    ],
    timeManagement: [
      'Vocabulary questions (greenhouse effect, mitigation vs. adaptation, proxy data) are fast recall — answer those first.',
      'Cause-and-rate reasoning questions (why is this human-caused, not natural) take a moment to reconstruct the timescale argument; don\'t skip that step under time pressure.',
      'Feedback-loop questions (ice-albedo, sea-level rise) reward drawing the chain of cause and effect rather than guessing from memory.',
    ],
  },
}
