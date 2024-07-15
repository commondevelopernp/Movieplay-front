import React from 'react';
import {View, TouchableOpacity, StyleSheet, Share, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Actions: React.FC<{ movieTitle: string, movieSynopsis: string }> = ({ movieTitle, movieSynopsis }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `¡Mira esta película increíble: ${movieTitle}!\n\nSinopsis: ${movieSynopsis}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Compartido con una actividad específica
          console.log(result.activityType);
        } else {
          // Compartido
          Alert.alert('Compartido exitosamente');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        Alert.alert('Compartido cancelado');
      }
    } catch (error) {
      //Alert.alert('Error al compartir:', error.message);
    }
  };

  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.button}>
        <Icon name="heart" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="star" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onShare}>
        <Icon name="share-alt" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    width: '30%',
  },
});

export default Actions;
