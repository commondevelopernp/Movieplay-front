import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '387572187599-535bcell45ubre8morp35b4s08mvhv55.apps.googleusercontent.com', // From Firebase Console, Auth Section
    //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
};
