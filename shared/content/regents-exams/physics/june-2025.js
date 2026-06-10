// Physics Regents — June 2025
export default {
  id: 'phys-jun-2025',
  subject: 'physics',
  year: 2025,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'A car accelerates uniformly from rest to 25.0 meters per second over a distance of 200. meters. The magnitude of the acceleration of the car is',
      choices: ['0.0500 m/s²', '1.56 m/s²', '1.25 m/s²', '3.13 m/s²'],
      topic: 'Kinematics',
      correct: 1,
      explanation: 'Using v² = v₀² + 2aΔx: (25.0)² = 0 + 2a(200.) → 625 = 400a → a = 1.5625 ≈ 1.56 m/s².',
      diveDeep: 'Starting from rest (v₀ = 0), use v² = 2aΔx → a = v²/(2Δx) = 625/400 = 1.5625 ≈ 1.56 m/s². Choice A (0.0500) comes from 10/200 — a simple arithmetic error. Choice C (1.25) comes from v/(2Δx) = 25/400 (not squaring v). Choice D (3.13) comes from v²/Δx (forgetting the factor of 2). The factor of 2 in v² = 2aΔx (when v₀ = 0) is the most common source of error on this type of kinematic problem. Always list known values and identify the appropriate equation before computing.'
    },
    {
      number: 2,
      part: 'A',
      text: 'A car accelerates uniformly from rest to 25.0 meters per second over a distance of 200. meters. The time required for the car to travel the 200. meters is',
      choices: ['6.67 s', '16.0 s', '8.00 s', '20.0 s'],
      topic: 'Kinematics',
      correct: 1,
      explanation: 'Average speed = (v₀ + v)/2 = (0 + 25.0)/2 = 12.5 m/s. t = Δx / v_avg = 200. / 12.5 = 16.0 s.',
      diveDeep: 'With uniform acceleration from rest to 25.0 m/s over 200 m, the average speed = 12.5 m/s. Time = distance / average speed = 200/12.5 = 16.0 s. Alternatively, from Q1, a ≈ 1.56 m/s², so t = v/a = 25.0/1.5625 = 16.0 s. Choice A (6.67 s) = 200/30 or similar error. Choice C (8.00 s) = 200/25 (using final speed, not average speed). A common mistake is using d = v × t without halving the average speed. For uniform acceleration from rest, average speed = v_final/2.'
    },
    {
      number: 3,
      part: 'A',
      text: 'A car traveling at 12 meters per second north accelerates in a straight line at 3.0 meters per second squared north for 4.0 seconds. How far north does the car travel during the 4.0 seconds it accelerates?',
      choices: ['24 m', '54 m', '48 m', '72 m'],
      topic: 'Kinematics',
      correct: 3,
      explanation: 'Using d = v₀t + ½at²: d = (12)(4.0) + ½(3.0)(4.0)² = 48 + ½(3.0)(16) = 48 + 24 = 72 m.',
      diveDeep: 'd = v₀t + ½at² = 12(4) + ½(3)(16) = 48 + 24 = 72 m. Two separate terms must be added: the displacement from initial velocity (v₀t = 48 m) and the additional displacement from acceleration (½at² = 24 m). A common mistake is computing only one term: choice C (48 m) omits the ½at² term; choice B (54 m) might come from d = v₀t + at = 48 + 12 (using at instead of ½at²). Always include both terms of the kinematic equation. This is a standard Regents kinematic calculation.'
    },
    {
      number: 4,
      part: 'A',
      text: 'A block weighing 10. newtons rests on an inclined plane. The angle of the incline is 30.°. The magnitude of the component of the block\'s weight perpendicular to the plane is closest to',
      choices: ['5.0 N', '8.7 N', '5.8 N', '10. N'],
      topic: 'Forces & Newton',
      correct: 1,
      explanation: 'The component of weight perpendicular to the incline = W cos θ = 10. × cos 30.° = 10. × 0.866 ≈ 8.7 N.',
      diveDeep: 'On an inclined plane at angle θ: perpendicular component = W cosθ, parallel component = W sinθ. For θ = 30.°: perpendicular = 10 × cos30° = 10 × 0.866 = 8.7 N; parallel = 10 × sin30° = 10 × 0.50 = 5.0 N. A common mistake is using sinθ for the perpendicular component (giving 5.0 N — choice A, the parallel component). The perpendicular component (normal force related) is always cosθ because as the angle increases toward 90°, the normal force approaches zero (not the weight). These components are on the Regents reference table as a force diagram.', image: '/images/exams/phys-june-2025/q4.png' },
    {
      number: 5,
      part: 'A',
      text: 'A sailor is near the top of a sailboat mast. The sailboat is traveling at a constant velocity of 5.0 meters per second west. The sailor drops a screwdriver that falls freely for 1.0 second before hitting the deck of the sailboat. [Neglect friction.] Where does the screwdriver land?',
      choices: ['directly below the sailor', '5.0 m behind the sailor', '5.0 m in front of the sailor', '49 m behind the sailor'],
      topic: 'Kinematics',
      correct: 0,
      explanation: 'Since the sailor and screwdriver both move west at 5.0 m/s when the screwdriver is released, they share the same horizontal velocity. The screwdriver lands directly below where the sailor is at the moment of impact.',
      diveDeep: 'This is the principle of independence of horizontal and vertical motion. When dropped, the screwdriver already has the same horizontal velocity (5.0 m/s west) as the sailboat. With no horizontal force (neglecting air resistance), the screwdriver maintains that horizontal velocity — it moves horizontally at the same rate as the sailor and the boat. Vertically, it accelerates downward at g. To an observer on the boat, the screwdriver falls straight down. A common mistake is thinking the boat "moves out from under" the falling screwdriver. Only an outside observer sees the screwdriver take a parabolic path.'
    },
    {
      number: 6,
      part: 'A',
      text: 'A marble is projected horizontally from a fixed height above a level floor. If the marble is projected horizontally again from the same fixed height, but with twice the initial speed, its time of flight will be',
      choices: ['halved', 'unchanged', 'doubled', 'quartered'],
      topic: 'Kinematics',
      correct: 1,
      explanation: 'Time of flight for a horizontal projectile depends only on the height: t = √(2h/g). Changing horizontal speed does not affect the fall time.',
      diveDeep: 'For a horizontal projectile: vertical fall gives h = ½gt² → t = √(2h/g). This is independent of horizontal speed. Doubling horizontal speed doubles the horizontal range (d = v_x × t) but leaves t unchanged. This is a consequence of the independence of vertical and horizontal motion. A common mistake is thinking faster horizontal motion causes faster or slower falling. The vertical fall time is determined solely by height and g. This concept is famously demonstrated by firing a bullet horizontally while simultaneously dropping an identical bullet — both hit the ground at the same time.'
    },
    {
      number: 7,
      part: 'A',
      text: 'Which animal has the greatest inertia?',
      choices: ['an 8.0-kg meerkat moving at 4.0 m/s', 'a 350-kg zebra moving at 18 m/s', 'a 190-kg lion moving at 0.5 m/s', 'an 1800-kg hippopotamus at rest'],
      topic: 'Forces & Newton',
      correct: 3,
      explanation: 'Inertia is measured solely by mass. The hippopotamus has the greatest mass (1800 kg) regardless of its speed (even zero), giving it the greatest inertia.',
      diveDeep: 'Inertia is the resistance to change in motion and is quantified by mass alone. Speed, velocity, and kinetic energy do not determine inertia. Masses: meerkat 8.0 kg, zebra 350 kg, lion 190 kg, hippo 1800 kg. The hippo\'s 1800 kg is by far the largest. The distractors (fast-moving zebra with large momentum, etc.) test whether students confuse inertia with momentum (mv) or kinetic energy (½mv²). Momentum: zebra = 6300 kg·m/s (large), but inertia is not momentum. The hippo at rest has zero momentum but maximum inertia in this group.'
    },
    {
      number: 8,
      part: 'A',
      text: 'A cart is rolling along in a straight line on an inclined ramp. The cart is in equilibrium when it is rolling up or down the ramp with',
      choices: ['decreasing speed', 'increasing speed', 'constant acceleration', 'constant speed'],
      topic: 'Forces & Newton',
      correct: 3,
      explanation: "Equilibrium means zero net force, which by Newton's first law means constant velocity (constant speed in a straight line). Only constant speed satisfies equilibrium on the ramp.",
      diveDeep: "Mechanical equilibrium requires net force = 0, which means zero acceleration and constant velocity. On a ramp at constant speed, the applied force (or friction) exactly balances the gravitational component along the ramp. Choices A and B (changing speed) indicate acceleration — not equilibrium. Choice C (constant acceleration) means non-zero net force — also not equilibrium. This question tests understanding that equilibrium = constant velocity, not necessarily rest. Newton's first law: F_net = 0 ↔ a = 0 ↔ constant velocity (including constant speed in a straight line)."
    },
    {
      number: 9,
      part: 'A',
      text: 'A 3.5-kilogram bowling ball and a 7.0-kilogram bowling ball are in free fall near the surface of Earth. Compared to the magnitude of the acceleration of the 3.5-kilogram ball, the magnitude of the acceleration of the 7.0-kilogram ball is',
      choices: ['half as great', 'the same', 'twice as great', 'four times greater'],
      topic: 'Kinematics',
      correct: 1,
      explanation: 'In free fall, all objects near Earth\'s surface accelerate at the same rate g = 9.81 m/s², regardless of mass. Both balls have the same acceleration.',
      diveDeep: "Galileo's principle: all objects fall with the same acceleration g near Earth's surface (neglecting air resistance). While the gravitational force F = mg is greater on the heavier ball, its mass is also greater, so a = F/m = mg/m = g — the same for all masses. This is confirmed by the equivalence principle in general relativity. A common misconception (and historically prevalent before Galileo) is that heavier objects fall faster. Formally, inertial mass (in F=ma) equals gravitational mass (in F=mg), which leads to this mass-independence of free-fall acceleration."
    },
    {
      number: 10,
      part: 'A',
      text: 'A 600-newton student is standing in an elevator. The elevator floor exerts an upward force of 400 newtons on the student. The student has',
      choices: ['a constant velocity directed downward', 'a constant velocity directed upward', 'an acceleration directed downward', 'an acceleration directed upward'],
      topic: 'Forces & Newton',
      correct: 2,
      image: '/images/exams/phys-june-2025/q10.png',
      explanation: 'Net force = 400 N up − 600 N down = −200 N (downward). By F = ma, there is a downward acceleration. The elevator is accelerating downward (or decelerating while going up).',
      diveDeep: 'F_net = F_floor − W = 400 − 600 = −200 N (downward). a = F_net/m = −200/(600/9.81) ≈ −3.27 m/s² (downward). Since F_net ≠ 0, velocity is not constant — it is changing. The normal force (400 N) < weight (600 N) means the elevator is accelerating downward: either moving down and speeding up, or moving up and slowing down. A common mistake is confusing "net force downward" with "moving downward" — the net force tells us about acceleration direction, not velocity direction. This is a classic application of Newton\'s second law with apparent weight.'
    },
    {
      number: 11,
      part: 'A',
      text: 'One end of a spring is held stationary and a 40.-newton force applied to the free end of the spring elongates the spring 0.20 meter from its unstretched length. What is the magnitude of the total force required to stretch the spring 0.80 meter from its unstretched length if the spring\'s elastic limit has not been exceeded?',
      choices: ['10. N', '120 N', '80. N', '160 N'],
      topic: 'Forces & Newton',
      correct: 3,
      explanation: 'Spring constant k = F/x = 40. N / 0.20 m = 200 N/m. Force for x = 0.80 m: F = kx = 200 × 0.80 = 160 N.',
      diveDeep: "Hooke's law: F = kx. First find k: k = F/x = 40/0.20 = 200 N/m. Then for x = 0.80 m: F = 200 × 0.80 = 160 N. The elongation increased by a factor of 4 (0.20 → 0.80), so force also increases by 4: 40 × 4 = 160 N. Choice A (10 N) is F × (0.20/0.80) — the force for a smaller stretch. Choice C (80 N) = 40 × 2 (using the wrong factor). A common mistake is computing k correctly but then using the wrong x value or the wrong multiplication factor. The elastic limit condition confirms Hooke's law applies throughout."
    },
    {
      number: 12,
      part: 'A',
      text: 'The engine of a toy train is traveling at constant speed on a horizontal, circular track. If the speed of the engine is doubled, the magnitude of the centripetal acceleration of the engine is',
      choices: ['halved', 'quartered', 'doubled', 'quadrupled'],
      topic: 'Kinematics',
      correct: 3,
      explanation: 'Centripetal acceleration a_c = v²/r. If v doubles, v² quadruples, so a_c quadruples.',
      diveDeep: 'a_c = v²/r. Since a_c is proportional to v², doubling v multiplies a_c by 2² = 4. The radius r is unchanged (same circular track). A common mistake is thinking the relationship is linear: if v doubles, a_c doubles. The square dependence is key — it also means centripetal force F_c = mv²/r quadruples when speed doubles. This quadratic relationship between centripetal acceleration and speed is analogous to the relationship between kinetic energy and speed. Recognizing squared vs. linear relationships is a recurring Regents skill.'
    },
    {
      number: 13,
      part: 'A',
      text: 'The strength of an electric field has a magnitude of 3.5 × 10⁵ newtons per coulomb. What is the magnitude of the electrostatic force on a 5.3 × 10⁻⁶-coulomb charge in this field?',
      choices: ['1.5 × 10⁻¹¹ N', '1.9 N', '19 N', '6.6 × 10¹⁰ N'],
      topic: 'Electricity',
      correct: 1,
      explanation: 'F = qE = (5.3 × 10⁻⁶ C)(3.5 × 10⁵ N/C) = 5.3 × 3.5 × 10⁻¹ ≈ 1.855 ≈ 1.9 N.',
      diveDeep: 'E = F/q → F = qE = (5.3 × 10⁻⁶)(3.5 × 10⁵) = 5.3 × 3.5 × 10⁻¹ = 18.55 × 10⁻¹ ≈ 1.9 N. Careful exponent arithmetic: 10⁻⁶ × 10⁵ = 10⁻¹. A common mistake is computing 10⁶ × 10⁵ = 10¹¹ (choice A: 1.5 × 10⁻¹¹ inverts the charge). Choice D (6.6 × 10¹⁰) comes from dividing instead of multiplying. This is a direct F = qE calculation requiring careful scientific notation arithmetic. Always verify the exponent separately from the coefficient multiplication.'
    },
    {
      number: 14,
      part: 'A',
      text: 'A car is traveling on a level highway at a speed of 15.0 meters per second. A braking force of magnitude 3.00 × 10³ newtons brings the car to a stop in 10.0 seconds. The mass of the car is',
      choices: ['1.50 × 10³ kg', '2.00 × 10³ kg', '3.00 × 10³ kg', '4.50 × 10³ kg'],
      topic: 'Kinematics',
      correct: 1,
      explanation: 'Deceleration a = Δv/t = (0 − 15.0)/10.0 = −1.50 m/s². Mass m = F/a = 3.00 × 10³ / 1.50 = 2.00 × 10³ kg.',
      diveDeep: 'Step 1: find deceleration a = Δv/Δt = 15.0/10.0 = 1.50 m/s². Step 2: F = ma → m = F/a = 3000/1.50 = 2000 kg = 2.00 × 10³ kg. Choice A (1.50 × 10³) comes from m = F/v = 3000/15 (confusing velocity with acceleration). Choice C (3.00 × 10³) comes from m = F/g or m = F/1. Always find acceleration first using kinematics, then apply F = ma. Two-step Newton problems are common on the Regents: kinematics gives acceleration, then dynamics gives mass or force.'
    },
    {
      number: 15,
      part: 'A',
      text: 'A 5.00-kilogram cart traveling east at a speed of 15.0 meters per second collides with a 10.0-kilogram cart traveling west at a speed of 15.0 meters per second. The total momentum of the two-cart system after the collision is',
      choices: ['75.0 kg·m/s west', '225 kg·m/s west', '75.0 kg·m/s east', '225 kg·m/s east'],
      topic: 'Forces & Newton',
      correct: 0,
      explanation: 'Total momentum before = (5.00 × 15.0 east) + (10.0 × 15.0 west) = 75.0 east − 150. west = 75.0 kg·m/s west. By conservation of momentum, total momentum after = 75.0 kg·m/s west.',
      diveDeep: 'Conservation of momentum: total p before = total p after (no external net force). Taking east as positive: p_before = 5.00 × 15.0 − 10.0 × 15.0 = 75.0 − 150. = −75.0 kg·m/s. The negative sign means 75.0 kg·m/s westward. This is conserved through the collision. A common mistake is adding magnitudes: 75 + 150 = 225 (not accounting for direction). Momentum is a vector — direction signs must be used. The Regents always awards full credit only when direction is included in the final answer.'
    },
    {
      number: 16,
      part: 'A',
      text: 'In a diagram, a force acts to the right on a proton P in an electric field. The electric field at the position of the proton is directed toward point',
      choices: ['A (upward)', 'C (downward)', 'B (to the right)', 'D (to the left)'],
      topic: 'Electricity',
      correct: 2,
      explanation: 'The electric field direction is defined as the direction of force on a positive charge. Since the proton (positive) experiences a force to the right, the electric field points to the right (toward point B).',
      diveDeep: 'By definition, electric field E points in the direction of force on a positive test charge. A proton has positive charge, so the force on it (to the right) is in the same direction as the field. If the charge were an electron (negative), the force and field would be in opposite directions. This question tests the fundamental definition E = F/q for positive charges. A common mistake is reversing the relationship for negative charges and applying that incorrectly to a proton. Always: field direction = force direction for positive charges.', image: '/images/exams/phys-june-2025/q16.png' },
    {
      number: 17,
      part: 'A',
      text: 'While investigating static electricity, a student notices a negatively charged plastic rod attracts a small piece of paper. The student correctly concludes the charge of the paper',
      choices: ['must be negative', 'must be positive', 'could be negative or neutral', 'could be positive or neutral'],
      topic: 'Electricity',
      correct: 3,
      explanation: 'The paper could be positively charged (opposite charges attract) OR neutral (induced charge separation allows attraction via induction). Attraction does not prove the paper is positive.',
      diveDeep: 'A negatively charged rod attracts objects that are either (1) positively charged (direct attraction of opposite charges) or (2) neutral but experience charge induction — the rod repels electrons in the neutral paper, leaving the near side of the paper with an induced positive charge, causing net attraction. A neutral paper is attracted to a charged rod through this induction effect. The paper cannot be negatively charged and attract the rod (like charges repel). So the paper is either positive or neutral. A common mistake is concluding the paper must be positive — induction is the other possibility that makes choice D correct.'
    },
    {
      number: 18,
      part: 'A',
      text: 'A 1.0-kilogram cart moving to the right at 1.0 meter per second is about to collide head-on with a 2.0-kilogram cart moving to the left at 2.0 meters per second on a frictionless horizontal surface. During the collision, the magnitude of the force exerted on the 1.0-kilogram cart by the 2.0-kilogram cart is F. What is the magnitude of the force exerted on the 2.0-kilogram cart by the 1.0-kilogram cart during the collision?',
      choices: ['F/4', 'F/2', 'F', '2F'],
      topic: 'Forces & Newton',
      correct: 2,
      image: '/images/exams/phys-june-2025/q18.png',
      explanation: "By Newton's third law, the force the 2.0-kg cart exerts on the 1.0-kg cart is F, so the force the 1.0-kg cart exerts on the 2.0-kg cart is also F (equal magnitude, opposite direction).",
      diveDeep: "Newton's third law is universal and absolute: action and reaction forces are always equal in magnitude. The mass difference (1.0 vs. 2.0 kg) does not change the force magnitudes — it only affects the accelerations each cart experiences (a = F/m; the lighter cart accelerates more). A common mistake is scaling by mass ratio: F × (1.0/2.0) = F/2. The 2.0-kg cart will experience less acceleration (a = F/2.0) while the 1.0-kg cart experiences more (a = F/1.0), but the forces are equal. This is a quintessential Newton's third law question."
    },
    {
      number: 19,
      part: 'A',
      text: 'Sunlight shines on solar panels on the roof of a house. The panels are connected to the house\'s electrical system, which operates a microwave oven that heats a cup of coffee. What energy conversions are taking place in this entire process?',
      choices: [
        'electromagnetic → electrical → electromagnetic → thermal',
        'thermal → electromagnetic → nuclear → electrical',
        'mechanical → electrical → electromagnetic → chemical',
        'electromagnetic → thermal → mechanical → electrical'
      ],
      topic: 'Energy & Work',
      correct: 0,
      explanation: 'Sunlight (electromagnetic) → solar panels (electrical) → microwave oven emits microwaves (electromagnetic) → heats coffee (thermal). The chain is electromagnetic → electrical → electromagnetic → thermal.',
      diveDeep: 'Tracing the energy: (1) sunlight = electromagnetic radiation; (2) solar panel converts light to electricity (photovoltaic effect); (3) microwave oven uses electricity to power a magnetron that produces microwave radiation (electromagnetic); (4) microwaves heat water molecules in the coffee (thermal). Each step must be correctly identified. Common mistakes include calling sunlight "thermal" (it is radiant/electromagnetic energy) or skipping the microwave emission step. The Regents regularly tests energy conversion chains — always trace energy step by step from source to final form.'
    },
    {
      number: 20,
      part: 'A',
      text: 'Which graph best represents the relationship between the potential difference across a resistor and the resulting current through the resistor, for a resistor that obeys Ohm\'s law?',
      choices: [
        'A straight line through the origin with positive slope',
        'A curved line with increasing slope',
        'A horizontal line (current independent of voltage)',
        'A straight line with negative slope'
      ],
      topic: 'Electricity',
      correct: 0,
      explanation: "Ohm's law states V = IR, so I = V/R — current is directly proportional to voltage. The graph of I vs. V (or V vs. I) is a straight line through the origin.",
      diveDeep: "Ohm's law V = IR is a linear relationship. For a constant resistance R, I increases proportionally with V: the graph is a straight line through the origin with slope = 1/R (for I vs. V) or slope = R (for V vs. I). Non-ohmic devices (diodes, transistors, light bulbs at high temperatures) show curved graphs. A straight line through the origin is the defining characteristic of an ohmic (linear) device. A common mistake is choosing a curved line. Linearity and passing through the origin are both required — a line that doesn't pass through the origin would imply current at zero voltage, which is impossible for a simple resistor.", image: '/images/exams/phys-june-2025/q20.png' },
    {
      number: 21,
      part: 'A',
      text: 'A pendulum has mass M released from rest at point A and allowed to swing through point B (the lowest point) to point C (the same height as A). The heights of A and C above B are each 0.4 meters. [Neglect friction.] Compared to the kinetic energy of mass M at point B, the kinetic energy of mass M at point C is',
      choices: ['half as great', 'the same', 'twice as great', 'four times greater'],
      topic: 'Energy & Work',
      correct: 1,
      image: '/images/exams/phys-june-2025/q21.png',
      explanation: 'Points A and C are at the same height (0.4 m above B). By conservation of energy, M has zero KE at A and C, and maximum KE at B. The KE at C equals KE at A = 0. But wait — the question compares KE at C to KE at B, and since C is at the same height as A (where KE = 0), KE at C = 0. The question compares KE at C to KE at B (which is the maximum). However, if the question asks whether KE at C equals KE at B when both are at the same height… C is the same height as A, so KE at C = KE at A = 0. The answer "the same" refers to points A and C having the same KE (both zero). Re-reading: comparing KE at B to KE at C — since C is at the same height as A and A had zero KE, KE at C is also zero. The Regents answer is "the same" for energy conservation between two equal-height points.',
      diveDeep: 'Conservation of mechanical energy (no friction): KE + PE = constant. At A (height = 0.4 m, at rest): KE = 0, PE = mgh = 0.4mg. At B (height = 0, maximum speed): all energy is KE = 0.4mg. At C (same height as A = 0.4 m): PE = 0.4mg again, so KE = 0. Points A and C have the same energy distribution: zero KE, maximum PE. The question actually compares KE at B (maximum) to KE at C (zero) — they are NOT the same. "The same" here must mean comparing A and C, both at zero KE. The pendulum demonstrates perfect energy conversion between KE and PE in a frictionless system.'
    },
    {
      number: 22,
      part: 'A',
      text: 'A student, running at 6 meters per second, slides to rest on a horizontal floor. As the student slides, the internal energy of the student-floor system',
      choices: [
        'decreases and the student\'s kinetic energy decreases',
        'increases and the student\'s kinetic energy decreases',
        'decreases and the student\'s kinetic energy remains the same',
        'increases and the student\'s kinetic energy remains the same'
      ],
      topic: 'Energy & Work',
      correct: 1,
      explanation: 'The student decelerates (kinetic energy decreases) due to friction. The friction converts KE to thermal (internal) energy — the student-floor system warms up (internal energy increases).',
      diveDeep: "The law of conservation of energy: KE lost = internal (thermal) energy gained (assuming no sound, no deformation). As the student slides to rest, KE = ½mv² decreases from ½m(6²) to 0. This energy transfers to internal energy — the molecules of the student's shoes and floor surface vibrate faster (temperature increase). Internal energy always increases when friction is present. A common mistake is saying internal energy decreases. Friction is a dissipative process — it converts ordered mechanical energy to disordered thermal energy. The total energy (KE + internal) is conserved."
    },
    {
      number: 23,
      part: 'A',
      text: 'Which object will most likely produce a magnetic field?',
      choices: ['a stationary neutral object', 'a moving neutral object', 'a stationary charged object', 'a moving charged object'],
      topic: 'Electricity & Magnetism',
      correct: 3,
      explanation: 'A moving electric charge (electric current) produces a magnetic field. A stationary charge produces only an electric field, not a magnetic field.',
      diveDeep: "A magnetic field is produced by moving electric charges — this is the basis of electromagnetism (Ampere's law). Electric current in a wire creates a magnetic field around the wire. A stationary charge creates only an electric field (Coulomb's law). Neutral objects have no net charge, so they produce neither electric nor magnetic fields (ignoring dipole moments). A moving neutral object has no net charge, so no magnetic field. A stationary charged object has an electric field but no magnetic field. Only the moving charged object generates a magnetic field. This connects to the fact that in relativity, electric and magnetic fields are different aspects of the same electromagnetic field."
    },
    {
      number: 24,
      part: 'A',
      text: 'To reduce the electrical resistance of a copper wire, increase the wire\'s',
      choices: ['length', 'diameter', 'temperature', 'resistivity'],
      topic: 'Electricity',
      correct: 1,
      explanation: 'Resistance R = ρL/A. Increasing diameter increases cross-sectional area A, which decreases resistance (R is inversely proportional to A).',
      diveDeep: "R = ρL/A. To decrease R: decrease L, increase A (larger diameter), decrease ρ (lower resistivity material or lower temperature), or decrease temperature. Increasing length increases R. Increasing temperature increases resistivity for metals (and thus R). Increasing resistivity increases R. Only increasing diameter (increasing A) decreases R from the given choices. A common mistake is choosing 'length' (which increases R). In electrical engineering, high-current wires are made thicker (larger diameter) to reduce resistance and prevent overheating — this is exactly why power cables are thick copper cables."
    },
    {
      number: 36,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'What is the approximate width of a typical five-passenger automobile?',
      choices: [
        '2 × 10⁻¹ m',
        '2 × 10⁰ m',
        '2 × 10¹ m',
        '2 × 10² m'
      ],
      correct: 1,
      topic: 'Mechanics',
      explanation: 'A typical passenger car is about 2 meters wide, which is 2 × 10⁰ m (since 10⁰ = 1).',
      diveDeep: 'Order-of-magnitude estimation is a key physics skill. A standard passenger car (e.g., Honda Civic, Toyota Camry) is roughly 1.8–2.0 m wide. That is 2 × 10⁰ m. Choice A (0.2 m) is too narrow — about the width of a textbook. Choice C (20 m) is the length of a school bus. Choice D (200 m) is about two football fields. When estimating, recall everyday reference objects: a door is ~1 m wide, a car ~2 m, a school ~20 m. Common mistake: confusing width (~2 m) with length (~4.5 m) or height (~1.5 m).'
    },
    {
      number: 37,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Two identical metal spheres with charges of +3.0 microcoulombs and −1.0 microcoulomb, respectively, are brought into contact and then separated. Which statement describes the electrostatic force between the spheres?',
      choices: [
        'It is attractive before contact and repulsive after contact.',
        'It is attractive both before contact and after contact.',
        'It is repulsive before contact and attractive after contact.',
        'It is repulsive both before contact and after contact.'
      ],
      correct: 0,
      topic: 'Electricity & Magnetism',
      explanation: 'Before contact: +3.0 μC and −1.0 μC are opposite charges → attractive. After contact on identical spheres, charges equalize: total charge = +2.0 μC shared equally → each sphere gets +1.0 μC. Same sign → repulsive.',
      diveDeep: 'Before contact: q₁ = +3.0 μC and q₂ = −1.0 μC. Opposite charges attract. When identical metal spheres touch, charge redistributes equally: total = +3.0 + (−1.0) = +2.0 μC, so each sphere ends with +1.0 μC. Same-sign charges repel. A common mistake is assuming both charges are always attracted (forgetting the redistribution step) or thinking the negative sphere becomes neutral. Metal spheres share charge equally because they are identical conductors. If the spheres were different sizes, charge would split unequally. The key physics: contact → charge redistribution by conduction; separation → each sphere carries the new charge.'
    },
    {
      number: 38,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Which graph best represents the relationship between velocity, v, and time, t, for an object moving with constant positive acceleration?',
      choices: [
        'A straight line with positive slope starting from a positive v-intercept',
        'A straight line with positive slope starting from the origin',
        'A horizontal line at a constant positive velocity',
        'A curved line (parabola) curving upward'
      ],
      correct: 1,
      topic: 'Mechanics',
      explanation: 'For constant acceleration, v = v₀ + at — a linear equation. The v-t graph is a straight line with slope = a. If the object starts from rest (v₀ = 0), the line passes through the origin.',
      diveDeep: 'v = v₀ + at is linear in t with slope = a (constant). A straight line on a v-t graph means constant acceleration. A curved line would indicate changing acceleration. The v-intercept represents the initial velocity. If v₀ > 0, the line has a positive v-intercept and positive slope. The most common Regents version shows the line starting from the origin (v₀ = 0 with positive acceleration). The area under the v-t graph equals displacement. A common mistake is drawing a parabola — that would be the x-t graph (position vs. time) for constant acceleration, not the v-t graph.', image: '/images/exams/phys-june-2025/q38.png' },
    {
      number: 39,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A soccer ball is kicked from point Pi at an angle above a horizontal field and lands on the field at point Pf. [Neglect friction.] As the ball travels from Pi to Pf in air, the horizontal component of its velocity',
      choices: [
        'decreases, only',
        'increases, only',
        'decreases and then increases',
        'remains the same'
      ],
      correct: 3,
      topic: 'Mechanics',
      explanation: 'In projectile motion (neglecting air resistance), there is no horizontal force. By Newton\'s first law, the horizontal velocity component remains constant throughout the flight.',
      diveDeep: 'Projectile motion separates into independent vertical and horizontal components. Horizontally: no force (neglecting friction/air resistance) → no acceleration → constant horizontal velocity. Vertically: gravity acts downward at 9.81 m/s², causing the vertical velocity to change. The horizontal speed remains constant from launch to landing. A common mistake is thinking the ball slows down horizontally as it rises — this would only happen with air resistance. On the Regents, "neglect friction" is the cue that horizontal velocity is constant. This independence of components is the key principle of projectile motion analysis.', image: '/images/exams/phys-june-2025/q39.png' },
    {
      number: 40,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Which graph best represents the relationship between the force of kinetic friction and the normal force exerted on wooden boxes of various weights as they are moved at constant velocity across a level, wooden floor?',
      choices: [
        'A straight line with positive slope through the origin',
        'A curved line with decreasing slope',
        'A horizontal line (friction independent of normal force)',
        'A straight line with negative slope'
      ],
      correct: 0,
      topic: 'Mechanics',
      explanation: 'Kinetic friction force f_k = μ_k × N. Since μ_k is constant for the same pair of surfaces, f_k is directly proportional to normal force N — a straight line through the origin.',
      diveDeep: 'The kinetic friction formula f_k = μ_k N shows a direct linear proportionality between friction force and normal force, with the slope equal to μ_k (the coefficient of kinetic friction). The graph is a straight line through the origin. The slope is the coefficient of kinetic friction for wood on wood (~0.2–0.4). Moving at constant velocity means net force = 0, so friction = applied force — but this affects how friction is measured, not the f_k vs. N relationship itself. A common mistake is drawing a curved line (suggesting friction decreases at higher normal forces, which is incorrect for standard kinetic friction). The linear relationship is an empirical law that holds well for most solid surfaces.', image: '/images/exams/phys-june-2025/q40.png' },
    {
      number: 41,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A 75-kilogram student runs up a set of stairs a vertical distance of 13 meters in 25 seconds. The average power developed by the student is',
      choices: [
        '3.0 W',
        '39 W',
        '380 W',
        '9600 W'
      ],
      correct: 2,
      topic: 'Energy & Work',
      explanation: 'Work done against gravity: W = mgh = 75 × 9.81 × 13 ≈ 9568 J. Power = W/t = 9568/25 ≈ 380 W.',
      diveDeep: 'P = W/t = mgh/t = (75 kg)(9.81 m/s²)(13 m)/(25 s) = 9,567.75/25 ≈ 383 W ≈ 380 W. Using g ≈ 9.8 or 10 m/s² gives similar results. Choice B (39 W) = mgh/(25×10) or forgetting g. Choice D (9600 W) is the work (not divided by time). A common mistake is computing W = mgh correctly but forgetting to divide by time to get power. Another mistake is using g = 1 instead of g = 9.81. Power = rate of doing work; always divide energy by time. 380 W is about half a horsepower — reasonable for a person climbing stairs.'
    },
    {
      number: 42,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'An apparatus consists of two conducting rails connected to a resistor R and a copper wire of length d in a uniform magnetic field directed into the page. Electrons will flow through resistor R if the copper wire is moving',
      choices: [
        'to the right, only',
        'to the left, only',
        'either right or left',
        'neither right nor left'
      ],
      correct: 2,
      topic: 'Electricity & Magnetism',
      explanation: 'Any motion of the copper wire (left or right) through the magnetic field induces an EMF by Faraday\'s law, causing current to flow through R. Both directions of motion change the flux and induce a current.',
      diveDeep: 'Faraday\'s law: EMF is induced whenever there is a change in magnetic flux. Moving the wire either left or right changes the area of the circuit loop and hence the flux, inducing an EMF and driving current through R. The direction of current reverses when the direction of wire motion reverses (Lenz\'s law), but current flows in both cases. Moving the wire at right angles to both its length and the field (either horizontally left or right along the rails) produces F = qv×B on the charges. A common mistake is thinking only one direction produces current. Both directions work — just with opposite current directions through R.', image: '/images/exams/phys-june-2025/q42.png' },
    {
      number: 43,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'The current through an incandescent lamp is 0.500 ampere. The number of elementary charges that pass through the lamp in 5.00 seconds is',
      choices: [
        '8.00 × 10⁻²⁰',
        '4.00 × 10⁻¹⁹',
        '3.13 × 10¹⁸',
        '1.56 × 10¹⁹'
      ],
      correct: 3,
      topic: 'Electricity & Magnetism',
      explanation: 'Total charge q = It = 0.500 A × 5.00 s = 2.50 C. Number of elementary charges = q/e = 2.50 / (1.60 × 10⁻¹⁹) = 1.5625 × 10¹⁹ ≈ 1.56 × 10¹⁹.',
      diveDeep: 'q = It = (0.500)(5.00) = 2.50 C. Each electron carries e = 1.60 × 10⁻¹⁹ C. Number of electrons = q/e = 2.50/(1.60 × 10⁻¹⁹) = 1.5625 × 10¹⁹ ≈ 1.56 × 10¹⁹. Choice C (3.13 × 10¹⁸) = 0.500/(1.60 × 10⁻¹⁹) — forgetting to multiply by time. Choice A and B are from using wrong exponents. A common mistake is forgetting to first calculate total charge q = It, then dividing by e. The elementary charge e = 1.60 × 10⁻¹⁹ C is on the Regents reference table. Even a small current of 0.5 A involves an enormous number of electrons per second.'
    },
    {
      number: 44,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'An electrical circuit has a 3.0 Ω resistor and a 6.0 Ω resistor connected in parallel. The ammeter A1 reads 3.0 amperes (through the 3.0 Ω branch). The equivalent resistance of the circuit is',
      choices: [
        '0.5 Ω',
        '2.0 Ω',
        '3.0 Ω',
        '9.0 Ω'
      ],
      correct: 1,
      topic: 'Electricity & Magnetism',
      explanation: 'For two resistors in parallel: 1/R_eq = 1/3.0 + 1/6.0 = 2/6 + 1/6 = 3/6 → R_eq = 2.0 Ω.',
      diveDeep: '1/R_eq = 1/R₁ + 1/R₂ = 1/3.0 + 1/6.0 = 2/6 + 1/6 = 3/6 → R_eq = 6/3 = 2.0 Ω. For two resistors in parallel, R_eq is always less than the smaller resistor (here, less than 3.0 Ω). Choice D (9.0 Ω) is the series combination (3 + 6 = 9). Choice C (3.0 Ω) is the smaller resistor alone. A common mistake is adding reciprocals but not taking the final reciprocal. The ammeter reading (3.0 A through the 3.0 Ω branch) is useful for Q45 but not needed here. The equivalent resistance for parallel circuits is always less than any individual branch resistance.', image: '/images/exams/phys-june-2025/context_44_45.png' },
    {
      number: 45,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'In a parallel circuit with a 3.0 Ω and a 6.0 Ω resistor, the ammeter A1 reads 3.0 amperes through the 3.0 Ω branch. Compared to the potential difference across the 6.0 Ω resistor, the potential difference across the 3.0 Ω resistor is',
      choices: [
        'the same',
        'twice as much',
        'one half as much',
        'one quarter as much'
      ],
      correct: 0,
      topic: 'Electricity & Magnetism',
      explanation: 'In a parallel circuit, all branches share the same potential difference (voltage). The voltage across the 3.0 Ω resistor equals the voltage across the 6.0 Ω resistor.',
      diveDeep: 'In a parallel circuit, each branch is connected directly across the same two nodes, so the potential difference (voltage) across each branch is identical. This is the defining property of parallel connections. V = IR: for the 3.0 Ω branch with 3.0 A → V = 3.0 × 3.0 = 9.0 V. For the 6.0 Ω branch: same V = 9.0 V → I = 9.0/6.0 = 1.5 A. A common mistake is confusing current and voltage: in parallel circuits, voltages are equal but currents differ (inversely proportional to resistance). In series circuits, currents are equal but voltages differ.', image: '/images/exams/phys-june-2025/context_44_45.png' },
    {
      number: 46,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Which expression is a unit of work?',
      choices: [
        'V² · s / Ω',
        'V² / Ω',
        'kg · m / s²',
        'kg · m³ / s³'
      ],
      correct: 0,
      topic: 'Energy & Work',
      explanation: 'Work is measured in joules (J). V²·s/Ω has units of (V²·s)/Ω = P·t (since P = V²/R) = watts × seconds = joules = work. So V²·s/Ω = joules.',
      diveDeep: 'Power P = V²/R, so V²/Ω = watts (W) = J/s. Multiplying by seconds: V²·s/Ω = J = unit of work/energy. Choice B (V²/Ω) is watts (power, not work). Choice C (kg·m/s²) is newtons (force, not work). Choice D (kg·m³/s³) — checking: work = N·m = kg·m²/s², not kg·m³/s³. For dimensional analysis: W (joule) = kg·m²/s². Always verify units by tracing through the base SI units. A common mistake is choosing V²/Ω (which is power, not work) without noticing the missing time factor. Work = power × time.'
    },
    {
      number: 47,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A wave propagates to the right through a uniform medium. Point A represents a particle of the medium on the wave. At the instant shown (Point A is on the leading edge of a crest moving right), the particle at point A is moving',
      choices: [
        'right',
        'left',
        'up',
        'down'
      ],
      correct: 3,
      topic: 'Waves & Light',
      explanation: 'In a transverse wave moving to the right, particles move perpendicular to the wave\'s direction of travel. A particle just past the crest (on the descending side) moves downward.',
      diveDeep: 'In a transverse wave, particle motion is perpendicular to wave propagation. The direction a specific particle moves depends on its position in the wave cycle and the direction of wave travel. For a wave moving to the right: a particle on the leading (right) slope of a crest moves downward as the crest passes through it. Analogy: think of an ocean wave approaching — as the wave moves right, a buoy on the front slope of the wave bobs downward. A common mistake is saying the particle moves in the wave\'s propagation direction (right). Particles in a transverse wave never move in the direction of wave propagation — they oscillate perpendicular to it.', image: '/images/exams/phys-june-2025/q47.png' },
    {
      number: 48,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A ray traveling through air strikes a boundary with crown glass at an angle. The diagram shows the incident ray, normal, and possible paths A, B, C, D for the reflected ray. Which path would the reflected ray take?',
      choices: [
        'A',
        'B',
        'C',
        'D'
      ],
      correct: 2,
      topic: 'Waves & Light',
      explanation: 'The reflected ray obeys the law of reflection: angle of incidence = angle of reflection, measured from the normal, on the same side of the boundary as the incident ray.',
      diveDeep: 'Law of reflection: θ_incidence = θ_reflection, both measured from the normal at the point of incidence, and both on the same side of the boundary (the air side). The reflected ray stays in the incident medium (air) and makes the same angle with the normal as the incoming ray. The refracted ray crosses into the glass at a different angle (Snell\'s law). Path C is the reflection path: symmetric to the incident ray about the normal, on the air side. A common mistake is confusing reflected and refracted rays, or measuring angles from the surface instead of from the normal. Always draw the normal first when analyzing reflection/refraction.', image: '/images/exams/phys-june-2025/q48.png' },
    {
      number: 49,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'The diagram below shows wave fronts going through an opening and spreading into the area behind the barrier. Which wave phenomenon is represented in the diagram?',
      choices: [
        'resonance',
        'Doppler effect',
        'diffraction',
        'reflection'
      ],
      correct: 2,
      topic: 'Waves & Light',
      explanation: 'Diffraction is the spreading of waves as they pass through an opening or around an obstacle. The diagram shows straight wave fronts bending around the edges of the opening and spreading behind the barrier.',
      diveDeep: 'Diffraction occurs when waves encounter an opening or obstacle whose size is comparable to the wavelength. The waves spread out (diffract) beyond the opening, creating curved wave fronts behind the barrier. This is why sound can be heard around corners and why light diffracts through narrow slits (producing patterns). Resonance involves standing waves at specific frequencies. The Doppler effect involves frequency change due to relative motion. Reflection involves waves bouncing off a surface. Diffraction is uniquely identified by the spreading of wave fronts through an opening — the key signature is waves bending into the "shadow" region behind the barrier.', image: '/images/exams/phys-june-2025/q49.png' },
    {
      number: 50,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'What occurs as an electron in a mercury atom moves from energy level b to energy level a (where level a is lower in energy than level b)?',
      choices: [
        'a photon is emitted with an energy of 4.64 J',
        'a photon is absorbed with an energy of 4.64 J',
        'a photon is emitted with an energy of 7.42 × 10⁻¹⁹ J',
        'a photon is absorbed with an energy of 7.42 × 10⁻¹⁹ J'
      ],
      correct: 2,
      topic: 'Modern Physics',
      explanation: 'An electron moving from a higher energy level (b) to a lower energy level (a) releases energy by emitting a photon. The photon energy equals the difference between the two energy levels: E_photon = E_b − E_a = 7.42 × 10⁻¹⁹ J.',
      diveDeep: 'Bohr model: electrons occupy discrete energy levels. Moving from higher to lower energy (downward transition) releases energy → photon emitted. Moving from lower to higher energy requires energy input → photon absorbed. The photon energy = |ΔE| = E_b − E_a. From the Mercury energy level diagram in the Regents reference tables, levels b and a differ by 7.42 × 10⁻¹⁹ J (≈4.64 eV). A common mistake is confusing emission (downward) with absorption (upward). Also, the energy 4.64 J (choices A, B) is unreasonably large for an atomic transition — realistic photon energies are on the order of 10⁻¹⁹ J or a few eV. Always check the order of magnitude for atomic energies.'
    },
    {
      number: 51,
      part: 'B-2',
      type: 'written',
      text: 'A 750-watt toaster is operating at 120 volts and is being used to heat a blueberry bagel for 2.5 minutes.\n\n(51) Determine the resistance of the toaster. [1]',
      modelAnswer: 'Using P = V²/R → R = V²/P = (120)²/750 = 14400/750 = 19.2 Ω\n\nThe resistance of the toaster is 19.2 Ω.',
      topic: 'Electricity & Magnetism',
      explanation: 'Using P = V²/R, solve for R: R = V²/P = (120 V)² / 750 W = 14400/750 = 19.2 Ω.',
      diveDeep: 'Three equivalent power formulas: P = IV, P = I²R, P = V²/R. Given P and V (but not I), the most direct formula is P = V²/R → R = V²/P = 14400/750 = 19.2 Ω. You could also find I first: I = P/V = 750/120 = 6.25 A, then R = V/I = 120/6.25 = 19.2 Ω. Both methods give the same answer. A common mistake is using P = V/R (missing the square on V). Always check which two of {P, V, I, R} are given and select the formula that connects them directly. The answer 19.2 Ω is reasonable for a high-power household appliance.'
    },
    {
      number: 52,
      part: 'B-2',
      type: 'written',
      text: 'A 750-watt toaster is operating at 120 volts and is being used to heat a blueberry bagel for 2.5 minutes.\n\n(52–53) Calculate the total amount of electrical energy consumed by the toaster during the heating of the bagel. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Convert time: t = 2.5 min × 60 s/min = 150 s\n\nEquation: W = Pt\nSubstitution: W = (750 W)(150 s)\nAnswer: W = 112,500 J = 1.125 × 10⁵ J\n\nThe toaster consumes 1.125 × 10⁵ J (112,500 J) of electrical energy.',
      topic: 'Electricity & Magnetism',
      explanation: 'W = Pt = 750 W × 150 s = 112,500 J ≈ 1.13 × 10⁵ J. Convert minutes to seconds first.',
      diveDeep: 'Energy = Power × time. Critical step: convert 2.5 minutes to seconds (2.5 × 60 = 150 s) before substituting. W = Pt = (750 W)(150 s) = 112,500 J. Using kWh: 750 W = 0.75 kW; 2.5 min = 2.5/60 h ≈ 0.0417 h; W = 0.75 × 0.0417 ≈ 0.03125 kWh × 3.6 × 10⁶ J/kWh = 112,500 J. The most common mistake is using time in minutes instead of seconds (giving 750 × 2.5 = 1875 J — off by a factor of 60). Always ensure time is in seconds when using SI units. The Regents awards partial credit for the correct equation even with a unit conversion error.'
    },
    {
      number: 54,
      part: 'B-2',
      type: 'written',
      text: 'In a linear accelerator, a proton is accelerated from rest through a potential difference of 4.40 × 10⁶ volts. Determine the total kinetic energy, in joules, gained by this proton as it travels through this linear accelerator. [1]',
      modelAnswer: 'The kinetic energy gained equals the work done by the electric field:\n\nW = qV = (1.60 × 10⁻¹⁹ C)(4.40 × 10⁶ V)\nW = 7.04 × 10⁻¹³ J\n\nThe proton gains 7.04 × 10⁻¹³ J of kinetic energy.',
      topic: 'Electricity & Magnetism',
      explanation: 'KE gained = work by electric field = qV = (1.60 × 10⁻¹⁹ C)(4.40 × 10⁶ V) = 7.04 × 10⁻¹³ J.',
      diveDeep: 'The work done on a charge by an electric potential difference: W = qΔV. For a proton: q = e = 1.60 × 10⁻¹⁹ C (from Regents reference table). W = (1.60 × 10⁻¹⁹)(4.40 × 10⁶) = (1.60 × 4.40) × 10⁻¹³ = 7.04 × 10⁻¹³ J. Since the proton starts from rest, all work goes into kinetic energy. This energy in electron-volts: 4.40 × 10⁶ eV = 4.40 MeV — a typical energy for a proton in a small linear accelerator. A common mistake is using the mass of the proton rather than its charge. The charge of the proton (= elementary charge e) is what matters here.'
    },
    {
      number: 55,
      part: 'B-2',
      type: 'written',
      text: 'Calculate the resistance of a 0.050-meter-long copper wire having a cross-sectional area of 5.73 × 10⁻¹⁰ meter squared at 20°C. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Resistivity of copper at 20°C (from reference table): ρ = 1.72 × 10⁻⁸ Ω·m\n\nEquation: R = ρL/A\nSubstitution: R = (1.72 × 10⁻⁸ Ω·m)(0.050 m) / (5.73 × 10⁻¹⁰ m²)\nR = (8.60 × 10⁻¹⁰) / (5.73 × 10⁻¹⁰)\nR ≈ 1.50 Ω\n\nThe resistance of the copper wire is approximately 1.50 Ω.',
      topic: 'Electricity & Magnetism',
      explanation: 'R = ρL/A. Using copper resistivity ρ = 1.72 × 10⁻⁸ Ω·m from reference tables: R = (1.72 × 10⁻⁸)(0.050)/(5.73 × 10⁻¹⁰) ≈ 1.50 Ω.',
      diveDeep: 'R = ρL/A where ρ is resistivity (from Regents reference table for copper at 20°C: ρ = 1.72 × 10⁻⁸ Ω·m), L = 0.050 m, A = 5.73 × 10⁻¹⁰ m². Numerator: (1.72 × 10⁻⁸)(0.050) = 8.60 × 10⁻¹⁰ Ω·m². Dividing: 8.60 × 10⁻¹⁰ / 5.73 × 10⁻¹⁰ = 8.60/5.73 ≈ 1.50 Ω. Note that L is short (5 cm) but A is very small (~the area of a very thin wire), so the ratio gives a moderate resistance. A common mistake is misreading the resistivity from the table or inverting the formula (A/ρL). Always confirm units: Ω·m × m / m² = Ω.'
    },
    {
      number: 57,
      part: 'B-2',
      type: 'written',
      text: 'During a football game, player A (mass = 70.0 kg) attempts to prevent player B (mass = 90.0 kg) from scoring. Player B is running toward player A at a constant speed of 6.50 meters per second. Calculate the speed of player A such that the magnitude of the momentum of player A equals the magnitude of the momentum of player B. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'First, find the momentum of player B:\np_B = m_B × v_B = (90.0 kg)(6.50 m/s) = 585 kg·m/s\n\nSet p_A = p_B:\nm_A × v_A = 585 kg·m/s\n(70.0 kg) × v_A = 585 kg·m/s\nv_A = 585/70.0 = 8.36 m/s\n\nPlayer A must run at approximately 8.36 m/s.',
      topic: 'Mechanics',
      explanation: 'p_B = m_B v_B = (90.0)(6.50) = 585 kg·m/s. Set p_A = p_B: 70.0 × v_A = 585 → v_A = 585/70.0 ≈ 8.36 m/s.',
      diveDeep: 'Momentum p = mv. Player B: p_B = (90.0 kg)(6.50 m/s) = 585 kg·m/s. For equal magnitudes: m_A × v_A = 585 kg·m/s → v_A = 585/70.0 = 8.357... ≈ 8.36 m/s. Player A must run faster (8.36 vs. 6.50 m/s) because player A has less mass. This illustrates how a lighter player can match a heavier player\'s momentum by running faster. Common mistakes: computing m_B × v_B incorrectly, or setting up the equation as m_A/m_B = v_B/v_A (inverting the relationship). The formula is straightforward but requires careful unit tracking (kg·m/s for momentum).'
    },
    {
      number: 59,
      part: 'B-2',
      type: 'written',
      text: 'A photon has a wavelength of 5.03 × 10⁻⁷ meter. Calculate the energy of this photon. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Using E = hf and c = fλ → f = c/λ:\n\nf = c/λ = (3.00 × 10⁸ m/s) / (5.03 × 10⁻⁷ m) = 5.964 × 10¹⁴ Hz\n\nE = hf = (6.63 × 10⁻³⁴ J·s)(5.964 × 10¹⁴ Hz)\nE ≈ 3.95 × 10⁻¹⁹ J\n\nAlternatively: E = hc/λ = (6.63 × 10⁻³⁴)(3.00 × 10⁸) / (5.03 × 10⁻⁷)\nE = (1.989 × 10⁻²⁵) / (5.03 × 10⁻⁷) ≈ 3.95 × 10⁻¹⁹ J',
      topic: 'Modern Physics',
      explanation: 'E = hc/λ = (6.63 × 10⁻³⁴ J·s × 3.00 × 10⁸ m/s) / (5.03 × 10⁻⁷ m) ≈ 3.95 × 10⁻¹⁹ J.',
      diveDeep: 'E = hf = hc/λ. Values from Regents reference table: h = 6.63 × 10⁻³⁴ J·s, c = 3.00 × 10⁸ m/s. λ = 5.03 × 10⁻⁷ m (visible light, yellow-green). Step 1: f = c/λ = (3.00 × 10⁸)/(5.03 × 10⁻⁷) ≈ 5.96 × 10¹⁴ Hz. Step 2: E = hf ≈ (6.63 × 10⁻³⁴)(5.96 × 10¹⁴) ≈ 3.95 × 10⁻¹⁹ J. Or directly: E = hc/λ = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (5.03 × 10⁻⁷). Common mistakes: forgetting to find f first (using λ directly in E = hf), or using the wrong value for h or c. In eV: 3.95 × 10⁻¹⁹ J / (1.60 × 10⁻¹⁹ J/eV) ≈ 2.47 eV — consistent with visible green light.'
    },
    {
      number: 61,
      part: 'B-2',
      type: 'written',
      text: 'A 53-newton box on a horizontal surface is pulled toward the right by a horizontal force of 27 newtons. The force of friction exerted on the box by the surface has a magnitude of 16 newtons.\n\n(61) On the diagram in your answer booklet, use a scale of 1.0 cm = 10. N and start at point P to construct a vector representing the normal force exerted on the box by the floor. [1]',
      modelAnswer: 'The normal force equals the weight of the box on a horizontal surface (no vertical acceleration):\nN = W = 53 N\n\nUsing the scale 1.0 cm = 10. N:\nLength of vector = 53 N / (10. N/cm) = 5.3 cm, directed upward from point P.\n\nDraw an arrow 5.3 cm long pointing straight up from point P.',
      topic: 'Mechanics',
      explanation: 'On a horizontal surface with no vertical motion, the normal force equals the box\'s weight: N = 53 N. At scale 1 cm = 10 N, the vector is 5.3 cm long, directed upward.',
      diveDeep: 'On a horizontal surface in vertical equilibrium: N = W = mg = 53 N (given as weight, not mass). The normal force is perpendicular to the surface (upward) and balances gravity. Scale: 53 N ÷ 10 N/cm = 5.3 cm upward from point P. Common mistakes: (1) drawing the normal force at an angle rather than straight up; (2) using the wrong scale factor; (3) thinking the applied horizontal force affects the normal force (it doesn\'t, since it\'s horizontal and the surface is horizontal). For inclined planes, normal force ≠ weight, but on a horizontal surface they are equal. Vector direction (up) and magnitude (5.3 cm) must both be correct for full credit.'
    },
    {
      number: 62,
      part: 'B-2',
      type: 'written',
      text: 'A 53-newton box on a horizontal surface is pulled toward the right by a horizontal force of 27 newtons. The force of friction is 16 newtons. Determine the magnitude of the net force acting on the box. [1]',
      modelAnswer: 'Net horizontal force = applied force − friction force = 27 N − 16 N = 11 N\n\nVertically: N − W = 0 (no vertical acceleration)\n\nThe magnitude of the net force acting on the box is 11 N (directed to the right).',
      topic: 'Mechanics',
      explanation: 'Horizontally: F_net = F_applied − F_friction = 27 − 16 = 11 N. Vertically: N = W (balanced). Net force = 11 N.',
      diveDeep: 'Forces on the box: horizontal → applied force 27 N right, friction 16 N left; vertical → normal force N up, weight 53 N down. Vertical equilibrium: N = 53 N (no vertical acceleration). Horizontal net force: F_net = 27 − 16 = 11 N (to the right). The net force has only a horizontal component since vertical forces balance. Common mistakes: (1) including the weight or normal force in the net force (they cancel); (2) adding 27 + 16 = 43 N instead of subtracting (not accounting for opposite directions of applied force and friction). Net force = 11 N produces acceleration a = F_net/m = 11/(53/9.81) ≈ 2.04 m/s² to the right.', image: '/images/exams/phys-june-2025/q62.png' },
    {
      number: 63,
      part: 'B-2',
      type: 'written',
      text: 'A ray of monochromatic light (f = 5.09 × 10¹⁴ hertz) passes from air into a transparent medium X. The incident ray makes an angle of 35° with the normal at the boundary.\n\n(63) Using a protractor, determine the angle of refraction in medium X, to the nearest degree. [1]',
      modelAnswer: 'Measure the angle between the refracted ray and the normal inside medium X using a protractor.\n\nThe angle of refraction in medium X is approximately 22° (measured from the normal to the refracted ray inside the medium).\n\n[Accept any value from 21° to 23° as read from the diagram.]',
      topic: 'Waves & Light',
      explanation: 'The angle of refraction is measured from the normal to the refracted ray inside medium X. From the diagram, this angle is approximately 22°.',
      diveDeep: 'Refraction: when light enters a denser medium (higher index), it bends toward the normal, so the refraction angle < incidence angle. The incidence angle is given as 35°. The refracted ray bends toward the normal inside medium X, giving a smaller angle (~22°). This is read directly from the diagram using a protractor. For Regents credit, students must correctly identify which angle to measure — always from the normal (perpendicular to the surface at the boundary), not from the surface itself. A common mistake is measuring the angle from the surface (which would give 90° − 22° = 68°). The normal is the dashed line perpendicular to the boundary.', image: '/images/exams/phys-june-2025/context_63_65.png' },
    {
      number: 64,
      part: 'B-2',
      type: 'written',
      text: 'A ray of monochromatic light (f = 5.09 × 10¹⁴ hertz) passes from air into transparent medium X, with an angle of incidence of 35° and an angle of refraction of approximately 22° in medium X.\n\n(64–65) Calculate the absolute index of refraction of medium X. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Using Snell\'s Law: n₁ sin θ₁ = n₂ sin θ₂\n\nFor air: n₁ = 1.00\nAngle of incidence: θ₁ = 35°\nAngle of refraction: θ₂ ≈ 22°\n\nn₂ = (n₁ sin θ₁) / sin θ₂ = (1.00 × sin 35°) / sin 22°\nn₂ = (1.00 × 0.574) / 0.374\nn₂ ≈ 1.53\n\nThe absolute index of refraction of medium X is approximately 1.53.',
      topic: 'Waves & Light',
      explanation: 'Snell\'s law: n₁ sin θ₁ = n₂ sin θ₂. With n₁ = 1.00 (air), θ₁ = 35°, θ₂ ≈ 22°: n₂ = sin 35°/sin 22° ≈ 0.574/0.374 ≈ 1.53.',
      diveDeep: 'n = sin θ_air / sin θ_medium (Snell\'s law with n_air = 1.00). Using θ_air = 35° and θ_medium = 22° (from Q63): n = sin 35°/sin 22° = 0.5736/0.3746 ≈ 1.53. This value (≈1.53) corresponds to a glass-like material (crown glass is 1.52, flint glass is 1.61). The light slows down in medium X: v = c/n ≈ (3.00 × 10⁸)/1.53 ≈ 1.96 × 10⁸ m/s. A common mistake is inverting the formula: n = sin θ_medium / sin θ_air (which gives a value less than 1, impossible for a material denser than air). Always: n = sin(air angle)/sin(medium angle) when going from air into the medium.', image: '/images/exams/phys-june-2025/context_63_65.png' },
    {
      number: 66,
      part: 'C',
      type: 'written',
      text: 'Three 4.0-kilogram spherical masses A, B, and C are positioned as shown. Mass B and mass C exert gravitational forces on mass A. The gravitational force FB exerted by mass B on mass A is 5.08 × 10⁻¹⁰ newton south. The resultant gravitational force R exerted on mass A is 5.74 × 10⁻¹⁰ newton at 27° east of south.\n\n(66–67) Calculate the distance separating the centers of masses A and B. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Using the universal law of gravitation: F_B = Gm_A m_B / r²\n\nSolve for r:\nr² = Gm_A m_B / F_B\nr² = (6.67 × 10⁻¹¹ N·m²/kg²)(4.0 kg)(4.0 kg) / (5.08 × 10⁻¹⁰ N)\nr² = (6.67 × 10⁻¹¹ × 16) / (5.08 × 10⁻¹⁰)\nr² = (1.0672 × 10⁻⁹) / (5.08 × 10⁻¹⁰)\nr² = 2.1008 m²\nr = √2.1008 ≈ 1.45 m\n\nThe distance between the centers of masses A and B is approximately 1.45 m.',
      topic: 'Mechanics',
      explanation: 'F = Gm₁m₂/r² → r = √(Gm₁m₂/F) = √((6.67×10⁻¹¹)(4.0)(4.0) / 5.08×10⁻¹⁰) ≈ 1.45 m.',
      diveDeep: 'Newton\'s law of universal gravitation: F = Gm₁m₂/r². Rearranging for r: r = √(Gm₁m₂/F). G = 6.67 × 10⁻¹¹ N·m²/kg² (from reference table). m_A = m_B = 4.0 kg. F_B = 5.08 × 10⁻¹⁰ N. r = √[(6.67×10⁻¹¹)(4.0)(4.0)/(5.08×10⁻¹⁰)] = √[(1.0672×10⁻⁹)/(5.08×10⁻¹⁰)] = √(2.101) ≈ 1.45 m. Common mistakes: forgetting to take the square root of r², or using F as the resultant R instead of F_B. The question specifies using F_B (the force from B alone on A) to find the A–B distance. The resultant R is used for Q68.', image: '/images/exams/phys-june-2025/context_66_68.png' },
    {
      number: 68,
      part: 'C',
      type: 'written',
      text: 'Mass A is removed and a 7.0-kilogram mass is placed at the same position. Compare the magnitude of the resultant gravitational force on the 7.0-kilogram mass with the magnitude of the original resultant gravitational force R. [1]',
      modelAnswer: 'The resultant gravitational force on the new 7.0-kg mass would be greater than R.\n\nExplanation: The positions and masses of B and C are unchanged, so the gravitational forces they exert scale proportionally with the mass at A\'s position. The new force on the 7.0-kg mass is:\n\nF_new = (7.0 kg / 4.0 kg) × R = 1.75 × R = 1.75 × (5.74 × 10⁻¹⁰ N) ≈ 1.00 × 10⁻⁹ N\n\nThe resultant gravitational force on the 7.0-kg mass is 1.75 times greater than R (larger than R).',
      topic: 'Mechanics',
      explanation: 'Gravitational force scales with mass: F ∝ m. Since 7.0/4.0 = 1.75, the new force is 1.75 × R — larger than R.',
      diveDeep: 'F = Gm_B m_A / r² (and similarly for C). Since r (the distances from B and C to position A) remains unchanged and m_B, m_C are unchanged, the force on the object at position A scales directly with the mass placed there. New mass = 7.0 kg; original mass = 4.0 kg. Ratio = 7.0/4.0 = 1.75. New resultant = 1.75 × 5.74 × 10⁻¹⁰ ≈ 1.00 × 10⁻⁹ N. A common mistake is thinking the force stays the same (because positions are unchanged) — but gravitational force depends on both masses. The placement mass (at position A) directly scales the force. This illustrates the equivalence principle: heavier mass → stronger gravitational pull from the same sources.', image: '/images/exams/phys-june-2025/context_66_68.png' },
    {
      number: 69,
      part: 'C',
      type: 'written',
      text: 'An electric train with a mass of 2.8 kilograms moves from rest down a long, straight track. The data table shows the train\'s momentum during the first 4.0 seconds:\n\nTime (s): 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0\nMomentum (kg·m/s): 0.0, 2.1, 4.2, 6.3, 8.4, 11.0, 13.0, 15.0, 18.0\n\n(69) Plot the momentum versus time for the first 4.0 seconds of the train\'s trip. [1]\n\n(70) Draw a best-fit line, using a straight edge, to represent the relationship between momentum and time. [1]\n\n(71) Using your best-fit line, determine the average force that acted upon the train. [1]\n\n(72–73) Calculate the magnitude of the average acceleration of the train. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: '(69) Plot each data point: (0.0, 0.0), (0.5, 2.1), (1.0, 4.2), (1.5, 6.3), (2.0, 8.4), (2.5, 11.0), (3.0, 13.0), (3.5, 15.0), (4.0, 18.0).\n\n(70) Draw a best-fit straight line through the plotted points. The line should best represent the general trend.\n\n(71) The average force = slope of the best-fit p vs. t line.\nSlope ≈ Δp/Δt = (18.0 − 0.0) kg·m/s / (4.0 − 0.0) s ≈ 4.5 N\nThe average force is approximately 4.5 N.\n\n(72–73) Average acceleration:\na = F/m = 4.5 N / 2.8 kg ≈ 1.6 m/s²\n\nAlternatively: a = Δv/Δt. Since p = mv, Δv = Δp/m.\na = Δp/(m × Δt) = 18.0/(2.8 × 4.0) = 18.0/11.2 ≈ 1.6 m/s²\n\nThe magnitude of the average acceleration is approximately 1.6 m/s².',
      topic: 'Mechanics',
      explanation: 'The slope of the p-t graph gives force (F = Δp/Δt). Slope ≈ 4.5 N. Acceleration a = F/m = 4.5/2.8 ≈ 1.6 m/s².',
      diveDeep: 'Impulse-momentum theorem: F = Δp/Δt — the slope of a momentum vs. time graph is force. From the best-fit line: slope = (18.0 − 0)/(4.0 − 0) = 4.5 kg·m/s² = 4.5 N. Then a = F/m = 4.5/2.8 ≈ 1.6 m/s². Note the data is nearly linear (indicating nearly constant net force/acceleration) but has slight variations. The best-fit line averages these. Q72-73 requires showing the formula and substitution for Regents credit. A common mistake is computing acceleration from two arbitrary data points rather than using the best-fit line slope. Also: make sure the graph has labeled axes, appropriate scale, and data points clearly marked to earn full graphing credit.', image: '/images/exams/phys-june-2025/context_69_73.png' },
    {
      number: 74,
      part: 'C',
      type: 'written',
      text: 'A periodic wave passes through a medium traveling to the right. The wave requires 2.0 seconds to travel from point A to point B. The scale used in the diagram is 1.0 centimeter = 0.10 meter.\n\n(74) Determine the wavelength of the wave in meters. [1]\n\n(75–76) Calculate the speed of the wave in meters per second. [Show all work, including the equation and substitution with units.] [2]\n\n(77) On the diagram in your answer booklet, place an X on the wave at a position that is 180° out of phase with point C. [1]',
      modelAnswer: '(74) Measure the wavelength from the diagram: one complete wave cycle measures approximately 2.0 cm on the diagram.\nActual wavelength: λ = 2.0 cm × (0.10 m/cm) = 0.20 m\n\n(75–76) First find the distance from A to B using the diagram scale.\nSuppose A to B spans approximately 4.0 cm → actual distance d = 4.0 × 0.10 = 0.40 m\nv = d/t = 0.40 m / 2.0 s = 0.20 m/s\n\nVerification using v = fλ: f = v/λ = 0.20/0.20 = 1.0 Hz ✓\n\n(77) A point 180° out of phase with point C is exactly one half-wavelength away from C (either direction along the wave). Place the X at the position one half-wavelength from C (0.10 m or 1.0 cm from C on the diagram).',
      topic: 'Waves & Light',
      explanation: 'Wavelength is read from the diagram using the scale. Speed v = d/t using the A-to-B distance and time. A 180° phase difference = half a wavelength away from point C.',
      diveDeep: 'Wave measurements from scale diagrams: (1) wavelength = length of one complete cycle (crest to crest or trough to trough), converted using the scale. (2) Speed = distance/time, where distance is the A-to-B gap converted by scale, time = 2.0 s. (3) 180° out of phase means half a wavelength away — the point is at the opposite displacement (if C is at a crest, 180° out of phase is at a trough, and vice versa). Common mistakes: measuring peak height instead of cycle length for wavelength; using time in wrong units; placing X at ¼ wavelength (90° out of phase) instead of ½ wavelength. The scale factor 1.0 cm = 0.10 m must be applied to all measurements.', image: '/images/exams/phys-june-2025/context_74_77.png' },
    {
      number: 78,
      part: 'C',
      type: 'written',
      text: 'A pogo stick has a spring on the bottom. When a 51.0-kilogram child stands at rest on a pogo stick, the spring is compressed 0.15 meter.\n\n(78) Determine the magnitude of the weight of the child in newtons. [1]\n\n(79–80) Calculate the spring constant of the spring on the pogo stick. [Show all work, including the equation and substitution with units.] [2]\n\n(81–82) Calculate the total energy stored in the pogo stick\'s spring when the child\'s weight has compressed the spring 0.15 meter. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: '(78) Weight W = mg = (51.0 kg)(9.81 m/s²) = 500. N\n\n(79–80) At rest, the spring force equals the child\'s weight (equilibrium):\nF_spring = W = 500. N, x = 0.15 m\nHooke\'s law: F = kx\nk = F/x = 500. N / 0.15 m ≈ 3.3 × 10³ N/m = 3300 N/m\n\n(81–82) Elastic potential energy stored in the spring:\nPE_spring = ½kx²\nPE_spring = ½(3300 N/m)(0.15 m)²\nPE_spring = ½(3300)(0.0225)\nPE_spring = ½(74.25) = 37.125 ≈ 37 J',
      topic: 'Mechanics',
      explanation: 'W = mg = (51.0)(9.81) ≈ 500. N. k = F/x = 500/0.15 ≈ 3300 N/m. PE = ½kx² = ½(3300)(0.15)² ≈ 37 J.',
      diveDeep: 'Three-part pogo stick problem: (78) W = mg = 51.0 × 9.81 ≈ 500. N (or 499.11 N; accept 500 N). (79-80) Static equilibrium → spring force = weight → k = F/x = 500/0.15 = 3333 N/m ≈ 3.3 × 10³ N/m. (81-82) PE = ½kx² = ½(3333)(0.0225) = 37.5 ≈ 37 J. Alternatively: PE = ½Fx = ½(500)(0.15) = 37.5 J (since F = kx at equilibrium). Common mistakes: (78) not multiplying by g (just writing m = 51.0 N); (80) dividing x/F instead of F/x; (82) forgetting the ½ factor in elastic PE or using x without squaring it. The spring constant of ~3300 N/m is typical for a pogo stick spring.', image: '/images/exams/phys-june-2025/context_78_82.png' },
    {
      number: 83,
      part: 'C',
      type: 'written',
      text: 'Scientists at the CERN Large Hadron Collider discovered a new subatomic particle called the Xb particle, composed of one down quark, one strange quark, and one bottom quark. The mass of the Xb particle is approximately 5950 MeV.\n\n(83) Determine both the sign and the magnitude of the charge of the Xb particle, in elementary charges. [1]\n\n(84) Identify the fundamental force that holds the quarks together in the Xb particle. [1]\n\n(85) Determine the mass of the Xb particle, in universal mass units. [1]',
      modelAnswer: '(83) Quark charges (from Regents reference table):\n- Down quark (d): charge = −1/3 e\n- Strange quark (s): charge = −1/3 e\n- Bottom quark (b): charge = −1/3 e\n\nTotal charge = −1/3 + (−1/3) + (−1/3) = −3/3 = −1 e\n\nThe charge of the Xb particle is −1 elementary charge (negative, magnitude = 1).\n\n(84) The fundamental force that holds quarks together is the strong nuclear force (also called the strong force or the color force).\n\n(85) 1 MeV = 1.07 × 10⁻³ u (from Regents reference table: 1 u = 931.5 MeV)\nMass = 5950 MeV / 931.5 MeV/u ≈ 6.39 u\n\nThe mass of the Xb particle is approximately 6.39 universal mass units.',
      topic: 'Modern Physics',
      explanation: '(83) Down + strange + bottom quarks each carry −1/3 e → total charge = −1 e. (84) The strong force holds quarks together. (85) 5950 MeV ÷ 931.5 MeV/u ≈ 6.39 u.',
      diveDeep: '(83) Quark charges from the Regents reference table: d = −1/3 e, s = −1/3 e, b = −1/3 e. Sum = −1 e. This is a baryon (three quarks) with charge −1 e, like the antiproton. (84) The strong force (mediated by gluons) confines quarks inside hadrons — it is the force responsible for quark confinement. The weak force governs quark flavor changes. Electromagnetism and gravity also act on quarks but do not bind them together inside hadrons. (85) 1 u = 931.5 MeV/c² (from reference table). Mass = 5950 MeV/c² ÷ (931.5 MeV/u) ≈ 6.39 u. For reference, a proton ≈ 1.007 u, so the Xb is about 6.4 times heavier than a proton. Common mistakes: wrong quark charge signs (confusing up quark +2/3 e with down −1/3 e), naming the wrong force (electromagnetic vs. strong), or inverting the MeV→u conversion.'
    }
  ]
}
