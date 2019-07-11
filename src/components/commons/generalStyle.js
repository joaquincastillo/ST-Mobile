import { StyleSheet } from "react-native";

const mainColor = "#FFF";
const strongColor = "#259";
const borderElementColor = "#D8D8D8";
const importantTextColor = "#333";
const lessImportantTextColor = "#666";
const rippleColor = "#BBB";
const tabColor = "#FFF";

const generalStyles = StyleSheet.create({
  element: {
    padding: 20,
    marginVertical: 2,
    paddingRight: 50,
    borderColor: borderElementColor,
    borderWidth: 0.5,
    borderRadius: 7,
    backgroundColor: mainColor
  },
  loadingText: {
    color: strongColor,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  errorScreen: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {
    color: importantTextColor,
    fontSize: 14
  },
  rectangleView: {
    padding: 20,
    borderColor: borderElementColor,
    borderWidth: 0.5,
    backgroundColor: mainColor,
    borderRadius: 0,
    marginVertical: 0,
    borderBottomWidth: 0.5,
    borderTopWidth: 0,
    paddingLeft: 30,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  rectangleViewNoBorder: {
    padding: 20,
    borderColor: borderElementColor,
    borderWidth: 0,
    backgroundColor: mainColor,
    borderRadius: 0,
    marginVertical: 0,
    paddingLeft: 25,
    paddingRight: 0
  },
  justBorder: {
    borderColor: borderElementColor,
    borderWidth: 0.5,
    backgroundColor: mainColor,
    borderRadius: 0,
    borderBottomWidth: 0.5
  },
  rectangleViewNoHorizonal: {
    borderColor: borderElementColor,
    backgroundColor: mainColor,
    borderRadius: 0,
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 20
  },
  leftFecha: {
    fontSize: 18,
    textAlign: "left",
    justifyContent: "center",
    color: "#6E6E6E"
  },
  boxFecha: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  left_corner: {
    textAlign: "left",
    justifyContent: "center",
    color: "black",
    alignSelf: "flex-start"
  },
  flexItems: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rectangleViewVotes: {
    padding: 20,
    borderColor: borderElementColor,
    backgroundColor: mainColor,
    borderRadius: 0,
    borderBottomWidth: 0.5
  },
  dialogContent: {
    alignContent: "flex-end",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    flex: 1,
    margin: 0,
    padding: 0
  },
  dialogText: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    alignSelf: "center",
    marginBottom: -25,
    paddingBottom: -25
  }
});

module.exports = {
  generalStyles,
  importantTextColor,
  rippleColor,
  lessImportantTextColor,
  tabColor,
  mainColor,
  strongColor,
  borderElementColor
};
