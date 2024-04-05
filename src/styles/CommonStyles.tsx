import { StyleSheet } from "react-native";

const CommonStyles = StyleSheet.create({
  ContainerFlex: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  ContainerFlexCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: '8%'
  },


  backGroundPrimary50: {
    backgroundColor: "rgb(244, 250, 245)"
  },

  backGroundPrimary600: {
    backgroundColor: "rgb(141, 189, 137)"
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
  },

  disabledOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  textOutlined: {
    textDecorationStyle: "double",
    textDecorationColor: "white"
  }

});


export default CommonStyles
