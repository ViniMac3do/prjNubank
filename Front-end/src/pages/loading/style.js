// style.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,                 // ocupa a tela toda
    backgroundColor: "#8309d0", // roxo Nubank
    justifyContent: "center", // centraliza no eixo Y
    alignItems: "center",     // centraliza no eixo X
    padding: 20,              // espaço interno
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  loading: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",            // branco para contraste
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 16,
    color: "#EEE",
  },
});
