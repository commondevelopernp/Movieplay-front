import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  profilePictureContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#888',
    marginBottom: 20,
  },
  blueButton: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#00BFFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  redButton: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#FF4500',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  deleteConfirmButton: {
    backgroundColor: '#FF4500',
  },
  deleteCancelButton: {
    backgroundColor: '#1E90FF',
  },
  errorText: {
    color: '#FF4500',
    marginBottom: 10,
    textAlign: 'center',
  },
});
