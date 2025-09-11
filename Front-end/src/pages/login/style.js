import { StyleSheet } from "react-native";
/* eslint-disable prettier/prettier */
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8309d0",
    justifyContent: "center",
    alignItems: "center",
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingBottom: 60,
  },

  buttonPrimary: {
    width: "90%",
    backgroundColor: "#8309d0",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },

  buttonSecondary: {
    width: "90%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonTextSecondary: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#8309d0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f7f7f7",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#8309d0",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeModalText: {
    color: "#8309d0",
    fontSize: 16,
    marginTop: 8,
    fontWeight: "bold",
  },
});