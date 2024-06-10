/*

// src/screens/Login.js
import React from 'react';
import { Text, ImageBackground, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Login = () => {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('../../assets/Slash-background.png')}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>MoviePlay</Text>
        <Text style={styles.bienvenido}>Bienvenido</Text>

        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../../assets/Login-Google.png')} // Reemplaza con la ruta de tu imagen
            style={styles.buttonImage}
            resizeMode="contain" // Ajusta la imagen sin distorsionarla
          />
        </TouchableOpacity>
        
      </View>
    </ImageBackground>
  );
}

export default Login;

const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Esto es opcional, para darle un efecto de superposición
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },
  bienvenido: {
    fontSize: 50,
    color: '#6EB6EA',
  },
  button: {
    marginTop: 50, // Añade un margen superior para separar el botón del texto
    padding: 10, // Añade un padding si es necesario
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Esto es opcional, para darle un fondo al botón
    borderRadius: 5, // Añade bordes redondeados si lo deseas
  },
  buttonImage: {
    //width: 200, // Ancho máximo deseado
    //height: undefined,
    //aspectRatio: 1, // Esto se ajustará automáticamente a la relación de aspecto de la imagen original
  },
});


*/

// src/screens/Login.js




import React, { useEffect } from 'react';
import { Text, ImageBackground, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GoogleSignin, statusCodes, GoogleOneTapSignIn, isErrorWithCode } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Login = () => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '387572187599-535bcell45ubre8morp35b4s08mvhv55.apps.googleusercontent.com', // Reemplaza con tu web client ID de Firebase Console
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      console.log('test1');

    
      await GoogleSignin.hasPlayServices();
      const { idToken, user } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      console.log('User signed in with Google!');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened:', error);
      }
    }
  };

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('../../assets/Slash-background.png')}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>MoviePlay</Text>
        <Text style={styles.bienvenido}>Bienvenido</Text>

        <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
          <Image
            source={require('../../assets/Login-Google.png')} // Reemplaza con la ruta de tu imagen
            style={styles.buttonImage}
            resizeMode="contain" // Ajusta la imagen sin distorsionarla
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default Login;

const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },
  bienvenido: {
    fontSize: 50,
    color: '#6EB6EA',
  },
  button: {
    marginTop: 50,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  buttonImage: {
    width: 200,
    height: 50,
  },
});


