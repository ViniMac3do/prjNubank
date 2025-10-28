// src/pages/EditarPerfil/styles.js
import { StyleSheet } from 'react-native';

const NUBANK_PURPLE = '#820AD1';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f1f5', // Cinza claro para o fundo geral
  },
  header: {
    backgroundColor: NUBANK_PURPLE,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#f0f1f5',
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25, // Faz o formulário "invadir" o header
    padding: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f1f5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 15,
  },
  inputTextContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
  },
  inputValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 2,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: NUBANK_PURPLE,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButtonCancelar: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  modalButtonSalvar: {
    flex: 1,
    marginLeft: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: NUBANK_PURPLE,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
