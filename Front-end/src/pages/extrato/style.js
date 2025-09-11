import { template } from '@babel/core';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#820AD1',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerRight: {
    flexDirection: 'row',
  },

  headerIcon: {
    marginLeft: 20,
  },

  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  valorTexto: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  nomeTexto: {
    fontSize: 16,
    color: '#333',
  },
  dataTexto: {
    fontSize: 14,
    color: '#666',
  }, 

  icon: {
    size: 44,
    color: "#fff",
    marginRight: 15,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 50, 
    marginRight: 90,
  },

  valor: {
    fontSize: 22,
     fontWeight: 'bold',

  },

  template: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
  },

  balanceContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  balanceTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },

  balanceValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  actionsContainer: {
    marginBottom: 20,
  },

  actionButton: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },

  actionIconContainer: {
    backgroundColor: '#2c2c2e',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  actionLabel: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  myCardsButton: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  myCardsButtonText: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  sectionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#2c2c2e',
    paddingTop: 20,
    marginBottom: 20,
  },

  sectionValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  caixinhasContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
  },

  caixinhaButton: {
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 150,
  },

  caixinhaTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },

  caixinhaValue: {
    color: '#fff',
    marginTop: 5,
  },

  createCaixinhaButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  createCaixinhaText: {
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
  },

  promoCard: {
    backgroundColor: '#820AD1',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  promoTextContainer: {
    flex: 1,
    marginLeft: 15,
  },

  promoTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  promoDescription: {
    color: '#fff',
    fontSize: 14,
  },

  promoButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  promoButtonText: {
    color: '#820AD1',
    fontWeight: 'bold',
  },

  discoverCard: {
    backgroundColor: '#2c2c2e',
    borderRadius: 15,
    padding: 15,
    width: 230,
    marginRight: 15,
  },

  discoverCardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },

  discoverCardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },

  discoverCardDescription: {
    color: '#b0b0b0',
    fontSize: 14,
    marginBottom: 10,
  },

  discoverButton: {
    backgroundColor: '#820AD1',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },

  discoverButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  statementsSection: {
    borderTopWidth: 1,
    borderTopColor: '#2c2c2e',
    paddingTop: 20,
    marginBottom: 20,
  },

  // Estilos para o flatlist de extrato (a ser melhorado)
  flatListItem: {
    backgroundColor: '#1c1c1e',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },

  flatListItemText: {
    color: '#fff',
    fontSize: 16,
  },

  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2c2e',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 20,
    alignSelf: 'center',
  },

  rateButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
