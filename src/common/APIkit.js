import HTTPKit, { client } from "./HTTPkit";

const defaultFileUploadConfig = {
  headers: { "Content-Type": "multipart/form-data" },
};

const APIKit = {
  setClientToken: HTTPKit.setClientToken,

  auth: {
    register: (payload) => {
      const url = "/auth/signup";
      return client.post(url, payload);
    },

    login: (payload) => {
      const url = "/auth/login";
      return client.post(url, payload);
    },
  },

  me: {
    getMe: () => {
      const url = "/user/me";
      return client.get(url);
    },
  },

  user: {
    getAllUser: () => {
      const url = "/user";
      return client.get(url);
    },
  },

  conversation: {
    sendMessage: (senderId, message) => {
      const url = `/message/send/${senderId}`;
      return client.post(url, message);
    },
    getMessages: (receiverId) => {
      const url = `/message/${receiverId}`;
      return client.get(url);
    },
  },
};

export default APIKit;
