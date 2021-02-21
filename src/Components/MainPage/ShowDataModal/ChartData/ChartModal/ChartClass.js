import api from '../../../../Utiles/api';

class Chart {
  constructor(table, project_id, filename) {
    this.project_id = project_id;
    this.filename = filename;
    this.site_id = null;
    this.table = table;
  }

  setSite = (site_id) => {
    this.site_id = site_id;
  };

  async getDistance() {
    const res = await api
      .get(
        `apiv1/getsitedistances/${this.site_id}/${this.project_id}/${this.filename}/${this.table}`
      )
      .then((res) => {
        return res.data.map((dist) => {
          if (this.table === 'site') return dist.dist_from_site;
          else return dist.dist_from_ref;
        });
      });

    return res;
  }

  getMaxRsrp(distances) {
    const res = Promise.all(
      distances.map(async (dist) => {
        const result = await api
          .get(
            `apiv1/getmaxrsrpdistance/${this.site_id}/${dist}/${this.project_id}/${this.filename}/${this.table}`
          )
          .then((res) => {
            return res.data.map((max) => {
              return max.max;
            });
          });
        return result[0];
      })
    );
    return res;
  }

  getMinRsrp(distances) {
    const res = Promise.all(
      distances.map(async (dist) => {
        const result = await api
          .get(
            `apiv1/getminrsrpdistance/${this.site_id}/${dist}/${this.project_id}/${this.filename}/${this.table}`
          )
          .then((res) => {
            return res.data.map((min) => {
              return min.min;
            });
          });

        return result[0];
      })
    );
    return res;
  }

  getAvgRsrp(distances) {
    const res = Promise.all(
      distances.map(async (dist) => {
        const result = await api
          .get(
            `apiv1/getavgrsrpdistance/${this.site_id}/${dist}/${this.project_id}/${this.filename}/${this.table}`
          )
          .then((res) => {
            return res.data.map((avg) => {
              return avg.avg;
            });
          });
        return result[0];
      })
    );
    return res;
  }

  getCountRsrp(distances) {
    const res = Promise.all(
      distances.map(async (dist) => {
        const result = await api
          .get(
            `apiv1/countrsrp/${this.site_id}/${dist}/${this.project_id}/${this.filename}/${this.table}`
          )
          .then((res) => {
            return res.data.map((count) => {
              return count.count;
            });
          });
        return result[0];
      })
    );
    return res;
  }

  getCountGreaterRsrp(rsrp, distances) {
    const res = Promise.all(
      distances.map(async (dist) => {
        const result = await api
          .get(
            `apiv1/countrsrpgreater/${this.site_id}/${rsrp}/${dist}/${this.project_id}/${this.filename}/${this.table}`
          )
          .then((res) => {
            return res.data.map((count) => {
              return count.count;
            });
          });
        return result[0];
      })
    );
    return res;
  }
}

export default Chart;
