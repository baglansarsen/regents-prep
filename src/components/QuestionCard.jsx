import PunnettSquare from './diagrams/PunnettSquare'
import FoodWeb from './diagrams/FoodWeb'
import Cladogram from './diagrams/Cladogram'
import MitosisMetaphase from './diagrams/MitosisMetaphase'
import PopulationGraph from './diagrams/PopulationGraph'
import PredatorPreyGraph from './diagrams/PredatorPreyGraph'
import EnzymeTempGraph from './diagrams/EnzymeTempGraph'
import EnzymeSaturationGraph from './diagrams/EnzymeSaturationGraph'
import PhotosynthesisRateGraph from './diagrams/PhotosynthesisRateGraph'
import EnergyPyramid from './diagrams/EnergyPyramid'
import DOSagCurve from './diagrams/DOSagCurve'
import BeakDepthGraph from './diagrams/BeakDepthGraph'
import PhotoRespGraph from './diagrams/PhotoRespGraph'
import AntibioticResistanceGraph from './diagrams/AntibioticResistanceGraph'
import HRDiagram from './diagrams/HRDiagram'
// Algebra 1
import LinearGraphA1 from './diagrams/LinearGraphA1'
import ParabolaA1 from './diagrams/ParabolaA1'
import ScatterPlotA1 from './diagrams/ScatterPlotA1'
import BoxPlotA1 from './diagrams/BoxPlotA1'
import SystemGraphA1 from './diagrams/SystemGraphA1'
// Algebra 2
import SineWaveA2 from './diagrams/SineWaveA2'
import PolyCubicA2 from './diagrams/PolyCubicA2'
import ExponentialDecayA2 from './diagrams/ExponentialDecayA2'
import HistogramA2 from './diagrams/HistogramA2'
// Geometry
import ParallelLinesGeo from './diagrams/ParallelLinesGeo'
import InscribedAngleGeo from './diagrams/InscribedAngleGeo'
import SimilarTrianglesGeo from './diagrams/SimilarTrianglesGeo'
import RightTriangleTrigGeo from './diagrams/RightTriangleTrigGeo'
import CircleChordGeo from './diagrams/CircleChordGeo'

const LABELS = ['A', 'B', 'C', 'D']

export default function QuestionCard({ question, selected, phase, onAnswer, isBookmarked, onBookmark }) {
  function choiceClass(i) {
    if (phase === 'answering') return 'choice'
    if (i === question.correct) return 'choice choice--correct'
    if (selected !== 'timeout' && i === selected) return 'choice choice--wrong'
    return 'choice choice--dim'
  }

  return (
    <div className="question-card">
      <div className="question-card-header">
        <p className="question-topic-tag">{question.topic}</p>
        {onBookmark && (
          <button
            className={`bookmark-btn ${isBookmarked ? 'bookmark-btn--active' : ''}`}
            onClick={() => onBookmark(question.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark for later'}
          >
            {isBookmarked ? '🔖' : '🔖'}
            <span className="bookmark-btn-label">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
        )}
      </div>
      {question.context && (
        <div className="question-context">
          <span className="question-context-label">📄 Read this scenario</span>
          <p className="question-context-text">{question.context}</p>
        </div>
      )}
      <p className="question-text">{question.text}</p>

      {question.diagram?.type === 'punnett' && (
        <PunnettSquare alleles={question.diagram.alleles} title={question.diagram.title} />
      )}
      {question.diagram?.type === 'foodweb' && <FoodWeb highlight={question.diagram.highlight} />}
      {question.diagram?.type === 'cladogram' && <Cladogram />}
      {question.diagram?.type === 'mitosis' && <MitosisMetaphase />}
      {question.diagram?.type === 'population' && <PopulationGraph />}
      {question.diagram?.type === 'predatorprey' && <PredatorPreyGraph />}
      {question.diagram?.type === 'enzymetemp' && <EnzymeTempGraph />}
      {question.diagram?.type === 'enzymesat' && <EnzymeSaturationGraph />}
      {question.diagram?.type === 'photosynthesisrate' && <PhotosynthesisRateGraph />}
      {question.diagram?.type === 'energypyramid' && (
        <EnergyPyramid base={question.diagram.base} />
      )}
      {question.diagram?.type === 'dosag' && <DOSagCurve />}
      {question.diagram?.type === 'beakdepth' && <BeakDepthGraph />}
      {question.diagram?.type === 'photoresp' && <PhotoRespGraph />}
      {question.diagram?.type === 'antibioticresistance' && <AntibioticResistanceGraph />}
      {question.diagram?.type === 'hrdiagram' && <HRDiagram />}

      {/* Algebra 1 */}
      {question.diagram?.type === 'lineargraph-a1' && <LinearGraphA1 />}
      {question.diagram?.type === 'parabola-a1' && <ParabolaA1 />}
      {question.diagram?.type === 'scatterplot-a1' && <ScatterPlotA1 />}
      {question.diagram?.type === 'boxplot-a1' && <BoxPlotA1 />}
      {question.diagram?.type === 'systemgraph-a1' && <SystemGraphA1 />}
      {/* Algebra 2 */}
      {question.diagram?.type === 'sinewave-a2' && <SineWaveA2 />}
      {question.diagram?.type === 'polycubic-a2' && <PolyCubicA2 />}
      {question.diagram?.type === 'expdecay-a2' && <ExponentialDecayA2 />}
      {question.diagram?.type === 'histogram-a2' && <HistogramA2 />}
      {/* Geometry */}
      {question.diagram?.type === 'parallellines-geo' && <ParallelLinesGeo />}
      {question.diagram?.type === 'inscribedangle-geo' && <InscribedAngleGeo />}
      {question.diagram?.type === 'similartriangles-geo' && <SimilarTrianglesGeo />}
      {question.diagram?.type === 'righttrigtrig-geo' && <RightTriangleTrigGeo />}
      {question.diagram?.type === 'circlechord-geo' && <CircleChordGeo />}

      {/* Image-based visual questions (PNG/JPG from public/images/) */}
      {question.image && (
        <div className="question-image-wrap">
          <img src={question.image} alt="Question diagram" className="question-diagram-img" />
        </div>
      )}

      <div className="choices">
        {question.choices.map((text, i) => (
          <button
            key={i}
            className={choiceClass(i)}
            onClick={() => onAnswer(i)}
            disabled={phase !== 'answering'}
          >
            <span className="choice-label">{LABELS[i]}</span>
            <span className="choice-text">{text}</span>
          </button>
        ))}
      </div>

      {phase === 'feedback' && selected === question.correct && (
        <div className="feedback-banner feedback-banner--correct">
          ✓ Correct!
        </div>
      )}

      {phase === 'feedback' && selected !== question.correct && (
        <div className="feedback-banner feedback-banner--wrong">
          <p className="feedback-wrong-header">
            {selected === 'timeout' ? '⏰ Time\'s up!' : '✗ Not quite.'}
          </p>
          <p className="feedback-correct-line">
            Correct answer:&nbsp;
            <strong>{LABELS[question.correct]}. {question.choices[question.correct]}</strong>
          </p>
          <p className="feedback-explanation">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
