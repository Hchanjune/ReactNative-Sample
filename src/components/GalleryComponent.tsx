import React, { useState } from 'react';
import { Button, View, Image, StyleSheet, Text } from 'react-native';
import { launchImageLibrary, Asset, ImagePickerResponse } from 'react-native-image-picker';
import {ImageLibraryOptions} from "react-native-image-picker/src/types.ts";
import FastImage from "react-native-fast-image";
import {useGallery} from "../hooks/useGallery.ts";


const GalleryComponent: React.FC = () => {
    const { openGallery, selectedGalleryImageUri } = useGallery();

    return (
        <View style={styles.container}>
            <Button title="Open Gallery" onPress={openGallery} />
            {selectedGalleryImageUri !== '' &&
                <View style={styles.previewContainer}>
                    <FastImage source={{uri: selectedGalleryImageUri? selectedGalleryImageUri : ''}} style={styles.previewImage} />
                    <Text>Selected Image</Text>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    previewImage: {
        width: 300,
        height: 300,
    },
});

export default GalleryComponent;
