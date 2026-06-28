#!/usr/bin/env node
// Enriches math exam content (algebra-1, algebra-2, geometry) with rule-based difficulty (1-5)
// and rationales, designed by specialized subagents.
// Completely offline, no API keys required. Syncs all three platforms.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function classifyAlgebra1(q) {
  const num = q.number
  const part = typeof q.part === 'string' ? q.part.toUpperCase() : 'A'
  const text = q.text || ''
  const topic = q.topic || ''

  if (part === 'D' || num === 37) {
    return {
      difficulty: 5,
      difficultyRationale: "Part IV constructed-response requiring multi-step mathematical modeling."
    }
  }

  if (part === 'C' || (num >= 33 && num <= 36)) {
    let rationale = "Standard Regents Part III constructed-response requiring multi-step modeling, graphing, and algebraic justification."
    if (topic === "Linear Equations & Inequalities") {
      rationale = "Requires graphing a system of linear inequalities, shading the solution region, and algebraically/graphically verifying a solution point."
    } else if (topic === "Statistics & Probability") {
      rationale = "Requires performing linear regression, writing the equation, finding the correlation coefficient, and interpreting its sign in context."
    } else if (text.includes("accumulated") || text.includes("snow")) {
      rationale = "Requires graphing a multi-part piecewise linear accumulation function and calculating the average rate of change over the entire interval."
    } else if (text.includes("investment") || text.includes("worth")) {
      rationale = "Requires writing an exponential growth function and calculating the difference in values over two time periods."
    }
    return {
      difficulty: 4,
      difficultyRationale: rationale
    }
  }

  if (part === 'B' || (num >= 25 && num <= 32)) {
    let difficulty = 3
    let rationale = "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    
    if (text.includes("determine g(") || text.includes("determine f(")) {
      difficulty = 2
      rationale = "Requires basic substitution and evaluation of a function for a given input."
    } else if (text.includes("property")) {
      rationale = "Requires identifying an algebraic property used in a step and justifying its validity."
    } else if (text.includes("irrational") || text.includes("product of two")) {
      rationale = "Requires explaining real number properties (closure) by providing a counterexample."
    } else if (text.includes("piecewise")) {
      rationale = "Requires graphing a piecewise-defined function on the coordinate plane."
    } else if (text.includes("exact values")) {
      rationale = "Requires solving a quadratic equation by isolating the squared term and taking the square root."
    } else if (text.includes("solve") && text.includes("for x")) {
      rationale = "Requires solving a linear equation containing fractional terms."
    } else if (text.includes("Solve the formula") || text.includes("terms of")) {
      rationale = "Requires solving a literal equation for a specified variable in terms of others."
    } else if (text.includes("graph the line")) {
      rationale = "Requires converting a linear equation to slope-intercept form, graphing it, and identifying a missing coordinate."
    }
    
    return { difficulty, difficultyRationale: rationale }
  }

  if (part === 'A') {
    if (num <= 8) {
      if (topic === "Functions & Relations" && (text.includes("table represents") || text.includes("ordered pairs") || text.includes("f(x) = g(x)"))) {
        return {
          difficulty: 1,
          difficultyRationale: "Requires foundational understanding of relations and functions (e.g. checking for repeated inputs or finding intersection points on a graph)."
        }
      }
      if (topic === "Polynomials & Factoring" && (text.includes("factor") || text.includes("− 81") || text.includes("− 49"))) {
        return {
          difficulty: 1,
          difficultyRationale: "Requires foundational factoring of a basic difference of two perfect squares."
        }
      }
      if (topic === "Statistics & Probability" && (text.includes("box plot") || text.includes("range"))) {
        return {
          difficulty: 1,
          difficultyRationale: "Requires reading statistical values directly from a box plot."
        }
      }
      if (text.includes("graph") && (text.includes("type of function") || text.includes("represents a linear"))) {
        return {
          difficulty: 1,
          difficultyRationale: "Requires foundational recognition of a function family from the shape of its graph."
        }
      }
    }

    let difficulty = 2
    let rationale = "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."

    if (text.includes("evaluate") || text.includes("f(") || text.includes("g(")) {
      rationale = "Requires evaluating a function for a given numerical input using order of operations."
    } else if (text.includes("equivalent expression") || text.includes("equivalent to")) {
      rationale = "Requires distributing terms and combining like terms in a polynomial expression."
    } else if (text.includes("satisfies the equation") || text.includes("value of x")) {
      rationale = "Requires solving a simple two-step linear equation."
    } else if (text.includes("vertex") || text.includes("shifted") || text.includes("transformation")) {
      rationale = "Requires identifying vertical or horizontal transformations from a function's equation."
    } else if (text.includes("percent") || text.includes("relative frequency") || text.includes("probability")) {
      rationale = "Requires basic probability calculations or calculating relative frequency from a table."
    } else if (text.includes("rate of change") || text.includes("slope")) {
      rationale = "Requires calculating the constant rate of change (slope) from a table or points."
    }

    if (num > 8) {
      difficulty = 3
      rationale = "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."

      if (topic === "Systems of Equations" || topic === "Systems of Inequalities" || text.includes("system")) {
        rationale = "Requires solving a system of linear equations algebraically or checking solution points."
      } else if (topic === "Quadratic Functions" && (text.includes("vertex") || text.includes("minimum") || text.includes("maximum"))) {
        rationale = "Requires finding the vertex, minimum, or maximum value of a quadratic function."
      } else if (topic === "Quadratic Functions" && (text.includes("hits the ground") || text.includes("roots") || text.includes("zeros"))) {
        rationale = "Requires solving a quadratic equation to find the roots or zeros."
      } else if (text.includes("completing the square")) {
        rationale = "Requires converting a quadratic function from standard form to vertex form by completing the square."
      }
    }

    if (num > 20) {
      if (text.includes("domain") && (text.includes("square root") || text.includes("fraction"))) {
        difficulty = 4
        rationale = "Requires identifying constraints on a function's domain or range."
      }
    }

    return { difficulty, difficultyRationale: rationale }
  }

  return {
    difficulty: 3,
    difficultyRationale: "Standard Algebra 1 Regents question."
  }
}

