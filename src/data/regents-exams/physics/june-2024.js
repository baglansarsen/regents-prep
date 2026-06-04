// Physics Regents — June 2024
export default {
  id: 'phys-june-2024',
  subject: 'physics',
  year: 2024,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'A 2.0-kilogram mass is thrown vertically upward with an initial velocity of 19.6 meters per second. What is the maximum height reached by the mass? (Neglect air resistance)',
      choices: ['9.8 m', '19.6 m', '39.2 m', '78.4 m'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'At maximum height, the vertical velocity is zero. Using the kinematic equation v_f² = v_i² + 2ad with a = -9.81 m/s², we find that the mass reaches a height of 19.6 meters.',
      diveDeep: 'In free-fall problems, the mass of the object is irrelevant; a 2 kg mass and a 10 kg mass would reach the same height if thrown with the same speed. Gravity provides a constant downward acceleration of 9.81 m/s², which gradually slows the object until it stops momentarily at the peak. An easy shortcut for the Regents: if an object is thrown at 19.6 m/s, it takes exactly 2 seconds to reach the top, and its average speed during that time is 9.8 m/s, leading directly to 19.6 meters.'
    },
    {
      number: 2,
      part: 'A',
      text: 'A student pulls a 10.0-kilogram sled across flat snow with a force of 30.0 Newtons directed at an angle of 30.0° above the horizontal. What is the horizontal component of the pulling force?',
      choices: ['15.0 N', '26.0 N', '30.0 N', '100.0 N'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'The horizontal component of a vector is found using the cosine function: F_x = F cos(θ). Calculating 30.0 N × cos(30.0°) gives approximately 26.0 N.',
      diveDeep: 'Vector resolution allows us to determine how much of a diagonal force is actually contributing to moving the sled forward. We use cosine for the horizontal component because it represents the \'adjacent\' side of the force triangle. A common error is using the mass of the sled in the calculation, but the mass only affects the acceleration (F=ma), not the resolution of the force vector itself. Always ensure your calculator is in \'Degree\' mode for these questions!'
    },
    {
      number: 3,
      part: 'A',
      text: 'Compared to the inertia of a 1.0-kilogram mass moving at 10.0 meters per second, the inertia of a 2.0-kilogram mass moving at 5.0 meters per second is',
      choices: ['one-half as great', 'twice as great', 'the same', 'four times as great'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'The correct answer is twice as great because inertia is a property of matter that depends solely on mass, not velocity. Since the mass increased from 1.0 kg to 2.0 kg, the inertia also doubled regardless of how fast the objects were moving.',
      diveDeep: 'A common trap on the Regents is to confuse inertia with momentum (p = mv), which would be 10 kg·m/s for both objects in this scenario. However, inertia is strictly an object\'s resistance to changes in its state of motion and is directly proportional to its mass alone. On the exam, whenever you see a question about comparing inertia, look only at the mass values and ignore the speed or direction.'
    },
    {
      number: 4,
      part: 'A',
      text: 'A 60.0-kilogram student runs up a flight of stairs that is 5.00 meters high in 4.00 seconds. What is the average power developed by the student?',
      choices: ['75.0 W', '736 W', '120 W', '2940 W'],
      topic: 'Energy & Power',
      correct: 1,
      explanation: 'The average power is 736 W, calculated by dividing the work done against gravity by the time taken (P = mgh / t). Using the values (60.0 kg)(9.81 m/s²)(5.00 m) / 4.00 s results in approximately 736 Watts.',
      diveDeep: 'Power is defined as the rate at which work is performed, so you must first determine the work done, which in this case is the change in gravitational potential energy. Many students forget to include \'g\' (9.81 m/s²) in their calculation and simply multiply mass by height, leading to incorrect distractor choices. A useful strategy is to check your final units; since power is in Watts (Joules per second), your numerator must represent energy (kg·m²/s²) and your denominator must represent time.'
    },
    {
      number: 5,
      part: 'A',
      text: 'As a freely falling object nears the ground, its total mechanical energy',
      choices: ['decreases', 'increases', 'remains the same', 'first decreases and then increases'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'The total mechanical energy remains the same because, in the absence of air resistance, energy is conserved as it transforms from potential to kinetic. As the object falls, it loses potential energy due to its decreasing height, but gains an equal amount of kinetic energy as it speeds up.',
      diveDeep: 'The Law of Conservation of Energy is a fundamental pillar of physics: energy cannot be created or destroyed, only transformed from one form to another. While variables like velocity and height are changing, the total \'budget\' of mechanical energy for the system remains fixed. On the Regents exam, unless \'friction\' or \'air resistance\' is explicitly mentioned, you should always assume mechanical energy is conserved in free-fall problems.'
    },
    {
      number: 6,
      part: 'A',
      text: 'An electrostatic force of 4.0 Newtons exists between two charges separated by a distance of 1.0 meter. If the distance between the charges is doubled to 2.0 meters, the magnitude of the electrostatic force becomes',
      choices: ['1.0 N', '2.0 N', '8.0 N', '16 N'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'The force becomes 1.0 N because electrostatic force follows an inverse-square law relative to distance. When the distance is doubled (multiplied by 2), the force is divided by the square of that factor (2² = 4), resulting in one-quarter of the original 4.0 N force.',
      diveDeep: 'Coulomb’s Law (F = kq₁q₂/r²) shows that distance has a much greater impact on force than the magnitude of the charges themselves. Students often mistakenly just halve the force when the distance doubles, but you must remember to square the change in distance. This inverse-square relationship is a recurring theme on the exam, also appearing in Newton\'s Law of Universal Gravitation.'
    },
    {
      number: 7,
      part: 'A',
      text: 'If three 6.0-Ohm resistors are connected in parallel, what is their equivalent combined resistance?',
      choices: ['0.50 Ω', '2.0 Ω', '18 Ω', '6.0 Ω'],
      topic: 'Electricity & Magnetism',
      correct: 1,
      explanation: 'The equivalent resistance is 2.0 Ω. In a parallel circuit, you calculate the total resistance using the reciprocal formula (1/Req = 1/R₁ + 1/R₂ + 1/R₃); since the resistors are identical, you can also simply divide the resistance of one (6.0 Ω) by the number of branches (3).',
      diveDeep: 'A key rule to remember for parallel circuits is that the equivalent resistance will always be less than the smallest individual resistor in the group. This happens because adding more paths (branches) for the current to flow through actually reduces the overall resistance of the circuit. If your calculated answer is larger than the individual resistors (like the 18 Ω distractor for series), you likely used the wrong formula.'
    },
    {
      number: 8,
      part: 'A',
      text: 'A light ray in air enters a block of crown glass (index of refraction = 1.52) at an angle of incidence of 30.0°. As the light enters the glass, it',
      choices: [
        'speeds up and bends toward the normal',
        'slows down and bends toward the normal',
        'speeds up and bends away from the normal',
        'slows down and bends away from the normal'
      ],
      topic: 'Waves & Optics',
      correct: 1,
      explanation: 'The light slows down and bends toward the normal because it is moving from a medium with a lower index of refraction (air, n ≈ 1.00) to one with a higher index (glass, n = 1.52). A higher index of refraction indicates a slower speed of light within that material.',
      diveDeep: 'Use the mnemonic \'Fast to Slow, Towards the Normal\' (FST) to remember refraction behavior. When light enters a material where it travels more slowly, the ray \'kinks\' inward toward the imaginary perpendicular line called the normal. This behavior is governed by Snell\'s Law; always refer to your Reference Table to compare indices of refraction (n) if you aren\'t sure which medium is denser.'
    },
    {
      number: 9,
      part: 'A',
      text: 'A proton is composed of which combination of quarks?',
      choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'A proton is composed of two up quarks and one down quark (uud). This specific combination results in a total elementary charge of +1, as each up quark contributes +2/3 and the down quark contributes -1/3 (+2/3 + 2/3 - 1/3 = +1).',
      diveDeep: 'Baryons, such as protons and neutrons, are always composed of three quarks. While you can memorize the combinations, you can also verify them using the fractional charges found on the \'Particles of the Standard Model\' chart in your Reference Table. This is a common Modern Physics question that tests your ability to navigate the particle physics data sheets provided during the exam.'
    },
    {
      number: 10,
      part: 'A',
      text: 'According to the Standard Model of Particle Physics, electrons are classified as',
      choices: ['baryons', 'mesons', 'quarks', 'leptons'],
      topic: 'Modern Physics',
      correct: 3,
      explanation: 'Electrons are classified as leptons, which are fundamental particles that do not experience the strong nuclear force. Unlike protons or neutrons, electrons are not made of smaller components like quarks.',
      diveDeep: 'The Standard Model categorizes matter into two main groups: leptons (like electrons and neutrinos) and hadrons (which are made of quarks). Hadrons are further split into baryons (3 quarks) and mesons (quark-antiquark pair). An easy way to answer this on the exam is to check the \'Classification of Matter\' chart in your Reference Table, which explicitly lists the electron under the Lepton category.'
    },
    {
      number: 11,
      part: 'A',
      text: 'Which of the following is a scalar quantity?',
      choices: ['force', 'momentum', 'velocity', 'time'],
      topic: 'Mechanics & Forces',
      correct: 3,
      explanation: 'Time is a scalar quantity because it only has magnitude (size) and no direction. Force, momentum, and velocity are all vectors because they require both a magnitude and a specific direction to be fully described.',
      diveDeep: 'Distinguishing between scalars and vectors is a foundational skill for Physics. Vectors are often represented with arrows in diagrams to show their direction, whereas scalars like mass, energy, and time never change based on which way the object is facing. If a variable in a formula is often paired with a \'+\' or \'-\' sign to indicate \'left\' or \'right,\' it is almost certainly a vector.'
    },
    {
      number: 12,
      part: 'A',
      text: 'A constant net force acts on an object. The object must be',
      choices: ['at rest', 'moving at a constant speed', 'moving at a constant velocity', 'accelerating'],
      topic: 'Mechanics & Forces',
      correct: 3,
      explanation: 'According to Newton’s Second Law (F = ma), a non-zero net force must produce an acceleration. If the net force is constant and acting on a fixed mass, the object will experience a constant change in its velocity (acceleration).',
      diveDeep: 'A common mistake is to confuse \'constant motion\' (velocity) with \'constant force.\' Newton’s First Law states that if the net force is zero, an object stays at rest or in constant motion. Once a net force is applied, the \'balance\' is broken, and the object must accelerate. Remember: force causes a change in motion (acceleration), not just motion itself.'
    },
    {
      number: 13,
      part: 'A',
      text: 'An object is dropped from rest. What is its velocity after falling freely for 3.0 seconds?',
      choices: ['9.8 m/s', '19.6 m/s', '29.4 m/s', '44.1 m/s'],
      topic: 'Mechanics & Forces',
      correct: 2,
      explanation: 'The correct answer is 29.4 m/s because an object in free fall accelerates at approximately 9.81 m/s²; multiplying this acceleration by the time of 3.0 seconds yields 29.43 m/s. Choice 9.8 m/s represents the acceleration rather than the final velocity.',
      diveDeep: 'This question applies the kinematic equation v_f = v_i + at. Since the object is "dropped from rest," the initial velocity (v_i) is zero, simplifying the calculation to just acceleration multiplied by time. On the New York State Regents, always use 9.81 m/s² for the acceleration due to gravity unless told otherwise. A common trap is selecting the distance fallen (44.1 m) instead of the velocity, so always check if the units in your answer (m/s) match what the question asks for.'
    },
    {
      number: 14,
      part: 'A',
      text: 'A 5.0-Newton force and a 12-Newton force act concurrently on a point. What is the minimum possible magnitude of their resultant force?',
      choices: ['7.0 N', '12 N', '13 N', '17 N'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The minimum possible resultant of 7.0 N occurs when the two forces act in opposite directions (180° apart), requiring you to subtract the smaller force from the larger one. Choice 17 N is the maximum possible resultant, which would occur if the forces acted in the same direction.',
      diveDeep: 'Resultant forces depend entirely on the angle between the two vectors. The range of possible resultants is found by calculating the difference for the minimum (180°) and the sum for the maximum (0°). Any value between 7.0 N and 17.0 N is a possible resultant depending on the angle, such as 13 N which occurs at a 90° angle. A reliable exam strategy is to immediately calculate both the sum and the difference when you see two concurrent forces to establish your boundaries.'
    },
    {
      number: 15,
      part: 'A',
      text: 'A projectile is launched at an angle of 45° to the horizontal. The projectile reaches its maximum height when its vertical velocity component is',
      choices: ['zero', 'equal to its horizontal velocity', 'at its maximum', 'equal to 9.81 m/s'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'At the peak of any projectile\'s path, its vertical velocity is zero as it momentarily stops rising before beginning its descent. Choice "equal to its horizontal velocity" is incorrect because horizontal velocity remains constant and non-zero throughout the entire flight.',
      diveDeep: 'Projectile motion is best understood by treating horizontal and vertical components independently. While gravity constantly changes the vertical velocity, it has no effect on the horizontal velocity (neglecting air resistance). At the maximum height, the vertical component of velocity (v_y) must be zero, even though the horizontal component (v_x) is still moving the object forward. Recognizing that "maximum height" implies v_y = 0 is a critical shortcut for solving complex trajectory problems on the exam.'
    },
    {
      number: 16,
      part: 'A',
      text: 'An object moves in a circular path at constant speed. If the radius of the path is halved while the speed remains the same, the centripetal acceleration is',
      choices: ['halved', 'doubled', 'the same', 'quadrupled'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'The centripetal acceleration is doubled because it is inversely proportional to the radius of the path (a_c = v²/r). Since the radius is in the denominator, cutting it in half results in multiplying the overall acceleration by two.',
      diveDeep: 'This question tests your ability to interpret physics formulas conceptually. Using the formula a_c = v²/r, you can see that if the numerator (v) stays the same and the denominator (r) becomes ½ as large, the result becomes twice as large. Students often confuse this with the relationship to speed, where doubling the speed would actually quadruple the acceleration. A transferable strategy for these "ratio" questions is to plug in a "1" for every variable that stays the same and the change factor for the variable that moves.'
    },
    {
      number: 17,
      part: 'A',
      text: 'The rate at which work is done is defined as',
      choices: ['force', 'energy', 'power', 'momentum'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'Power is defined as the rate of doing work or the rate at which energy is transferred over time. While force and energy are necessary to perform work, they do not describe the speed or "rate" at which that work occurs.',
      diveDeep: 'In physics, the term "rate" almost always signals a division by time. Power (P = W/t) measures how quickly energy is used, which is why a high-wattage machine can perform the same task faster than a low-wattage one. Students often confuse Work (measured in Joules) with Power (measured in Watts). To keep them straight, remember that Power is "Work per second," so 1 Watt is equal to 1 Joule per second.'
    },
    {
      number: 18,
      part: 'A',
      text: 'A spring has a spring constant of 100. N/m. The potential energy stored in the spring when it is compressed 0.20 meter is',
      choices: ['2.0 J', '4.0 J', '10. J', '20. J'],
      topic: 'Energy & Power',
      correct: 0,
      explanation: 'The potential energy is 2.0 J, calculated using the formula PE_s = ½kx², where ½(100. N/m)(0.20 m)² equals 2.0 Joules. Choice 20. J is a common mistake caused by forgetting to square the compression distance.',
      diveDeep: 'Elastic potential energy is determined by the spring constant and the square of the displacement. Because the displacement (x) is squared, doubling the compression would actually quadruple the stored energy. Regents questions frequently provide the compression in centimeters, requiring a conversion to meters, though this specific question provides meters directly. Always perform the exponent operation (0.20²) before multiplying by the other factors to avoid calculation errors.'
    },
    {
      number: 19,
      part: 'A',
      text: 'A 2.0-kilogram mass is raised 10. meters vertically. The potential energy gained by the mass is',
      choices: ['20. J', '98 J', '196 J', '392 J'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'The potential energy gained is 196 J, found using the formula PE_g = mgh, which is (2.0 kg)(9.81 m/s²)(10. m). Choice 20. J is incorrect because it fails to include the acceleration due to gravity (g).',
      diveDeep: 'Gravitational potential energy depends on mass, the strength of the gravitational field, and the height of the object. While many students simply multiply mass and height, the units of Joules (kg·m²/s²) remind us that the acceleration of gravity (9.81 m/s²) must be included. If a question asks for "work done" to lift an object, it is equivalent to the change in potential energy. Always check your Reference Table to ensure you are using the most precise value for \'g\' rather than rounding to 10.'
    },
    {
      number: 20,
      part: 'A',
      text: 'What is the unit of electric charge?',
      choices: ['Coulomb', 'Ampere', 'Volt', 'Ohm'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'The Coulomb (C) is the standard SI unit for electric charge. Amperes measure the flow of charge (current), Volts measure electrical potential, and Ohms measure resistance to that flow.',
      diveDeep: 'Distinguishing between electrical units is a foundational skill for the Physics Regents. A Coulomb represents the total amount of charge, whereas an Ampere represents a rate of one Coulomb passing a point per second (A = C/s). If you forget these units, the first page of the Physics Reference Table lists the names and symbols for most physical quantities. Associating each unit with its specific variable (q for Charge, I for Current, V for Potential) will prevent confusion in multi-step circuit problems.'
    },
    {
      number: 21,
      part: 'A',
      text: 'Two identical spheres carrying charges of +6.0 C and -2.0 C are brought into contact and separated. What is the final charge on each sphere?',
      choices: ['+2.0 C', '+4.0 C', '+8.0 C', 'zero'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'The final charge is +2.0 C because when identical conductors touch, the total charge (+4.0 C) is shared equally between them. Choice +4.0 C is the total charge of the system, not the individual charge on each sphere after separation.',
      diveDeep: 'This problem illustrates the Law of Conservation of Charge, which states that charge cannot be created or destroyed, only transferred. When the spheres touch, electrons flow until the charge is balanced across the combined surface area. To solve any problem like this, add the two charges together (taking care with the positive and negative signs) and then divide the sum by two. This ensures the total charge before contact equals the total charge after separation.'
    },
    {
      number: 22,
      part: 'A',
      text: 'Ohm\'s Law is expressed by which formula?',
      choices: ['R = V/I', 'R = I/V', 'R = VI', 'R = q/t'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'Ohm\'s Law defines resistance as the ratio of potential difference to current, correctly expressed as R = V/I. The other choices are incorrect algebraic manipulations of these three variables.',
      diveDeep: 'Ohm\'s Law describes the linear relationship between voltage, current, and resistance in an ohmic conductor. It is most commonly used in the forms V=IR, I=V/R, or R=V/I, all of which are equivalent. On the Regents exam, you can find this formula in the Electricity section of your Reference Table. A helpful strategy for circuit problems is to immediately identify which two of these three variables you know so you can solve for the third.'
    },
    {
      number: 23,
      part: 'A',
      text: 'Which wave phenomenon occurs when a wave bounces back from a surface?',
      choices: ['reflection', 'refraction', 'diffraction', 'dispersion'],
      topic: 'Waves & Optics',
      correct: 0,
      explanation: 'Reflection is the phenomenon where a wave hits a boundary and bounces back into its original medium. Other options like refraction or diffraction involve the wave passing through or bending around an object rather than bouncing back.',
      diveDeep: 'Reflection follows the Law of Reflection, which states that the angle of incidence equals the angle of reflection relative to the normal line. This occurs because the wave cannot penetrate the surface of the new medium. When you see the word "bounce" on a physics exam, you should immediately think of reflection. Common examples include light hitting a mirror or sound producing an echo off a wall.'
    },
    {
      number: 24,
      part: 'A',
      text: 'What wave parameter remains constant as a wave enters a new medium?',
      choices: ['speed', 'wavelength', 'frequency', 'amplitude'],
      topic: 'Waves & Optics',
      correct: 2,
      explanation: 'Frequency is determined solely by the source of the wave and remains constant regardless of the medium the wave enters. While speed and wavelength change as the medium changes, the number of cycles per second stays the same.',
      diveDeep: 'The relationship v = fλ (velocity = frequency × wavelength) dictates that if the speed of a wave changes, the wavelength must change proportionally to keep the frequency constant. For example, when light enters glass from air, it slows down and its wavelength shortens, but its color (frequency) does not change. This is a fundamental concept in optics and wave theory. A useful strategy is to remember that the source "sets" the frequency for the life of the wave.'
    },
    {
      number: 25,
      part: 'A',
      text: 'Crown glass has an index of refraction of 1.52. Crown glass is optically',
      choices: [
        'more dense than air (n = 1.00)',
        'less dense than air (n = 1.00)',
        'equally dense as air',
        'completely opaque'
      ],
      topic: 'Waves & Optics',
      correct: 0,
      explanation: 'Crown glass is more optically dense than air because its index of refraction (1.52) is greater than that of air (1.00). A higher index of refraction indicates that light travels slower in that material compared to a vacuum or air.',
      diveDeep: 'The index of refraction (n) is a ratio calculated as n = c/v, where c is the speed of light in a vacuum and v is the speed in the medium. Because n is inversely proportional to speed, a higher value for n always means the light is moving slower and the medium is more "optically dense." Students often confuse physical density with optical density, but in physics, we focus on the impact on light speed. Always check your Reference Table for common indices of refraction to make quick comparisons.'
    },
    {
      number: 26,
      part: 'A',
      text: 'A neutron consists of which quark combination?',
      choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'A neutron is electrically neutral, so its quarks must sum to a total charge of zero. Combining one \'up\' quark (+2/3) with two \'down\' quarks (-1/3 each) results in a total charge of 0, which is the \'udd\' combination.',
      diveDeep: 'The Standard Model section of your Reference Table lists the charges for all quarks, making this a simple math problem. Protons are \'uud\' (+1 charge) and neutrons are \'udd\' (0 charge). Students often confuse these two, so always do a quick charge check: (2/3) + (-1/3) + (-1/3) = 0. If the sum of the charges doesn\'t match the known charge of the particle (proton = +1, neutron = 0), you know that choice is a distractor.'
    },
    {
      number: 27,
      part: 'A',
      text: 'The photon is the gauge boson associated with which fundamental force?',
      choices: ['gravitational', 'electromagnetic', 'strong nuclear', 'weak nuclear'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'The photon is the exchange particle, or gauge boson, responsible for the electromagnetic force. It mediates interactions between all electrically charged particles.',
      diveDeep: 'In the Standard Model of particle physics, each fundamental force has a specific carrier particle. The electromagnetic force is carried by the massless photon, the strong force by gluons, and the weak force by W and Z bosons. Gravity is theorized to be carried by the graviton, though it has not been detected. A common trap is confusing the photon with the gluon; remember that photons deal with light and charge, while gluons "glue" the nucleus together.'
    },
    {
      number: 28,
      part: 'A',
      text: 'Quarks are bound together inside a proton by the exchange of which force carriers?',
      choices: ['photons', 'gluons', 'gravitons', 'W/Z bosons'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'Gluons are the force carriers of the strong nuclear force, which binds quarks together to form protons and neutrons. The name "gluon" comes from the fact that they act like glue to keep the nucleus stable.',
      diveDeep: 'The strong nuclear force is the strongest of the four fundamental forces but only operates over incredibly short, subatomic distances. It is powerful enough to overcome the electromagnetic repulsion between positively charged protons in the nucleus. Gluons carry the "color charge" that quarks possess, facilitating this intense attraction. When answering Modern Physics questions, associate quarks and nuclei with the strong force and gluons.'
    },
    {
      number: 29,
      part: 'A',
      text: 'What is the energy of a photon of light with a frequency of 5.00 × 10^14 Hz?',
      choices: ['3.32 × 10^-19 J', '6.63 × 10^-19 J', '3.32 × 10^19 J', '6.63 × 10^19 J'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'The energy of a photon is calculated using the formula E = hf. Multiplying Planck\'s constant (6.63 × 10⁻³⁴ J·s) by the frequency (5.00 × 10¹⁴ Hz) gives an energy of 3.32 × 10⁻¹⁹ Joules.',
      diveDeep: 'This question tests your ability to use the constants provided in the Reference Table and apply the energy-frequency relationship. The energy of a photon is directly proportional to its frequency, meaning higher frequency light (like blue or violet) is more energetic than lower frequency light (like red). Be extremely careful with scientific notation on your calculator, as powers of ten are the most common source of error here. Use the unit Joules (J) to confirm you are calculating energy rather than momentum.'
    },
    {
      number: 30,
      part: 'A',
      text: 'The conversion of 1.0 universal mass unit (amu) of mass into energy releases approximately',
      choices: ['931 MeV', '1.60 × 10^-19 MeV', '9.00 × 10^16 MeV', '1.00 MeV'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'One universal mass unit (u) is equivalent to 931 MeV of energy. This value is a standard conversion factor found directly on the first page of the Physics Reference Table.',
      diveDeep: 'This conversion is derived from Einstein\'s mass-energy equivalence formula, E = mc². While you could calculate this using kilograms and Joules, the Regents exam simplifies nuclear physics by using atomic mass units (u) and mega-electronvolts (MeV). Mass is not simply "gone" in nuclear reactions; it is transformed into a massive amount of kinetic or thermal energy. Memorizing that 1 u = 931 MeV will save you significant time during the exam. Avoid the distractor of 9.00 × 10¹⁶, which is the value of c² in SI units.'
    },
    {
      number: 31,
      part: 'B-1',
      text: 'A object accelerates uniformly from rest at 2.0 m/s^2 for 5.0 seconds. What is the final velocity of the object?',
      choices: ['5.0 m/s', '10. m/s', '20. m/s', '25 m/s'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'Using the kinematic equation v_f = v_i + at, we start with an initial velocity (v_i) of 0 m/s. Adding the product of acceleration (2.0 m/s²) and time (5.0 s) results in a final velocity of 10. m/s.',
      diveDeep: 'The phrase "from rest" is a critical clue that tells you the initial velocity is zero. Uniform acceleration means the object\'s speed increases by 2.0 m/s every single second it is moving. After 5 seconds, it has gained 10 m/s of speed. Always list your known variables (v_i, a, t) before selecting a formula from the Mechanics section of your Reference Table. This prevents the common error of using the distance formula instead of the velocity formula.'
    },
    {
      number: 32,
      part: 'B-1',
      text: 'A 2.0-kilogram ball travels in a circle of radius 4.0 meters at a constant speed of 8.0 meters per second. What is the centripetal acceleration of the ball?',
      choices: ['2.0 m/s^2', '4.0 m/s^2', '16 m/s^2', '32 m/s^2'],
      topic: 'Mechanics & Forces',
      correct: 2,
      explanation: 'Centripetal acceleration is calculated using the formula a_c = v²/r. Squaring the speed (8.0 m/s) results in 64, and dividing by the radius (4.0 m) gives 16 m/s².',
      diveDeep: 'In this problem, the mass of 2.0 kilograms is "distractor" information because acceleration depends only on the change in velocity over time, not the mass of the object. If the question had asked for centripetal force, you would then multiply this acceleration by the mass (F = ma). Centripetal acceleration always points toward the center of the circle, even if the speed is constant, because the direction of motion is constantly changing. Always check if the question asks for acceleration or force to avoid unnecessary steps.'
    },
    {
      number: 33,
      part: 'B-1',
      text: 'A force vector of 10. Newtons is applied at 30. degrees above the horizontal. What is the vertical component of the force?',
      choices: ['5.0 N', '8.7 N', '10. N', '20. N'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The vertical component (F_y) is found using the formula F_y = F sin(θ). Substituting the values, 10. N × sin(30°) equals 5.0 N, as the sine of 30 degrees is exactly 0.5.',
      diveDeep: 'Vector resolution is a core skill: use sine for vertical components and cosine for horizontal components when the angle is measured from the horizontal. You can remember this using the phrase "SOH CAH TOA" or by looking at the geometry of a right triangle where the vertical side is opposite the angle. If you ever forget which is which, remember that at 0 degrees, the vertical component must be 0 (sin 0 = 0), and at 90 degrees, the vertical component must be the full force (sin 90 = 1). This logic helps verify your choice of trigonometric function.'
    },
    {
      number: 34,
      part: 'B-1',
      text: 'What represents the work done against gravity when a 50.0-Newton box is lifted 2.00 meters vertically?',
      choices: ['25.0 J', '50.0 J', '100. J', '980. J'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'The work done against gravity is calculated by multiplying the force (weight) by the vertical displacement. Since a 50.0 N box is lifted 2.00 meters, the work is 100. J.',
      diveDeep: 'Gravitational potential energy (PE = mgh) is equivalent to the work done lifting an object vertically. In this case, the weight (mg) is already given as 50.0 N, so you simply multiply by the height. Always watch your units; work and energy are both measured in Joules (J). A common mistake is to divide the force by distance, which would lead to an incorrect answer like 25.0 J.'
    },
    {
      number: 35,
      part: 'B-1',
      text: 'A 3.0-kilogram block is sliding along a horizontal floor with 150 Joules of kinetic energy. What is the velocity of the block?',
      choices: ['5.0 m/s', '10. m/s', '50. m/s', '100. m/s'],
      topic: 'Energy & Power',
      correct: 1,
      explanation: 'Using the kinetic energy formula KE = ½mv², we plug in 150 J for KE and 3.0 kg for mass. Solving for velocity gives 10. m/s.',
      diveDeep: 'Kinetic energy is the energy of motion and depends on the square of the velocity. If you double the velocity of an object, its kinetic energy actually quadruples. On the Regents, remember to take the square root of v² at the end of the calculation to avoid picking "100" as a trap answer. This relationship is why stopping distances for vehicles increase so drastically as they speed up.'
    },
    {
      number: 36,
      part: 'B-1',
      text: 'An electric motor does 600. Joules of work in 20. seconds. What is the average power developed by the motor?',
      choices: ['30. W', '120 W', '600 W', '12000 W'],
      topic: 'Energy & Power',
      correct: 0,
      explanation: 'Power is the rate at which work is done, calculated by dividing work (600. J) by time (20. s). The resulting average power is 30. Watts.',
      diveDeep: 'Power measures how fast energy is being transferred or how quickly work is performed. One Watt is equivalent to one Joule per second. When solving these, ensure your time is in seconds; if a problem gives you minutes, you must convert them first. Distractors like 12000 W usually come from multiplying the numbers instead of dividing them.'
    },
    {
      number: 37,
      part: 'B-1',
      text: 'An electrostatic force of F exists between two charges separated by a distance of r. If the distance between the charges is halved, the force will be',
      choices: ['F/4', 'F/2', '2F', '4F'],
      topic: 'Electricity & Magnetism',
      correct: 3,
      explanation: 'Electrostatic force follows an inverse-square law, meaning the force is inversely proportional to the square of the distance. If the distance is halved, the force increases by a factor of four (1 / (1/2)² = 4).',
      diveDeep: 'The inverse-square law applies to both gravity and electrostatics, indicating that distance has a much greater impact on force than the magnitude of the charges or masses. Halving distance makes the force four times stronger, while doubling distance would make it four times weaker (F/4). A common mistake is to just double the force (2F), but you must remember to square the change in distance.'
    },
    {
      number: 38,
      part: 'B-1',
      text: 'What is the voltage drop across a 10. Ohm resistor carrying a current of 2.0 Amperes?',
      choices: ['5.0 V', '10. V', '20. V', '40. V'],
      topic: 'Electricity & Magnetism',
      correct: 2,
      explanation: 'According to Ohm’s Law (V = IR), voltage drop is the product of current and resistance. Multiplying 2.0 Amperes by 10. Ohms gives a voltage drop of 20. Volts.',
      diveDeep: 'Ohm\'s Law is the foundation of circuit analysis and describes how voltage, current, and resistance are related. In a circuit, a resistor "consumes" potential, which is why we call the result a voltage drop. Always check that your units are standard (Amperes and Ohms) before multiplying to get Volts. If you were solving for resistance or current, you would rearrange the formula to R = V/I or I = V/R.'
    },
    {
      number: 39,
      part: 'B-1',
      text: 'If three 12-Ohm resistors are connected in parallel, what is their equivalent combined resistance?',
      choices: ['4.0 Ω', '12 Ω', '36 Ω', '0.25 Ω'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'The equivalent resistance is 4.0 Ω. When resistors are connected in parallel, the total resistance decreases, and for identical resistors, you can simply divide the resistance of one by the total number of resistors (12 Ω / 3).',
      diveDeep: 'In a parallel circuit, adding more paths for current to flow actually reduces the overall resistance, much like adding more lanes to a highway reduces traffic congestion. The formula 1/R_eq = 1/R₁ + 1/R₂ + ... ensures that the equivalent resistance is always smaller than the smallest individual resistor. Be careful not to just add the values together, which is the rule for series circuits, or forget to take the reciprocal at the end of your calculation.'
    },
    {
      number: 40,
      part: 'B-1',
      text: 'A series circuit contains two resistors. The current flowing through the first resistor is 2.0 Amperes. What is the current flowing through the second resistor?',
      choices: ['1.0 A', '2.0 A', '4.0 A', 'equal to the resistance'],
      topic: 'Electricity & Magnetism',
      correct: 1,
      explanation: 'In a series circuit, there is only one path for the current to flow, so the current is identical at every point. Since the first resistor has 2.0 Amperes, the second must also have 2.0 Amperes.',
      diveDeep: 'Think of current in a series circuit like water flowing through a single pipe; the flow rate must be the same throughout. This is a fundamental rule: I_total = I₁ = I₂ = I₃. This differs from a parallel circuit, where the current splits between branches. Remembering this "I is constant" rule is a key shortcut for solving series circuit problems quickly without needing to know the individual resistance values.'
    },
    {
      number: 41,
      part: 'B-1',
      text: 'A wave has a frequency of 50. Hertz and travels at 250. meters per second. What is the wavelength of the wave?',
      choices: ['0.20 m', '5.00 m', '50.0 m', '250.0 m'],
      topic: 'Waves & Optics',
      correct: 1,
      explanation: 'The wave equation states that velocity equals frequency times wavelength (v = fλ). Dividing the velocity of 250. m/s by the frequency of 50. Hz results in a wavelength of 5.00 m.',
      diveDeep: 'Wavelength and frequency are inversely proportional for a wave traveling at a constant speed in a given medium. If the frequency were to increase, the wavelength would have to decrease to keep the velocity the same. Be careful not to multiply the values (which would give 12,500) or divide them the wrong way (which would give 0.20). Checking the units (m/s divided by 1/s gives meters) confirms you used the correct operation.'
    },
    {
      number: 42,
      part: 'B-1',
      text: 'Crown glass has an index of refraction of 1.52. What is the speed of light in crown glass?',
      choices: ['1.97 × 10^8 m/s', '2.28 × 10^8 m/s', '3.00 × 10^8 m/s', '4.56 × 10^8 m/s'],
      topic: 'Waves & Optics',
      correct: 0,
      explanation: 'The speed of light in a medium is calculated using n = c/v, where n is the index of refraction and c is the speed of light in a vacuum (3.00 × 10⁸ m/s). Dividing the vacuum speed by 1.52 gives approximately 1.97 × 10⁸ m/s.',
      diveDeep: 'The index of refraction is a ratio that describes how much light slows down when it enters a material. Because light travels fastest in a vacuum, the index is always greater than or equal to 1.00. As the index increases, the speed of light in that material decreases. You can find common indices of refraction on your Physics Reference Table to verify values for materials like water, air, or glass.'
    },
    {
      number: 43,
      part: 'B-1',
      text: 'Which phenomenon is responsible for the rainbow colors observed on a CD surface?',
      choices: ['reflection', 'refraction', 'diffraction', 'dispersion'],
      topic: 'Waves & Optics',
      correct: 2,
      explanation: 'The closely spaced tracks on a CD act as a diffraction grating, which scatters light and causes interference that creates a rainbow pattern. This phenomenon is known as diffraction.',
      diveDeep: 'Don\'t confuse this with dispersion in a prism, which is caused by refraction. While both produce rainbows, a prism uses the bending of light at boundaries, while a CD uses the bending of waves around tiny obstacles or through narrow openings. Diffraction and interference are specifically responsible for the color patterns seen on thin films like soap bubbles or the surfaces of optical discs. It is a key piece of evidence for the wave nature of light.'
    },
    {
      number: 44,
      part: 'B-1',
      text: 'Two waves with identical frequency and amplitude meet in phase. The resulting wave displacement will be',
      choices: ['zero', 'half the amplitude', 'double the amplitude', 'four times the amplitude'],
      topic: 'Waves & Optics',
      correct: 2,
      explanation: 'When two waves meet "in phase," they undergo constructive interference. Their amplitudes add together, so two waves with amplitude A will create a resulting wave with a displacement of 2A, or double the amplitude.',
      diveDeep: 'Wave interference occurs when two or more waves overlap in the same medium. If the waves were 180 degrees out of phase (crest meets trough), they would undergo destructive interference and the displacement would be zero. "In phase" specifically means the peaks align with peaks and troughs align with troughs. This principle of superposition is a core concept used in technology ranging from musical acoustics to noise-canceling headphones.'
    },
    {
      number: 45,
      part: 'B-1',
      text: 'What is the frequency of a photon containing 6.63 × 10^-19 Joule of energy?',
      choices: ['1.00 × 10^14 Hz', '1.00 × 10^15 Hz', '1.00 × 10^16 Hz', '6.63 × 10^14 Hz'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'The frequency is 1.00 × 10¹⁵ Hz, which is found by dividing the energy (6.63 × 10⁻¹⁹ J) by Planck\'s constant (6.63 × 10⁻³⁴ J·s). This direct calculation uses the standard formula for photon energy, E = hf.',
      diveDeep: 'This question tests your ability to use the relationship between energy and frequency for a photon. Remember that Planck\'s constant (h) is a fundamental value found on your reference table, so you don\'t need to memorize it. A common trap is making an error with scientific notation; when you divide by 10⁻³⁴, you are effectively adding 34 to the exponent. Always double-check your powers of ten, as many distractors on the exam will only differ by an exponent.'
    },
    {
      number: 46,
      part: 'B-1',
      text: 'What is the quark composition of a neutron?',
      choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'A neutron is made of one up quark and two down quarks (udd). Because the charge of an up quark is +2/3e and a down quark is -1/3e, this specific combination results in the neutron\'s characteristic net charge of zero.',
      diveDeep: 'Quarks are the fundamental components of hadrons, and their individual fractional charges must sum to the particle\'s total charge. While a proton is uud (+1 charge), the neutron\'s udd structure (+2/3 - 1/3 - 1/3) perfectly explains its neutrality. On the Regents exam, you can find the charges for each quark on the \'Particles of the Standard Model\' chart. A great study tip is to remember that neutrons have \'two down\' quarks (N-D-D) to stay neutral.'
    },
    {
      number: 47,
      part: 'B-1',
      text: 'Which of the following is NOT classified as a lepton under the Standard Model?',
      choices: ['electron', 'muon', 'neutrino', 'up quark'],
      topic: 'Modern Physics',
      correct: 3,
      explanation: 'The up quark is not a lepton; it belongs to the quark family of fundamental particles. Leptons include particles like electrons, muons, and neutrinos, which do not experience the strong nuclear force.',
      diveDeep: 'The Standard Model categorizes matter into quarks and leptons. Quarks are always confined within larger particles like protons, while leptons can exist independently and do not feel the strong force. A common mistake is grouping all small particles together, but the key distinction is their interaction with nuclear forces. To quickly solve these, refer to the Standard Model table in your reference booklet to see which category a particle falls under.'
    },
    {
      number: 48,
      part: 'B-1',
      text: 'A baryon contains how many quarks?',
      choices: ['one', 'two', 'three', 'four'],
      topic: 'Modern Physics',
      correct: 2,
      explanation: 'A baryon is a type of hadron that is always composed of exactly three quarks. Protons and neutrons are the most well-known examples of baryons.',
      diveDeep: 'It is essential to distinguish between the two types of hadrons: baryons (3 quarks) and mesons (1 quark and 1 antiquark). The Regents exam frequently asks for the number of quarks in these particles to ensure students understand their underlying structure. A simple way to remember this is that \'B\' for Baryon can stand for \'Big\' or a \'Bundle\' of three. If you see an option for \'two quarks,\' remember that always refers to a meson.'
    },
    {
      number: 49,
      part: 'B-1',
      text: 'The strong nuclear force holds nucleons together using which exchange force carriers?',
      choices: ['photons', 'gluons', 'gravitons', 'W/Z bosons'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'Gluons are the exchange particles, or gauge bosons, that carry the strong nuclear force. They are responsible for \'gluing\' quarks together to form protons and neutrons, and for holding the atomic nucleus together.',
      diveDeep: 'Each fundamental force in nature is mediated by a specific carrier particle. While the photon carries the electromagnetic force, the gluon is unique to the strong force. Students sometimes confuse the strong force with gravity because both act on nucleons, but the strong force is vastly more powerful over very short distances. A helpful exam strategy is to associate the word \'gluon\' directly with the \'glue\' that binds the nucleus.'
    },
    {
      number: 50,
      part: 'B-1',
      text: 'If 2.0 universal mass units (amu) of mass is converted entirely into energy, how much energy is released?',
      choices: ['465 MeV', '931 MeV', '1860 MeV', '2790 MeV'],
      topic: 'Modern Physics',
      correct: 2,
      explanation: 'The energy released is 1860 MeV, which is found by multiplying the mass (2.0 u) by the conversion factor of 931 MeV per universal mass unit. This is a much faster method than using E = mc² with kilograms and Joules.',
      diveDeep: 'This question uses the mass-energy equivalence principle. On the front page of your Regents Reference Table, look for the conversion factor: 1 universal mass unit (u) = 931 MeV. By using this constant, you can skip complex unit conversions. A common pitfall is accidentally using the mass of a proton or neutron instead of the 2.0 u provided in the problem. Always use the \'factor label\' method to ensure your units cancel out correctly.'
    }
  ]
}
