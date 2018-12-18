import app from "/app.js";

const api = axios.create({ baseURL: "http://localhost:8080/v1" });

api.interceptors.request.use(
  cfg => {
    const newCfg = Object.assign({}, cfg);
    const profile = app.state.profile;
    if (profile) {
      newCfg.headers["Authorization"] = `Bearer ${profile.token}`;
    }
    return newCfg;
  },
  err => Promise.reject(err)
);

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      app.emit("logout");
    }

    throw err;
  }
);

export default api;
