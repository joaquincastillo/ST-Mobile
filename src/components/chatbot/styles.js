import { StyleSheet } from "react-native";

const strongColor = "#259";
const softColor = "#F5FBEF";
const softErrorColor = "#ffe6e6";
const secondaryColor = "#486";
const mainColor = "#fff";
const textColor = "#333";
const placeholderTextColor = "#888";
const errorColor = "#f05";
const imageHeight = 100;
const imageHeightSmall = 20;

const buttonStyles = StyleSheet.create({
  container: {
    flex: 3,
    marginTop: "20%",
    alignItems: "center",
    alignContent: "flex-start",
    justifyContent: "center",
    marginHorizontal: "10%",
    borderRadius: 4
  },
  keyBoardWrapper: {
    width: "100%",
    height: "100%"
  },
  inputText: {
    flex: 1,
    backgroundColor: mainColor,
    color: textColor
  },
  inputErrorText: {
    flex: 1,
    backgroundColor: mainColor,
    color: errorColor
  },
  hugeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 30,
    backgroundColor: strongColor,
    padding: 10
  },
  secondaryButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 30,
    backgroundColor: mainColor,
    borderColor: strongColor,
    padding: 10,
    borderWidth: 2
  },
  logo: {
    alignSelf: "center",
    height: "30%",
    width: "100%"
  },
  logoFont: {
    fontSize: 28,
    marginBottom: "10%",
    fontWeight: "bold",
    color: strongColor,
    alignSelf: "center"
  },
  inputSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: strongColor,
    height: 40,
    margin: 10,
    marginTop: 40
  },
  inputErrorSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: errorColor,
    height: 40,
    margin: 10,
    marginTop: 40
  },

  errorMessageContainer: {
    backgroundColor: softErrorColor,
    alignSelf: "center",
    width: "100%",
    height: 50,
    paddingHorizontal: "10%",
    marginHorizontal: "10%",
    borderRadius: 30,
    justifyContent: "center"
  },

  confirmMessageContainer: {
    backgroundColor: softColor,
    alignSelf: "center",
    width: "100%",
    height: 130,
    paddingHorizontal: "10%",
    marginHorizontal: "10%",
    borderRadius: 30,
    justifyContent: "center"
  },

  errorMessageText: {
    color: errorColor
  },

  recoverPassword: {
    justifyContent: "center",
    color: strongColor,
    alignItems: "center"
  },
  searchIcon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  },
  createAccountView: {
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  createAccountButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: strongColor
  }
});

module.exports = {
  styles: buttonStyles,
  strongColor,
  placeholderTextColor,
  secondaryColor,
  mainColor,
  errorColor,
  imageHeight,
  imageHeightSmall
};
