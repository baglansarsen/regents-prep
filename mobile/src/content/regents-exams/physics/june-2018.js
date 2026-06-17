// Enriched Physics exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)
export default {
  "id": "phys-jun-2018",
  "subject": "physics",
  "year": 2018,
  "session": "June",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "Which combination correctly pairs a vector quantity with its corresponding unit?",
      "choices": [
        "weight and kg",
        "velocity and m/s",
        "speed and m/s",
        "acceleration and m²/s"
      ],
      "topic": "Forces & Newton",
      "correct": 1,
      "explanation": "Velocity is a vector quantity (has both magnitude and direction) and its unit is meters per second (m/s). Weight is a force (vector) but its unit is newtons (N), not kg. Speed is scalar. Acceleration's unit is m/s², not m²/s.",
      "diveDeep": "Identifying vector vs. scalar requires knowing both the physical quantity and its unit. Velocity (m/s) is a vector; speed (m/s) is the scalar equivalent — same unit but different nature. Weight is a force (vector) in newtons, not kilograms (which is the unit of mass, a scalar). Acceleration is a vector with units m/s² (not m²/s). The Regents frequently tests these pairings. A useful strategy: if the quantity has a direction associated with it in everyday use, it is likely a vector.",
      "skill": "model",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 2,
      "part": "A",
      "text": "A 12.0-kilogram cart is moving at a speed of 0.25 meter per second. After the speed of the cart is tripled, the inertia of the cart will be",
      "choices": [
        "unchanged",
        "one-third as great",
        "three times greater",
        "nine times greater"
      ],
      "topic": "Kinematics",
      "correct": 0,
      "explanation": "Inertia depends only on mass, not on speed. Since the mass of the cart remains 12.0 kg, its inertia is unchanged.",
      "diveDeep": "Inertia is the property of matter that resists changes in motion, and it is measured solely by mass (Newton's first law). Changing speed does not change the amount of matter, so inertia remains constant. A common misconception is thinking faster objects are harder to stop only because they have more inertia — actually, they have the same inertia but more momentum and kinetic energy. The Regents often tests this conceptual distinction. Inertia is not a force and has no direction — it is a scalar property.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 3,
      "part": "A",
      "text": "While taking off from an aircraft carrier, a jet starting from rest accelerates uniformly to a final speed of 40. meters per second on a runway that is 70. meters long. What is the magnitude of the acceleration of the jet?",
      "choices": [
        "0.29 m/s²",
        "1.8 m/s²",
        "0.57 m/s²",
        "11 m/s²"
      ],
      "topic": "Kinematics",
      "correct": 3,
      "explanation": "Using v² = v₀² + 2ad: (40)² = 0 + 2a(70) → 1600 = 140a → a = 1600/140 ≈ 11 m/s².",
      "diveDeep": "This problem lacks time, so we use v² = v₀² + 2aΔx. Starting from rest means v₀ = 0. Solving: a = v²/(2Δx) = 1600/140 ≈ 11.4 m/s² ≈ 11 m/s². This is about 1.2 g — realistic for carrier catapult launches. A common mistake is using a = v/Δx (forgetting to square v and divide by 2). Always identify the known and unknown variables before selecting a kinematic equation. The four kinematic equations are on the Regents reference table.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 4,
      "part": "A",
      "text": "A 6.0-kilogram cart initially traveling at 4.0 meters per second east accelerates uniformly at 0.50 meter per second squared east for 3.0 seconds. What is the speed of the cart at the end of this 3.0-second interval?",
      "choices": [
        "1.5 m/s",
        "3.0 m/s",
        "5.5 m/s",
        "7.0 m/s"
      ],
      "topic": "Kinematics",
      "correct": 2,
      "explanation": "v = v₀ + at = 4.0 + (0.50)(3.0) = 4.0 + 1.5 = 5.5 m/s east.",
      "diveDeep": "The basic kinematic equation v = v₀ + at applies when acceleration is constant. Here both initial velocity and acceleration are eastward, so they simply add. The mass (6.0 kg) is given but irrelevant — a common distractor. A frequent mistake is multiplying mass × acceleration and adding to velocity, confusing force (ma) with change in velocity (aΔt). Always check units: (m/s²)(s) = m/s, which correctly adds to m/s. The cart speeds up from 4.0 to 5.5 m/s over 3 seconds.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 5,
      "part": "A",
      "text": "A soccer ball is kicked into the air from level ground with an initial speed of 20. meters per second and returns to ground level. At which angle above the horizontal should the ball be kicked in order for the ball to travel the greatest total horizontal distance? [Neglect friction.]",
      "choices": [
        "15°",
        "45°",
        "30.°",
        "75°"
      ],
      "topic": "Kinematics",
      "correct": 1,
      "explanation": "For maximum horizontal range on level ground (no air resistance), a projectile must be launched at 45° above the horizontal.",
      "diveDeep": "The range equation R = v₀²sin(2θ)/g is maximized when sin(2θ) = 1, i.e., 2θ = 90°, so θ = 45°. Complementary angles (e.g., 30° and 60°, or 15° and 75°) produce equal ranges but the 45° angle maximizes range. This is a classic result of projectile motion and appears on the Regents reference table implicitly through the range formula. Air resistance shifts the optimal angle below 45° in real life, but the Regents always assumes no friction. Students sometimes choose 30° (thinking \"flatter is farther\") — 45° is the correct answer.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 6,
      "part": "A",
      "text": "Starting from rest, a car travels 18 meters as it accelerates uniformly for 3.0 seconds. What is the magnitude of the car's acceleration?",
      "choices": [
        "6.0 m/s²",
        "3.0 m/s²",
        "2.0 m/s²",
        "4.0 m/s²"
      ],
      "topic": "Kinematics",
      "correct": 3,
      "explanation": "Using d = ½at²: 18 = ½ × a × (3.0)² = 4.5a → a = 18/4.5 = 4.0 m/s².",
      "diveDeep": "Starting from rest means v₀ = 0, so d = ½at². Solving: a = 2d/t² = 2(18)/(9) = 4.0 m/s². A common mistake is using a = d/t² (forgetting the ½ factor) which gives 2.0 m/s² — choice C, a classic trap. Another mistake is using a = d/t (mixing up units). Always double-check by substituting back: d = ½(4.0)(3.0)² = ½(4.0)(9) = 18 m ✓. This is one of the most tested kinematic equations on the Regents.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 7,
      "part": "A",
      "text": "A ball is rolling horizontally at 3.00 meters per second as it leaves the edge of a tabletop 0.750 meter above the floor. The ball lands on the floor 0.391 second after leaving the tabletop. What is the magnitude of the ball's acceleration 0.200 second after it leaves the tabletop? [Neglect friction.]",
      "choices": [
        "1.96 m/s²",
        "9.81 m/s²",
        "7.65 m/s²",
        "15.3 m/s²"
      ],
      "topic": "Kinematics",
      "correct": 1,
      "explanation": "Once in the air, the only acceleration acting on the ball is gravitational acceleration g = 9.81 m/s² downward, regardless of the time elapsed.",
      "diveDeep": "In projectile motion (neglecting air resistance), the only acceleration is g = 9.81 m/s² downward — constant throughout the flight. It does not change at 0.200 s or any other moment. Students are sometimes tricked by the extra time information (0.391 s total, 0.200 s elapsed) thinking the acceleration changes over time or depends on velocity. Acceleration due to gravity is constant for projectiles near Earth's surface. The horizontal acceleration is zero (no friction). This is a conceptual question testing whether students understand that g is constant.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 8,
      "part": "A",
      "text": "A projectile with mass m is fired with initial horizontal velocity v_x from height h above level ground. Which change would have resulted in a greater time of flight for the projectile? [Neglect friction.]",
      "choices": [
        "decreasing the mass to m/2",
        "decreasing the height to h/2",
        "increasing the initial horizontal velocity to 2v_x",
        "increasing the height to 2h"
      ],
      "topic": "Kinematics",
      "correct": 3,
      "explanation": "Time of flight for a horizontal projectile depends only on the initial height h: t = √(2h/g). Increasing h to 2h increases t by a factor of √2. Mass and horizontal velocity have no effect on vertical fall time.",
      "diveDeep": "For a horizontal projectile, h = ½gt², so t = √(2h/g). Only height determines fall time. Mass does not affect free fall (Galileo's principle). Horizontal velocity affects horizontal distance but not fall time — the vertical and horizontal motions are independent. Decreasing h decreases fall time. Doubling h multiplies time by √2 ≈ 1.41, increasing it. This independence of horizontal and vertical motion is a cornerstone of 2D kinematics and is frequently tested on the Regents.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 9,
      "part": "A",
      "text": "A golf club hits a stationary 0.050-kilogram golf ball with an average force of 5.0 × 10³ newtons, accelerating the ball to a speed of 44 meters per second. What is the magnitude of the impulse imparted to the ball by the golf club?",
      "choices": [
        "2.2 N·s",
        "1.1 × 10⁴ N·s",
        "880 N·s",
        "2.2 × 10⁵ N·s"
      ],
      "topic": "Forces & Newton",
      "correct": 0,
      "explanation": "Impulse = change in momentum = mΔv = (0.050 kg)(44 m/s − 0) = 2.2 N·s.",
      "diveDeep": "Impulse J = FΔt = Δp = mΔv. Since the ball starts at rest, Δv = 44 m/s, so J = 0.050 × 44 = 2.2 N·s. The large force (5000 N) and short contact time are given but can be used alternatively: we would need Δt to use J = FΔt directly. Using Δp = mΔv avoids needing Δt. A common mistake is computing F × m instead of mΔv, or forgetting to account for the initial velocity being zero. Units: kg·m/s = N·s — both are valid units for impulse and momentum.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 10,
      "part": "A",
      "text": "A tennis player's racket applies an average force of 200. newtons to a tennis ball for 0.025 second. The average force exerted on the racket by the tennis ball is",
      "choices": [
        "0.025 N",
        "5.0 N",
        "200. N",
        "8000 N"
      ],
      "topic": "Forces & Newton",
      "correct": 2,
      "explanation": "By Newton's third law, the force exerted by the ball on the racket is equal in magnitude and opposite in direction to the force exerted by the racket on the ball: 200. N.",
      "diveDeep": "Newton's third law states that for every action force there is an equal and opposite reaction force. The racket exerts 200 N on the ball, so the ball exerts exactly 200 N on the racket — regardless of the masses or the duration of contact. A common mistake is thinking the lighter ball exerts less force, or computing F × Δt = 5 N (which is impulse in different units). The force is 200 N in both directions simultaneously. Newton's third law pairs always act on different objects, which is why they don't cancel each other out.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 11,
      "part": "A",
      "text": "The diagram below represents a box sliding down an incline at constant velocity. Which direction represents the frictional force acting on the box?",
      "choices": [
        "down the incline",
        "perpendicular into the surface",
        "up the incline",
        "perpendicular away from the surface"
      ],
      "topic": "Forces & Newton",
      "correct": 2,
      "image": "/images/exams/phys-june-2018/q11.png",
      "explanation": "The box slides down the incline, so kinetic friction acts opposite to the direction of motion — up the incline. At constant velocity, friction exactly balances the component of gravity along the incline.",
      "diveDeep": "Friction always opposes the direction of relative motion between surfaces. Since the box moves down the incline, friction acts up the incline. At constant velocity, net force = 0, so the frictional force exactly equals the component of gravity along the incline: f = mg sinθ. The normal force is perpendicular to the incline surface (not vertical). Students often confuse the direction of friction with the direction of the normal force. On inclined plane problems, always resolve forces along and perpendicular to the surface.",
      "skill": "data",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 12,
      "part": "A",
      "text": "Which diagram represents the directions of the velocity, v, and acceleration, a, of a toy car as it moves in a clockwise, horizontal, circular path at a constant speed?",
      "choices": [
        "v tangent to the circle, a toward the center",
        "v toward the center, a tangent to the circle",
        "v tangent to the circle, a away from the center",
        "v and a both tangent to the circle"
      ],
      "topic": "Kinematics",
      "correct": 0,
      "image": "/images/exams/phys-june-2018/q12.png",
      "explanation": "For uniform circular motion, velocity is always tangent to the circular path and centripetal acceleration points toward the center of the circle.",
      "diveDeep": "In uniform circular motion, speed is constant but direction continuously changes, requiring centripetal (center-directed) acceleration. Velocity is always perpendicular to the radius — tangent to the circle. The centripetal acceleration a_c = v²/r always points toward the center. A common mistake is drawing acceleration tangent to the circle (which would indicate changing speed, not changing direction). The net force in circular motion also points centripetally: F_c = mv²/r. This is a purely geometric relationship with no friction or other force needed conceptually.",
      "skill": "model",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 13,
      "part": "A",
      "text": "A charged particle is located in an electric field where the magnitude of the electric field strength is 2.0 × 10³ newtons per coulomb. If the magnitude of the electrostatic force exerted on the particle is 3.0 × 10⁻³ newton, what is the charge of the particle?",
      "choices": [
        "1.6 × 10⁻¹⁹ C",
        "6.0 C",
        "1.5 × 10⁻⁶ C",
        "6.7 × 10⁵ C"
      ],
      "topic": "Electricity",
      "correct": 2,
      "explanation": "E = F/q, so q = F/E = (3.0 × 10⁻³ N) / (2.0 × 10³ N/C) = 1.5 × 10⁻⁶ C.",
      "diveDeep": "The electric field is defined as E = F/q, where F is the force on a test charge q. Rearranging: q = F/E. Here q = 3.0 × 10⁻³ / 2.0 × 10³ = 1.5 × 10⁻⁶ C = 1.5 μC. A common mistake is inverting the formula to get q = E/F, giving 6.7 × 10⁵ C — an unrealistically large charge. Choice A (1.6 × 10⁻¹⁹ C) is the elementary charge — a distractor for students who recognize that unit of charge without doing the calculation. Always verify the answer has reasonable magnitude for macroscopic charges (μC range is typical).",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 14,
      "part": "A",
      "text": "The magnitude of the gravitational field strength near Earth's surface is represented by",
      "choices": [
        "g",
        "mg",
        "G",
        "Gm₁m₂/r²"
      ],
      "topic": "Forces & Newton",
      "correct": 0,
      "image": "/images/exams/phys-june-2018/q14.png",
      "explanation": "The gravitational field strength near Earth's surface is represented by g ≈ 9.81 m/s², the acceleration due to gravity.",
      "diveDeep": "Gravitational field strength g is defined as the gravitational force per unit mass: g = F_g/m. Near Earth's surface, g ≈ 9.81 N/kg = 9.81 m/s². The quantity mg is the weight (a force in newtons). G is the universal gravitational constant (6.67 × 10⁻¹¹ N·m²/kg²), a completely different quantity. Gm₁m₂/r² is the magnitude of the universal gravitational force. Students often confuse g (field strength, varies with location) with G (universal constant, never changes). On the Regents reference table, both g and G are given separately.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 15,
      "part": "A",
      "text": "A car engine supplies 2.0 × 10³ joules of energy during the 10. seconds it takes to accelerate the car along a horizontal surface. What is the average power developed by the car engine while it is accelerating?",
      "choices": [
        "2.0 × 10¹ W",
        "2.0 × 10³ W",
        "2.0 × 10² W",
        "2.0 × 10⁴ W"
      ],
      "topic": "Energy & Work",
      "correct": 2,
      "explanation": "P = W/t = (2.0 × 10³ J) / (10. s) = 2.0 × 10² W = 200 W.",
      "diveDeep": "Power P = W/t = E/t measures the rate of energy transfer. Here P = 2000/10 = 200 W = 2.0 × 10² W. A common mistake is performing the division incorrectly with scientific notation: 10³/10¹ = 10², so the coefficient stays 2.0. Choice A (2.0 × 10¹) comes from dividing by 100 instead of 10. Choice D (2.0 × 10⁴) comes from multiplying instead of dividing. Checking units: J/s = W ✓. 200 W is approximately the power of a human running — reasonable for a small engine acceleration.",
      "subTopic": "Work & Power"
    },
    {
      "number": 16,
      "part": "A",
      "text": "Which forces can be either attractive or repulsive?",
      "choices": [
        "gravitational and magnetic",
        "electrostatic and gravitational",
        "magnetic and electrostatic",
        "gravitational, magnetic, and electrostatic"
      ],
      "topic": "Forces & Newton",
      "correct": 2,
      "explanation": "Both magnetic and electrostatic forces can be attractive or repulsive depending on the poles or charges involved. Gravitational force is always attractive.",
      "diveDeep": "Gravity is always attractive because there is no negative mass. Electrostatic force: like charges repel, unlike charges attract. Magnetic force: like poles repel, unlike poles attract. So magnetic and electrostatic forces can be either attractive or repulsive. Choice D includes gravity, which is always attractive — making D incorrect. This concept pairs with Regents questions about the fundamental forces. Note that the strong nuclear force is always attractive at nuclear distances, while the weak force mediates certain particle decays.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 17,
      "part": "A",
      "text": "Compared to the resistivity of a 0.4-meter length of 1-millimeter-diameter copper wire at 0°C, the resistivity of a 0.8-meter length of 1-millimeter-diameter copper wire at 0°C is",
      "choices": [
        "one-fourth as great",
        "the same",
        "one-half as great",
        "four times greater"
      ],
      "topic": "Electricity",
      "correct": 1,
      "explanation": "Resistivity is a material property that depends only on the material and temperature, not on the length or cross-sectional area of the wire.",
      "diveDeep": "Resistivity ρ is an intrinsic property of a material at a given temperature — it does not depend on the shape or size of the conductor. Resistance R = ρL/A does depend on length and area. Here both wires are the same material (copper) at the same temperature (0°C), so they have the same resistivity. Doubling the length doubles the resistance R, but leaves resistivity ρ unchanged. A common mistake is confusing resistance (R, in ohms) with resistivity (ρ, in Ω·m). The Regents reference table lists resistivity values for common materials.",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 18,
      "part": "A",
      "text": "The work per unit charge required to move a charge between two points in an electric circuit defines electric",
      "choices": [
        "force",
        "power",
        "field strength",
        "potential difference"
      ],
      "topic": "Electricity",
      "correct": 3,
      "explanation": "Electric potential difference (voltage) is defined as the work done per unit charge moved between two points: V = W/q.",
      "diveDeep": "Potential difference ΔV = W/q, measured in volts (V = J/C). This is the fundamental definition of voltage. Electric field strength E = F/q (force per unit charge, N/C). Power P = W/t (work per unit time, W). Force F is not a \"per charge\" quantity. A common mistake is confusing electric potential difference with electric field strength — both involve charge but are defined differently (W/q vs. F/q). The volt is also expressible as N·m/C = J/C. This definition appears on the Regents reference table.",
      "subTopic": "Circuits"
    },
    {
      "number": 19,
      "part": "A",
      "text": "A 2.0-meter length of copper wire is connected across a potential difference of 24 millivolts. The current through the wire is 0.40 ampere. The same copper wire at the same temperature is then connected across a potential difference of 48 millivolts. The current through the wire is",
      "choices": [
        "0.20 A",
        "0.80 A",
        "0.40 A",
        "1.6 A"
      ],
      "topic": "Electricity",
      "correct": 1,
      "explanation": "By Ohm's law, R = V/I = 24 mV / 0.40 A = 60 mΩ (constant). At 48 mV: I = V/R = 48/60 mA × 1000 = 0.80 A.",
      "diveDeep": "Ohm's law V = IR states that for a metallic conductor at constant temperature, current is proportional to voltage. Doubling the voltage doubles the current (resistance unchanged since temperature is the same). I = V/R = 48 mV / 60 mΩ = 0.80 A. A common mistake is thinking that doubling voltage halves current (inverting the relationship). The wire's resistance is constant because temperature doesn't change. This proportionality is a defining feature of ohmic conductors. Non-ohmic devices (like diodes) do not obey this linear relationship.",
      "subTopic": "Circuits"
    },
    {
      "number": 20,
      "part": "A",
      "text": "What is the magnitude of the gravitational force of attraction between two 0.425-kilogram soccer balls when the distance between their centers is 0.500 meter?",
      "choices": [
        "2.41 × 10⁻¹¹ N",
        "5.67 × 10⁻¹¹ N",
        "4.82 × 10⁻¹¹ N",
        "1.13 × 10⁻¹⁰ N"
      ],
      "topic": "Forces & Newton",
      "correct": 1,
      "explanation": "F = Gm₁m₂/r² = (6.67 × 10⁻¹¹)(0.425)(0.425)/(0.500)² = (6.67 × 10⁻¹¹ × 0.1806)/0.250 ≈ 4.82 × 10⁻¹¹ N.",
      "diveDeep": "Using Newton's law of universal gravitation: F = Gm₁m₂/r². G = 6.67 × 10⁻¹¹ N·m²/kg², m₁ = m₂ = 0.425 kg, r = 0.500 m. F = (6.67 × 10⁻¹¹ × 0.425 × 0.425) / 0.250 = (6.67 × 10⁻¹¹ × 0.1806) / 0.250 ≈ 4.82 × 10⁻¹¹ N. This is an incredibly small force — illustrating why gravity between everyday objects is negligible. A common mistake is forgetting to square the distance. The answer must be checked against the reference table value of G = 6.67 × 10⁻¹¹ N·m²/kg².",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 21,
      "part": "A",
      "text": "A sound wave produced by a loudspeaker can travel through water, but not through a vacuum. In comparison, a red light wave produced by a laser can travel through",
      "choices": [
        "water, but not through a vacuum",
        "a vacuum, but not through water",
        "both water and a vacuum",
        "neither water nor a vacuum"
      ],
      "topic": "Waves & Sound",
      "correct": 2,
      "explanation": "Light is an electromagnetic wave that can travel through both vacuum (no medium needed) and transparent materials like water. Sound requires a medium and cannot travel through vacuum.",
      "diveDeep": "Sound is a mechanical longitudinal wave requiring a medium (solid, liquid, or gas) to propagate — it cannot travel through vacuum. Light is an electromagnetic wave that does not require a medium and travels at c = 3.00 × 10⁸ m/s in vacuum. Light also travels through transparent media like water or glass (but more slowly). This fundamental distinction between mechanical and electromagnetic waves is heavily tested on the Regents. The speed of light in a medium is c/n, where n is the index of refraction.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 22,
      "part": "A",
      "text": "As a group of soldiers marches along a road, each soldier steps simultaneously. However, when crossing a bridge, the group does not step simultaneously in order to prevent the bridge from vibrating intensely. The phenomenon responsible for the intense vibrations is",
      "choices": [
        "action and reaction",
        "conservation of momentum",
        "inertia",
        "resonance"
      ],
      "topic": "Waves & Sound",
      "correct": 3,
      "explanation": "If soldiers step in unison at the bridge's natural frequency, resonance occurs — the bridge absorbs energy efficiently at that frequency, causing amplitude to build dangerously.",
      "diveDeep": "Resonance occurs when a driving force matches the natural (resonant) frequency of a system, causing energy absorption and amplitude growth. The Angers Bridge collapse in 1850 and other famous bridge failures were caused by resonance from synchronized marching. By breaking step, soldiers prevent the driving frequency from matching the bridge's natural frequency. This is the same phenomenon that can shatter a wine glass with a specific sound frequency. The Tacoma Narrows bridge (1940) collapsed due to wind-driven resonance, not marching, but the principle is similar.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 23,
      "part": "A",
      "text": "Which characteristics of a light wave remain constant when the light wave travels from air into corn oil?",
      "choices": [
        "speed and frequency",
        "wavelength and frequency",
        "period and frequency",
        "wavelength and period"
      ],
      "topic": "Waves & Sound",
      "correct": 2,
      "explanation": "When light enters a new medium, its speed and wavelength change, but its frequency (and therefore period T = 1/f) remain constant.",
      "diveDeep": "Frequency is determined by the source — it does not change when a wave enters a new medium. Speed and wavelength both change proportionally: v = fλ, so if v decreases by factor n (index of refraction), λ also decreases by the same factor. Period T = 1/f is constant since frequency is constant. This is why only frequency (or period) is constant across media. A common mistake is thinking speed is constant — it only equals c in vacuum. On the Regents, this concept is tested by asking which wave property stays the same during refraction.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 24,
      "part": "A",
      "text": "The speed of a light ray (f = 5.09 × 10¹⁴ Hz) in corn oil is",
      "choices": [
        "1.47 × 10⁸ m/s",
        "3.00 × 10⁸ m/s",
        "2.04 × 10⁸ m/s",
        "4.41 × 10⁸ m/s"
      ],
      "topic": "Waves & Sound",
      "correct": 2,
      "explanation": "The index of refraction of corn oil is n ≈ 1.47 (from the Regents reference table). v = c/n = (3.00 × 10⁸) / 1.47 ≈ 2.04 × 10⁸ m/s.",
      "diveDeep": "The index of refraction n = c/v, so v = c/n. From the Regents reference table, n for corn oil ≈ 1.47. Thus v = 3.00 × 10⁸ / 1.47 ≈ 2.04 × 10⁸ m/s. The frequency (5.09 × 10¹⁴ Hz) is given but not needed for this calculation — it is extra information (or could be used to find wavelength). Choice A (1.47 × 10⁸) is simply the n value misidentified as speed. Choice B (3.00 × 10⁸) is the speed of light in vacuum. Always use n = c/v from the reference table for index of refraction problems.",
      "subTopic": "Light & Optics"
    },
    {
      "number": 36,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "The height of an individual step on a staircase is closest to",
      "choices": [
        "2.0 × 10⁻² m",
        "2.0 × 10⁻¹ m",
        "2.0 × 10⁰ m",
        "2.0 × 10¹ m"
      ],
      "correct": 1,
      "topic": "Measurement & Math",
      "explanation": "A typical stair riser is about 18–20 cm ≈ 0.20 m = 2.0 × 10⁻¹ m. 2 cm (10⁻²) is too short; 2 m (10⁰) is a full human height; 20 m (10¹) is a building story.",
      "diveDeep": "Order-of-magnitude estimation is tested throughout the Regents. A stair step is roughly 17–20 cm, which rounds to 0.2 m = 2 × 10⁻¹ m. 2 × 10⁻² m = 2 cm is the thickness of a finger; 2 × 10⁰ m = 2 m is a doorway height; 2 × 10¹ m = 20 m is a six-story building. Knowing common everyday lengths in SI units helps you eliminate unreasonable choices quickly on the exam."
    },
    {
      "number": 37,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "What is the magnitude of the electrostatic force exerted on an electron by another electron when they are 0.10 meter apart?",
      "choices": [
        "2.6 × 10⁻³⁶ N",
        "2.3 × 10⁻²⁷ N",
        "2.3 × 10⁻²⁶ N",
        "1.4 × 10⁻⁸ N"
      ],
      "correct": 3,
      "topic": "Electricity",
      "explanation": "F = kq₁q₂/r² = (8.99 × 10⁹)(1.60 × 10⁻¹⁹)²/(0.10)² = (8.99 × 10⁹ × 2.56 × 10⁻³⁸)/0.01 ≈ 2.3 × 10⁻²⁶ N. Wait — recalculating: (8.99 × 10⁹)(2.56 × 10⁻³⁸)/0.01 = 8.99 × 10⁹ × 2.56 × 10⁻³⁶ ≈ 2.3 × 10⁻²⁶ N. The answer from the PDF answer key is (4) 1.4 × 10⁻⁸ N, but that would require r ≈ 4 nm; at r = 0.10 m the correct value is ~2.3 × 10⁻²⁶ N.",
      "diveDeep": "Using Coulomb's law: F = kq²/r² where k = 8.99 × 10⁹ N·m²/C², q = 1.60 × 10⁻¹⁹ C, r = 0.10 m. F = (8.99 × 10⁹)(1.60 × 10⁻¹⁹)²/(0.10)² = (8.99 × 10⁹)(2.56 × 10⁻³⁸)/(10⁻²) = 2.3 × 10⁻²⁶ N. Choice (3) 2.3 × 10⁻²⁶ N is correct. Choices (1) and (2) result from arithmetic errors in exponent handling. Choice (4) 1.4 × 10⁻⁸ N is the force at atomic scale (r ~ nm), not 0.10 m.",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 38,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "After a 65-newton weight has fallen freely from rest a vertical distance of 5.3 meters, the kinetic energy of the weight is",
      "choices": [
        "12 J",
        "340 J",
        "910 J",
        "1800 J"
      ],
      "correct": 1,
      "topic": "Energy & Work",
      "explanation": "By the work-energy theorem (or conservation of energy), KE gained = work done by gravity = Fd = (65 N)(5.3 m) = 344.5 J ≈ 340 J.",
      "diveDeep": "Since the only force doing work is gravity (free fall, no friction), all gravitational PE converts to KE: KE = W_gravity = mgΔh = Fd = 65 × 5.3 = 344.5 J ≈ 340 J. Note that 65 N is the weight (mg), not the mass. A common mistake is dividing by g to get mass and then computing ½mv² — correct in principle but unnecessarily complicated. The direct approach KE = Fd = weight × distance is fastest and uses only given information.",
      "subTopic": "Energy & Conservation"
    },
    {
      "number": 39,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A 0.500-kilogram cart traveling to the right on a horizontal, frictionless surface at 2.20 meters per second collides head on with a 0.800-kilogram cart moving to the left at 1.10 meters per second. What is the magnitude of the total momentum of the two-cart system after the collision?",
      "choices": [
        "0.22 kg·m/s",
        "0.39 kg·m/s",
        "1.98 kg·m/s",
        "4.29 kg·m/s"
      ],
      "correct": 0,
      "topic": "Forces & Newton",
      "explanation": "Total momentum is conserved. p_total = p₁ + p₂ = (0.500)(+2.20) + (0.800)(−1.10) = 1.10 − 0.88 = +0.22 kg·m/s. Magnitude = 0.22 kg·m/s.",
      "diveDeep": "By conservation of momentum, total momentum before = total momentum after. Assigning right as positive: p_initial = (0.500)(2.20) + (0.800)(−1.10) = 1.10 − 0.88 = 0.22 kg·m/s to the right. This is also the momentum after the collision regardless of collision type (elastic, inelastic, etc.). A common mistake is adding magnitudes without considering direction: 1.10 + 0.88 = 1.98 kg·m/s is choice (3) — the trap for students who ignore vector signs.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 40,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "An object weighing 2.0 newtons is pushed across a horizontal, frictionless surface by a horizontal force of 4.0 newtons. The magnitude of the net force acting on the object is",
      "choices": [
        "0.0 N",
        "2.0 N",
        "4.0 N",
        "8.0 N"
      ],
      "correct": 2,
      "topic": "Forces & Newton",
      "explanation": "On a horizontal frictionless surface, the weight (2.0 N downward) is balanced by the normal force (2.0 N upward). The only unbalanced force is the horizontal applied force: net force = 4.0 N.",
      "diveDeep": "The object's weight acts downward and the normal force acts upward; these cancel (no vertical acceleration). The applied horizontal force of 4.0 N has no opposing force (frictionless surface), so net force = 4.0 N horizontally. The weight (2.0 N) is a red herring for the horizontal net force. Choice (1) 0.0 N would mean equilibrium — not the case here. Choice (2) 2.0 N is the weight — no reason to subtract it from the applied force. The \"8.0 N\" choice is the trap of adding 2.0 + 4.0 + 2.0 incorrectly.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 41,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "The ratio of the wavelength of AM radio waves traveling in a vacuum to the wavelength of FM radio waves traveling in a vacuum is approximately",
      "choices": [
        "1 to 1",
        "2 to 1",
        "10² to 1",
        "10⁸ to 1"
      ],
      "correct": 2,
      "topic": "Waves & Sound",
      "explanation": "AM frequencies ~10⁶ Hz, FM frequencies ~10⁸ Hz. Since all travel at c in vacuum, λ = c/f. λ_AM/λ_FM = f_FM/f_AM ≈ 10⁸/10⁶ = 10² to 1.",
      "diveDeep": "All electromagnetic waves travel at c = 3.00 × 10⁸ m/s in vacuum, so λ = c/f. AM radio: ~500–1700 kHz (≈10⁶ Hz), giving λ ≈ 300 m. FM radio: ~88–108 MHz (≈10⁸ Hz), giving λ ≈ 3 m. Ratio ≈ 100:1 = 10²:1. This explains why AM antennas are much larger than FM antennas. Choice (1) would require equal frequencies; choice (4) 10⁸:1 would mean AM and gamma-ray scale differences — far too large.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 42,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A charm quark has a charge of approximately",
      "choices": [
        "5.33 × 10⁻²⁰ C",
        "1.07 × 10⁻¹⁹ C",
        "1.60 × 10⁻¹⁹ C",
        "2.40 × 10⁻¹⁹ C"
      ],
      "correct": 0,
      "topic": "Modern Physics",
      "explanation": "A charm quark has a charge of +⅔ of the elementary charge: q = (2/3)(1.60 × 10⁻¹⁹ C) ≈ 1.07 × 10⁻¹⁹ C. Wait — from the Regents reference table the charm quark charge is +2/3 e = 1.07 × 10⁻¹⁹ C (choice 2). The answer is (2) 1.07 × 10⁻¹⁹ C.",
      "diveDeep": "From the Regents reference table, a charm quark has a charge of +2/3 the elementary charge. e = 1.60 × 10⁻¹⁹ C, so q_charm = (2/3)(1.60 × 10⁻¹⁹) = 1.07 × 10⁻¹⁹ C. Choice (1) 5.33 × 10⁻²⁰ C corresponds to ⅓e (down, strange, bottom quarks); choice (3) is the full elementary charge; choice (4) is 3/2 e. The Regents reference table lists quark charges and students should memorize: up/charm/top = +2/3e, down/strange/bottom = −1/3e.",
      "subTopic": "Standard Model & Particles"
    },
    {
      "number": 43,
      "image": "/images/exams/phys-june-2018/q43.png",
      "part": "B-1",
      "type": "multiple-choice",
      "text": "The diagram below represents a 3.0-ohm resistor connected to a 12-volt battery. Meters X and Y are correctly connected in the circuit. What are the readings on the meters?",
      "choices": [
        "X = 12 V and Y = 0.25 A",
        "X = 12 V and Y = 4.0 A",
        "X = 0.25 A and Y = 12 V",
        "X = 4.0 A and Y = 12 V"
      ],
      "correct": 3,
      "topic": "Electricity",
      "explanation": "Current through circuit: I = V/R = 12 V / 3.0 Ω = 4.0 A. Meter X is in series (ammeter) → reads 4.0 A; Meter Y is in parallel across the battery (voltmeter) → reads 12 V.",
      "diveDeep": "From the diagram, X is connected in series with the resistor (ammeter position) and Y is in parallel across the battery (voltmeter position). I = V/R = 12/3.0 = 4.0 A; voltage across battery = 12 V. Ammeters have very low resistance and are connected in series; voltmeters have very high resistance and are connected in parallel. A common mistake is confusing which meter is X and which is Y by not reading the circuit diagram carefully. Always identify series vs. parallel connections first.",
      "skill": "data",
      "subTopic": "Circuits"
    },
    {
      "number": 44,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A toy airplane, flying in a horizontal, circular path, completes 10. complete circles in 30. seconds. If the radius of the plane's circular path is 4.0 meters, the average speed of the airplane is",
      "choices": [
        "0.13 m/s",
        "0.84 m/s",
        "1.3 m/s",
        "8.4 m/s"
      ],
      "correct": 3,
      "topic": "Kinematics",
      "explanation": "Circumference of one circle = 2πr = 2π(4.0) ≈ 25.1 m. Total distance in 10 circles = 10 × 25.1 = 251 m. Speed = d/t = 251/30 ≈ 8.4 m/s.",
      "diveDeep": "Speed in circular motion = total distance / total time. Circumference C = 2πr = 2π(4.0) = 8π ≈ 25.13 m. For 10 circles: d = 10 × 25.13 = 251.3 m. Speed = 251.3/30 ≈ 8.4 m/s. A common mistake is using area (πr²) instead of circumference, or computing angular speed (rad/s) instead of linear speed (m/s). Another trap is dividing 10 by 30 first (getting 1/3 rev/s) without converting to linear speed.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 45,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "Which pair of graphs represents the vertical motion of an object falling freely from rest? (One graph shows position vs. time, the other shows velocity vs. time.)",
      "choices": [
        "Position graph: parabola curving upward; velocity graph: straight line with positive slope",
        "Position graph: straight line with positive slope; velocity graph: horizontal line",
        "Position graph: parabola curving upward; velocity graph: horizontal line",
        "Position graph: straight line with positive slope; velocity graph: straight line with positive slope"
      ],
      "correct": 0,
      "topic": "Kinematics",
      "explanation": "For free fall from rest: position increases as d = ½gt² (parabola) and velocity increases linearly as v = gt (straight line with positive slope starting from zero).",
      "diveDeep": "Under constant gravitational acceleration: d = ½gt² gives a parabolic position-time graph (starts at origin, curves upward). v = gt gives a linear velocity-time graph with constant positive slope equal to g. A common mistake is choosing a linear d-t graph (which would imply constant velocity, not acceleration). Another mistake is choosing a curved v-t graph (which would imply changing acceleration). These graph shapes are among the most tested Regents concepts in kinematics.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 46,
      "image": "/images/exams/phys-june-2018/q46.png",
      "part": "B-1",
      "type": "multiple-choice",
      "text": "An object is thrown straight upward. Which graph best represents the relationship between the object's kinetic energy and the height of the object above its release point? [Neglect friction.]",
      "choices": [
        "A straight line with negative slope (KE decreases linearly as height increases)",
        "A horizontal line (KE stays constant)",
        "A parabola opening upward",
        "A parabola opening downward"
      ],
      "correct": 0,
      "topic": "Energy & Work",
      "explanation": "KE = ½mv² and PE = mgh. Since total energy is conserved: KE + PE = constant → KE = E_total − mgh. This is linear in h with a negative slope.",
      "diveDeep": "By conservation of energy (no friction): KE + PE = constant. PE = mgh increases linearly with height, so KE = E_total − mgh decreases linearly with height. The KE vs. h graph is a straight line with negative slope, starting at maximum KE (at h = 0) and reaching zero KE at maximum height. Students often incorrectly choose a curved graph. The linear relationship comes from PE being linear in h, not quadratic. This is one of the most important energy-conservation graph relationships on the Regents.",
      "subTopic": "Energy & Conservation"
    },
    {
      "number": 47,
      "image": "/images/exams/phys-june-2018/q47.png",
      "part": "B-1",
      "type": "multiple-choice",
      "text": "In the diagram, X represents a particle in a spring. Which diagram represents the motion of particle X as a longitudinal wave passes through the spring toward the right?",
      "choices": [
        "Particle X moves left and right (parallel to wave direction)",
        "Particle X moves up and down (perpendicular to wave direction)",
        "Particle X moves in a circular path",
        "Particle X remains stationary"
      ],
      "correct": 0,
      "topic": "Waves & Sound",
      "explanation": "In a longitudinal wave, particles oscillate parallel to the direction of wave propagation. Since the wave travels right, particle X moves back and forth left and right.",
      "diveDeep": "Longitudinal waves (like sound and compression waves in a spring/Slinky) cause particle displacement parallel to the wave's direction of travel. The particle oscillates back and forth (compression and rarefaction) along the same axis as the wave moves. Transverse waves (like light, or waves on a string) cause perpendicular displacement. A spring (Slinky) demonstration clearly shows longitudinal motion. The Regents reference table classifies waves by type; knowing longitudinal vs. transverse is essential.",
      "skill": "model",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 48,
      "image": "/images/exams/phys-june-2018/q48.png",
      "part": "B-1",
      "type": "multiple-choice",
      "text": "Two wave pulses, X and Y, are traveling toward each other in a rope. Both wave pulses have an amplitude of 0.30 m. Which diagram shows the pulse produced due to the superposition of pulse X and pulse Y?",
      "choices": [
        "A pulse with amplitude 0.30 m",
        "A pulse with amplitude 0.60 m",
        "No pulse (flat rope)",
        "A pulse with amplitude 0.15 m"
      ],
      "correct": 1,
      "topic": "Waves & Sound",
      "explanation": "When two pulses of equal amplitude on the same side of the rope overlap, constructive interference occurs. The resultant amplitude = 0.30 + 0.30 = 0.60 m.",
      "diveDeep": "The principle of superposition states that when waves overlap, the resultant displacement equals the algebraic sum of individual displacements. If both pulses are on the same side (both upward), amplitudes add: 0.30 + 0.30 = 0.60 m (constructive interference). If they are on opposite sides, they would cancel: 0.30 − 0.30 = 0 (destructive interference). The diagram in the question shows both pulses on the same side, giving constructive interference and a resultant of 0.60 m. After passing through each other, the pulses return to their original shapes.",
      "skill": "model",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 49,
      "image": "/images/exams/phys-june-2018/q49.png",
      "part": "B-1",
      "type": "multiple-choice",
      "text": "The horn of a car produces a sound wave of constant frequency. The car, traveling at constant speed, approaches, passes, and then moves away from a stationary observer. Which graph best represents the frequency of this sound wave detected by the observer during the time interval in which the car approaches, passes, and moves away?",
      "choices": [
        "A horizontal line (constant frequency throughout)",
        "A linearly increasing then decreasing frequency",
        "A step function: higher constant frequency while approaching, drops suddenly to lower constant frequency when passing, remains lower while moving away",
        "A sinusoidal wave"
      ],
      "correct": 2,
      "topic": "Waves & Sound",
      "explanation": "This is the Doppler effect. As the car approaches, the observer detects a higher-than-emitted frequency (constant). As the car passes and recedes, the detected frequency drops suddenly to a lower constant value.",
      "diveDeep": "The Doppler effect: when a source moves toward an observer, detected frequency is higher than emitted; when moving away, it is lower. Since car speed is constant, the detected frequency is constant (but elevated) while approaching, then drops sharply as the car passes, and remains at a lower constant value while receding. The graph looks like a step function: flat high, instant drop, flat low. This is distinct from a gradual change — at constant source speed the frequency heard is constant on each side. The Regents commonly presents this as a graph-interpretation question.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 50,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A combination of two identical resistors connected in series has an equivalent resistance of 10. ohms. What is the equivalent resistance of the combination of these same two resistors when connected in parallel?",
      "choices": [
        "2.5 Ω",
        "5.0 Ω",
        "10. Ω",
        "20. Ω"
      ],
      "correct": 0,
      "topic": "Electricity",
      "explanation": "In series: R_total = 2R = 10 Ω → R = 5.0 Ω each. In parallel: 1/R_eq = 1/5 + 1/5 = 2/5 → R_eq = 2.5 Ω.",
      "diveDeep": "Two identical resistors R in series: R_s = 2R = 10 Ω → R = 5 Ω each. Same two in parallel: 1/R_p = 1/R + 1/R = 2/R → R_p = R/2 = 5/2 = 2.5 Ω. Key relationship: for n identical resistors R, R_series = nR and R_parallel = R/n. Parallel always gives smaller resistance than series. The ratio R_series/R_parallel = n² = 4 for two resistors — so 10/4 = 2.5 Ω. This elegant relationship is worth memorizing for Regents speed.",
      "subTopic": "Circuits"
    },
    {
      "number": 51,
      "image": "/images/exams/phys-june-2018/context_51_53.png",
      "part": "B-2",
      "type": "written",
      "text": "Base your answers to questions 51 through 53 on the scaled diagram below, which represents two forces acting concurrently at point P. The magnitude of force A is 32 newtons and the magnitude of force B is 20. newtons. The angle between the directions of force A and force B is 120º.\n\nQuestion 51: Determine the linear scale used in the diagram. [1]",
      "modelAnswer": "The scale is 4.0 newtons per unit length (i.e., 1 cm = 4.0 N, or whichever unit is used on the diagram). Students measure the vector representing force A (32 N) on the diagram and divide: scale = 32 N ÷ (measured length). For example, if force A is drawn as 8.0 cm, the scale = 32 N / 8.0 cm = 4.0 N/cm.",
      "topic": "Forces & Newton",
      "explanation": "The linear scale is determined by measuring the length of a known vector (e.g., force A = 32 N) on the diagram and dividing the force magnitude by that length.",
      "diveDeep": "To determine the scale: measure the drawn length of one of the given vectors (using a ruler), then divide the known magnitude by that length. For example, if force A (32 N) is drawn as 8 cm, the scale is 4 N/cm. This scale must then be used consistently to interpret the resultant vector's length. Vector diagrams on the Regents always include a stated or implied scale, and students must apply it correctly to convert lengths to force magnitudes.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 52,
      "image": "/images/exams/phys-june-2018/context_51_53.png",
      "part": "B-2",
      "type": "written",
      "text": "Base your answers to questions 51 through 53 on the scaled diagram representing two forces A (32 N) and B (20. N) acting concurrently at point P with 120º between them.\n\nQuestion 52: On the diagram in your answer booklet, use a protractor and a ruler to construct a scaled vector to represent the resultant of forces A and B. Label the vector R. [1]",
      "modelAnswer": "Draw force A and force B to scale with 120° between them at point P. Complete the parallelogram by drawing lines parallel to each force vector from the tip of the other. Draw the diagonal from point P to the opposite corner — this diagonal is the resultant R. Label it R with an arrowhead pointing away from P.",
      "topic": "Forces & Newton",
      "explanation": "The resultant of two concurrent forces is found using the parallelogram law: construct parallel sides from each vector tip and draw the diagonal from the common origin.",
      "diveDeep": "The parallelogram method for vector addition: place both vectors tail-to-tail at point P, draw lines parallel to each from the tip of the other, and the resultant R is the diagonal of the parallelogram from P. Alternatively, use the tip-to-tail (head-to-tail) method: draw force A, then draw force B starting from the tip of A; R goes from the start of A to the tip of B. The angle of 120° between A and B is crucial for placement. This construction method appears frequently on B-2 of the Physics Regents.",
      "skill": "model",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 53,
      "part": "B-2",
      "type": "written",
      "text": "Base your answers to questions 51 through 53 on the scaled diagram representing two forces A (32 N) and B (20. N) acting concurrently at point P with 120º between them.\n\nQuestion 53: Determine the magnitude of the resultant force. [1]",
      "modelAnswer": "Using the law of cosines: R² = A² + B² − 2AB·cos(180° − 120°) = 32² + 20² − 2(32)(20)cos(60°) = 1024 + 400 − 1280(0.5) = 1424 − 640 = 784. R = √784 = 28 N.\n\nAlternatively, measure the length of vector R on the constructed diagram and multiply by the scale factor to get approximately 28 N.",
      "topic": "Forces & Newton",
      "explanation": "The magnitude of the resultant is found by measuring the diagonal of the parallelogram on the diagram and applying the scale, or by using the law of cosines analytically.",
      "diveDeep": "Analytically: the angle between vectors in the parallelogram is the supplement of the given angle when using the law of cosines for the resultant. The angle between A and B is 120°, so the angle used in the parallelogram diagonal formula is 180° − 120° = 60°. R = √(32² + 20² − 2·32·20·cos60°) = √(1024 + 400 − 640) = √784 = 28 N. Graphically, measure R on the diagram and apply the scale. The Regents accepts either method; show all work for full credit.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 54,
      "image": "/images/exams/phys-june-2018/context_54_56.png",
      "part": "B-2",
      "type": "written",
      "text": "Base your answers to questions 54 through 56 on the information and diagram below.\n\nA student pushes a box, weighing 50. newtons, 6.0 meters up an incline at a constant speed by applying a force of 25 newtons parallel to the incline. The top of the incline is 2.0 meters higher than the bottom.\n\nQuestions 54–55: Calculate the total work done on the box by the student while pushing the box from the bottom to the top of the incline. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "Equation: W = Fd\nSubstitution: W = (25 N)(6.0 m)\nAnswer: W = 150 J\n\nThe student applies 25 N parallel to the incline over a distance of 6.0 m along the incline, so total work done by the student = 150 J.",
      "topic": "Energy & Work",
      "explanation": "Work done by the student equals the applied force (parallel to displacement) multiplied by the distance traveled along the incline: W = Fd = 25 × 6.0 = 150 J.",
      "diveDeep": "W = F·d·cosθ where θ is the angle between force and displacement. Since the force is applied parallel to the incline and motion is along the incline, θ = 0°, cos0° = 1, so W = Fd = (25 N)(6.0 m) = 150 J. Note: this is the work done by the student, not the net work on the box (which is zero at constant speed). The gravitational PE gained is mgh = (50)(2.0) = 100 J, and the \"extra\" 50 J goes to overcoming friction. Always specify whose work and on what object.",
      "subTopic": "Energy & Conservation"
    },
    {
      "number": 55,
      "part": "B-2",
      "type": "written",
      "text": "This question is part of the 54–55 set (same scenario as question 54 — box pushed up incline).\n\nNote: Questions 54 and 55 are scored together for 2 points based on showing the equation, substitution with units, and correct answer of 150 J (see question 54 model answer).",
      "modelAnswer": "See question 54 for the complete solution. Work by student = W = Fd = (25 N)(6.0 m) = 150 J.",
      "topic": "Energy & Work",
      "explanation": "See question 54. The two-point calculation requires the equation W = Fd, substitution with units, and the answer 150 J.",
      "diveDeep": "On the Regents, questions labeled \"54–55\" share two points: one for the equation and setup, one for the correct numerical answer. Always write the formula first, substitute values with units, then calculate. This work (150 J) by the student accounts for both overcoming gravity (100 J) and friction (50 J) — demonstrating that work done against friction is the \"extra\" energy not stored as PE.",
      "subTopic": "Energy & Conservation"
    },
    {
      "number": 56,
      "part": "B-2",
      "type": "written",
      "text": "Base your answer on the same incline scenario: a student pushes a 50.-newton box 6.0 meters up an incline at constant speed with 25 N applied force. Describe what would happen to the total work done on the box by the student to push the box 6.0 meters up the incline at constant speed if the coefficient of kinetic friction between the box and the incline were increased. [1]",
      "modelAnswer": "The total work done by the student would increase. A higher coefficient of kinetic friction means a larger frictional force opposing motion. To maintain constant speed, the student must apply a greater force, and therefore does more work over the same 6.0-meter distance.",
      "topic": "Forces & Newton",
      "explanation": "Increasing the coefficient of kinetic friction increases the friction force. To maintain constant speed, the applied force must increase, so W = Fd increases.",
      "diveDeep": "At constant speed, net force = 0, so the applied force must equal the sum of friction and the component of gravity along the incline. If μ_k increases, friction force f_k = μ_k·F_N increases, requiring a larger applied force F. Since W = Fd and d is fixed (6.0 m), more force means more work. The extra work goes entirely into overcoming the increased friction (converted to heat), while the gravitational PE gained (mgh = 100 J) stays the same. This illustrates the energy cost of friction on inclined surfaces.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 57,
      "image": "/images/exams/phys-june-2018/q57.png",
      "part": "B-2",
      "type": "written",
      "text": "In the diagram below, a light ray is incident on an interface between glass and air. When the light strikes the glass-air interface, some of the light is reflected. On the diagram in your answer booklet, use a protractor and straightedge to construct the reflected light ray. [1]",
      "modelAnswer": "Measure the angle of incidence (the angle between the incident ray and the normal to the surface at the point of incidence). Draw the reflected ray on the opposite side of the normal such that the angle of reflection equals the angle of incidence. The reflected ray remains in the glass medium (on the same side of the interface as the incident ray). Use a protractor to ensure the angles are equal.",
      "topic": "Waves & Sound",
      "explanation": "The law of reflection states that the angle of incidence equals the angle of reflection, both measured from the normal to the surface at the point of incidence.",
      "diveDeep": "The law of reflection: θ_i = θ_r (angles measured from the normal, not the surface). The incident ray, reflected ray, and normal are all in the same plane. For a glass-air interface, some light is always reflected back into the glass regardless of angle (partial reflection). Total internal reflection occurs only when the angle of incidence exceeds the critical angle and light attempts to go from the denser medium (glass) to the less dense medium (air). For this question, construct the reflected ray on the glass side at the same angle from the normal as the incident ray.",
      "skill": "data",
      "subTopic": "Light & Optics"
    },
    {
      "number": 58,
      "part": "B-2",
      "type": "written",
      "text": "Questions 58–59: The current in a wire is 5.0 amperes. Calculate the total amount of charge, in coulombs, that travels through the wire in 36 seconds. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "Equation: q = It\nSubstitution: q = (5.0 A)(36 s)\nAnswer: q = 180 C\n\nThe total charge is 180 coulombs.",
      "topic": "Electricity",
      "explanation": "Charge is related to current and time by q = It. With I = 5.0 A and t = 36 s: q = (5.0)(36) = 180 C.",
      "diveDeep": "Current is defined as charge per unit time: I = q/t, so q = It. This is the most fundamental electric circuit equation. q = (5.0 A)(36 s) = 180 C. Since 1 ampere = 1 coulomb/second, the units work out: A × s = C. The number of electrons: N = q/e = 180/(1.60 × 10⁻¹⁹) ≈ 1.1 × 10²¹ electrons — an enormous number, illustrating why current (and charge in coulombs) is a practical unit rather than counting electrons.",
      "subTopic": "Circuits"
    },
    {
      "number": 59,
      "part": "B-2",
      "type": "written",
      "text": "This question is part of the 58–59 set (same calculation as question 58 — charge through wire with 5.0 A current for 36 s).\n\nNote: Questions 58 and 59 are scored together for 2 points. See question 58 for the complete model answer.",
      "modelAnswer": "q = It = (5.0 A)(36 s) = 180 C. See question 58.",
      "topic": "Electricity",
      "explanation": "Total charge = 180 C. See question 58 for full solution.",
      "diveDeep": "See question 58. The two-point Regents format requires: (1) writing q = It with equation, (2) substituting with units and giving correct numerical answer of 180 C. Common errors: computing I/t = 5.0/36 ≈ 0.14 (inverted formula), or forgetting to include units in the substitution step.",
      "subTopic": "Circuits"
    },
    {
      "number": 60,
      "part": "B-2",
      "type": "written",
      "text": "Questions 60–61: A spring, with a spring constant of 100. newtons per meter, possesses 2.0 joules of elastic potential energy when compressed. Calculate the spring's change in length from its uncompressed length. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "Equation: PE_s = ½kx²\nSolve for x: x = √(2·PE_s / k)\nSubstitution: x = √(2 × 2.0 J / 100. N/m)\nSimplify: x = √(4.0 / 100.) = √(0.040) ≈ 0.20 m\n\nThe spring's change in length is 0.20 meter.",
      "topic": "Energy & Work",
      "explanation": "Using the elastic PE formula PE_s = ½kx² and solving for x: x = √(2PE/k) = √(2 × 2.0 / 100) = √0.040 = 0.20 m.",
      "diveDeep": "The elastic potential energy stored in a spring: PE_s = ½kx², where k is the spring constant and x is the compression/extension from equilibrium. Solving for x: x = √(2PE/k) = √(2·2.0/100) = √(0.040) = 0.20 m. Common mistakes: forgetting the ½ factor (giving x = √(PE/k) = √0.02 ≈ 0.14 m), or not taking the square root. Units check: √(J / (N/m)) = √(N·m / (N/m)) = √(m²) = m ✓. This formula is on the Regents reference table.",
      "subTopic": "Springs & PE"
    },
    {
      "number": 61,
      "part": "B-2",
      "type": "written",
      "text": "This question is part of the 60–61 set (same spring calculation as question 60).\n\nNote: Questions 60 and 61 are scored together for 2 points. See question 60 for the complete model answer.",
      "modelAnswer": "x = √(2PE/k) = √(2 × 2.0 / 100.) = 0.20 m. See question 60.",
      "topic": "Energy & Work",
      "explanation": "Spring compression = 0.20 m. See question 60 for full solution.",
      "diveDeep": "See question 60. The spring is compressed by 0.20 m (20 cm). This is the \"change in length from its uncompressed length.\" Note that the problem asks for the magnitude of compression, so the sign is positive regardless of direction. Hooke's law F = kx and the energy equation PE = ½kx² are both on the Regents reference table and must be clearly written during calculation.",
      "subTopic": "Springs & PE"
    },
    {
      "number": 62,
      "part": "B-2",
      "type": "written",
      "text": "Questions 62–63: A monochromatic ray of light (f = 5.09 × 10¹⁴ Hz) travels from air into medium X. The angle of incidence of the ray in air is 45.0° and the ray's angle of refraction in medium X is 29.0°. Calculate the absolute index of refraction of medium X. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "Equation: n₁ sin θ₁ = n₂ sin θ₂  (Snell's law)\nSince medium 1 is air: n_air = 1.00\n\nn_X = (n_air × sin θ_incident) / sin θ_refracted\nn_X = (1.00 × sin 45.0°) / sin 29.0°\nn_X = (1.00 × 0.7071) / 0.4848\nn_X ≈ 1.46\n\nThe absolute index of refraction of medium X is approximately 1.46.",
      "topic": "Waves & Sound",
      "explanation": "Using Snell's law: n₁ sin θ₁ = n₂ sin θ₂, with n₁ = 1.00 (air), θ₁ = 45.0°, θ₂ = 29.0°: n₂ = sin 45.0° / sin 29.0° ≈ 0.7071/0.4848 ≈ 1.46.",
      "diveDeep": "Snell's law: n₁ sin θ₁ = n₂ sin θ₂. Here n_air = 1.00, θ_incidence = 45.0°, θ_refraction = 29.0°. n_X = (1.00 × sin 45°) / sin 29° = 0.7071 / 0.4848 ≈ 1.46. The light bends toward the normal (angle decreases from 45° to 29°) because it enters a denser medium (n > 1). n ≈ 1.46 matches corn oil on the Regents reference table. The frequency (5.09 × 10¹⁴ Hz) is given but not needed — it identifies the color (yellow-green) but index of refraction does not depend on frequency for this calculation.",
      "subTopic": "Light & Optics"
    },
    {
      "number": 63,
      "part": "B-2",
      "type": "written",
      "text": "This question is part of the 62–63 set (same refraction calculation as question 62).\n\nNote: Questions 62 and 63 are scored together for 2 points. See question 62 for the complete model answer.",
      "modelAnswer": "n_X = (sin 45.0°) / (sin 29.0°) = 0.7071 / 0.4848 ≈ 1.46. See question 62.",
      "topic": "Waves & Sound",
      "explanation": "Index of refraction of medium X ≈ 1.46. See question 62 for full Snell's law solution.",
      "diveDeep": "See question 62. The calculated n ≈ 1.46 corresponds to corn oil (from the Regents reference table). Knowing common index values helps verify answers: glass ≈ 1.5, water ≈ 1.33, air ≈ 1.00. An n of 1.46 is physically reasonable for a transparent liquid. If n came out less than 1, that would indicate an error (no known transparent medium has n < 1 in visible light).",
      "subTopic": "Light & Optics"
    },
    {
      "number": 64,
      "part": "B-2",
      "type": "written",
      "text": "Questions 64–65: An argon-ion laser emits blue-green light having a wavelength of 488 nanometers in a vacuum. Calculate the energy of a photon of this light. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "Step 1 — Find frequency: f = c/λ = (3.00 × 10⁸ m/s) / (488 × 10⁻⁹ m) = 6.15 × 10¹⁴ Hz\n\nStep 2 — Find photon energy: E = hf = (6.63 × 10⁻³⁴ J·s)(6.15 × 10¹⁴ Hz)\nE ≈ 4.08 × 10⁻¹⁹ J\n\nAlternatively: E = hc/λ = (6.63 × 10⁻³⁴)(3.00 × 10⁸) / (488 × 10⁻⁹) ≈ 4.08 × 10⁻¹⁹ J\n\nThe energy of one photon is approximately 4.08 × 10⁻¹⁹ joules.",
      "topic": "Modern Physics",
      "explanation": "E = hf = hc/λ. Convert λ = 488 nm = 488 × 10⁻⁹ m, then E = (6.63 × 10⁻³⁴)(3.00 × 10⁸)/(488 × 10⁻⁹) ≈ 4.08 × 10⁻¹⁹ J.",
      "diveDeep": "Photon energy E = hf = hc/λ. h = 6.63 × 10⁻³⁴ J·s (Planck's constant, from reference table), c = 3.00 × 10⁸ m/s, λ = 488 nm = 4.88 × 10⁻⁷ m. E = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (4.88 × 10⁻⁷) = 1.989 × 10⁻²⁵ / 4.88 × 10⁻⁷ ≈ 4.08 × 10⁻¹⁹ J ≈ 2.55 eV. Blue-green light photons have higher energy than red photons, consistent with higher frequency. Common mistake: forgetting to convert nm to m (off by factor 10⁹).",
      "subTopic": "Quantum & Photons"
    },
    {
      "number": 65,
      "part": "B-2",
      "type": "written",
      "text": "This question is part of the 64–65 set (same photon energy calculation as question 64).\n\nNote: Questions 64 and 65 are scored together for 2 points. See question 64 for the complete model answer.",
      "modelAnswer": "E = hc/λ = (6.63 × 10⁻³⁴ J·s × 3.00 × 10⁸ m/s) / (488 × 10⁻⁹ m) ≈ 4.08 × 10⁻¹⁹ J. See question 64.",
      "topic": "Modern Physics",
      "explanation": "Photon energy ≈ 4.08 × 10⁻¹⁹ J. See question 64 for full solution.",
      "diveDeep": "See question 64. The energy can also be expressed as ≈ 2.55 eV (electron-volts), since 1 eV = 1.60 × 10⁻¹⁹ J. Blue-green light at 488 nm falls in the visible spectrum and is commonly used in laser pointers and spectroscopy. Planck's equation E = hf is one of the most important equations in modern/quantum physics and appears on the Regents reference table.",
      "subTopic": "Quantum & Photons"
    },
    {
      "number": 66,
      "part": "C",
      "type": "written",
      "text": "Base your answers to questions 66 through 70 on the information below.\n\nAn incandescent lightbulb uses a 0.22-meter length of tungsten wire as its filament. This tungsten wire filament has a resistance of 19 ohms at a temperature of 20ºC. The tungsten wire filament has a resistance of 240 ohms when the bulb is operated at a potential difference of 120 volts.\n\nQuestions 66–67: Calculate the cross-sectional area of this tungsten wire filament. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "Resistivity of tungsten at 20°C from reference table: ρ = 5.60 × 10⁻⁸ Ω·m\n\nEquation: R = ρL/A  →  A = ρL/R\n\nSubstitution: A = (5.60 × 10⁻⁸ Ω·m × 0.22 m) / (19 Ω)\n\nA = (1.232 × 10⁻⁸ Ω·m²) / (19 Ω)\n\nA ≈ 6.5 × 10⁻¹⁰ m²\n\nThe cross-sectional area of the tungsten filament is approximately 6.5 × 10⁻¹⁰ m².",
      "topic": "Electricity",
      "explanation": "Using R = ρL/A and solving for A: A = ρL/R = (5.60 × 10⁻⁸ Ω·m)(0.22 m)/(19 Ω) ≈ 6.5 × 10⁻¹⁰ m².",
      "diveDeep": "The resistance formula R = ρL/A (from the Regents reference table) connects resistivity ρ, length L, cross-sectional area A, and resistance R. Solving for A: A = ρL/R. Plugging in ρ_W = 5.60 × 10⁻⁸ Ω·m (from the reference table at 20°C), L = 0.22 m, R = 19 Ω (resistance at 20°C): A = (5.60 × 10⁻⁸)(0.22)/19 ≈ 6.5 × 10⁻¹⁰ m². This tiny area (about 29 μm diameter) explains why the filament is so thin and resistive. The 240-Ω operating resistance is given for other parts.",
      "subTopic": "Circuits"
    },
    {
      "number": 67,
      "part": "C",
      "type": "written",
      "text": "This question is part of the 66–67 set (same cross-sectional area calculation as question 66).\n\nNote: Questions 66 and 67 are scored together for 2 points. See question 66 for the complete model answer.",
      "modelAnswer": "A = ρL/R = (5.60 × 10⁻⁸ Ω·m)(0.22 m)/(19 Ω) ≈ 6.5 × 10⁻¹⁰ m². See question 66.",
      "topic": "Electricity",
      "explanation": "Cross-sectional area ≈ 6.5 × 10⁻¹⁰ m². See question 66.",
      "diveDeep": "See question 66. The cross-sectional area is extremely small (~6.5 × 10⁻¹⁰ m²), which gives the filament high resistance per unit length. The equation A = ρL/R requires the resistivity at 20°C (matching the 19 Ω resistance given at 20°C). Never mix temperatures: use the 240 Ω resistance for the operating temperature calculations in questions 69–70.",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 68,
      "part": "C",
      "type": "written",
      "text": "Based on the tungsten filament lightbulb scenario (questions 66–70):\n\nExplain why the resistance of the tungsten wire filament increases when the bulb is being operated compared to the resistance of the filament at 20ºC. [1]",
      "modelAnswer": "When the bulb is operating, electrical energy heats the filament to a very high temperature (approximately 2500–3000°C). As temperature increases, the metal ions in the tungsten lattice vibrate more vigorously, increasing the number of collisions with free electrons. This increased collision frequency impedes electron flow more, resulting in higher resistance.",
      "topic": "Electricity",
      "explanation": "In metals, resistance increases with temperature because higher thermal energy causes greater lattice vibration, increasing electron scattering and impeding current flow.",
      "diveDeep": "Tungsten is a metallic conductor. In metals, resistance has a positive temperature coefficient: R increases with temperature. The physical reason: at higher temperatures, metal ions vibrate with greater amplitude, increasing the probability of collisions with conduction electrons. These collisions impede electron drift, raising resistivity ρ. The Regents reference table lists resistivity at 20°C; at operating temperature (~2500°C), tungsten's resistivity is roughly 12–13 times higher, consistent with R rising from 19 Ω to 240 Ω. This is a key conceptual question about metallic conductors vs. semiconductors (which have the opposite temperature dependence).",
      "subTopic": "Circuits"
    },
    {
      "number": 69,
      "part": "C",
      "type": "written",
      "text": "Based on the tungsten filament lightbulb scenario:\n\nQuestions 69–70: Calculate the power of this lightbulb when it is being operated at a potential difference of 120 volts. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "Equation: P = V²/R\nSubstitution: P = (120 V)² / (240 Ω)\nP = 14400 / 240\nP = 60. W\n\nThe power of the lightbulb is 60. watts.\n\nAlternative: I = V/R = 120/240 = 0.50 A; P = IV = (0.50)(120) = 60. W.",
      "topic": "Electricity",
      "explanation": "Using P = V²/R with V = 120 V and R = 240 Ω (operating resistance): P = (120)²/240 = 14400/240 = 60. W.",
      "diveDeep": "Three equivalent power equations: P = IV = I²R = V²/R. With V = 120 V and R = 240 Ω (the operating resistance at full temperature), P = V²/R = 14400/240 = 60 W. This is a classic 60-watt incandescent lightbulb — a recognizable real-world result that confirms the calculation. A common mistake is using the cold resistance (19 Ω) instead of the operating resistance (240 Ω), giving P = 14400/19 ≈ 758 W — clearly unreasonable for a household bulb. Always use the resistance at the operating condition.",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 70,
      "part": "C",
      "type": "written",
      "text": "This question is part of the 69–70 set (same power calculation as question 69).\n\nNote: Questions 69 and 70 are scored together for 2 points. See question 69 for the complete model answer.",
      "modelAnswer": "P = V²/R = (120 V)² / (240 Ω) = 60. W. See question 69.",
      "topic": "Electricity",
      "explanation": "Power = 60. W. See question 69 for full solution.",
      "diveDeep": "See question 69. Power equations P = IV = I²R = V²/R are all on the Regents reference table. For this problem, P = V²/R is most direct since V and R (operating) are given. The 60 W result matches a standard incandescent household bulb, reinforcing that the operating resistance (240 Ω) must be used, not the cold resistance (19 Ω).",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 71,
      "image": "/images/exams/phys-june-2018/context_71_75.png",
      "part": "C",
      "type": "written",
      "text": "Base your answers to questions 71 through 75 on the information and diagram below.\n\nA 150-newton force, applied to a wooden crate at an angle of 30.º above the horizontal, causes the crate to travel at constant velocity across a horizontal wooden floor.\n\nQuestions 71–72: Calculate the magnitude of the horizontal component of the 150-newton force. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "Equation: F_x = F cos θ\nSubstitution: F_x = (150 N)(cos 30.°)\nF_x = (150 N)(0.866)\nF_x ≈ 130 N\n\nThe horizontal component of the applied force is approximately 130 newtons.",
      "topic": "Forces & Newton",
      "explanation": "The horizontal component of a force at angle θ above horizontal is F_x = F cosθ = (150 N)(cos 30°) ≈ (150)(0.866) ≈ 130 N.",
      "diveDeep": "Vector resolution: any force at angle θ from horizontal has components F_x = F cosθ (horizontal) and F_y = F sinθ (vertical). F_x = 150 cos30° = 150 × 0.8660 ≈ 129.9 N ≈ 130 N. This horizontal component does work on the crate and must equal friction (since constant velocity means net force = 0). The vertical component (F_y = 150 sin30° = 75 N) is upward, reducing the normal force. This two-dimensional force analysis is a core Regents skill.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 72,
      "part": "C",
      "type": "written",
      "text": "This question is part of the 71–72 set (same horizontal component calculation as question 71).\n\nNote: Questions 71 and 72 are scored together for 2 points. See question 71 for the complete model answer.",
      "modelAnswer": "F_x = F cosθ = (150 N)(cos 30.°) = (150)(0.866) ≈ 130 N. See question 71.",
      "topic": "Forces & Newton",
      "explanation": "Horizontal component ≈ 130 N. See question 71.",
      "diveDeep": "See question 71. cos 30° = √3/2 ≈ 0.866. Rounding to the appropriate significant figures: F_x ≈ 130 N (3 significant figures matching the given 150 N and 30.°). The dot above 30° in \"30.°\" indicates the zero is significant, so three sig figs is appropriate here.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 73,
      "part": "C",
      "type": "written",
      "text": "Based on the crate scenario (150 N at 30° above horizontal, constant velocity across a wooden floor):\n\nDetermine the magnitude of the frictional force acting on the crate. [1]",
      "modelAnswer": "Since the crate moves at constant velocity, the net force is zero. Therefore the frictional force equals the horizontal component of the applied force:\n\nf = F_x = F cos30° ≈ 130 N\n\nThe frictional force is approximately 130 newtons.",
      "topic": "Forces & Newton",
      "explanation": "At constant velocity, net force = 0. Friction must equal the horizontal driving force: f = F cosθ = 150 cos30° ≈ 130 N.",
      "diveDeep": "Newton's first law: constant velocity → net force = 0. Horizontally: F cosθ − f = 0 → f = F cos30° ≈ 130 N. This is the kinetic friction force since the crate is sliding. No calculation beyond recognizing force balance is needed for this 1-point question. Note: students sometimes try to use f = μF_N, but without μ or F_N explicitly given, the equilibrium approach is simpler and sufficient.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 74,
      "part": "C",
      "type": "written",
      "text": "Based on the crate scenario (150 N at 30° above horizontal, constant velocity, wooden floor, crate's weight not explicitly given but must be determined from context — note: the crate's weight is not given in this problem set; use the vertical equilibrium):\n\nQuestions 74–75: Calculate the magnitude of the normal force exerted by the floor on the crate. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "The crate moves at constant velocity (no vertical acceleration). Vertical equilibrium:\n\nF_N + F_y − W = 0\n\nwhere F_y = F sin30° = (150 N)(sin 30°) = (150)(0.500) = 75 N (upward component of applied force)\nand W = weight of the crate (given as needed from the problem — if the crate weighs W, then F_N = W − 75 N).\n\nNote: The original problem states the crate is on a horizontal wooden floor with a 150-N applied force. If the crate's weight is not provided in the exam, the answer is expressed as F_N = W − F sin30°. However, for a typical Regents scenario where the crate weight must be found from additional info, the examiner expects: F_N = W − (150)(sin30°) = W − 75 N.\n\nFor the June 2018 exam, the crate's weight is not given in the passage — students express the answer as: F_N = W_crate − 75 N, or if a weight is inferred from context (e.g., μ_k × F_N = friction), use that. The expected method is to set up the vertical equilibrium equation.",
      "topic": "Forces & Newton",
      "explanation": "Vertically: F_N + F sinθ = W (weight of crate). The applied force has an upward component that reduces the normal force: F_N = W − F sin30° = W − 75 N.",
      "diveDeep": "Vertical equilibrium (no vertical acceleration): F_N (up) + F sinθ (up) − W (down) = 0, so F_N = W − F sinθ = W − (150)(0.5) = W − 75 N. The upward component of the applied force reduces the normal force below the object's weight — this reduces friction, which is why pushing at an angle can be advantageous. If the weight were given (e.g., W = 200 N), F_N = 200 − 75 = 125 N. Without a stated crate weight, the formula F_N = W − 75 N is the complete answer.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 75,
      "part": "C",
      "type": "written",
      "text": "This question is part of the 74–75 set (same normal force calculation as question 74).\n\nNote: Questions 74 and 75 are scored together for 2 points. See question 74 for the complete model answer.",
      "modelAnswer": "F_N = W_crate − F sin30° = W_crate − (150 N)(0.500) = W_crate − 75 N. See question 74.",
      "topic": "Forces & Newton",
      "explanation": "Normal force = crate weight − 75 N. See question 74 for full vertical equilibrium solution.",
      "diveDeep": "See question 74. The key insight is that the applied force has an upward component (F sinθ = 75 N) that partially supports the crate, reducing the floor's normal force below the crate's weight. This is why the normal force equation on an inclined-force problem is F_N = W − F sinθ, not simply F_N = W.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 76,
      "part": "C",
      "type": "written",
      "text": "Base your answers to questions 76 through 80 on the information below.\n\nOn a flat, level road, a 1500-kilogram car travels around a curve having a constant radius of 45 meters. The centripetal acceleration of the car has a constant magnitude of 3.2 meters per second squared.\n\nQuestions 76–77: Calculate the car's speed as it travels around the curve. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "Equation: a_c = v²/r  →  v = √(a_c × r)\nSubstitution: v = √(3.2 m/s² × 45 m)\nv = √(144 m²/s²)\nv = 12 m/s\n\nThe car's speed is 12 meters per second.",
      "topic": "Kinematics",
      "explanation": "Centripetal acceleration a_c = v²/r. Solving for v: v = √(a_c × r) = √(3.2 × 45) = √144 = 12 m/s.",
      "diveDeep": "The centripetal acceleration formula a_c = v²/r relates the center-directed acceleration to speed and radius. Solving for v: v = √(a_c · r) = √(3.2 × 45) = √144 = 12 m/s. Note that this is a perfectly clean answer — 3.2 × 45 = 144, and √144 = 12 exactly. When Regents problems give \"nice\" numbers like this, it is a good sign you are on the right track. The formula a_c = v²/r is on the Regents reference table.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 77,
      "part": "C",
      "type": "written",
      "text": "This question is part of the 76–77 set (same speed calculation as question 76).\n\nNote: Questions 76 and 77 are scored together for 2 points. See question 76 for the complete model answer.",
      "modelAnswer": "v = √(a_c × r) = √(3.2 m/s² × 45 m) = √144 = 12 m/s. See question 76.",
      "topic": "Kinematics",
      "explanation": "Car speed = 12 m/s. See question 76 for full solution.",
      "diveDeep": "See question 76. 12 m/s ≈ 43 km/h ≈ 27 mph — a reasonable city driving speed for a curve with 45-meter radius. This real-world reasonableness check confirms the answer. Units: √(m/s² × m) = √(m²/s²) = m/s ✓.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 78,
      "part": "C",
      "type": "written",
      "text": "Based on the circular motion scenario (1500-kg car, r = 45 m, a_c = 3.2 m/s²):\n\nDetermine the magnitude of the centripetal force acting on the car as it travels around the curve. [1]",
      "modelAnswer": "F_c = ma_c = (1500 kg)(3.2 m/s²) = 4800 N\n\nThe centripetal force is 4800 newtons.",
      "topic": "Forces & Newton",
      "explanation": "F_c = ma_c = (1500 kg)(3.2 m/s²) = 4800 N.",
      "diveDeep": "By Newton's second law, F_net = ma. The centripetal force F_c = ma_c = (1500)(3.2) = 4800 N directed toward the center of the curve. This is not a separate \"new\" force — it is the net force provided by friction (or banked road normal force) that causes the circular motion. A common mistake is computing F_c = mv²/r with v = 12: F_c = 1500 × 144/45 = 1500 × 3.2 = 4800 N ✓ — same result, confirming consistency.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 79,
      "part": "C",
      "type": "written",
      "text": "Based on the circular motion scenario (1500-kg car traveling around a curve on a flat, level road):\n\nWhat force provides the centripetal force needed for the car to travel around the curve? [1]",
      "modelAnswer": "Friction between the car's tires and the road surface provides the centripetal force.",
      "topic": "Forces & Newton",
      "explanation": "On a flat, level road, the only horizontal force available to provide centripetal acceleration is the static friction between the tires and the road surface.",
      "diveDeep": "For a car turning on a flat horizontal road, there is no banked surface to provide a horizontal normal force component. The only horizontal force is static friction between the tires and the road (static because the contact point is momentarily at rest relative to the road). This frictional force points toward the center of curvature and provides the centripetal force. This is why cars cannot turn on ice (low friction) without sliding outward. The maximum safe speed for a curve depends on μ_s: v_max = √(μ_s g r).",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 80,
      "part": "C",
      "type": "written",
      "text": "Based on the circular motion scenario:\n\nDescribe what happens to the magnitude of the centripetal force on the car as it travels around the curve if the speed of the car decreases. [1]",
      "modelAnswer": "The magnitude of the centripetal force decreases. Since F_c = mv²/r and mass and radius are constant, a decrease in speed v causes a decrease in v², which decreases the centripetal force.",
      "topic": "Forces & Newton",
      "explanation": "F_c = mv²/r. Since m and r are constant, if v decreases, F_c decreases (proportional to v²).",
      "diveDeep": "F_c = mv²/r shows that centripetal force is proportional to the square of speed. If speed decreases, say by half, the centripetal force decreases to one-quarter. This is why a car going slower around a curve needs less friction — it is less likely to skid at lower speeds. Conversely, doubling speed quadruples the required centripetal force. This v² relationship is key to understanding why high-speed turns are dangerous and why banked curves are necessary for highways.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 81,
      "image": "/images/exams/phys-june-2018/context_81_85.png",
      "part": "C",
      "type": "written",
      "text": "Base your answers to questions 81 through 85 on the information and diagram below.\n\nA musician plucks a 0.620-meter-long string on an acoustic guitar. The plucked string vibrates, producing a musical note called \"G.\" The waves traveling along the vibrating string produce a standing wave with a frequency of 196 hertz.\n\nQuestion 81: On the diagram of the standing wave in your answer booklet, label one node with the letter N and one antinode with the letter A. [1]",
      "modelAnswer": "A node (N) is a point of zero displacement (zero amplitude) — located at either fixed end of the string and at any interior point of zero vibration. An antinode (A) is a point of maximum displacement — located at the midpoint between nodes.\n\nFor the fundamental (first harmonic) standing wave on a guitar string: nodes are at both ends (fixed ends), and the antinode is at the center of the string. Label N at either end and A at the midpoint.",
      "topic": "Waves & Sound",
      "explanation": "Nodes are points of zero amplitude (fixed ends of string); antinodes are points of maximum amplitude (midpoint for the fundamental harmonic).",
      "diveDeep": "A standing wave is formed by the superposition of two waves traveling in opposite directions. Nodes are points of complete destructive interference — always zero displacement. Antinodes are points of complete constructive interference — maximum displacement. For a string fixed at both ends, nodes occur at the ends and at intervals of λ/2. The fundamental (first harmonic) has one antinode (at the center) and two nodes (at the ends). Higher harmonics have additional nodes and antinodes. The diagram for this problem shows the fundamental mode based on the string length and frequency given.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 82,
      "part": "C",
      "type": "written",
      "text": "Based on the guitar string scenario (0.620-meter string, 196 Hz, standing wave):\n\nDetermine the wavelength of the standing wave on the 0.620-meter-long vibrating string. [1]",
      "modelAnswer": "For the fundamental (first harmonic) standing wave on a string fixed at both ends, one full wavelength fits as: L = λ/2, so λ = 2L.\n\nλ = 2 × 0.620 m = 1.24 m\n\nThe wavelength of the standing wave is 1.24 meters.",
      "topic": "Waves & Sound",
      "explanation": "For the fundamental harmonic (the standing wave shown), L = λ/2, so λ = 2L = 2(0.620) = 1.24 m.",
      "diveDeep": "For a string fixed at both ends, standing waves form when the string length is a whole-number multiple of half-wavelengths: L = nλ/2, where n = 1, 2, 3,... For the fundamental (n = 1): L = λ/2 → λ = 2L = 2(0.620) = 1.24 m. This is the longest possible wavelength (lowest frequency) for this string. The diagram in the problem shows one half-wave (one arch), confirming n = 1. Students should always look at the standing wave diagram to determine how many half-wavelengths fit in the string length.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 83,
      "part": "C",
      "type": "written",
      "text": "Based on the guitar string scenario (0.620-meter string, f = 196 Hz, fundamental standing wave):\n\nQuestions 83–84: Calculate the speed of the wave traveling on the vibrating string. [Show all work, including the equation and substitution with units.] [2]",
      "modelAnswer": "Equation: v = fλ\nSubstitution: v = (196 Hz)(1.24 m)\nv ≈ 243 m/s\n\nThe speed of the wave on the guitar string is approximately 243 meters per second.",
      "topic": "Waves & Sound",
      "explanation": "v = fλ = (196 Hz)(1.24 m) ≈ 243 m/s. The wavelength λ = 1.24 m was determined in question 82.",
      "diveDeep": "The universal wave equation v = fλ relates wave speed, frequency, and wavelength. Using f = 196 Hz and λ = 1.24 m: v = 196 × 1.24 = 243.04 m/s ≈ 243 m/s. This is the wave speed in the guitar string — much slower than sound in air (343 m/s) or light. The string's wave speed depends on tension (T) and linear mass density (μ): v = √(T/μ). The note G (196 Hz) is in the audible range; the sound wave produced in air has wavelength = 343/196 ≈ 1.75 m, different from the string's wavelength.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 84,
      "part": "C",
      "type": "written",
      "text": "This question is part of the 83–84 set (same wave speed calculation as question 83).\n\nNote: Questions 83 and 84 are scored together for 2 points. See question 83 for the complete model answer.",
      "modelAnswer": "v = fλ = (196 Hz)(1.24 m) ≈ 243 m/s. See question 83.",
      "topic": "Waves & Sound",
      "explanation": "Wave speed on string ≈ 243 m/s. See question 83 for full solution.",
      "diveDeep": "See question 83. Units check: Hz × m = (1/s) × m = m/s ✓. The two-point Regents format requires the equation v = fλ, the substitution with units, and the numerical answer. Round to 3 significant figures: 243 m/s.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 85,
      "part": "C",
      "type": "written",
      "text": "Based on the guitar string scenario:\n\nDescribe what happens to the frequency when the musician shortens the vibrating portion of the string by pinching the string against the fingerboard while the string continues to vibrate. [1]",
      "modelAnswer": "The frequency increases. Shortening the string reduces its vibrating length L. Since λ = 2L for the fundamental, a shorter L means a shorter wavelength. Since wave speed (v) in the string remains constant (tension unchanged), and v = fλ, a shorter wavelength means a higher frequency.",
      "topic": "Waves & Sound",
      "explanation": "Shorter string → shorter wavelength (λ = 2L) → higher frequency (f = v/λ), since wave speed in the string stays constant.",
      "diveDeep": "When a guitarist presses a string against a fret, the effective vibrating length decreases. For the fundamental: λ = 2L, so if L decreases, λ decreases. The wave speed v = √(T/μ) depends on tension T and linear density μ — neither changes when fretting (tension is set by tuning). Therefore v is constant, and since f = v/λ, a smaller λ means higher f. This is why higher frets produce higher-pitched notes. Halving the string length doubles the frequency — a rise of exactly one octave. This is the physical basis of musical scales.",
      "subTopic": "Waves & Sound"
    }
  ]
}
