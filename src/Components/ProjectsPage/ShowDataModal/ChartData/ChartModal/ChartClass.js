import api from '../../../../Utils/api';

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
          if (this.table === 'site') {
            if (dist.dist_from_site == null) {
              return 0;
            }
            return dist.dist_from_site;
          } else if (this.table === 'refLayer') return dist.dist_from_ref;
          else return null;
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
              return max.round;
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
              return min.round;
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
              return avg.round;
            });
          });
        return result[0];
      })
    );
    return res;
  }

  getCountRsrp(distances) {
    if (distances !== 0) {
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
    return 0;
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

  setDistLabels(distances) {
    if (this.table === 'refLayer') {
      return distances.map((dist) => {
        if (dist < 999) return dist.toString().concat('M');
        else {
          return (dist / 1000).toString().concat('Km');
        }
      });
    } else
      return distances.map((dist) => {
        if (dist === 0) {
          return 0;
        }
        return dist.toString().concat('Km');
      });
  }
}

export default Chart;
