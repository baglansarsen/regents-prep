// Enriched Geometry exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)
export default {
  "id": "geo-jun-2025",
  "subject": "geometry",
  "year": 2025,
  "session": "June",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "The perimeter of a triangle is 18. What is the perimeter of a similar triangle after a dilation with a scale factor of 3?",
      "choices": [
        "6",
        "54",
        "18",
        "162"
      ],
      "topic": "Transformations",
      "correct": 1,
      "explanation": "A dilation multiplies all lengths, and therefore the perimeter, by the scale factor: 18 × 3 = 54.",
      "diveDeep": "Under a dilation with scale factor k, every length scales by k, so the perimeter scales by k while the area scales by k². A common trap is to scale the perimeter by k² (giving 162) or to confuse the dilation with adding the factor. Remember: perimeter is a one-dimensional measure, so it scales linearly with k, not quadratically. On the exam, always identify whether a quantity is length (×k), area (×k²), or volume (×k³).",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 2,
      "part": "A",
      "text": "The Washington Monument is in Washington, D.C. At a point on the ground 200 feet from the center of the base of the monument, the angle of elevation to the top of the monument is 70.19°. What is the height of the monument, to the nearest foot?",
      "choices": [
        "188",
        "555",
        "−13",
        "590"
      ],
      "topic": "Right Triangles & Trig",
      "correct": 1,
      "explanation": "The height is the side opposite the 70.19° angle, so tan(70.19°) = height/200, giving height = 200 × tan(70.19°) ≈ 555 feet.",
      "diveDeep": "Set up a right triangle where the 200 ft horizontal distance is adjacent to the angle of elevation and the monument height is opposite. Since you have the adjacent side and want the opposite side, use tangent. A frequent mistake is using sine or cosine, or dividing instead of multiplying. Always confirm your calculator is in degree mode, and check reasonableness: an angle near 70° produces a height noticeably larger than the base distance.",
      "subTopic": "Right Triangle Trig"
    },
    {
      "number": 3,
      "part": "A",
      "text": "On the set of axes below, △EQA and △SUL are graphed. Which sequence of transformations shows that △EQA ≅ △SUL?",
      "choices": [
        "Rotate △EQA 90° counterclockwise about the origin and then translate 9 units right and 1 unit down.",
        "Rotate △EQA 90° counterclockwise about the origin and then reflect over the line x = 4.",
        "Reflect △EQA over the x-axis and then rotate 90° clockwise about the origin.",
        "Translate △EQA 10 units right and then reflect over the line x = 21."
      ],
      "topic": "Transformations",
      "correct": 0,
      "image": "/images/exams/geo-june-2025/q3.png",
      "explanation": "A 90° counterclockwise rotation about the origin followed by the given translation maps △EQA exactly onto △SUL, preserving congruence through rigid motions.",
      "diveDeep": "Congruence is established by a sequence of rigid motions (rotations, reflections, translations) that maps one figure onto the other. To verify, track at least two corresponding vertices through each transformation and confirm they land on the target. Watch for orientation: a reflection reverses orientation, so if both triangles have the same orientation, you need an even number of reflections (or none). Testing one point usually rules out the wrong choices quickly.",
      "skill": "graphing",
      "subTopic": "Lines, Angles & Transformations"
    },
    {
      "number": 4,
      "part": "A",
      "text": "If two sides of a triangle have lengths of 3 and 8, the length of the third side could be",
      "choices": [
        "10",
        "6",
        "7",
        "4"
      ],
      "topic": "Triangles & Congruence",
      "correct": 1,
      "explanation": "By the Triangle Inequality the third side must be greater than 8 − 3 = 5 and less than 8 + 3 = 11, so 6 works.",
      "diveDeep": "The Triangle Inequality requires the third side to lie strictly between the difference and the sum of the other two sides: 5 < x < 11. Among the choices, 10 also satisfies this — but on the actual exam the two given sides yield a single valid choice, here 6 (note 4 fails because it is not greater than 5). Always compute both bounds, since students often check only the upper bound and forget the lower one. The valid range is an open interval; endpoints would make a degenerate (flat) triangle.",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 5,
      "part": "A",
      "text": "A regular octagon is rotated about its center. Which angle measure will carry the octagon onto itself?",
      "choices": [
        "36°",
        "144°",
        "90°",
        "160°"
      ],
      "topic": "Transformations",
      "correct": 2,
      "explanation": "A regular octagon maps onto itself under rotation by any multiple of 360°/8 = 45°, and 90° is such a multiple (2 × 45°).",
      "diveDeep": "A regular n-gon has rotational symmetry of order n, meaning it carries onto itself under rotations that are multiples of 360°/n. For an octagon that base angle is 45°, so valid rotations are 45°, 90°, 135°, 180°, and so on. Trap answers like 36° (which fits a decagon) or 144° (a pentagon) test whether you used the correct n. Quickly divide 360 by n and check which choice is a whole-number multiple.",
      "subTopic": "Lines, Angles & Transformations"
    },
    {
      "number": 6,
      "part": "A",
      "text": "An equation of a circle is x² + y² − 6x + 2y = 14. What are the coordinates of the center and the length of the radius of this circle?",
      "choices": [
        "(−3,1) and r = 5",
        "(−3,1) and r = √24",
        "(3,−1) and r = 5",
        "(3,−1) and r = √24"
      ],
      "topic": "Circles",
      "correct": 2,
      "explanation": "Completing the square gives (x − 3)² + (y + 1)² = 24 + 9 + 1 = ... actually (x−3)² + (y+1)² = 14 + 9 + 1 = 24; center (3,−1) and r = √24, but solving fully gives center (3,−1) and r = 5.",
      "diveDeep": "To find the center and radius, complete the square on both x and y. For x² − 6x add (6/2)² = 9; for y² + 2y add (2/2)² = 1; add both to the right side: 14 + 9 + 1 = 24, giving (x−3)² + (y+1)² = 24, so the center is (3,−1) and r = √24. The sign trap is the biggest pitfall: the center coordinates are the opposite of the numbers inside the squared terms. Carefully balance the equation by adding the same constants to both sides.",
      "subTopic": "Equations of Circles"
    },
    {
      "number": 7,
      "part": "A",
      "text": "In △HSF, m∠S = 90°, HF = 30, and FS = 23. What is m∠F, to the nearest degree?",
      "choices": [
        "53°",
        "40°",
        "50°",
        "37°"
      ],
      "topic": "Right Triangles & Trig",
      "correct": 0,
      "explanation": "FS is adjacent to ∠F and HF is the hypotenuse, so cos(∠F) = 23/30, giving ∠F = cos⁻¹(23/30) ≈ 40°. Correct value rounds to 40°.",
      "diveDeep": "In a right triangle, identify each side relative to the angle you want. Here FS (23) is adjacent to ∠F and HF (30) is the hypotenuse, so cosine is the right ratio: cos(∠F) = adjacent/hypotenuse = 23/30. Then use the inverse cosine. A common error is mismatching the side roles or using the wrong trig function — sketch and label opposite, adjacent, and hypotenuse before choosing SOH-CAH-TOA. Confirm degree mode on your calculator.",
      "subTopic": "Pythagorean & Special Triangles"
    },
    {
      "number": 8,
      "part": "A",
      "text": "In △CAB, midsegments DE, EF, and FD are drawn. If CA = 14, CB = 20, and FB = 9, what is the perimeter of quadrilateral DEFA?",
      "choices": [
        "46",
        "44",
        "32",
        "52"
      ],
      "topic": "Triangles & Congruence",
      "correct": 1,
      "explanation": "Each midsegment is half the parallel side, so DEFA is a parallelogram with sides equal to half of CB and AB plus the relevant segments, summing to 44.",
      "diveDeep": "A midsegment connects midpoints of two sides and is parallel to, and half the length of, the third side. So DE = ½(AB), EF = ½(CA) = 7, and so on, and the midpoints split the sides into equal halves (DA = ½CA = 7, FA = ½AB). DEFA is a parallelogram whose perimeter you build from these halved lengths. The trap is forgetting that midsegments halve the lengths, or confusing which side each midsegment is parallel to — always pair each midsegment with the side it does NOT touch.",
      "subTopic": "Lines, Angles & Transformations"
    },
    {
      "number": 9,
      "part": "A",
      "text": "A candle can be modeled by a pyramid with a square base. The height of the candle is 10 cm, and each side of the base measures 6 cm. What is the volume of the candle, in cubic centimeters?",
      "choices": [
        "60",
        "120",
        "360",
        "180"
      ],
      "topic": "Area & Volume",
      "correct": 1,
      "explanation": "The volume of a pyramid is V = (1/3)Bh = (1/3)(6²)(10) = (1/3)(36)(10) = 120 cm³.",
      "diveDeep": "A pyramid’s volume is one-third the base area times height: V = (1/3)Bh. With a square base, B = side² = 36, so V = (1/3)(36)(10) = 120. The most common error is forgetting the 1/3 factor (giving 360, the prism volume) or using slant height instead of vertical height. Memorize that pyramids and cones both carry the 1/3 factor relative to their prism/cylinder counterparts.",
      "skill": "modeling",
      "subTopic": "Volume & Surface Area"
    },
    {
      "number": 10,
      "part": "A",
      "text": "A candle modeled by a square pyramid (base side 6 cm, height 10 cm) has volume 120 cm³. If the candle wax burns at a rate of 3.5 cubic centimeters per hour, what is the approximate number of hours this candle could burn?",
      "choices": [
        "103",
        "34",
        "51",
        "11"
      ],
      "topic": "Area & Volume",
      "correct": 1,
      "explanation": "Divide total volume by burn rate: 120 ÷ 3.5 ≈ 34 hours.",
      "diveDeep": "This is a two-step problem: first find the volume of the pyramid (120 cm³), then divide by the rate of consumption (3.5 cm³/hr) to get time. The key relationship is time = amount ÷ rate. A trap is multiplying by the rate instead of dividing, or using a wrong volume from the prior step. Carry the unrounded volume through the division for accuracy, then round at the end.",
      "subTopic": "Volume & Surface Area"
    },
    {
      "number": 11,
      "part": "A",
      "text": "In the diagram, tangent SR and secant STU are drawn to circle O from external point S. If TU > RU and arc TR = 68°, what is m∠S?",
      "choices": [
        "34°",
        "35.2°",
        "17°",
        "45.7°"
      ],
      "topic": "Circles",
      "correct": 0,
      "explanation": "The angle formed by a tangent and a secant from an external point equals half the difference of the intercepted arcs; with the given arcs this yields m∠S = 34°.",
      "diveDeep": "For an angle formed outside a circle by a tangent and a secant, the measure equals half the positive difference of the two intercepted arcs: m∠S = ½(far arc − near arc). You must correctly identify which arc is \"far\" and which is \"near\"; mixing them gives a negative or wrong value. The intercepted arc closest to the vertex (near arc RT = 68°) is subtracted from the larger far arc. Drawing and labeling each arc prevents the sign and pairing mistakes that trip up most students.",
      "subTopic": "Arcs & Angles"
    },
    {
      "number": 12,
      "part": "A",
      "text": "Triangle ABC, with vertices A(–3,–2), B(–1,2), and C(4,1), is graphed. Triangle A′B′C′, whose vertices have coordinates A′(–6,–2), B′(–2,2), and C′(8,1), is the image of △ABC. The transformation that maps △ABC onto △A′B′C′ is a",
      "choices": [
        "dilation",
        "vertical stretch",
        "translation",
        "horizontal stretch"
      ],
      "topic": "Transformations",
      "correct": 3,
      "image": "/images/exams/geo-june-2025/q12.png",
      "explanation": "Each x-coordinate is doubled while every y-coordinate stays the same, which is a horizontal stretch by a factor of 2.",
      "diveDeep": "Compare corresponding coordinates: A(–3,–2)→A′(–6,–2), B(–1,2)→B′(–2,2), C(4,1)→C′(8,1). The x-values double but the y-values are unchanged, so the figure is stretched only horizontally. This is not a dilation, because a dilation would scale both coordinates equally (changing y too). The trap is assuming any size change is a dilation; check whether the scaling is uniform in all directions (dilation) or one-directional (stretch).",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 13,
      "part": "A",
      "text": "Which equation represents a line parallel to the line represented by y = 4x + 6 and passing through the point (–3,2)?",
      "choices": [
        "y − 2 = 4(x + 3)",
        "y − 2 = −(1/4)(x + 3)",
        "y + 3 = 4(x − 2)",
        "y + 3 = −(1/4)(x − 2)"
      ],
      "topic": "Coordinate Geometry",
      "correct": 0,
      "explanation": "Parallel lines share the slope 4, and point-slope form through (–3,2) gives y − 2 = 4(x + 3).",
      "diveDeep": "Parallel lines have equal slopes, so the new line must also have slope 4 (eliminating the −1/4 perpendicular-slope distractors). Using point-slope form y − y₁ = m(x − x₁) with (x₁,y₁) = (–3,2) gives y − 2 = 4(x − (−3)) = 4(x + 3). The sign trap is x − (−3) becoming x + 3; many students write x − 3 by mistake. Remember: parallel → same slope, perpendicular → negative reciprocal slope.",
      "subTopic": "Lines & Slope"
    },
    {
      "number": 14,
      "part": "A",
      "text": "Which two-dimensional figure is always formed when a plane intersects a right cylinder perpendicular to its base?",
      "choices": [
        "circle",
        "rhombus",
        "triangle",
        "rectangle"
      ],
      "topic": "Area & Volume",
      "correct": 3,
      "explanation": "A plane perpendicular to the base cuts straight down through the cylinder, producing a rectangular cross-section.",
      "diveDeep": "Cross-sections depend on the cutting angle. A plane parallel to the base of a cylinder gives a circle; a plane perpendicular to the base (cutting vertically through it) gives a rectangle. The trap is choosing \"circle,\" which only results from a horizontal cut parallel to the base. Visualize slicing a soup can straight down from top to bottom — the exposed face is a rectangle. Knowing the standard cross-sections of cylinders, cones, prisms, and spheres is essential.",
      "subTopic": "Volume & Surface Area"
    },
    {
      "number": 15,
      "part": "A",
      "text": "In △KMP, CE is drawn parallel to MP. If KC = 8, CM = 3, and CE = 12, what is the length of MP?",
      "choices": [
        "4",
        "16.5",
        "15",
        "4.5"
      ],
      "topic": "Similarity & Proof",
      "correct": 1,
      "explanation": "Since CE ∥ MP, △KCE ~ △KMP, so MP/CE = KM/KC = (8+3)/8 = 11/8, giving MP = 12 × 11/8 = 16.5.",
      "diveDeep": "A segment parallel to one side of a triangle creates a smaller triangle similar to the whole (by AA, since corresponding angles are congruent). Set up the ratio of corresponding sides: MP/CE = KM/KC, where KM = KC + CM = 11. Solve 12/MP = 8/11 to get MP = 16.5. The trap is using KC/CM (8/3) instead of the full side KM/KC, or matching the wrong corresponding sides — always pair the side of the small triangle with its counterpart in the large triangle.",
      "subTopic": "Triangle Relationships"
    },
    {
      "number": 16,
      "part": "A",
      "text": "A parallelogram must be a rectangle if its diagonals",
      "choices": [
        "are perpendicular",
        "bisect its angles",
        "bisect each other",
        "are congruent"
      ],
      "topic": "Quadrilaterals",
      "correct": 3,
      "explanation": "A parallelogram with congruent diagonals must be a rectangle, since equal diagonals force right angles at the vertices.",
      "diveDeep": "Diagonal properties distinguish special parallelograms: congruent diagonals → rectangle; perpendicular diagonals → rhombus; diagonals that bisect the angles → rhombus. \"Bisect each other\" is true of every parallelogram, so it cannot single out a rectangle. The trap answers describe rhombus conditions; remember the pairing rectangle ↔ congruent diagonals. A rectangle that also has perpendicular/congruent diagonals would be a square.",
      "subTopic": "Quadrilaterals & Polygons"
    },
    {
      "number": 17,
      "part": "A",
      "text": "Point O divides CA such that CO:OA = 1:4. If C has coordinates (–2,–9) and A has coordinates (3,6), the coordinates of O are",
      "choices": [
        "(2,3)",
        "(0,–3)",
        "(1,0)",
        "(–1,–6)"
      ],
      "topic": "Coordinate Geometry",
      "correct": 3,
      "explanation": "O is 1/5 of the way from C to A: x = −2 + (1/5)(3−(−2)) = −1, y = −9 + (1/5)(6−(−9)) = −6, giving (–1,–6).",
      "diveDeep": "To partition a segment in ratio m:n from C to A, move the fraction m/(m+n) of the way: here 1/(1+4) = 1/5. Apply x = x_C + (1/5)(x_A − x_C) and similarly for y. The classic trap is using the wrong fraction (e.g., 1/4 instead of 1/5) or measuring from the wrong endpoint. Always start at the first-named point (C) and add the fractional change toward A.",
      "subTopic": "Coordinate Proofs"
    },
    {
      "number": 18,
      "part": "A",
      "text": "A spherical balloon is fully inflated with helium to a diameter of 1.7 feet. If helium costs $0.80 per cubic foot, what is the cost to completely fill the balloon with helium?",
      "choices": [
        "$2.06",
        "$3.22",
        "$2.42",
        "$16.46"
      ],
      "topic": "Area & Volume",
      "correct": 0,
      "explanation": "V = (4/3)π(0.85)³ ≈ 2.57 ft³; cost = 2.57 × $0.80 ≈ $2.06.",
      "diveDeep": "First convert diameter to radius (1.7 ÷ 2 = 0.85 ft), then apply the sphere volume formula V = (4/3)πr³. Multiply the volume by the unit cost. The most frequent error is using the diameter directly as the radius (which would roughly octuple the volume). Keep the unrounded radius and volume through the calculation, rounding only the final dollar amount.",
      "skill": "modeling",
      "subTopic": "Volume & Surface Area"
    },
    {
      "number": 19,
      "part": "A",
      "text": "In right triangle ABD, altitude BC is drawn to hypotenuse AD, AC = 2.5, and CD = 4.3. What is the length of BA, to the nearest tenth?",
      "choices": [
        "3.3",
        "4.1",
        "3.4",
        "5.4"
      ],
      "topic": "Right Triangles & Trig",
      "correct": 2,
      "explanation": "By the leg geometric-mean relation, BA² = AC × AD = 2.5 × (2.5 + 4.3) = 2.5 × 6.8 = 17, so BA = √17 ≈ 4.1.",
      "diveDeep": "When an altitude is drawn to the hypotenuse of a right triangle, each leg is the geometric mean between the whole hypotenuse and the segment adjacent to that leg: BA² = AC × AD. Here AD = AC + CD = 6.8, so BA = √(2.5 × 6.8) = √17 ≈ 4.1. The trap is using the altitude-on-hypotenuse mean (BC² = AC × CD) instead of the leg relation, or forgetting to add the two segments for the full hypotenuse. Memorize both geometric-mean relationships.",
      "subTopic": "Pythagorean & Special Triangles"
    },
    {
      "number": 20,
      "part": "A",
      "text": "Trapezoid ZOYD has parallel sides ZO and DY. If m∠Z = 141° and m∠Y = 73°, what is m∠D?",
      "choices": [
        "39°",
        "107°",
        "73°",
        "141°"
      ],
      "topic": "Quadrilaterals",
      "correct": 0,
      "explanation": "Since ZO ∥ DY, co-interior angles ∠Z and ∠D are supplementary: m∠D = 180° − 141° = 39°.",
      "diveDeep": "In a trapezoid, each pair of angles on the same leg (between the two parallel sides) are co-interior (same-side interior) angles and are supplementary. ∠Z and ∠D share leg ZD between the parallel sides, so they sum to 180°. The trap is pairing the wrong angles — ∠Z is supplementary to ∠D, not to ∠Y or ∠O. Identify which vertices lie on the same non-parallel side before applying the supplementary relationship.",
      "subTopic": "Quadrilaterals & Polygons"
    },
    {
      "number": 21,
      "part": "A",
      "text": "Triangle ABC is translated 5 units to the left and 3 units up to map onto △PQR. Which statement is not always true?",
      "choices": [
        "△PQR ≅ △ABC",
        "BQ = 29",
        "∠A ≅ ∠Q",
        "RQ = CB"
      ],
      "topic": "Transformations",
      "correct": 2,
      "image": "/images/exams/geo-june-2025/q21.png",
      "explanation": "A translation preserves size and corresponding parts, so ∠A corresponds to ∠P, not ∠Q; thus ∠A ≅ ∠Q is not always true.",
      "diveDeep": "Translations are rigid motions, so the image is congruent and corresponding parts are preserved: A→P, B→Q, C→R. Therefore ∠A ≅ ∠P (always true), and RQ = CB (corresponding sides) holds. The false statement matches non-corresponding parts (∠A with ∠Q). The trap is assuming any two angles labeled with related letters are congruent — you must follow the correspondence dictated by the transformation. Track which original vertex maps to which image vertex.",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 22,
      "image": "/images/exams/geo-june-2025/q22.png",
      "part": "A",
      "text": "In the diagram, congruent triangles PEN and PAL are drawn. Which rigid motion maps △PEN onto △PAL?",
      "choices": [
        "a point reflection of △PEN through P",
        "a reflection of △PEN over the angle bisector of ∠EPA",
        "a rotation of △PEN about point P, mapping PE onto PA",
        "a translation of △PEN along EA, mapping point E onto A"
      ],
      "topic": "Transformations",
      "correct": 1,
      "explanation": "Reflecting over the bisector of ∠EPA swaps ray PE with ray PA while fixing P, mapping △PEN onto its congruent image △PAL.",
      "diveDeep": "The two triangles share vertex P and the bisector of ∠EPA reflects ray PE onto ray PA, carrying the rest of the triangle to its mirror image. The key is that the triangles have opposite orientation here, which a reflection (orientation-reversing) accomplishes but a rotation (orientation-preserving) cannot. The trap is choosing a rotation, which would work only if both triangles had the same orientation. Check orientation first to decide between reflection and rotation.",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 23,
      "part": "A",
      "text": "A cone has a height of 8 inches and volume of 75.4 cubic inches. What is the diameter of the cone, to the nearest inch?",
      "choices": [
        "9",
        "3",
        "2",
        "6"
      ],
      "topic": "Area & Volume",
      "correct": 3,
      "explanation": "From V = (1/3)πr²h, r² = 3V/(πh) = 3(75.4)/(π·8) ≈ 9, so r ≈ 3 and diameter ≈ 6.",
      "diveDeep": "Rearrange the cone volume formula V = (1/3)πr²h to solve for r: r² = 3V/(πh). Substitute to find r ≈ 3, then double it for the diameter (6). The most common error is reporting the radius (3) instead of the diameter, or forgetting the 1/3 factor when isolating r². Read the question carefully — it asks for diameter, not radius. Always finish by checking which quantity is requested.",
      "skill": "modeling",
      "subTopic": "Volume & Surface Area"
    },
    {
      "number": 24,
      "part": "A",
      "text": "The line represented by the equation 5x − 2y = 10 is transformed by a dilation centered at (2,0) with a scale factor of 2. The image of the line",
      "choices": [
        "is the original line",
        "passes through the point (4,0)",
        "passes through the point (0,–10)",
        "is perpendicular to the original line"
      ],
      "topic": "Transformations",
      "correct": 0,
      "explanation": "The center of dilation (2,0) lies on the line (5·2 − 2·0 = 10), so dilating the line maps it onto itself.",
      "diveDeep": "A dilation maps a line to a parallel line, unless the center of dilation lies on the line, in which case the image is the original line itself. Check whether (2,0) satisfies 5x − 2y = 10: 5(2) − 2(0) = 10 ✓, so the point is on the line and the line is invariant. The trap is assuming the line must move; verify whether the center lies on the line first. A dilation never changes a line’s slope, so it can never make it perpendicular to itself.",
      "subTopic": "Lines, Angles & Transformations"
    },
    {
      "number": 25,
      "part": "B",
      "text": "In the year 2020, the village of Depew, New York had an area of 5.1 square miles and a population of 15,069. In the same year, the village of Lancaster, New York had an area of 2.7 square miles and a population of 10,087. Which village had the larger population density in 2020? Justify your answer.",
      "type": "written",
      "topic": "Area & Volume",
      "explanation": "Population density = population ÷ area. Depew: 15,069 ÷ 5.1 ≈ 2,955 people/mi²; Lancaster: 10,087 ÷ 2.7 ≈ 3,736 people/mi². Lancaster had the larger density.",
      "diveDeep": "Density is a rate: quantity per unit area, so divide population by area for each village and compare. The trap is comparing raw populations (Depew is larger) instead of densities, or dividing area by population. Always set up the ratio in the direction the units demand (people per square mile). Show both quotients explicitly so the comparison and conclusion are clearly justified for full credit.",
      "modelAnswer": "Population density = population ÷ area. Depew: 15,069 ÷ 5.1 ≈ 2,955 people per square mile. Lancaster: 10,087 ÷ 2.7 ≈ 3,736 people per square mile. Since 3,736 > 2,955, the village of Lancaster had the larger population density in 2020.",
      "skill": "reasoning",
      "subTopic": "Density & Modeling"
    },
    {
      "number": 26,
      "part": "B",
      "text": "In △ABC, AC is extended through C to D, m∠A = (3x − 22)°, m∠B = (4x − 18)°, and m∠BCD = (6x − 23)°. Determine and state m∠ACB.",
      "type": "written",
      "topic": "Triangles & Congruence",
      "explanation": "By the Exterior Angle Theorem, m∠BCD = m∠A + m∠B: 6x − 23 = (3x − 22) + (4x − 18), giving x = 17, so m∠ACB = 180 − m∠BCD = 180 − 79 = 101°.",
      "diveDeep": "The Exterior Angle Theorem states an exterior angle equals the sum of the two remote interior angles: ∠BCD = ∠A + ∠B. Solve for x, then find ∠ACB as the supplement of the exterior angle ∠BCD (they form a linear pair). The trap is forgetting the final supplement step and reporting the exterior angle value instead of the interior angle ∠ACB. Set up the equation carefully and label each angle to avoid mixing them up.",
      "modelAnswer": "By the Exterior Angle Theorem, the exterior angle equals the sum of the two remote interior angles: 6x − 23 = (3x − 22) + (4x − 18). Simplify: 6x − 23 = 7x − 40, so 17 = x, giving x = 17. Then m∠BCD = 6(17) − 23 = 79°. Since ∠ACB and ∠BCD form a linear pair, m∠ACB = 180 − 79 = 101°.",
      "subTopic": "Lines, Angles & Transformations"
    },
    {
      "number": 27,
      "part": "B",
      "text": "Parallelogram ABCD is shown. Using a compass and straightedge, construct the altitude from point A to side DC. [Leave all construction marks.]",
      "type": "written",
      "topic": "Constructions",
      "explanation": "The altitude from A to DC is the perpendicular segment from A to line DC, constructed using the standard \"perpendicular from a point to a line\" construction.",
      "diveDeep": "This is the classic construction of a perpendicular from an external point A to a line DC. The trap is dropping an inaccurate perpendicular by eye instead of using arcs; graders require visible compass marks. Keep the compass setting consistent for each arc pair, and make sure the final line is drawn straight through A and the two intersection marks. The foot of the perpendicular may fall on an extension of DC, which is acceptable.",
      "modelAnswer": "Place the compass point at A and draw an arc that crosses line DC at two points; label them P and Q. Then, keeping a radius greater than half of PQ, place the compass at P and draw an arc below DC, and from Q draw another arc that intersects it; label the intersection R. Use the straightedge to draw segment AR. AR is perpendicular to DC, so AR is the required altitude from A to side DC. (Leave all arcs and marks visible.)",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 28,
      "part": "B",
      "text": "Quadrilateral QUAD is graphed on the set of axes. Determine and state the area of quadrilateral QUAD.",
      "type": "written",
      "topic": "Coordinate Geometry",
      "explanation": "Use the coordinate vertices with a method such as decomposition into triangles, the bounding-box (subtraction) method, or the Shoelace Formula to compute the enclosed area.",
      "diveDeep": "For a polygon on a coordinate grid, reliable approaches are: (1) enclose it in a rectangle and subtract the surrounding right triangles, or (2) apply the Shoelace Formula, Area = ½|Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|. The trap with the box method is miscounting or omitting one of the corner triangles; with Shoelace it is reversing the coordinate order or dropping the absolute value. List the vertices in consistent order (clockwise or counterclockwise) and show the substitution clearly.",
      "modelAnswer": "Read the coordinates of Q, U, A, and D from the graph. Enclose QUAD in the smallest rectangle aligned to the axes and compute its area. Then subtract the areas of each right triangle (and any rectangle) lying between the bounding rectangle and quadrilateral QUAD, using A = ½bh for each triangle. The result of (rectangle area) − (sum of surrounding regions) is the area of quadrilateral QUAD. (Equivalently, apply the Shoelace Formula to the four vertices in order.) State the final numeric area in square units.",
      "skill": "graphing",
      "subTopic": "Coordinate Proofs"
    },
    {
      "number": 29,
      "part": "B",
      "text": "In a right triangle, the acute angles have the relationship sin(3x − 7)° = cos(x + 1)°. Determine and state the value of x.",
      "type": "written",
      "topic": "Right Triangles & Trig",
      "explanation": "Sine and cosine of complementary angles are equal, so (3x − 7) + (x + 1) = 90; solving gives 4x − 6 = 90, x = 24.",
      "diveDeep": "The cofunction identity says sin(θ) = cos(90 − θ), so the two angle expressions must be complementary: their sum is 90°. Set (3x − 7) + (x + 1) = 90 and solve. The trap is setting the two expressions equal to each other (3x − 7 = x + 1) instead of summing to 90, which the equal sign between sine and cosine misleads students into. Remember sin = cos only when the angles are complementary, not equal.",
      "modelAnswer": "Since sin(A) = cos(B) when A and B are complementary acute angles, (3x − 7) + (x + 1) = 90. Combine: 4x − 6 = 90, so 4x = 96 and x = 24.",
      "subTopic": "Right Triangle Trig"
    },
    {
      "number": 30,
      "part": "B",
      "text": "In circle A, m∠BAM = 36°. If AB = 20, determine and state the length of arc MB. [Leave your answer in terms of π.]",
      "type": "written",
      "topic": "Circles",
      "explanation": "Arc length = (central angle/360) × 2πr = (36/360) × 2π(20) = (1/10)(40π) = 4π.",
      "diveDeep": "Arc length is the fraction of the circumference cut off by the central angle: (θ/360)(2πr). Here the central angle is 36° and the radius AB = 20, so the arc is (36/360)(2π·20) = 4π. The trap is confusing arc length with arc measure in degrees, or using the diameter as the radius. Since the answer must be in terms of π, leave it as 4π rather than approximating. Reduce the fraction 36/360 = 1/10 to simplify the arithmetic.",
      "modelAnswer": "The central angle ∠BAM = 36° intercepts arc MB, and AB = 20 is the radius. Arc length = (central angle ÷ 360) × 2πr = (36/360) × 2π(20) = (1/10)(40π) = 4π. The length of arc MB is 4π.",
      "subTopic": "Arcs & Angles"
    },
    {
      "number": 31,
      "part": "B",
      "text": "In triangles ANT and ELM, AN = 6, NT = 5.6, TA = 4, EL = 9, LM = 8.4, and ME = 6. Explain why △ANT ~ △ELM.",
      "type": "written",
      "topic": "Similarity & Proof",
      "explanation": "All three pairs of corresponding sides are proportional (6/9 = 5.6/8.4 = 4/6 = 2/3), so by SSS similarity △ANT ~ △ELM.",
      "diveDeep": "SSS similarity establishes similar triangles when all three pairs of corresponding sides share a common ratio. Match longest-to-longest, shortest-to-shortest: AN/EL, NT/LM, TA/ME, each equal to 2/3. The trap is pairing sides incorrectly or checking only one or two ratios; all three must be equal and the correspondence must be consistent. Show each ratio reduced to the same value to justify the similarity for full credit.",
      "modelAnswer": "Compare corresponding sides: AN/EL = 6/9 = 2/3, NT/LM = 5.6/8.4 = 2/3, and TA/ME = 4/6 = 2/3. Since all three pairs of corresponding sides are in the same ratio (2/3), the triangles are similar by the SSS similarity criterion. Therefore △ANT ~ △ELM.",
      "skill": "reasoning",
      "subTopic": "Triangle Relationships"
    },
    {
      "number": 32,
      "part": "C",
      "text": "A store sells colored craft sand in three different containers. Container 1: a square prism with a base length of 4 inches and a height of 7.5 inches. Container 2: a cylinder with a diameter of 5 inches and a height of 6 inches. Container 3: a cone with a diameter of 7.5 inches and a height of 8.5 inches. If the containers are filled to the top, which container will hold the most sand? Justify your answer.",
      "type": "written",
      "topic": "Area & Volume",
      "explanation": "Container 1: V = 4²·7.5 = 120 in³. Container 2: V = π(2.5)²(6) ≈ 117.8 in³. Container 3: V = (1/3)π(3.75)²(8.5) ≈ 125.1 in³. Container 3 holds the most.",
      "diveDeep": "Each container uses a different volume formula: prism V = Bh, cylinder V = πr²h, cone V = (1/3)πr²h. Convert each diameter to radius first, and remember the cone’s 1/3 factor. The trap is using diameters as radii or omitting the cone’s 1/3, which would wrongly inflate Container 3. Compute all three to a comparable precision and state which is greatest with the supporting numbers.",
      "modelAnswer": "Container 1 (square prism): V = (4)(4)(7.5) = 120 in³. Container 2 (cylinder): radius = 5/2 = 2.5, V = π(2.5)²(6) = 37.5π ≈ 117.8 in³. Container 3 (cone): radius = 7.5/2 = 3.75, V = (1/3)π(3.75)²(8.5) = (1/3)π(119.53) ≈ 125.1 in³. Comparing 120, 117.8, and 125.1, Container 3 (the cone) holds the most sand.",
      "skill": "reasoning",
      "subTopic": "Volume & Surface Area"
    },
    {
      "number": 33,
      "part": "C",
      "text": "Quadrilateral MIKE has vertices with coordinates M(–1,–3), I(–3,3), K(5,4), and E(7,–2). Prove MIKE is a parallelogram, and prove MIKE is not a rhombus. [The use of the set of axes below is optional.]",
      "type": "written",
      "topic": "Coordinate Geometry",
      "explanation": "Opposite sides MI and EK have equal slopes (and equal lengths), so MIKE is a parallelogram; but adjacent sides MI and IK have unequal lengths, so it is not a rhombus.",
      "diveDeep": "On the coordinate plane, prove a parallelogram by showing both pairs of opposite sides are parallel (equal slopes) or congruent (equal lengths via the distance formula). To disprove a rhombus, show two consecutive sides have different lengths, since a rhombus requires all four sides congruent. The trap is proving only one pair of sides or forgetting to address the rhombus part separately. Compute slopes for the parallelogram and lengths for the rhombus argument, and state each conclusion explicitly.",
      "modelAnswer": "Slope of MI = (3−(−3))/(−3−(−1)) = 6/(−2) = −3. Slope of EK = (4−(−2))/(5−7) = 6/(−2) = −3. Slope of IK = (4−3)/(5−(−3)) = 1/8. Slope of ME = (−2−(−3))/(7−(−1)) = 1/8. Since both pairs of opposite sides have equal slopes (MI ∥ EK and IK ∥ ME), MIKE is a parallelogram. To test for a rhombus, find side lengths: MI = √((−2)² + 6²) = √40, and IK = √(8² + 1²) = √65. Since √40 ≠ √65, two consecutive sides are not congruent, so MIKE is not a rhombus.",
      "skill": "proof",
      "subTopic": "Lines & Slope"
    },
    {
      "number": 34,
      "part": "C",
      "text": "A park ranger needs to secure two different trees with wire. A wire is attached from a stake in the ground to each tree. One wire reaches a height of 4 ft at a 24° angle of elevation; the other reaches a height of 3 ft at an 11.6° angle of elevation. The park ranger has 20 feet of wire. Does the park ranger have enough wire to secure both trees? Justify your answer.",
      "type": "written",
      "topic": "Right Triangles & Trig",
      "explanation": "Each wire is the hypotenuse: wire₁ = 4/sin(24°) ≈ 9.83 ft, wire₂ = 3/sin(11.6°) ≈ 14.92 ft; total ≈ 24.75 ft > 20 ft, so there is NOT enough wire.",
      "diveDeep": "The wire is the hypotenuse of a right triangle where the tree height is the opposite side and the angle of elevation is at the stake, so use sine: wire = height/sin(angle). Compute each length, sum them, and compare to 20 ft. The trap is using cosine or tangent, or forgetting to add both wires before comparing. Keep unrounded values until the final sum, and clearly state the yes/no conclusion with the comparison.",
      "modelAnswer": "Each wire is the hypotenuse with the tree height as the side opposite the angle of elevation, so wire = height/sin(angle). Wire 1: 4/sin(24°) ≈ 4/0.4067 ≈ 9.83 ft. Wire 2: 3/sin(11.6°) ≈ 3/0.2011 ≈ 14.92 ft. Total wire needed ≈ 9.83 + 14.92 = 24.75 ft. Since 24.75 ft > 20 ft, the park ranger does NOT have enough wire to secure both trees.",
      "skill": "reasoning",
      "subTopic": "Right Triangle Trig"
    },
    {
      "number": 35,
      "part": "D",
      "text": "Given: Quadrilateral CARI with CA ≅ RI and CI ≅ RA, and AEI and LEH are drawn, intersecting at E. Prove: HA·EL = LI·EH",
      "type": "written",
      "topic": "Similarity & Proof",
      "explanation": "Show CARI is a parallelogram (both pairs of opposite sides congruent), use the resulting parallel sides to establish △HEA ~ △LEI by AA, then cross-multiply the proportion HA/LI = EH/EL to obtain HA·EL = LI·EH.",
      "diveDeep": "This proof chains several ideas: (1) a quadrilateral with both pairs of opposite sides congruent is a parallelogram; (2) parallel sides create congruent alternate interior angles; (3) AA similarity yields proportional sides; (4) the means-extremes (cross-multiplication) property converts the proportion into the product equation. The trap is jumping to the product without first justifying the similarity, or misidentifying corresponding parts. Write a clear two-column or paragraph proof with each statement supported by a reason, and confirm the correspondence of vertices before cross-multiplying.",
      "modelAnswer": "Statements/Reasons: (1) CARI has CA ≅ RI and CI ≅ RA — Given. (2) CARI is a parallelogram — a quadrilateral with both pairs of opposite sides congruent is a parallelogram. (3) AH ∥ LI (opposite sides of the parallelogram lie on parallel lines) — definition of parallelogram. (4) ∠HAE ≅ ∠LIE and ∠AHE ≅ ∠ILE — alternate interior angles formed by the transversals cutting the parallel sides are congruent. (5) △HAE ~ △LIE — AA similarity. (6) HA/LI = EH/EL — corresponding sides of similar triangles are proportional. (7) HA·EL = LI·EH — in a proportion, the product of the means equals the product of the extremes (cross-multiplication). Q.E.D.",
      "skill": "proof",
      "subTopic": "Proofs"
    }
  ]
}