function classifyAlgebra2(q) {
  const number = q.number
  const text = (q.text || "").toLowerCase()
  const topic = (q.topic || "").toLowerCase()
  const part = (q.part || "").toUpperCase()
  const maxPoints = q.maxPoints

  if (part === 'IV' || part === 'D' || number === 37 || maxPoints === 6) {
    return {
      difficulty: 5,
      difficultyRationale: "Part IV constructed-response requiring multi-step modeling and comparison."
    }
  }

  if (part === 'III' || part === 'C' || (number >= 33 && number <= 36) || maxPoints === 4) {
    if (text.includes("system") && (text.includes("y = x") || text.includes("algebraically"))) {
      if (text.includes("x²") || text.includes("y = 2x")) {
        return {
          difficulty: 3,
          difficultyRationale: "Standard algebraic solution of a linear-quadratic system."
        }
      }
    }
    return {
      difficulty: 4,
      difficultyRationale: "Part III multi-step mathematical modeling or complex algebraic analysis."
    }
  }

  if (topic.includes("complex") || topic.includes("imaginary")) {
    if (text.includes("i^") || text.includes("powers of i")) {
      return {
        difficulty: 2,
        difficultyRationale: "Basic application of the cyclic powers of i."
      }
    }
    if (text.includes("+") || text.includes("-") || text.includes("*") || text.includes("product") || text.includes("simplest a + bi")) {
      return {
        difficulty: 2,
        difficultyRationale: "Basic complex number arithmetic and simplification."
      }
    }
  }

  if (topic.includes("sequence") || topic.includes("series")) {
    if (text.includes("common ratio") || text.includes("recursive formula") || text.includes("geometric sequence")) {
      if (text.includes("sum") || text.includes("total") || text.includes("s_") || text.includes("sₙ")) {
        return {
          difficulty: 3,
          difficultyRationale: "Standard application of the geometric series sum formula."
        }
      }
      return {
        difficulty: 3,
        difficultyRationale: "Standard modeling of a recursive sequence."
      }
    }
    return {
      difficulty: 2,
      difficultyRationale: "Basic sequence parameter determination."
    }
  }

  if (topic.includes("exponential") || topic.includes("logarithm") || topic.includes("log") || topic.includes("ln")) {
    if (text.includes("log_") || text.includes("log(") || text.includes("ln(")) {
      if (text.includes("rewrite") || text.includes("equivalent") || text.includes("expand")) {
        return {
          difficulty: 2,
          difficultyRationale: "Basic application of logarithmic properties."
        }
      }
      return {
        difficulty: 3,
        difficultyRationale: "Standard logarithmic equation solving."
      }
    }
    if (text.includes("monthly") || text.includes("compounded") || text.includes("annual")) {
      return {
        difficulty: 3,
        difficultyRationale: "Standard application of exponential modeling."
      }
    }
    return {
      difficulty: 3,
      difficultyRationale: "Standard exponential equation solving using logarithms."
    }
  }

  if (topic.includes("trig") || topic.includes("sine") || topic.includes("cosine") || topic.includes("tangent")) {
    if (text.includes("amplitude") || text.includes("period") || text.includes("midline")) {
      return {
        difficulty: 2,
        difficultyRationale: "Basic identification of trigonometric properties."
      }
    }
    return {
      difficulty: 3,
      difficultyRationale: "Standard trigonometric ratio or function application."
    }
  }

  if (part === 'II' || part === 'B' || (number >= 25 && number <= 32) || maxPoints === 2) {
    return {
      difficulty: 3,
      difficultyRationale: "Standard Part II open-ended question requiring multi-step math steps."
    }
  }

  return {
    difficulty: 3,
    difficultyRationale: "Standard Regents Algebra 2 multiple-choice question."
  }
}

