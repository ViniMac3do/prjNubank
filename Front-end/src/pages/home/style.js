import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Cor de fundo para a área abaixo da header
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Alinha a foto e o nome na parte superior
    backgroundColor: '#820AD1', // Cor roxa
    height: 100,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10,
  },

  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  balanceContainer: {
    backgroundColor: 'black', // Roxo claro
    padding: 20,
    marginBottom: 20, // Espaço entre o saldo e os outros itens
    width: "100%",
  },

  balanceTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },

  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  balanceValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  eyeButton: {
    padding: 8,
  },

  flatListContainer: {
    marginBottom: 20,
  },

  flatListItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 100,
  },

  flatListItemText: {
    color: '#820AD1',
    fontSize: 16,
    fontWeight: '500',
  },

  cardsSection: {
    marginBottom: 20,
  },

  sectionTitle: {
    color: '#820AD1',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  statementsSection: {
    marginBottom: 20,
  },
});
