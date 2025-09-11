import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 150, // Tamanho da logo
    height: 150,
    marginBottom: 0, // Espaço abaixo da logo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffffff', // Texto em branco
    paddingTop: 30,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff', // Fundo branco para os inputs
  },
  link: {
    marginTop: 5,
    color: '#8309d0', // Texto em branco
    textDecorationLine: 'underline',
  },
});

export default styles;