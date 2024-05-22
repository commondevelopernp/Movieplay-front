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
