import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Modal, Image}  from 'react-native';
import { styles } from './styles';
import ProfileInput from './ProfileInput';
import { useTranslation } from 'react-i18next';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
} from '../../store/slices/user/userApiSlice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TabNavigatorParams } from '../../navigation/TabNavigator';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/slices/auth/authSlice';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<TabNavigatorParams>>();
  const dispatch = useDispatch();

  const { data } = useGetUserProfileQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [id, setUserId] = useState(-1);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    'https://via.placeholder.com/150',
  );
  const [nickname, setNickname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (data?.length) {
      setProfileImage(
        data[0].profileImage ?? 'https://via.placeholder.com/150',
      );
      setUserId(data[0].id);
      setNickname(data[0].nickname);
      setFirstName(data[0].firstName);
      setLastName(data[0].lastName);
      setEmail(data[0].email);
    }
  }, [data]);

  const validateFields = () => {
    if (!nickname.trim()) {
      setError(t('nicknameRequired'));
      return false;
    }
    if (!firstName.trim()) {
      setError(t('firstNameRequired'));
      return false;
    }
    if (!lastName.trim()) {
      setError(t('lastNameRequired'));
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError(t('validEmailRequired'));
      return false;
    }
    setError('');
    return true;
  };

  const handleUpdateProfile = async (imageUrl = profileImage) => {
    if (!validateFields()) return;

    try {
      await updateUserProfile({
        id,
        nickname,
        firstName,
        lastName,
        email,
        profileImage: imageUrl,
      });
      setSuccessModalVisible(true);
    } catch (error) {
      setError(t('updateFailed'));
    }
  };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      await deleteUser({ id });
      setDeleteModalVisible(false);
      handleLogout();
    } catch (error) {
      setError(t('deleteFailed'));
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigation.navigate('HomeNavigator');
  };

  const handleSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    });
    if (result.assets?.length) {
      const selectedImage = result.assets[0];
      const imageUri = selectedImage.uri;

      try {
        // Subir la imagen a Cloudinary
        const formData = new FormData();
        formData.append('file', {
          uri: imageUri,
          type: 'image/jpeg', // o el tipo de archivo adecuado
          name: 'profile_image.jpg',
        });
        formData.append('upload_preset', 'image_profile');

        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/djbgvh1qh/image/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );

        if (cloudinaryResponse.data.secure_url) {
          // Actualizar el estado local con la URL de Cloudinary
          setProfileImage(cloudinaryResponse.data.secure_url);

          // Actualizar el perfil del usuario con la nueva URL de la imagen
          await handleUpdateProfile(cloudinaryResponse.data.secure_url);
        } else {
          setError(t('imageUploadFailed'));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
        setError(t('imageUploadFailed'));
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={{ uri: profileImage }} />
        <TouchableOpacity onPress={handleSelectImage}>
          <Text style={styles.text}>{t('Change Profile Picture')}</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <ProfileInput
        label={t('nickname')}
        value={nickname}
        onChangeText={setNickname}
        placeholder={t('nickname')}
      />
      <ProfileInput
        label={t('name')}
        value={firstName}
        onChangeText={setFirstName}
        placeholder={t('name')}
      />
      <ProfileInput
        label={t('lastName')}
        value={lastName}
        onChangeText={setLastName}
        placeholder={t('lastName')}
      />
      <ProfileInput
        label={t('email')}
        value={email}
        onChangeText={setEmail}
        placeholder={t('email')}
      />
      <TouchableOpacity style={styles.blueButton} onPress={() => handleUpdateProfile()}>
        <Text style={styles.buttonText}>{t('updateProfile')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.blueButton} onPress={handleLogout}>
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