function classifyGeometry(q) {
  const text = (q.text || '').toLowerCase()
  const topic = q.topic || ''
  const part = typeof q.part === 'string' ? q.part.toUpperCase() : 'A'
  
  if (part === 'D' || (part === 'C' && (text.includes('prove') && text.includes('coordinate')))) {
    return {
      difficulty: 5,
      difficultyRationale: "Part IV constructed-response full coordinate or abstract proof."
    }
  }
  
  if (part === 'C') {
    if (topic === 'Proofs' || text.includes('prove')) {
      return {
        difficulty: 4,
        difficultyRationale: "Challenging constructed-response geometric proof."
      }
    }
    return {
      difficulty: 4,
      difficultyRationale: "Challenging constructed-response multi-step application or modeling."
    }
  }
  
  if (part === 'B') {
    if (topic === 'Constructions' || text.includes('construct')) {
      return {
        difficulty: 3,
        difficultyRationale: "Standard constructed-response geometric construction."
      }
    }
    if (topic === 'Proofs' || text.includes('prove')) {
      return {
        difficulty: 4,
        difficultyRationale: "Challenging constructed-response geometric proof."
      }
    }
    return {
      difficulty: 3,
      difficultyRationale: "Standard constructed-response calculation."
    }
  }
  
  if (
    (text.includes('symmetry') && !text.includes('rotational')) ||
    (text.includes('quadrant')) ||
    (text.includes('reflection') && text.includes('x-axis') && !text.includes('followed by'))
  ) {
    return {
      difficulty: 1,
      difficultyRationale: "Foundational single-step coordinate or transformation mapping."
    }
  }
  
  if (
    text.includes('perpendicular bisector') ||
    text.includes('partition') ||
    text.includes('ratio') ||
    text.includes('completing the square') ||
    text.includes('geometric mean')
  ) {
    return {
      difficulty: 3,
      difficultyRationale: "Standard Regents multi-step geometric or coordinate calculation."
    }
  }
  
  if (topic === 'Coordinate Geometry') {
    if (text.includes('midpoint') || text.includes('distance') || text.includes('slope')) {
      return {
        difficulty: 2,
        difficultyRationale: "Basic application of coordinate formulas."
      }
    }
    return {
      difficulty: 3,
      difficultyRationale: "Standard Regents coordinate geometry calculation."
    }
  }
  
  if (topic === 'Circles') {
    return {
      difficulty: 2,
      difficultyRationale: "Basic application of circle properties."
    }
  }
  
  if (topic === 'Right Triangles & Trig' || topic === 'Trigonometry') {
    return {
      difficulty: 2,
      difficultyRationale: "Basic right triangle trigonometry application."
    }
  }
  
  return {
    difficulty: 2,
    difficultyRationale: "Basic application of geometric concepts."
  }
}

async function run() {
  const subjects = ['algebra-1', 'algebra-2', 'geometry']
  let grandTotalEnriched = 0

  console.log('⚡ Offline Math Difficulty Enrichment & Sync Started\n')

  for (const subject of subjects) {
    const mobileDir = path.join(ROOT, 'mobile/src/content/regents-exams', subject)
    if (!fs.existsSync(mobileDir)) continue

    const targetDirs = [
      path.join(ROOT, 'mobile/src/content/regents-exams', subject),
      path.join(ROOT, 'shared/content/regents-exams', subject),
      path.join(ROOT, 'src/data/regents-exams', subject),
    ]

    const files = fs.readdirSync(mobileDir).filter((f) => f.endsWith('.js'))
    console.log(`Subject: ${subject} (${files.length} exam files)`)

    let subjectEnriched = 0

    for (const file of files) {
      const sourcePath = path.join(mobileDir, file)
      const mod = (await import('file://' + sourcePath)).default
      if (!mod || !mod.questions) continue

      let count = 0
      for (const q of mod.questions) {
        if (typeof q.difficulty !== 'number') {
          let result
          if (subject === 'algebra-1') result = classifyAlgebra1(q)
          else if (subject === 'algebra-2') result = classifyAlgebra2(q)
          else if (subject === 'geometry') result = classifyGeometry(q)

          if (result) {
            q.difficulty = result.difficulty
            q.difficultyRationale = result.difficultyRationale
            count++
          }
        }
      }

      if (count > 0) {
        const totalWithDifficulty = mod.questions.filter((q) => typeof q.difficulty === 'number').length
        
        let banner = `// Enriched ${subject} exam — difficulty tags mapped offline\n`
        if (subject === 'geometry') {
          banner = `// Enriched Geometry exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)\n`
        } else if (subject === 'algebra-2') {
          banner = `// Algebra 2 Regents — ${mod.session} ${mod.year}\n`
        }

        const finalCode = banner + 'export default ' + JSON.stringify(mod, null, 2) + '\n'

        // Write to all three platforms in sync
        for (const targetDir of targetDirs) {
          if (!fs.existsSync(targetDir)) continue
          const targetPath = path.join(targetDir, file)
          fs.writeFileSync(targetPath, finalCode, 'utf8')
        }

        subjectEnriched += count
        grandTotalEnriched += count
      }
    }
    console.log(`  -> Enriched ${subjectEnriched} questions`)
  }

  console.log(`\n✅ Completed! Total questions enriched and synced across all platforms: ${grandTotalEnriched}`)
}

run().catch(console.error)
