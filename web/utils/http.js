import axios from "axios";
import { Auth } from "aws-amplify";

async function getAuthToken() {
  const session = await Auth.currentSession();
  return "Bearer " + session.getIdToken().getJwtToken();
}

axios.interceptors.request.use(
  async (config) => {
    config.headers.authorization = await getAuthToken();
    return config;
  },
  (error) => {
    console.error("axios error", error);
    return Promise.reject(error);
  }
);

const get = (path) => axios.get(path).then((response) => response.data);

async function post(path, data) {
  console.log("posting to", path, data);
  const response = await axios.post(path, data);
  return response.data;
}

export default { get, post };
