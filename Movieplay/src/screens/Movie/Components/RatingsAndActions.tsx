import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Share, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RatingsAndActions: React.FC<{rating: number, movieTitle: string, movieSynopsis: string}> = ({ rating, movieTitle, movieSynopsis }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(rating);
  const [isRated, setIsRated] = useState(false);

  const handleRating = (rate: number) => {
    setSelectedRating(rate);
  };

  const handleSubmitRating = () => {
    setIsRated(true);
    setModalVisible(false);
  };

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
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Icon name="heart" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Icon name="star" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onShare}>
        <Icon name="share-alt" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Calificar</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                  <View style={styles.starWrapper}>
                    <Icon 
                      name={star <= selectedRating ? "star" : "star-o"} 
                      size={30} 
                      color={star <= selectedRating ? "#ffd700" : "#ffffff"} 
                    />
                    <Text style={styles.starNumber}>{star}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.submitButton, selectedRating > 0 ? styles.submitButtonActive : styles.submitButtonInactive]}
              onPress={handleSubmitRating}
              disabled={selectedRating === 0}
            >
              <Text style={styles.submitButtonText}>CALIFICAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {isRated && <Text style={styles.ratedText}>¡CALIFICADO!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#141414',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  starWrapper: {
    alignItems: 'center',
  },
  starNumber: {
    fontSize: 12,
    color: '#ffffff',
  },
  submitButton: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonActive: {
    backgroundColor: '#1E90FF',
  },
  submitButtonInactive: {
    backgroundColor: '#333333',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
  ratedText: {
    fontSize: 18,
    color: '#ffd700',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RatingsAndActions;