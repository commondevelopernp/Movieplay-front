import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import {styles} from './styles'; // Adjust the import path accordingly
import ProfileInput from './ProfileInput'; // Adjust the import path accordingly
import {useTranslation} from 'react-i18next';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
} from '../../store/slices/user/userApiSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {tabNavigatorParams} from '../../navigation/tabNavigator';
import {useDispatch} from 'react-redux';
import {clearUser} from '../../store/slices/auth/authSlice';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<tabNavigatorParams>>();
  const dispatch = useDispatch();

  const {data} = useGetUserProfileQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [id, setUserId] = useState(-1); // not the correct wat but fast.
  const [ProfileImage, setProfileImage] = useState<string | undefined>(
    'https://via.placeholder.com/150',
  ); // not the correct wat but fast.
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

  const handleUpdateProfile = async () => {
    if (!validateFields()) return;

    try {
      await updateUserProfile({id, nickname, firstName, lastName, email});
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
      await deleteUser({id});
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

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={{uri: ProfileImage}} />
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
      <TouchableOpacity style={styles.blueButton} onPress={handleUpdateProfile}>
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
