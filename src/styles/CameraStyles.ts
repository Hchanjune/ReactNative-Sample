import {StyleSheet} from "react-native";

const CameraStyles = StyleSheet.create({
    captureButton: {
        position: 'absolute',
        bottom: 60,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderRadius: 50,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 4,
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});

export default CameraStyles;
