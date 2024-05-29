import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import {styles} from './styles'; // Adjust the import path accordingly
import ProfileInput from './ProfileInput'; // Adjust the import path accordingly

const ProfileScreen = () => {
  const [nickname, setNickname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleUpdateProfile = () => {
    setSuccessModalVisible(true);
    console.log('Profile updated');
  };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(true);
    console.log('Delete account triggered');
  };

  const confirmDeleteAccount = () => {
    setDeleteModalVisible(false);
    console.log('Account deleted');
    // Handle account deletion logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          style={styles.profilePicture}
          source={require('../assets/Profile-Placeholder.png')}
        />
      </View>
      <ProfileInput
        label="Nickname"
        value={nickname}
        onChangeText={setNickname}
        placeholder="Nickname"
      />
      <ProfileInput
        label="Nombre"
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Nombre"
      />
      <ProfileInput
        label="Apellido"
        value={lastName}
        onChangeText={setLastName}
        placeholder="Apellido"
      />
      <ProfileInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TouchableOpacity style={styles.blueButton} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>ACTUALIZAR PERFIL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.blueButton}>
        <Text style={styles.buttonText}>CERRAR SESION</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.redButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>ELIMINAR CUENTA</Text>
      </TouchableOpacity>

      <Modal
        visible={successModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSuccessModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Perfil actualizado con éxito!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSuccessModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              ¿Está seguro que quiere eliminar la cuenta?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteConfirmButton]}
                onPress={confirmDeleteAccount}>
                <Text style={styles.modalButtonText}>SI</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteCancelButton]}
                onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.modalButtonText}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
