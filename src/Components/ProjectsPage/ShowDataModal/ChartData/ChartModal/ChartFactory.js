import ChartClass from './ChartClass';

class ChartFactory {
  constructor(type, project_id, filename, site) {
    if (type === 'Distance_From_Site')
      return new ChartClass('site', project_id, filename, site);
    else if (type === 'Distance_From_Border')
      return new ChartClass('refLayer', project_id, filename, site);
    else return null;
  }
}

export default ChartFactory;
