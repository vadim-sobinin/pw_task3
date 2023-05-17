import axios, {AxiosError} from "axios";



const API_URL = 'https://internship.purrweb.site/api';

axios.defaults.baseURL = API_URL;


export const SubscribeService = {
	async getSubscribe(token: string) {
		try {
			const response = await axios.get('/subscribe/self', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
		} catch (err) {
			const error = err as AxiosError;
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return error.request.data;
      } else {
        alert(`Error ${error.message}`);
      }
    }
	}
}