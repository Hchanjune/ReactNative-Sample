import { StyleSheet } from "react-native";

const CommonStyles = StyleSheet.create({

  ContainerFlexCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10
  },


  backGroundPrimary50: {
    backgroundColor: "rgb(244, 250, 245)"
  },



  selectViewWithTitle: {
    marginHorizontal: 10,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'rgb(255, 251, 254)',
    //backgroundColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: "rgb(170, 170, 170)",
    borderRadius: 5,
    maxWidth: '100%',
    height: 55
  }

});


export default CommonStyles
