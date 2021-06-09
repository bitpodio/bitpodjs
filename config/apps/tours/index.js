import eventTourSteps from './eventTour'
import adminTourSteps from './adminTour'
// import eventTours from './eventTour'

export default function (that) {
  return { tourOne: eventTourSteps(that), tourTwo: adminTourSteps(that) }
}
