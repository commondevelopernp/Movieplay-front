import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import {styles} from './styles'; // Adjust the import path accordingly
import ProfileInput from './ProfileInput'; // Adjust the import path accordingly
import {useTranslation} from 'react-i18next';

const ProfileScreen = () => {
  const {t} = useTranslation();

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
          source={require('../../assets/Profile-Placeholder.png')}
        />
      </View>
      <ProfileInput
        label={t('nickname')}
        value={nickname}
        onChangeText={setNickname}
        placeholder="Nickname"
      />
      <ProfileInput
        label={t('name')}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Nombre"
      />
      <ProfileInput
        label={t('lastName')}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Apellido"
      />
      <ProfileInput
        label={t('email')}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TouchableOpacity style={styles.blueButton} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>{t('updateProfile')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.blueButton}>
        <Text style={styles.buttonText}>{t('logout')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.redButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>{t('deleteAccount')}</Text>
      </TouchableOpacity>

      <Modal
        visible={successModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSuccessModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{t('profileUpdateSuccess')}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSuccessModalVisible(false)}>
              <Text style={styles.modalButtonText}>{t('ok')}</Text>
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
              {t('accountDeleteConfirmation')}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteConfirmButton]}
                onPress={confirmDeleteAccount}>
                <Text style={styles.modalButtonText}>{t('yes')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteCancelButton]}
                onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.modalButtonText}>{t('no')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
