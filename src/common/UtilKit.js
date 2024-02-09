import APIKit from "./APIkit";
import HTTPKit from "./HTTPkit";
import { AUTH_TOKEN_KEY } from "./KeyChain";

export function deferred() {
  let _deferred = {};
  _deferred.promise = new Promise(function (resolve, reject) {
    _deferred.resolve = resolve;
    _deferred.reject = reject;
  });
  return _deferred;
}

export const setJWTokenAndRedirect = async (token, redirect = () => {}) => {
  try {
    const client = await APIKit.setClientToken(token);
    const authToken =
      client.defaults.headers.common["Authorization"].split(" ")[1];
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    HTTPKit.defer.resolve(client);
    redirect();
  } catch (error) {
    console.error(error);
  }
};
