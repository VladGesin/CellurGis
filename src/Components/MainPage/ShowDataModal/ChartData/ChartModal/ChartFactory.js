import ChartClass from './ChartClass';

class ChartFactory {
  constructor(type, project_id, filename) {
    if (type === 'Distance From Site')
      return new ChartClass('site', project_id, filename);
    if (type === 'Distance From Border')
      return new ChartClass('refLayer', project_id, filename);
  }
}

export default ChartFactory;
