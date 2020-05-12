import React from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  const verifyPermissions = async () => {
    // The device remembers if permissions have been previously granted or not to the app.
    // In that case it just goes directly to the return statements.
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: Okay }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    ImagePicker.launchCameraAsync();
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} />
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
