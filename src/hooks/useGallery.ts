import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import type { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';

export const useGallery = () => {
    const [selectedGalleryImageUri, setSelectedGalleryImageUri] = useState<string | null>(null);

    const openGallery = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const firstAsset = response.assets[0];
                setSelectedGalleryImageUri(firstAsset.uri!);
            }
        });
    };

    return { openGallery, selectedGalleryImageUri, setSelectedGalleryImageUri };
};
