import { productType } from '@/types';
import axios, { AxiosError } from 'axios';

const API_URL = 'https://internship.purrweb.site/api';

axios.defaults.baseURL = API_URL;

type registerDataType = {
  username: string;
  email: string;
  password: string;
};

type loginDataType = {
  email: string;
  password: string;
};

type getUserInfoType = {
  token: string;
};

type updateUserInfoType = {
  token: string;
  payload: {
    username?: string;
    email?: string;
  };
};

type updateUserPasswordType = {
  token: string;
  payload: {
    currentPassword: string;
    newPassword: string;
  };
};

// https://internship.purrweb.site/api/users/sing-up
// https://internship.purrweb.site/api/users/sign-up
export const UserService = {
  async register({ username, email, password }: registerDataType) {
    try {
      const response = await axios.post('/users/sign-up', {
        email,
        username,
        password,
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
  },
  async login({ email, password }: loginDataType) {
    try {
      const response = await axios.post('/users/sign-in', {
        email,
        password,
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
  },

  async getUserInfo({ token }: getUserInfoType) {
    try {
      const response = await axios.get('/users/me', {
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
  },

  async updateUserInfo({ token, payload }: updateUserInfoType) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const bodyParameters: Record<string, string> = {};
      payload.email && (bodyParameters.email = payload.email);
      payload.username && (bodyParameters.username = payload.username);

      const { data } = await axios.patch<{ id: number; username: string; email: string }>(
        `${API_URL}/users`,
        bodyParameters,
        config,
      );
      console.log(data);
      return data;
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
  },

  async updateUserPassword({ token, payload }: updateUserPasswordType) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const bodyParameters = {
        currentPassword: payload.currentPassword,
        newPassword: payload.newPassword,
      };

      const { data } = await axios.patch<{ id: number; username: string; email: string }>(
        `${API_URL}/users/update-password`,
        bodyParameters,
        config,
      );

      console.log(data);
      return data;
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
  },
};
