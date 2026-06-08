import React from 'react'
import PunnettSquare from '../../../src/components/diagrams/PunnettSquare'
import FoodWeb from '../../../src/components/diagrams/FoodWeb'
import Cladogram from '../../../src/components/diagrams/Cladogram'
import MitosisMetaphase from '../../../src/components/diagrams/MitosisMetaphase'
import PopulationGraph from '../../../src/components/diagrams/PopulationGraph'
import PredatorPreyGraph from '../../../src/components/diagrams/PredatorPreyGraph'
import EnzymeTempGraph from '../../../src/components/diagrams/EnzymeTempGraph'
import EnzymeSaturationGraph from '../../../src/components/diagrams/EnzymeSaturationGraph'
import PhotosynthesisRateGraph from '../../../src/components/diagrams/PhotosynthesisRateGraph'
import EnergyPyramid from '../../../src/components/diagrams/EnergyPyramid'
import DOSagCurve from '../../../src/components/diagrams/DOSagCurve'
import BeakDepthGraph from '../../../src/components/diagrams/BeakDepthGraph'
import PhotoRespGraph from '../../../src/components/diagrams/PhotoRespGraph'
import AntibioticResistanceGraph from '../../../src/components/diagrams/AntibioticResistanceGraph'
import HRDiagram from '../../../src/components/diagrams/HRDiagram'
// Algebra 1
import LinearGraphA1 from '../../../src/components/diagrams/LinearGraphA1'
import ParabolaA1 from '../../../src/components/diagrams/ParabolaA1'
import ScatterPlotA1 from '../../../src/components/diagrams/ScatterPlotA1'
import BoxPlotA1 from '../../../src/components/diagrams/BoxPlotA1'
import SystemGraphA1 from '../../../src/components/diagrams/SystemGraphA1'
// Algebra 2
import SineWaveA2 from '../../../src/components/diagrams/SineWaveA2'
import PolyCubicA2 from '../../../src/components/diagrams/PolyCubicA2'
import ExponentialDecayA2 from '../../../src/components/diagrams/ExponentialDecayA2'
import HistogramA2 from '../../../src/components/diagrams/HistogramA2'
// Geometry
import ParallelLinesGeo from '../../../src/components/diagrams/ParallelLinesGeo'
import InscribedAngleGeo from '../../../src/components/diagrams/InscribedAngleGeo'
import SimilarTrianglesGeo from '../../../src/components/diagrams/SimilarTrianglesGeo'
import RightTriangleTrigGeo from '../../../src/components/diagrams/RightTriangleTrigGeo'
import CircleChordGeo from '../../../src/components/diagrams/CircleChordGeo'

export default function DynamicDiagram({ diagram }) {
  if (!diagram) return null

  if (typeof diagram === 'string') {
    return (
      <pre style={{ margin: 0, padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1.5px solid var(--border)', fontFamily: 'monospace', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
        {diagram}
      </pre>
    )
  }

  const { type } = diagram

  switch (type) {
    case 'punnett':
      return <PunnettSquare alleles={diagram.alleles} title={diagram.title} />
    case 'foodweb':
      return <FoodWeb highlight={diagram.highlight} />
    case 'cladogram':
      return <Cladogram />
    case 'mitosis':
      return <MitosisMetaphase />
    case 'population':
      return <PopulationGraph />
    case 'predatorprey':
      return <PredatorPreyGraph />
    case 'enzymetemp':
      return <EnzymeTempGraph />
    case 'enzymesat':
      return <EnzymeSaturationGraph />
    case 'photosynthesisrate':
      return <PhotosynthesisRateGraph />
    case 'energypyramid':
      return <EnergyPyramid base={diagram.base} />
    case 'dosag':
      return <DOSagCurve />
    case 'beakdepth':
      return <BeakDepthGraph />
    case 'photoresp':
      return <PhotoRespGraph />
    case 'antibioticresistance':
      return <AntibioticResistanceGraph />
    case 'hrdiagram':
      return <HRDiagram />

    // Algebra 1
    case 'lineargraph-a1':
      return <LinearGraphA1 />
    case 'parabola-a1':
      return <ParabolaA1 />
    case 'scatterplot-a1':
      return <ScatterPlotA1 />
    case 'boxplot-a1':
      return <BoxPlotA1 />
    case 'systemgraph-a1':
      return <SystemGraphA1 />

    // Algebra 2
    case 'sinewave-a2':
      return <SineWaveA2 />
    case 'polycubic-a2':
      return <PolyCubicA2 />
    case 'expdecay-a2':
      return <ExponentialDecayA2 />
    case 'histogram-a2':
      return <HistogramA2 />

    // Geometry
    case 'parallellines-geo':
      return <ParallelLinesGeo />
    case 'inscribedangle-geo':
      return <InscribedAngleGeo />
    case 'similartriangles-geo':
      return <SimilarTrianglesGeo />
    case 'righttrigtrig-geo':
      return <RightTriangleTrigGeo />
    case 'circlechord-geo':
      return <CircleChordGeo />

    default:
      return null
  }
}
