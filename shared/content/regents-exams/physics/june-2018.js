// Physics Regents — June 2018
export default {
  id: 'phys-jun-2018',
  subject: 'physics',
  year: 2018,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'Which combination correctly pairs a vector quantity with its corresponding unit?',
      choices: ['weight and kg', 'velocity and m/s', 'speed and m/s', 'acceleration and m²/s'],
      topic: 'Forces & Newton',
      correct: 1,
      explanation: 'Velocity is a vector quantity (has both magnitude and direction) and its unit is meters per second (m/s). Weight is a force (vector) but its unit is newtons (N), not kg. Speed is scalar. Acceleration\'s unit is m/s², not m²/s.',
      diveDeep: 'Identifying vector vs. scalar requires knowing both the physical quantity and its unit. Velocity (m/s) is a vector; speed (m/s) is the scalar equivalent — same unit but different nature. Weight is a force (vector) in newtons, not kilograms (which is the unit of mass, a scalar). Acceleration is a vector with units m/s² (not m²/s). The Regents frequently tests these pairings. A useful strategy: if the quantity has a direction associated with it in everyday use, it is likely a vector.'
    },
    {
      number: 2,
      part: 'A',
      text: 'A 12.0-kilogram cart is moving at a speed of 0.25 meter per second. After the speed of the cart is tripled, the inertia of the cart will be',
      choices: ['unchanged', 'one-third as great', 'three times greater', 'nine times greater'],
      topic: 'Kinematics',
      correct: 0,
      explanation: 'Inertia depends only on mass, not on speed. Since the mass of the cart remains 12.0 kg, its inertia is unchanged.',
      diveDeep: "Inertia is the property of matter that resists changes in motion, and it is measured solely by mass (Newton's first law). Changing speed does not change the amount of matter, so inertia remains constant. A common misconception is thinking faster objects are harder to stop only because they have more inertia — actually, they have the same inertia but more momentum and kinetic energy. The Regents often tests this conceptual distinction. Inertia is not a force and has no direction — it is a scalar property."
    },
    {
      number: 3,
      part: 'A',
      text: 'While taking off from an aircraft carrier, a jet starting from rest accelerates uniformly to a final speed of 40. meters per second on a runway that is 70. meters long. What is the magnitude of the acceleration of the jet?',
      choices: ['0.29 m/s²', '1.8 m/s²', '0.57 m/s²', '11 m/s²'],
      topic: 'Kinematics',
      correct: 3,
      explanation: 'Using v² = v₀² + 2ad: (40)² = 0 + 2a(70) → 1600 = 140a → a = 1600/140 ≈ 11 m/s².',
      diveDeep: 'This problem lacks time, so we use v² = v₀² + 2aΔx. Starting from rest means v₀ = 0. Solving: a = v²/(2Δx) = 1600/140 ≈ 11.4 m/s² ≈ 11 m/s². This is about 1.2 g — realistic for carrier catapult launches. A common mistake is using a = v/Δx (forgetting to square v and divide by 2). Always identify the known and unknown variables before selecting a kinematic equation. The four kinematic equations are on the Regents reference table.'
    },
    {
      number: 4,
      part: 'A',
      text: 'A 6.0-kilogram cart initially traveling at 4.0 meters per second east accelerates uniformly at 0.50 meter per second squared east for 3.0 seconds. What is the speed of the cart at the end of this 3.0-second interval?',
      choices: ['1.5 m/s', '3.0 m/s', '5.5 m/s', '7.0 m/s'],
      topic: 'Kinematics',
      correct: 2,
      explanation: 'v = v₀ + at = 4.0 + (0.50)(3.0) = 4.0 + 1.5 = 5.5 m/s east.',
      diveDeep: 'The basic kinematic equation v = v₀ + at applies when acceleration is constant. Here both initial velocity and acceleration are eastward, so they simply add. The mass (6.0 kg) is given but irrelevant — a common distractor. A frequent mistake is multiplying mass × acceleration and adding to velocity, confusing force (ma) with change in velocity (aΔt). Always check units: (m/s²)(s) = m/s, which correctly adds to m/s. The cart speeds up from 4.0 to 5.5 m/s over 3 seconds.'
    },
    {
      number: 5,
      part: 'A',
      text: 'A soccer ball is kicked into the air from level ground with an initial speed of 20. meters per second and returns to ground level. At which angle above the horizontal should the ball be kicked in order for the ball to travel the greatest total horizontal distance? [Neglect friction.]',
      choices: ['15°', '45°', '30.°', '75°'],
      topic: 'Kinematics',
      correct: 1,
      explanation: 'For maximum horizontal range on level ground (no air resistance), a projectile must be launched at 45° above the horizontal.',
      diveDeep: 'The range equation R = v₀²sin(2θ)/g is maximized when sin(2θ) = 1, i.e., 2θ = 90°, so θ = 45°. Complementary angles (e.g., 30° and 60°, or 15° and 75°) produce equal ranges but the 45° angle maximizes range. This is a classic result of projectile motion and appears on the Regents reference table implicitly through the range formula. Air resistance shifts the optimal angle below 45° in real life, but the Regents always assumes no friction. Students sometimes choose 30° (thinking "flatter is farther") — 45° is the correct answer.'
    },
    {
      number: 6,
      part: 'A',
      text: 'Starting from rest, a car travels 18 meters as it accelerates uniformly for 3.0 seconds. What is the magnitude of the car\'s acceleration?',
      choices: ['6.0 m/s²', '3.0 m/s²', '2.0 m/s²', '4.0 m/s²'],
      topic: 'Kinematics',
      correct: 3,
      explanation: 'Using d = ½at²: 18 = ½ × a × (3.0)² = 4.5a → a = 18/4.5 = 4.0 m/s².',
      diveDeep: 'Starting from rest means v₀ = 0, so d = ½at². Solving: a = 2d/t² = 2(18)/(9) = 4.0 m/s². A common mistake is using a = d/t² (forgetting the ½ factor) which gives 2.0 m/s² — choice C, a classic trap. Another mistake is using a = d/t (mixing up units). Always double-check by substituting back: d = ½(4.0)(3.0)² = ½(4.0)(9) = 18 m ✓. This is one of the most tested kinematic equations on the Regents.'
    },
    {
      number: 7,
      part: 'A',
      text: 'A ball is rolling horizontally at 3.00 meters per second as it leaves the edge of a tabletop 0.750 meter above the floor. The ball lands on the floor 0.391 second after leaving the tabletop. What is the magnitude of the ball\'s acceleration 0.200 second after it leaves the tabletop? [Neglect friction.]',
      choices: ['1.96 m/s²', '9.81 m/s²', '7.65 m/s²', '15.3 m/s²'],
      topic: 'Kinematics',
      correct: 1,
      explanation: 'Once in the air, the only acceleration acting on the ball is gravitational acceleration g = 9.81 m/s² downward, regardless of the time elapsed.',
      diveDeep: 'In projectile motion (neglecting air resistance), the only acceleration is g = 9.81 m/s² downward — constant throughout the flight. It does not change at 0.200 s or any other moment. Students are sometimes tricked by the extra time information (0.391 s total, 0.200 s elapsed) thinking the acceleration changes over time or depends on velocity. Acceleration due to gravity is constant for projectiles near Earth\'s surface. The horizontal acceleration is zero (no friction). This is a conceptual question testing whether students understand that g is constant.'
    },
    {
      number: 8,
      part: 'A',
      text: 'A projectile with mass m is fired with initial horizontal velocity v_x from height h above level ground. Which change would have resulted in a greater time of flight for the projectile? [Neglect friction.]',
      choices: ['decreasing the mass to m/2', 'decreasing the height to h/2', 'increasing the initial horizontal velocity to 2v_x', 'increasing the height to 2h'],
      topic: 'Kinematics',
      correct: 3,
      explanation: 'Time of flight for a horizontal projectile depends only on the initial height h: t = √(2h/g). Increasing h to 2h increases t by a factor of √2. Mass and horizontal velocity have no effect on vertical fall time.',
      diveDeep: 'For a horizontal projectile, h = ½gt², so t = √(2h/g). Only height determines fall time. Mass does not affect free fall (Galileo\'s principle). Horizontal velocity affects horizontal distance but not fall time — the vertical and horizontal motions are independent. Decreasing h decreases fall time. Doubling h multiplies time by √2 ≈ 1.41, increasing it. This independence of horizontal and vertical motion is a cornerstone of 2D kinematics and is frequently tested on the Regents.'
    },
    {
      number: 9,
      part: 'A',
      text: 'A golf club hits a stationary 0.050-kilogram golf ball with an average force of 5.0 × 10³ newtons, accelerating the ball to a speed of 44 meters per second. What is the magnitude of the impulse imparted to the ball by the golf club?',
      choices: ['2.2 N·s', '1.1 × 10⁴ N·s', '880 N·s', '2.2 × 10⁵ N·s'],
      topic: 'Forces & Newton',
      correct: 0,
      explanation: 'Impulse = change in momentum = mΔv = (0.050 kg)(44 m/s − 0) = 2.2 N·s.',
      diveDeep: 'Impulse J = FΔt = Δp = mΔv. Since the ball starts at rest, Δv = 44 m/s, so J = 0.050 × 44 = 2.2 N·s. The large force (5000 N) and short contact time are given but can be used alternatively: we would need Δt to use J = FΔt directly. Using Δp = mΔv avoids needing Δt. A common mistake is computing F × m instead of mΔv, or forgetting to account for the initial velocity being zero. Units: kg·m/s = N·s — both are valid units for impulse and momentum.'
    },
    {
      number: 10,
      part: 'A',
      text: 'A tennis player\'s racket applies an average force of 200. newtons to a tennis ball for 0.025 second. The average force exerted on the racket by the tennis ball is',
      choices: ['0.025 N', '5.0 N', '200. N', '8000 N'],
      topic: 'Forces & Newton',
      correct: 2,
      explanation: "By Newton's third law, the force exerted by the ball on the racket is equal in magnitude and opposite in direction to the force exerted by the racket on the ball: 200. N.",
      diveDeep: "Newton's third law states that for every action force there is an equal and opposite reaction force. The racket exerts 200 N on the ball, so the ball exerts exactly 200 N on the racket — regardless of the masses or the duration of contact. A common mistake is thinking the lighter ball exerts less force, or computing F × Δt = 5 N (which is impulse in different units). The force is 200 N in both directions simultaneously. Newton's third law pairs always act on different objects, which is why they don't cancel each other out."
    },
    {
      number: 11,
      part: 'A',
      text: 'The diagram below represents a box sliding down an incline at constant velocity. Which direction represents the frictional force acting on the box?',
      choices: ['down the incline', 'perpendicular into the surface', 'up the incline', 'perpendicular away from the surface'],
      topic: 'Forces & Newton',
      correct: 2,
      image: '/images/exams/phys-june-2018/q11.png',
      explanation: 'The box slides down the incline, so kinetic friction acts opposite to the direction of motion — up the incline. At constant velocity, friction exactly balances the component of gravity along the incline.',
      diveDeep: 'Friction always opposes the direction of relative motion between surfaces. Since the box moves down the incline, friction acts up the incline. At constant velocity, net force = 0, so the frictional force exactly equals the component of gravity along the incline: f = mg sinθ. The normal force is perpendicular to the incline surface (not vertical). Students often confuse the direction of friction with the direction of the normal force. On inclined plane problems, always resolve forces along and perpendicular to the surface.'
    },
    {
      number: 12,
      part: 'A',
      text: 'Which diagram represents the directions of the velocity, v, and acceleration, a, of a toy car as it moves in a clockwise, horizontal, circular path at a constant speed?',
      choices: [
        'v tangent to the circle, a toward the center',
        'v toward the center, a tangent to the circle',
        'v tangent to the circle, a away from the center',
        'v and a both tangent to the circle'
      ],
      topic: 'Kinematics',
      correct: 0,
      image: '/images/exams/phys-june-2018/q12.png',
      explanation: 'For uniform circular motion, velocity is always tangent to the circular path and centripetal acceleration points toward the center of the circle.',
      diveDeep: 'In uniform circular motion, speed is constant but direction continuously changes, requiring centripetal (center-directed) acceleration. Velocity is always perpendicular to the radius — tangent to the circle. The centripetal acceleration a_c = v²/r always points toward the center. A common mistake is drawing acceleration tangent to the circle (which would indicate changing speed, not changing direction). The net force in circular motion also points centripetally: F_c = mv²/r. This is a purely geometric relationship with no friction or other force needed conceptually.'
    },
    {
      number: 13,
      part: 'A',
      text: 'A charged particle is located in an electric field where the magnitude of the electric field strength is 2.0 × 10³ newtons per coulomb. If the magnitude of the electrostatic force exerted on the particle is 3.0 × 10⁻³ newton, what is the charge of the particle?',
      choices: ['1.6 × 10⁻¹⁹ C', '6.0 C', '1.5 × 10⁻⁶ C', '6.7 × 10⁵ C'],
      topic: 'Electricity',
      correct: 2,
      image: '/images/exams/phys-june-2018/q13.png',
      explanation: 'E = F/q, so q = F/E = (3.0 × 10⁻³ N) / (2.0 × 10³ N/C) = 1.5 × 10⁻⁶ C.',
      diveDeep: 'The electric field is defined as E = F/q, where F is the force on a test charge q. Rearranging: q = F/E. Here q = 3.0 × 10⁻³ / 2.0 × 10³ = 1.5 × 10⁻⁶ C = 1.5 μC. A common mistake is inverting the formula to get q = E/F, giving 6.7 × 10⁵ C — an unrealistically large charge. Choice A (1.6 × 10⁻¹⁹ C) is the elementary charge — a distractor for students who recognize that unit of charge without doing the calculation. Always verify the answer has reasonable magnitude for macroscopic charges (μC range is typical).'
    },
    {
      number: 14,
      part: 'A',
      text: 'The magnitude of the gravitational field strength near Earth\'s surface is represented by',
      choices: ['g', 'mg', 'G', 'Gm₁m₂/r²'],
      topic: 'Forces & Newton',
      correct: 0,
      image: '/images/exams/phys-june-2018/q14.png',
      explanation: 'The gravitational field strength near Earth\'s surface is represented by g ≈ 9.81 m/s², the acceleration due to gravity.',
      diveDeep: 'Gravitational field strength g is defined as the gravitational force per unit mass: g = F_g/m. Near Earth\'s surface, g ≈ 9.81 N/kg = 9.81 m/s². The quantity mg is the weight (a force in newtons). G is the universal gravitational constant (6.67 × 10⁻¹¹ N·m²/kg²), a completely different quantity. Gm₁m₂/r² is the magnitude of the universal gravitational force. Students often confuse g (field strength, varies with location) with G (universal constant, never changes). On the Regents reference table, both g and G are given separately.'
    },
    {
      number: 15,
      part: 'A',
      text: 'A car engine supplies 2.0 × 10³ joules of energy during the 10. seconds it takes to accelerate the car along a horizontal surface. What is the average power developed by the car engine while it is accelerating?',
      choices: ['2.0 × 10¹ W', '2.0 × 10³ W', '2.0 × 10² W', '2.0 × 10⁴ W'],
      topic: 'Energy & Work',
      correct: 2,
      image: '/images/exams/phys-june-2018/q15.png',
      explanation: 'P = W/t = (2.0 × 10³ J) / (10. s) = 2.0 × 10² W = 200 W.',
      diveDeep: 'Power P = W/t = E/t measures the rate of energy transfer. Here P = 2000/10 = 200 W = 2.0 × 10² W. A common mistake is performing the division incorrectly with scientific notation: 10³/10¹ = 10², so the coefficient stays 2.0. Choice A (2.0 × 10¹) comes from dividing by 100 instead of 10. Choice D (2.0 × 10⁴) comes from multiplying instead of dividing. Checking units: J/s = W ✓. 200 W is approximately the power of a human running — reasonable for a small engine acceleration.'
    },
    {
      number: 16,
      part: 'A',
      text: 'Which forces can be either attractive or repulsive?',
      choices: ['gravitational and magnetic', 'electrostatic and gravitational', 'magnetic and electrostatic', 'gravitational, magnetic, and electrostatic'],
      topic: 'Forces & Newton',
      correct: 2,
      image: '/images/exams/phys-june-2018/q16.png',
      explanation: 'Both magnetic and electrostatic forces can be attractive or repulsive depending on the poles or charges involved. Gravitational force is always attractive.',
      diveDeep: 'Gravity is always attractive because there is no negative mass. Electrostatic force: like charges repel, unlike charges attract. Magnetic force: like poles repel, unlike poles attract. So magnetic and electrostatic forces can be either attractive or repulsive. Choice D includes gravity, which is always attractive — making D incorrect. This concept pairs with Regents questions about the fundamental forces. Note that the strong nuclear force is always attractive at nuclear distances, while the weak force mediates certain particle decays.'
    },
    {
      number: 17,
      part: 'A',
      text: 'Compared to the resistivity of a 0.4-meter length of 1-millimeter-diameter copper wire at 0°C, the resistivity of a 0.8-meter length of 1-millimeter-diameter copper wire at 0°C is',
      choices: ['one-fourth as great', 'the same', 'one-half as great', 'four times greater'],
      topic: 'Electricity',
      correct: 1,
      explanation: 'Resistivity is a material property that depends only on the material and temperature, not on the length or cross-sectional area of the wire.',
      diveDeep: 'Resistivity ρ is an intrinsic property of a material at a given temperature — it does not depend on the shape or size of the conductor. Resistance R = ρL/A does depend on length and area. Here both wires are the same material (copper) at the same temperature (0°C), so they have the same resistivity. Doubling the length doubles the resistance R, but leaves resistivity ρ unchanged. A common mistake is confusing resistance (R, in ohms) with resistivity (ρ, in Ω·m). The Regents reference table lists resistivity values for common materials.'
    },
    {
      number: 18,
      part: 'A',
      text: 'The work per unit charge required to move a charge between two points in an electric circuit defines electric',
      choices: ['force', 'power', 'field strength', 'potential difference'],
      topic: 'Electricity',
      correct: 3,
      explanation: 'Electric potential difference (voltage) is defined as the work done per unit charge moved between two points: V = W/q.',
      diveDeep: 'Potential difference ΔV = W/q, measured in volts (V = J/C). This is the fundamental definition of voltage. Electric field strength E = F/q (force per unit charge, N/C). Power P = W/t (work per unit time, W). Force F is not a "per charge" quantity. A common mistake is confusing electric potential difference with electric field strength — both involve charge but are defined differently (W/q vs. F/q). The volt is also expressible as N·m/C = J/C. This definition appears on the Regents reference table.'
    },
    {
      number: 19,
      part: 'A',
      text: 'A 2.0-meter length of copper wire is connected across a potential difference of 24 millivolts. The current through the wire is 0.40 ampere. The same copper wire at the same temperature is then connected across a potential difference of 48 millivolts. The current through the wire is',
      choices: ['0.20 A', '0.80 A', '0.40 A', '1.6 A'],
      topic: 'Electricity',
      correct: 1,
      explanation: 'By Ohm\'s law, R = V/I = 24 mV / 0.40 A = 60 mΩ (constant). At 48 mV: I = V/R = 48/60 mA × 1000 = 0.80 A.',
      diveDeep: "Ohm's law V = IR states that for a metallic conductor at constant temperature, current is proportional to voltage. Doubling the voltage doubles the current (resistance unchanged since temperature is the same). I = V/R = 48 mV / 60 mΩ = 0.80 A. A common mistake is thinking that doubling voltage halves current (inverting the relationship). The wire's resistance is constant because temperature doesn't change. This proportionality is a defining feature of ohmic conductors. Non-ohmic devices (like diodes) do not obey this linear relationship."
    },
    {
      number: 20,
      part: 'A',
      text: 'What is the magnitude of the gravitational force of attraction between two 0.425-kilogram soccer balls when the distance between their centers is 0.500 meter?',
      choices: ['2.41 × 10⁻¹¹ N', '5.67 × 10⁻¹¹ N', '4.82 × 10⁻¹¹ N', '1.13 × 10⁻¹⁰ N'],
      topic: 'Forces & Newton',
      correct: 1,
      explanation: 'F = Gm₁m₂/r² = (6.67 × 10⁻¹¹)(0.425)(0.425)/(0.500)² = (6.67 × 10⁻¹¹ × 0.1806)/0.250 ≈ 4.82 × 10⁻¹¹ N.',
      diveDeep: 'Using Newton\'s law of universal gravitation: F = Gm₁m₂/r². G = 6.67 × 10⁻¹¹ N·m²/kg², m₁ = m₂ = 0.425 kg, r = 0.500 m. F = (6.67 × 10⁻¹¹ × 0.425 × 0.425) / 0.250 = (6.67 × 10⁻¹¹ × 0.1806) / 0.250 ≈ 4.82 × 10⁻¹¹ N. This is an incredibly small force — illustrating why gravity between everyday objects is negligible. A common mistake is forgetting to square the distance. The answer must be checked against the reference table value of G = 6.67 × 10⁻¹¹ N·m²/kg².'
    },
    {
      number: 21,
      part: 'A',
      text: 'A sound wave produced by a loudspeaker can travel through water, but not through a vacuum. In comparison, a red light wave produced by a laser can travel through',
      choices: ['water, but not through a vacuum', 'a vacuum, but not through water', 'both water and a vacuum', 'neither water nor a vacuum'],
      topic: 'Waves & Sound',
      correct: 2,
      explanation: 'Light is an electromagnetic wave that can travel through both vacuum (no medium needed) and transparent materials like water. Sound requires a medium and cannot travel through vacuum.',
      diveDeep: 'Sound is a mechanical longitudinal wave requiring a medium (solid, liquid, or gas) to propagate — it cannot travel through vacuum. Light is an electromagnetic wave that does not require a medium and travels at c = 3.00 × 10⁸ m/s in vacuum. Light also travels through transparent media like water or glass (but more slowly). This fundamental distinction between mechanical and electromagnetic waves is heavily tested on the Regents. The speed of light in a medium is c/n, where n is the index of refraction.'
    },
    {
      number: 22,
      part: 'A',
      text: 'As a group of soldiers marches along a road, each soldier steps simultaneously. However, when crossing a bridge, the group does not step simultaneously in order to prevent the bridge from vibrating intensely. The phenomenon responsible for the intense vibrations is',
      choices: ['action and reaction', 'conservation of momentum', 'inertia', 'resonance'],
      topic: 'Waves & Sound',
      correct: 3,
      explanation: 'If soldiers step in unison at the bridge\'s natural frequency, resonance occurs — the bridge absorbs energy efficiently at that frequency, causing amplitude to build dangerously.',
      diveDeep: 'Resonance occurs when a driving force matches the natural (resonant) frequency of a system, causing energy absorption and amplitude growth. The Angers Bridge collapse in 1850 and other famous bridge failures were caused by resonance from synchronized marching. By breaking step, soldiers prevent the driving frequency from matching the bridge\'s natural frequency. This is the same phenomenon that can shatter a wine glass with a specific sound frequency. The Tacoma Narrows bridge (1940) collapsed due to wind-driven resonance, not marching, but the principle is similar.'
    },
    {
      number: 23,
      part: 'A',
      text: 'Which characteristics of a light wave remain constant when the light wave travels from air into corn oil?',
      choices: ['speed and frequency', 'wavelength and frequency', 'period and frequency', 'wavelength and period'],
      topic: 'Waves & Sound',
      correct: 2,
      explanation: 'When light enters a new medium, its speed and wavelength change, but its frequency (and therefore period T = 1/f) remain constant.',
      diveDeep: 'Frequency is determined by the source — it does not change when a wave enters a new medium. Speed and wavelength both change proportionally: v = fλ, so if v decreases by factor n (index of refraction), λ also decreases by the same factor. Period T = 1/f is constant since frequency is constant. This is why only frequency (or period) is constant across media. A common mistake is thinking speed is constant — it only equals c in vacuum. On the Regents, this concept is tested by asking which wave property stays the same during refraction.'
    },
    {
      number: 24,
      part: 'A',
      text: 'The speed of a light ray (f = 5.09 × 10¹⁴ Hz) in corn oil is',
      choices: ['1.47 × 10⁸ m/s', '3.00 × 10⁸ m/s', '2.04 × 10⁸ m/s', '4.41 × 10⁸ m/s'],
      topic: 'Waves & Sound',
      correct: 2,
      explanation: 'The index of refraction of corn oil is n ≈ 1.47 (from the Regents reference table). v = c/n = (3.00 × 10⁸) / 1.47 ≈ 2.04 × 10⁸ m/s.',
      diveDeep: 'The index of refraction n = c/v, so v = c/n. From the Regents reference table, n for corn oil ≈ 1.47. Thus v = 3.00 × 10⁸ / 1.47 ≈ 2.04 × 10⁸ m/s. The frequency (5.09 × 10¹⁴ Hz) is given but not needed for this calculation — it is extra information (or could be used to find wavelength). Choice A (1.47 × 10⁸) is simply the n value misidentified as speed. Choice B (3.00 × 10⁸) is the speed of light in vacuum. Always use n = c/v from the reference table for index of refraction problems.'
    }
  ]
}
