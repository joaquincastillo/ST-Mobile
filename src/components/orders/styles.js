import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderColor: "#249",
    borderBottomWidth: 1,
    marginBottom: "5%"
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-around",
    justifyContent: "space-between"
  },
  headerText: {
    textAlign: "left",
    fontSize: 26,
    fontWeight: "bold",
    color: "#333"
  },
  subHeaderText: {
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
    color: "#333"
  },
  itemText: {
    color: "#666",
    fontSize: 20
  },
  itemTextValue: {
    color: "black",
    fontSize: 20
  },

  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  innerContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  leftDate: {
    color: "white",
    fontSize: 18,
    fontWeight: "500"
  },
  collapsableTitleContainer: {
    height: 40,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    justifyContent: "center",
    paddingRight: 20
  },
  collapsableTitle: {
    fontSize: 22,
    fontWeight: "500",
    paddingLeft: 10
  },
  listItemContainer: {
    height: 60,
    paddingRight: 20,
    paddingLeft: 20
  },
  listItemTitle: {
    fontSize: 22,
    fontWeight: "500",
    textAlignVertical: "center"
  },
  listItemSubtitle: {
    fontSize: 15,
    textAlignVertical: "center"
  },
  dividerView: {
    paddingLeft: 20,
    paddingRight: 20
  }
});

strongColor = "#259";

module.exports = {
  styles: styles,
  strongColor
};
