import React from "react";
import { ActivityIndicator, Dialog, MD2Colors, MD3Colors, Portal, useTheme } from "react-native-paper";
import { Platform, StyleSheet, View } from "react-native";
import { TextComponent } from "./DialogTextComponent.tsx";


const isIOS = Platform.OS === 'ios';

const DialogWithLoadingIndicator = ({
                                      title,
  body,
                                      visible,
                                      close,
                                    }: {
  title: String;
  body: String;
  visible: boolean;
  close: () => void;
}) => {
  const { isV3 } = useTheme();
  return (
    <Portal>
      <Dialog onDismiss={close} visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.flexing}>
            <ActivityIndicator
              color={isV3 ? MD3Colors.tertiary30 : MD2Colors.indigo500}
              size={isIOS ? 'large' : 48}
              style={styles.marginRight}
            />
            <TextComponent>{body}</TextComponent>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};


const styles = StyleSheet.create({
  flexing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 16,
  },
});


export default DialogWithLoadingIndicator;
