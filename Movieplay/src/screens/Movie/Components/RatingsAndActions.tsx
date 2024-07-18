import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../../store/slices/user/userApiSlice';
import {jwtDecode} from 'jwt-decode';
import {setUserId} from '../../../store/slices/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RatingsAndActionsProps {
  userId: number;
  movieId: number;
  rating: number;
  movieTitle: string;
  movieSynopsis: string;
}

const RatingsAndActions: React.FC<RatingsAndActionsProps> = ({
  userId,
  movieId,
  rating,
  movieTitle,
  movieSynopsis,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(rating);
  const [isRated, setIsRated] = useState(false);
<<<<<<< Updated upstream
  
  const { data: userProfile, refetch } = useGetUserProfileQuery(1);
=======
>>>>>>> Stashed changes
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [id, setUserId] = useState(-1);
  const {data} = useGetUserProfileQuery({id});

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('Failed to fetch the token from storage:', error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (data && data.length > 0 && data[0].ratings) {
      setIsRated(data[0].ratings.includes(movieId));
    }
  }, [data, movieId]);

  const handleRating = (rate: number) => {
    setSelectedRating(rate);
  };

  const handleSubmitRating = async () => {
    if (isRated) {
      Alert.alert('Ya calificado', 'Ya has calificado esta película.');
      return;
    }

    if (!userId || !data || data.length === 0) {
      Alert.alert('Error', 'No se pudo obtener el perfil del usuario.');
      return;
    }

    const user = data[0];
    const updatedRatings = [...user.ratings, movieId];

    try {
      await updateUserProfile({
        id: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        email: user.email,
        profileImage: user.profileImage,
        ratings: updatedRatings,
        favorited: user.favorited,
      }).unwrap();
      setIsRated(true);
      setModalVisible(false);
      Alert.alert('Éxito', 'Tu calificación ha sido guardada.');
    } catch (error) {
      console.error('Error al calificar:', error);
      Alert.alert(
        'Error',
        'No se pudo guardar la calificación. Por favor, intenta de nuevo.',
      );
    }
  };

  const openRatingModal = () => {
    if (isRated) {
      Alert.alert('Ya calificado', 'Ya has calificado esta película.');
    } else {
      setModalVisible(true);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `¡Mira esta película increíble: ${movieTitle}!\n\nSinopsis: ${movieSynopsis}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType);
        } else {
          Alert.alert('Compartido exitosamente');
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert('Compartido cancelado');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Icon name="heart" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openRatingModal}>
        <Icon name="star" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onShare}>
        <Icon name="share-alt" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Calificar</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                  <View style={styles.starWrapper}>
                    <Icon
                      name={star <= selectedRating ? 'star' : 'star-o'}
                      size={30}
                      color={star <= selectedRating ? '#ffd700' : '#ffffff'}
                    />
                    <Text style={styles.starNumber}>{star}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[
                styles.submitButton,
                selectedRating > 0
                  ? styles.submitButtonActive
                  : styles.submitButtonInactive,
              ]}
              onPress={handleSubmitRating}
              disabled={selectedRating === 0}>
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
