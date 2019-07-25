import * as SecureStore from "expo-secure-store";

const AUTH_TOKEN = "AUTH_TOKEN";

export const getHeaders = () =>
  Promise.all([SecureStore.getItemAsync(AUTH_TOKEN)]).then(values => ({
    token: values[0]
  }));

export const signIn = newToken =>
  Promise.all([SecureStore.setItemAsync(AUTH_TOKEN, newToken.token)]);

export const signOut = () =>
  Promise.all([SecureStore.deleteItemAsync(AUTH_TOKEN)]);
