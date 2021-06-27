import axios from "axios";

class API {
  constructor(base_url) {
    this.base_url = base_url;
  }

  get = async (path) => {
    const response_data = await axios.get(`${this.base_url}${path}`);
    return response_data;
  };

  post = async (path, data) => {
    const response_data = await axios.post(`${this.base_url}${path}`, data);
    return response_data;
  };

  patch = async (path, data) => {
    const response_data = await axios.patch(`${this.base_url}${path}`, data);
    return response_data;
  };

  put = async (path, data) => {
    const response_data = await axios.put(`${this.base_url}${path}`, data);
    return response_data;
  };

  delete = async (path, data) => {
    const response_data = await axios({
      method: "DELETE",
      url: `${this.base_url}${path}`,
      data,
    });

    return response_data;
  };
}

const api = new API(`${process.env.REACT_APP_AXIOS_IP}`);

// export default api;
export default api;
