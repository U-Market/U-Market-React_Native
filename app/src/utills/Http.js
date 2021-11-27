import { API_URL } from "@env";

class Http {
  static async get(url) {
    try {
      const httpStream = await fetch(`${API_URL}/api${url}`);
      return { response: await httpStream.json(), status: httpStream.status };
    } catch (err) {
      throw err;
    }
  }
}

export default Http;
