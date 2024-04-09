import { useState } from 'react';

export function useCamera() {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [photoUri, setPhotoUri] = useState<string|null>(null);

    const openCamera = () => {
        console.log('Camera Open');
        setIsCameraOpen(true)
    };
    const closeCamera = () => {
        console.log('Camera Close');
        setIsCameraOpen(false)
    };
    const onPhotoTaken = (uri: string) => {
        setPhotoUri(`file://${uri}`);
        closeCamera();
    };

    return { isCameraOpen, openCamera, closeCamera, photoUri, setPhotoUri, onPhotoTaken };
}
