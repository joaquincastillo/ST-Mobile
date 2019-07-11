import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN = 'AUTH_TOKEN';

export const getHeaders = () => Promise.all([
  SecureStore.getItemAsync(AUTH_TOKEN),
  SecureStore.getItemAsync('actualCommunityId'),
  SecureStore.getItemAsync('actualPropertyId')]).then(values => ({
  token: values[0],
  communityId: values[1],
  propertyId: values[2]
}));

export const setOtherProperty = ({ propertyId, communityId }) => Promise.all([SecureStore.setItemAsync('actualCommunityId', communityId),
  SecureStore.setItemAsync('actualPropertyId', propertyId)]);

export const signIn = newToken => Promise.all([SecureStore.setItemAsync(AUTH_TOKEN, newToken.token),
  SecureStore.setItemAsync('actualCommunityId', newToken.communityId),
  SecureStore.setItemAsync('actualPropertyId', newToken.propertyId)]);

export const signOut = () => Promise.all([SecureStore.deleteItemAsync(AUTH_TOKEN),
  SecureStore.deleteItemAsync('actualCommunityId'),
  SecureStore.deleteItemAsync('actualPropertyId')]);
