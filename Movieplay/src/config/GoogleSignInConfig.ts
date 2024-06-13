import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '571491722298-g91suheo3kcimlqkcnhs5cjfu3sefub1.apps.googleusercontent.com', // From Firebase Console, Auth Section
    //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
};
