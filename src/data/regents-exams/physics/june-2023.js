// Physics Regents — June 2023
export default {
  id: 'phys-june-2023',
  subject: 'physics',
  year: 2023,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'Which quantity is a vector quantity that has both magnitude and direction?',
      choices: ['mass', 'distance', 'momentum', 'kinetic energy'],
      topic: 'Mechanics & Forces',
      correct: 2,
      explanation: 'Momentum is a vector quantity because it describes both the magnitude of an object\'s motion and the direction in which it is moving. Quantities like mass, distance, and kinetic energy are scalars, meaning they only have a magnitude (size) but no specific direction.',
      diveDeep: 'In physics, distinguishing between scalars and vectors is fundamental for setting up problems correctly. Momentum is defined as the product of mass (a scalar) and velocity (a vector), which makes the resulting momentum a vector as well. If an object is moving at 5 kg·m/s to the right, that direction is a required part of the measurement. A good exam strategy is to group common quantities: displacement, velocity, acceleration, force, and momentum are the \'Big Five\' vectors you will see most often.'
    },
    {
      number: 2,
      part: 'A',
      text: 'An object is sliding at constant speed across a horizontal wooden table. The net force acting on the object is',
      choices: ['zero', 'equal to the force of kinetic friction', 'equal to the normal force', 'directed in the direction of motion'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The net force is zero. Because the object is moving at a constant speed in a straight line, its acceleration is zero, which means the sum of all forces acting on it must be zero according to Newton’s Second Law.',
      diveDeep: 'Newton’s First Law explains that an object in motion stays in motion unless an unbalanced force acts on it. Many students incorrectly assume a net force is needed to maintain motion, but here, the applied force and friction are equal and opposite. A key exam strategy is to instantly link the terms \'constant speed\' or \'equilibrium\' to a net force of zero.'
    },
    {
      number: 3,
      part: 'A',
      text: 'A sound wave has a frequency of 440 Hertz and travels through air at 340 meters per second. What is the wavelength of the sound wave?',
      choices: ['0.77 m', '1.3 m', '1.5 × 10^5 m', '1.5 m'],
      topic: 'Waves & Optics',
      correct: 0,
      explanation: 'The wavelength is 0.77 m. This is calculated using the wave equation, v = fλ, by dividing the speed (340 m/s) by the frequency (440 Hz).',
      diveDeep: 'The wave equation defines how fast a wave travels based on its physical properties. A common mistake is multiplying the speed and frequency instead of dividing them; always verify that your units cancel out to give you meters. If the speed of sound isn\'t provided in a future question, you can find the standard value on your Physics Reference Table.'
    },
    {
      number: 4,
      part: 'A',
      text: 'A spring with a spring constant of 100. Newtons per meter is compressed 0.20 meter. What is the potential energy stored in the compressed spring?',
      choices: ['2.0 J', '4.0 J', '10. J', '20. J'],
      topic: 'Energy & Power',
      correct: 0,
      explanation: 'The potential energy is 2.0 J. It is found using the formula PE_s = ½kx², substituting 100 N/m for the spring constant (k) and 0.20 m for the compression distance (x).',
      diveDeep: 'Elastic potential energy is proportional to the square of the compression distance, which is why students often forget to square the 0.20 m value. Notice that doubling the compression would actually quadruple the stored energy, not just double it. Always ensure your distance is converted to meters before calculating to keep your energy units in Joules.'
    },
    {
      number: 5,
      part: 'A',
      text: 'What is the electrical resistance of a copper wire if a current of 2.0 Amperes flows through it when connected to a 12-Volt battery?',
      choices: ['6.0 Ω', '24 Ω', '0.17 Ω', '4.0 Ω'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'The resistance is 6.0 Ω. Using Ohm’s Law (V = IR), you solve for resistance by dividing the voltage of 12 V by the current of 2.0 A.',
      diveDeep: 'Ohm’s Law is a fundamental circuit relationship that shows how resistance limits the flow of current for a given voltage. Distractors often result from multiplying the numbers (24 Ω) or dividing in the wrong order (0.17 Ω). Using the \'VIR\' triangle is a great way to ensure you are using the correct algebraic arrangement for every electricity problem.'
    },
    {
      number: 6,
      part: 'A',
      text: 'Which wave phenomenon occurs when a wave bends around the edges of an obstacle or spreads through a narrow opening?',
      choices: ['reflection', 'refraction', 'dispersion', 'diffraction'],
      topic: 'Waves & Optics',
      correct: 3,
      explanation: 'The phenomenon is diffraction. This specific behavior happens whenever a wave encounters a barrier or a small gap and spreads out into the region beyond it.',
      diveDeep: 'Diffraction is a hallmark of wave behavior and is distinct from refraction, which requires a wave to enter a new medium. It is most noticeable when the size of the opening is similar to the wavelength of the wave. On the exam, look for keywords like \'narrow opening\' or \'sharp edge\' to quickly identify diffraction.'
    },
    {
      number: 7,
      part: 'A',
      text: 'What is the energy of a photon of green light with a frequency of 6.00 × 10^14 Hertz? (Planck\'s constant h = 6.63 × 10^-34 J·s)',
      choices: ['1.10 × 10^-48 J', '3.98 × 10^-19 J', '9.05 × 10^-20 J', '4.40 × 10^-19 J'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'The energy is 3.98 × 10⁻¹⁹ J. You calculate this by multiplying Planck’s constant (h) by the given frequency (f) of the light.',
      diveDeep: 'The equation E = hf shows that the energy of a single photon is directly proportional to its frequency. When working with scientific notation, a good trick is to estimate the exponent—since -34 plus 14 is -20, your answer should be close to that power of ten. This concept explains why high-frequency waves like X-rays carry much more energy than low-frequency radio waves.'
    },
    {
      number: 8,
      part: 'A',
      text: 'If a hydrogen atom undergoes a transition from the n = 3 energy level to the n = 2 energy level, a photon is emitted. What is the energy of this emitted photon? (E3 = -1.51 eV, E2 = -3.40 eV)',
      choices: ['1.89 eV', '4.91 eV', '1.51 eV', '3.40 eV'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'The energy of the emitted photon is 1.89 eV. This value is equal to the absolute difference between the n=3 level (-1.51 eV) and the n=2 level (-3.40 eV).',
      diveDeep: 'When an electron drops to a lower state, it releases a photon with an energy exactly matching the \'gap\' between levels. Don\'t be distracted by the negative signs; simply subtract the smaller energy value from the larger one to find the positive energy of the emitted light. This specific jump in a hydrogen atom is famous for creating the visible red light in the Balmer series.'
    },
    {
      number: 9,
      part: 'A',
      text: 'A neutron is composed of which combination of quarks?',
      choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'A neutron consists of one up quark and two down quarks (udd). This combination results in a neutral particle because the charges (+2/3, -1/3, and -1/3) sum exactly to zero.',
      diveDeep: 'Quarks are the fundamental building blocks of \'hadrons\' like protons and neutrons. It is easy to confuse the neutron (udd) with the proton (uud), so remember that \'up\' quarks have a positive 2/3 charge while \'down\' quarks have a negative 1/3 charge. You can always use the \'Particles of the Standard Model\' chart on your Reference Table to verify these charge sums during the test.'
    },
    {
      number: 10,
      part: 'A',
      text: 'Which unit is equivalent to a Joule?',
      choices: ['Newton · meter', 'Newton / meter', 'Watt · second^2', 'Kilogram · meter / second'],
      topic: 'Energy & Power',
      correct: 0,
      explanation: 'A Newton · meter is equivalent to a Joule. This is because work and energy are defined as a force (Newtons) applied over a distance (meters).',
      diveDeep: 'Understanding unit equivalence is a common Regents topic; a Joule is also equal to a Watt · second or a kg·m²/s². Distractors like Newton/meter describe the spring constant, while kg·m/s describes momentum. A great strategy is to check your formula sheet: any terms that multiply to equal Work or Energy will give you an equivalent unit for Joules.'
    },
    {
      number: 11,
      part: 'A',
      text: 'Which of the following represents a scalar quantity?',
      choices: ['mass', 'velocity', 'acceleration', 'force'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'Mass is a scalar quantity because it is fully described by its magnitude alone. Unlike velocity, acceleration, or force, mass does not have a direction associated with it.',
      diveDeep: 'Scalars are simple measurements like time, temperature, and distance, while vectors include both magnitude and direction. Students often mix up \'speed\' (scalar) and \'velocity\' (vector), but mass remains one of the most fundamental scalars in physics. An easy exam tip: if you can\'t describe the value using a direction like \'north\' or \'down,\' it is almost certainly a scalar.'
    },
    {
      number: 12,
      part: 'A',
      text: 'The inertia of a body is directly related to its',
      choices: ['velocity', 'mass', 'acceleration', 'force'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'The correct choice is mass. Inertia is a property of matter that depends solely on the amount of mass an object has, not how fast it is moving or the forces acting on it.',
      diveDeep: 'Mass is the quantitative measure of inertia. In Newton’s First Law, we learn that objects with more mass are harder to accelerate because they have more inertia. A common trap is thinking velocity or force affects inertia; however, a resting elephant has the same inertia as a moving elephant because their mass hasn\'t changed. On the Regents, remember: Mass = Inertia.'
    },
    {
      number: 13,
      part: 'A',
      text: 'An object starts from rest and accelerates uniformly at 4.0 m/s^2. What is its displacement after 3.0 seconds?',
      choices: ['6.0 m', '12 m', '18 m', '36 m'],
      topic: 'Mechanics & Forces',
      correct: 2,
      explanation: 'Using the kinematic equation d = vit + ½at², we plug in vi = 0, a = 4.0 m/s², and t = 3.0 s to get 18 m. Since the object starts from rest, the initial velocity term is zero, simplifying the calculation.',
      diveDeep: 'This question tests your ability to select and use the correct kinematic equation for uniform acceleration. A frequent mistake is forgetting to square the time (t²) or failing to multiply by the ½ factor, which would lead to the distractor choices. Always check your units and ensure you are using the displacement formula rather than the velocity formula (v = at). Strategy: Write out your \'Givens\' (vi, a, t) before picking a formula from your Reference Table.'
    },
    {
      number: 14,
      part: 'A',
      text: 'A 4.0-Newton force and a 3.0-Newton force act concurrently on a point. If they are perpendicular, the magnitude of their resultant is',
      choices: ['1.0 N', '5.0 N', '7.0 N', '12 N'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'When two forces are perpendicular, their resultant is found using the Pythagorean theorem (a² + b² = c²). Here, √(3² + 4²) equals 5.0 N.',
      diveDeep: 'Vector addition depends on the angle between the vectors. If these forces were in the same direction, the resultant would be 7.0 N (maximum); if opposite, 1.0 N (minimum). Because they are at a 90-degree angle, we treat them as legs of a right triangle. A useful tip for the Regents is to recognize common \'Pythagorean triples\' like 3-4-5 to save time on calculations.'
    },
    {
      number: 15,
      part: 'A',
      text: 'A ball is kicked horizontally from a cliff. The horizontal component of its velocity',
      choices: ['remains constant', 'increases', 'decreases', 'first increases, then decreases'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The horizontal velocity remains constant throughout the flight. This is because gravity only acts vertically, meaning there is no horizontal acceleration to change the ball\'s sideways speed.',
      diveDeep: 'Projectile motion is the combination of two independent motions: constant horizontal velocity and constant vertical acceleration (9.81 m/s²). Students often think the ball \'slows down\' horizontally, but without air resistance, nothing opposes its forward motion. This independence is key to solving complex trajectory problems. Strategy: Always treat the x-direction and y-direction as separate math problems that only share the variable of time.'
    },
    {
      number: 16,
      part: 'A',
      text: 'As an object falls freely near Earth\'s surface, its acceleration',
      choices: ['remains constant', 'increases', 'decreases', 'first increases, then decreases'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'For any object in free fall near Earth, the acceleration is a constant 9.81 m/s² downward. While the velocity increases as it falls, the rate at which it speeds up stays the same.',
      diveDeep: 'A common misconception is that acceleration increases as an object gets faster, but \'acceleration\' refers to the change in velocity, not the velocity itself. In the vacuum of \'free fall\' used on the Regents, we ignore air resistance, so gravity is the only force. If the question mentioned air resistance, the acceleration would actually decrease as it approached terminal velocity. Remember: \'Free fall\' on the exam always implies a constant acceleration of 9.81 m/s².'
    },
    {
      number: 17,
      part: 'A',
      text: 'Power is defined as',
      choices: ['force times distance', 'work done per unit time', 'kinetic energy per unit mass', 'potential energy change'],
      topic: 'Energy & Power',
      correct: 1,
      explanation: 'Power is the rate at which work is done, calculated as work divided by time (P = W/t). It measures how quickly energy is being transferred or transformed.',
      diveDeep: 'In physics, \'rate\' almost always means \'divided by time.\' While \'force times distance\' defines work, power specifically looks at how fast that work happens. For example, two people might do the same amount of work climbing stairs, but the one who runs up does it with more power. Strategy: Units can help you—Power is measured in Watts, which are Joules (Work) per second (Time).'
    },
    {
      number: 18,
      part: 'A',
      text: 'As a body falls freely near Earth\'s surface, the kinetic energy of the body',
      choices: ['remains constant', 'increases', 'decreases', 'first decreases, then increases'],
      topic: 'Energy & Power',
      correct: 1,
      explanation: 'As an object falls, gravity causes it to accelerate and gain speed. Since kinetic energy is the energy of motion (½mv²), increasing the speed directly increases the kinetic energy.',
      diveDeep: 'This is an example of the Law of Conservation of Energy. As the object loses height, it loses gravitational potential energy, which is converted into kinetic energy. While the total mechanical energy stays constant (in the absence of air resistance), the individual forms of energy shift. Trap: Don\'t confuse \'total energy\' with \'kinetic energy\'—one stays the same while the other grows.'
    },
    {
      number: 19,
      part: 'A',
      text: 'A spring has a spring constant of 200. N/m. The potential energy stored in the spring when it is compressed 0.10 meter is',
      choices: ['1.0 J', '2.0 J', '10. J', '20. J'],
      topic: 'Energy & Power',
      correct: 0,
      explanation: 'Elastic potential energy is calculated using the formula PEs = ½kx². Plugging in k = 200 N/m and x = 0.10 m gives us 0.5 × 200 × 0.01, which equals 1.0 Joule.',
      diveDeep: 'The most common error in spring problems is forgetting to square the displacement (x). Without squaring, you would get 10 J, which is a distractor. Also, ensure the displacement is in meters; if the problem gave centimeters, you would need to convert first. Strategy: Always check the exponent in your energy formulas—KE and PEs both involve a squared term (v² and x²).'
    },
    {
      number: 20,
      part: 'A',
      text: 'An electrostatic force of attraction exists between two charged spheres. If the distance between their centers is doubled, the force becomes',
      choices: ['one-half as great', 'one-quarter as great', 'twice as great', 'four times as great'],
      topic: 'Electricity & Magnetism',
      correct: 1,
      explanation: 'Electrostatic force follows an \'inverse-square law,\' meaning the force is inversely proportional to the square of the distance. If you double the distance (2x), the force becomes 1/2² or 1/4 of its original value.',
      diveDeep: 'This relationship comes from Coulomb\'s Law (F = kq₁q₂/r²). Because \'r\' is in the denominator and squared, changes in distance have a much larger impact on force than changes in charge. If the distance were tripled, the force would drop to 1/9; if halved, the force would quadruple. Strategy: For \'ratio\' questions like this, plug simple numbers (like 1 and 2) into the formula variables to see how the result changes.'
    },
    {
      number: 21,
      part: 'A',
      text: 'Which diagram represents the electric field lines near a positive point charge?',
      choices: [
        'Concentric circles around the charge',
        'Straight lines pointing directly toward the charge',
        'Straight lines pointing directly away from the charge',
        'Concentric square shapes around the charge'
      ],
      topic: 'Electricity & Magnetism',
      correct: 2,
      explanation: 'Electric field lines are defined by the direction a positive test charge would move. Since like charges repel, the lines must point directly away from a positive point charge.',
      diveDeep: 'By convention, field lines always exit positive charges and enter negative charges. They never cross each other and their density represents the strength of the field (closer lines mean a stronger field). A common trap is confusing electric field lines with magnetic field lines, which can form loops. Strategy: Memorize the \'Positive = Out, Negative = In\' rule for both electric fields and gravitational fields (though gravity only goes \'In\').'
    },
    {
      number: 22,
      part: 'A',
      text: 'If three 6.0-Ohm resistors are connected in parallel, their equivalent combined resistance is',
      choices: ['2.0 Ω', '6.0 Ω', '12 Ω', '18 Ω'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'The correct answer is 2.0 Ω. In a parallel circuit, the reciprocal of the equivalent resistance is equal to the sum of the reciprocals of the individual resistors (1/Req = 1/6 + 1/6 + 1/6).',
      diveDeep: 'Adding resistors in parallel actually decreases the overall resistance because you are providing more paths for the current to flow. A common mistake is to add the values directly as if they were in series, which would result in 18 Ω. A useful exam tip is to remember that the equivalent resistance in a parallel circuit will always be less than the smallest individual resistor.'
    },
    {
      number: 23,
      part: 'A',
      text: 'A wave in which the particles of the medium vibrate perpendicular to the direction of wave motion is classified as',
      choices: ['transverse', 'longitudinal', 'torsional', 'magnetic'],
      topic: 'Waves & Optics',
      correct: 0,
      explanation: 'The correct answer is transverse. In a transverse wave, the particles move up and down (or side to side) at a 90-degree angle to the direction the wave energy travels.',
      diveDeep: 'Light and other electromagnetic waves are examples of transverse waves, while sound is a longitudinal wave where particles move parallel to the wave direction. Students often confuse these two, but you can remember that \'Transverse\' starts with \'T\', which looks like a right angle or perpendicular intersection. Visualizing a \'stadium wave\' where fans jump up while the wave moves horizontally is a great way to anchor this concept.'
    },
    {
      number: 24,
      part: 'A',
      text: 'What phenomenon occurs when a wave bends as it enters a new medium?',
      choices: ['reflection', 'refraction', 'diffraction', 'dispersion'],
      topic: 'Waves & Optics',
      correct: 1,
      explanation: 'The correct term is refraction. Refraction occurs because the speed of the wave changes as it moves from one medium into another, causing it to change direction at the boundary.',
      diveDeep: 'Refraction is the principle behind how lenses work to focus light and why a straw looks bent in a glass of water. The amount of bending depends on the change in the index of refraction between the two materials, governed by Snell\'s Law. A common mistake is confusing refraction with diffraction, which is the bending of waves around corners or through small openings. A key exam strategy is to remember that frequency remains constant during refraction, while wavelength and speed change.'
    },
    {
      number: 25,
      part: 'A',
      text: 'The speed of light in a vacuum is approximately',
      choices: ['3.00 × 10^8 m/s', '3.00 × 10^8 km/s', '3.00 × 10^8 cm/s', '340 m/s'],
      topic: 'Waves & Optics',
      correct: 0,
      explanation: 'The correct answer is 3.00 × 10⁸ m/s. This is a fundamental physical constant used across physics to describe the maximum speed of electromagnetic radiation.',
      diveDeep: 'This value can be found on the first page of your Physics Reference Table under the \'Physical Constants\' section. Be careful not to confuse the units; distractors often use kilometers or centimeters instead of meters per second. Also, distinguish this from the speed of sound, which is only about 331 m/s to 340 m/s depending on temperature.'
    },
    {
      number: 26,
      part: 'A',
      text: 'A proton consists of which combination of quarks?',
      choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'A proton consists of two up quarks and one down quark (uud). This combination results in a total net charge of +1e, which matches the known charge of a proton.',
      diveDeep: 'Quarks are the fundamental building blocks of hadrons, such as protons and neutrons. Protons (uud) and neutrons (udd) are both classified as baryons because they are made of three quarks. You can verify these combinations using the charges provided in your Reference Table: Up quarks have a charge of +2/3e and Down quarks have -1/3e. A great exam strategy is to calculate the total charge of the choices if you forget the specific combination.'
    },
    {
      number: 27,
      part: 'A',
      text: 'According to the Standard Model, electrons are classified as',
      choices: ['leptons', 'baryons', 'mesons', 'quarks'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'The correct answer is leptons. Electrons are fundamental particles that are not made of smaller components like quarks and do not experience the strong nuclear force.',
      diveDeep: 'The Standard Model divides matter into two main groups: quarks and leptons. While quarks combine to form hadrons like protons and neutrons, leptons like electrons and neutrinos exist as solitary particles. You should always refer to the \'Particles of the Standard Model\' chart in your Reference Table to verify classifications like mass and charge during the exam.'
    },
    {
      number: 28,
      part: 'A',
      text: 'What is the charge of a down quark?',
      choices: ['-1/3 e', '+1/3 e', '-2/3 e', '+2/3 e'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'The charge of a down quark is -1/3 e. This fractional charge is a unique property of quarks, which always combine to form particles with integer charges like 0 or +1.',
      diveDeep: 'Along with the up quark (+2/3 e), the down quark is one of the primary constituents of ordinary matter. Because quarks carry fractional charges, they are never found in isolation, a phenomenon known as color confinement. When answering these questions, refer to the "Particles of the Standard Model" chart in your Reference Tables. Traps often involve confusing the signs or values of up (+2/3) versus down (-1/3) quarks.'
    },
    {
      number: 29,
      part: 'A',
      text: 'Which force is responsible for holding the nucleus of an atom together?',
      choices: ['gravitational force', 'electromagnetic force', 'strong nuclear force', 'weak nuclear force'],
      topic: 'Modern Physics',
      correct: 2,
      explanation: 'The correct answer is the strong nuclear force. This force acts between protons and neutrons at very short distances to overcome the electromagnetic repulsion between positive protons.',
      diveDeep: 'Without the strong nuclear force, the nucleus would instantly fly apart because like-charged protons repel each other with great intensity. Gravity is much too weak to hold subatomic particles together, and the weak force is primarily involved in radioactive decay. Remembering that \'strong\' refers to its ability to dominate over the \'electromagnetic\' repulsion at close range is a key strategy for this topic.'
    },
    {
      number: 30,
      part: 'A',
      text: 'Planck\'s constant h is equal to',
      choices: ['6.63 × 10^-34 J·s', '3.00 × 10^8 m/s', '1.60 × 10^-19 C', '9.81 m/s^2'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'Planck\'s constant h is equal to 6.63 × 10⁻³⁴ J·s. This fundamental constant relates the energy of a photon to its frequency through the equation E = hf.',
      diveDeep: 'Max Planck introduced this constant to explain blackbody radiation, marking the birth of quantum mechanics. It defines the scale at which quantum effects become important, showing that energy is quantized rather than continuous. The other choices represent the speed of light (c), the elementary charge (e), and the acceleration due to gravity (g). A reliable strategy for these questions is to look at the units; J·s is specific to action or angular momentum, which characterizes Planck\'s constant.'
    },
    {
      number: 31,
      part: 'B-1',
      text: 'A ball is thrown horizontally with a speed of 10. m/s from a height of 5.0 meters. How much time does it take for the ball to hit the ground?',
      choices: ['0.50 s', '1.0 s', '2.0 s', '5.0 s'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'The correct answer is 1.0 s. Using the vertical motion formula d = 1/2 at², we solve 5.0 m = 1/2 (9.8 m/s²)t², which yields approximately 1 second.',
      diveDeep: 'The most important concept here is that horizontal and vertical motions are independent; the ball\'s horizontal speed of 10 m/s does not affect how fast it falls. Whether you drop the ball or fire it from a cannon horizontally, it will hit the ground at the same time from the same height. On the exam, always use only the vertical components (initial vertical velocity is zero) to find the time of flight.'
    },
    {
      number: 32,
      part: 'B-1',
      text: 'A 1.0-kilogram mass is attached to a string of length 2.0 meters and revolves in a circle at a constant speed of 4.0 meters per second. What is the centripetal force acting on the mass?',
      choices: ['2.0 N', '4.0 N', '8.0 N', '16 N'],
      topic: 'Mechanics & Forces',
      correct: 2,
      explanation: 'The correct answer is 8.0 N. Using the formula Fc = mv²/r, we calculate (1.0 kg × (4.0 m/s)²) / 2.0 m, which equals 16 / 2 = 8.0 Newtons.',
      diveDeep: 'Centripetal force is always directed toward the center of the circular path and is required to keep an object in uniform circular motion. A common error is forgetting to square the velocity or accidentally using the diameter instead of the radius (length of the string). Always double-check your Reference Table for the formula and ensure your units are in kilograms, meters, and seconds before calculating.'
    },
    {
      number: 33,
      part: 'B-1',
      text: 'An elastic collision occurs between two spheres of equal mass. If sphere A is moving at v and sphere B is at rest before the collision, what is sphere A\'s speed after the collision?',
      choices: ['zero', 'v/2', 'v', '2v'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The correct answer is zero. In a perfectly elastic collision between two identical masses where one is stationary, they swap velocities completely.',
      diveDeep: 'This is often demonstrated with billiard balls; the cue ball hits a stationary ball and stops dead while the second ball moves off with the original speed. This happens because both momentum and kinetic energy must be conserved. If the masses were not equal, sphere A would either continue forward or bounce backward, but the \'equal mass\' keyword is your cue for a total velocity exchange.'
    },
    {
      number: 34,
      part: 'B-1',
      text: 'A 5.0-Newton force is applied to a block at an angle of 60. degrees above the horizontal. What is the horizontal component of the force?',
      choices: ['2.5 N', '4.3 N', '5.0 N', '10. N'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The correct answer is 2.5 N. The horizontal component is found by multiplying the magnitude of the force by the cosine of the angle: Fx = F cos(θ) = 5.0 N × cos(60°).',
      diveDeep: 'Since the cosine of 60 degrees is 0.5, the horizontal component is exactly half the applied force. Students often mistakenly use sine, which would give the vertical component (4.3 N) instead. A helpful visual check is to remember that as the angle increases toward 90 degrees, the horizontal component should get smaller, while the vertical component gets larger.'
    },
    {
      number: 35,
      part: 'B-1',
      text: 'What represents the work done when a 10.0-Newton force is used to push a box 5.00 meters across a level floor?',
      choices: ['2.00 J', '5.00 J', '50.0 J', '100. J'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'The correct answer is 50.0 J. Work is calculated by multiplying the force applied by the distance moved in the direction of the force (W = Fd), so 10.0 N × 5.00 m = 50.0 Joules.',
      diveDeep: 'Work represents the transfer of energy to the object, and its unit is the Joule (equivalent to a Newton-meter). If the force was applied at an angle, you would only use the component of the force that is parallel to the displacement. Be careful with distractors that might ask for \'Power,\' which would require dividing this work by time.'
    },
    {
      number: 36,
      part: 'B-1',
      text: 'A 60.-kilogram student runs up a flight of stairs that is 4.0 meters high in 3.0 seconds. What is the average power developed by the student?',
      choices: ['80. W', '240 W', '780 W', '2350 W'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'Power is the rate at which work is done, calculated as P = (mgh) / t. Using the student\'s mass, gravity, and height, the calculation (60. kg × 9.81 m/s² × 4.0 m) / 3.0 s gives approximately 780 W.',
      diveDeep: 'In this problem, the student is performing work against gravity to increase their gravitational potential energy. Power measures how quickly this energy transfer occurs; notice that if the student ran faster, the power would increase even though the work done stays the same. A common mistake is forgetting to multiply mass by gravity (9.81 m/s²) to find the force (weight). Always ensure your time is in seconds and your mass is in kilograms to get the result in Watts.'
    },
    {
      number: 37,
      part: 'B-1',
      text: 'A 2.0-kilogram object is moving at 10. meters per second. What is the kinetic energy of the object?',
      choices: ['10. J', '20. J', '100. J', '200. J'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'Kinetic energy is the energy of motion and is calculated using the formula KE = ½mv². Substituting the given values, ½(2.0 kg)(10. m/s)² equals 100. Joules.',
      diveDeep: 'The relationship between velocity and kinetic energy is squared, meaning that speed has a much greater impact on energy than mass does. For example, if this object\'s speed doubled to 20 m/s, its energy would actually quadruple to 400 J! When solving these on the exam, the most frequent error is forgetting to square the velocity. Always write out the formula first to ensure you don\'t skip that critical step.'
    },
    {
      number: 38,
      part: 'B-1',
      text: 'An electrostatic force of F exists between two charges separated by a distance of r. If the distance between the charges is doubled, the new force will be',
      choices: ['F/4', 'F/2', '2F', '4F'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'The new force is F/4. Because electrostatic force follows an inverse square law (1/r²), doubling the distance means the force is divided by 2² (or 4). Choices like 2F or 4F incorrectly suggest that force increases with distance, which contradicts Coulomb\'s Law.',
      diveDeep: 'This \'proportionality\' question is a Regents favorite. You don\'t need the actual charge values; you just need to see how the change in one variable affects the result. If the distance were tripled, the force would become F/9; if the distance were halved, the force would quadruple (4F). A foolproof strategy is to plug the \'change factor\' into the formula: if r becomes 2, then 1/r² becomes 1/(2²), which is 1/4.'
    },
    {
      number: 39,
      part: 'B-1',
      text: 'A copper wire has a resistance of 10. Ohms. If its length is doubled while its cross-sectional area remains the same, the new resistance will be',
      choices: ['5.0 Ω', '10. Ω', '20. Ω', '40. Ω'],
      topic: 'Electricity & Magnetism',
      correct: 2,
      explanation: 'Resistance is directly proportional to the length of a wire (R = ρL/A). Since the length is doubled and all other factors remain constant, the resistance also doubles from 10. Ω to 20. Ω.',
      diveDeep: 'Think of a wire like a hallway: a longer hallway is harder to walk through because there is more distance for \'collisions\' to occur, which represents higher resistance. The formula R = ρL/A shows that length (L) is in the numerator, confirming this direct relationship. Be careful on the exam if the question mentions changing the area or radius; area is in the denominator, so doubling the area would actually cut the resistance in half.'
    },
    {
      number: 40,
      part: 'B-1',
      text: 'What is the voltage drop across a 4.0-Ohm resistor carrying a current of 3.0 Amperes?',
      choices: ['0.75 V', '1.3 V', '12 V', '48 V'],
      topic: 'Electricity & Magnetism',
      correct: 2,
      explanation: 'According to Ohm\'s Law, voltage drop is calculated as V = IR. Multiplying the current of 3.0 A by the resistance of 4.0 Ω gives a potential difference of 12 V.',
      diveDeep: 'Ohm\'s Law is the most fundamental relationship in circuit electricity, linking the \'push\' (voltage), the \'flow\' (current), and the \'opposition\' (resistance). You can think of voltage as the energy given to each charge as it moves through the resistor. On the Regents, always check your Reference Table for this formula and ensure your units are in standard Ohms, Amperes, and Volts before calculating.'
    },
    {
      number: 41,
      part: 'B-1',
      text: 'A parallel circuit contains two branches. The voltage drop across the first branch is 12 Volts. What is the voltage drop across the second branch?',
      choices: ['6.0 V', '12 V', '24 V', 'equal to the current'],
      topic: 'Electricity & Magnetism',
      correct: 1,
      explanation: 'In a parallel circuit, the voltage drop is the same across all branches. Since the first branch has a 12 V drop, the second branch must also have a 12 V drop.',
      diveDeep: 'This is a defining characteristic of parallel circuits: every path from the positive to the negative terminal of the source experiences the full potential difference of that source. This is why your home is wired in parallel—every outlet provides the same 120 volts regardless of what is plugged in. Don\'t be fooled by questions that give you different resistance values for the branches; the voltage remains constant regardless of the resistance.'
    },
    {
      number: 42,
      part: 'B-1',
      text: 'A wave has a frequency of 100. Hertz and travels at 300. meters per second. What is the wavelength of the wave?',
      choices: ['0.33 m', '3.00 m', '30.0 m', '300.0 m'],
      topic: 'Waves & Optics',
      correct: 1,
      explanation: 'The relationship between wave speed, frequency, and wavelength is v = fλ. Rearranging to solve for wavelength (λ = v/f), we divide 300. m/s by 100. Hz to get 3.00 m.',
      diveDeep: 'Wavelength and frequency are inversely proportional when the speed of the wave is constant. This means that high-frequency waves (like blue light) have short wavelengths, while low-frequency waves (like red light) have long wavelengths. When calculating, always ensure your units are consistent—Hertz is equivalent to \'per second,\' which allows the seconds to cancel out and leave you with meters.'
    },
    {
      number: 43,
      part: 'B-1',
      text: 'A light ray enters a block of crown glass (index of refraction = 1.52) from air. As the light enters the glass, the ray bends',
      choices: [
        'toward the normal because it slows down',
        'away from the normal because it slows down',
        'toward the normal because it speeds up',
        'away from the normal because it speeds up'
      ],
      topic: 'Waves & Optics',
      correct: 0,
      explanation: 'The light bends toward the normal because it slows down. When light moves from a lower index of refraction (air, n ≈ 1) to a higher one (glass, n = 1.52), it loses speed and its path shifts closer to the perpendicular normal line. Distractors suggesting it bends \'away\' or \'speeds up\' describe the opposite transition (glass to air).',
      diveDeep: 'The behavior of light at boundaries is governed by the index of refraction, which is a ratio of the speed of light in a vacuum to its speed in the material. A higher index means the light travels more slowly. A great mnemonic to remember is \'FST\': Fast to Slow, Towards the normal. This principle is why objects underwater appear to be at different depths than they actually are. Master this \'bending\' rule to solve almost any refraction problem without even needing Snell\'s Law.'
    },
    {
      number: 44,
      part: 'B-1',
      text: 'A wave pulse is reflected from a rigid boundary. Compared to the incident pulse, the reflected pulse is inverted by',
      choices: ['0°', '90°', '180°', '360°'],
      topic: 'Waves & Optics',
      correct: 2,
      explanation: 'The reflected pulse is inverted by 180°. This flip occurs because the rigid boundary acts as a fixed point that exerts an equal and opposite downward force on the incoming upward pulse. Choices like 0° describe reflection from a \'free\' or non-rigid boundary where no inversion happens.',
      diveDeep: 'This inversion is a direct application of Newton\'s Third Law: as the wave pulse pulls up on the wall, the wall pulls down on the string with an equal force, creating a new pulse that is upside down. If the end of the string were free to move (like a ring on a pole), the pulse would bounce back upright. In wave physics, a 180° phase shift is the same as turning a \'crest\' into a \'trough.\' When reading these questions, always check if the boundary is described as \'fixed,\' \'rigid,\' or \'hard.\''
    },
    {
      number: 45,
      part: 'B-1',
      text: 'Which phenomenon is responsible for the separation of white light into its component colors when passing through a prism?',
      choices: ['reflection', 'refraction', 'dispersion', 'diffraction'],
      topic: 'Waves & Optics',
      correct: 2,
      explanation: 'The correct phenomenon is dispersion. This occurs because different colors (frequencies) of light refract at slightly different angles when passing through a material. While refraction is the bending itself, dispersion is the specific term for the separation of those colors into a spectrum.',
      diveDeep: 'Dispersion happens because the index of refraction for a material like glass is not a single fixed number; it actually varies slightly depending on the wavelength of the light. Violet light has a higher frequency and shorter wavelength, so it interacts more with the material, slows down more, and bends more sharply than red light. This is why red is always at the top of a rainbow and violet is at the bottom. Distractors like diffraction or reflection involve light bending around corners or bouncing off surfaces, which does not cause this specific color separation.'
    },
    {
      number: 46,
      part: 'B-1',
      text: 'What is the frequency of a photon of light containing 4.0 × 10^-19 Joule of energy?',
      choices: ['6.0 × 10^14 Hz', '2.5 × 10^14 Hz', '6.0 × 10^15 Hz', '2.5 × 10^15 Hz'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'The energy of a photon is given by E = hf, where h is Planck\'s constant. Dividing the energy (4.0 × 10⁻¹⁹ J) by Planck\'s constant (6.63 × 10⁻³⁴ J·s) yields a frequency of 6.0 × 10¹⁴ Hz.',
      diveDeep: 'This question explores the \'quantum\' nature of light, where energy is proportional to frequency rather than brightness. Planck\'s constant is a tiny value found on your Reference Table, and it acts as the bridge between the wave property (frequency) and the particle property (energy) of light. A common trap is using the speed of light formula (c = fλ) instead of the energy formula; remember to use E = hf whenever the problem mentions Joules or photons.'
    },
    {
      number: 47,
      part: 'B-1',
      text: 'A proton consists of which combination of quarks?',
      choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'A proton consists of two up quarks and one down quark (uud). This combination results in a total net charge of +1e, which matches the known charge of a proton.',
      diveDeep: 'Quarks are the fundamental building blocks of hadrons, such as protons and neutrons. Protons (uud) and neutrons (udd) are both classified as baryons because they are made of three quarks. You can verify these combinations using the charges provided in your Reference Table: Up quarks have a charge of +2/3e and Down quarks have -1/3e. A great exam strategy is to calculate the total charge of the choices if you forget the specific combination.'
    },
    {
      number: 48,
      part: 'B-1',
      text: 'A baryon must always consist of how many quarks?',
      choices: ['one', 'two', 'three', 'four'],
      topic: 'Modern Physics',
      correct: 2,
      explanation: 'A baryon must always consist of three quarks. Protons and neutrons are the most common examples, each made of three-quark combinations. Mesons, a different type of particle, are made of two quarks (one quark and one antiquark).',
      diveDeep: 'In the Standard Model, hadrons are divided into baryons and mesons based on their quark count. For a particle to be stable and \'color-neutral,\' it must combine quarks in specific ways; for baryons, this requires three quarks of different \'colors\' (red, green, and blue). This three-quark structure is what gives baryons their relatively large mass compared to other particles. A quick memory trick is that \'Baryon\' starts with \'B\' like \'Big,\' and three is the largest number of quarks you\'ll usually be asked about for a single particle.'
    },
    {
      number: 49,
      part: 'B-1',
      text: 'A meson must always consist of',
      choices: [
        'a quark and an antiquark',
        'three quarks',
        'three antiquarks',
        'leptons and gauge bosons'
      ],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'A meson must always consist of a quark and an antiquark. This two-particle structure distinguishes them from baryons, which consist of three quarks. Distractors like \'leptons\' are incorrect because leptons are a completely different family of particles (like electrons) that contain no quarks at all.',
      diveDeep: 'Mesons are unique because they pair a matter particle with an antimatter particle, which makes them highly unstable compared to baryons. They are essential for explaining how the strong nuclear force keeps the nucleus of an atom together. Be careful not to confuse them with baryons (3 quarks) or leptons (like electrons, which have no quarks). Check your Reference Table\'s \'Classification of Matter\' chart if you forget these groupings. Remember: 3 quarks = Baryon, 2 quarks (matter/antimatter) = Meson.'
    },
    {
      number: 50,
      part: 'B-1',
      text: 'According to the mass-energy equivalence equation E=mc^2, if 1.0 microgram of mass is converted entirely into energy, how much energy is released?',
      choices: ['9.0 × 10^7 J', '9.0 × 10^10 J', '9.0 × 10^13 J', '9.0 × 10^16 J'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'First, convert 1.0 microgram to kilograms (1.0 × 10⁻⁹ kg). Then, using E = mc², multiply the mass by the square of the speed of light (3.0 × 10⁸ m/s)², resulting in 9.0 × 10⁷ J.',
      diveDeep: 'Einstein\'s most famous equation shows that mass is actually a highly concentrated form of energy. The speed of light squared (c²) is a massive number (9 × 10¹⁶), which is why even a tiny \'micro\' amount of mass releases an enormous amount of energy. The key to this problem is the unit conversion: \'micro\' means 10⁻⁶, and since there are 1,000 grams in a kilogram, you must be very careful with your exponents to reach the correct answer.'
    }
  ]
}
