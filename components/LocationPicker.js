import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    // The device remembers if permissions have been previously granted or not to the app.
    // In that case it just goes directly to the return statements.
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: Okay }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000, //If you can't capture the location in 5 seconds, stop and throw an error.
      });

      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not get location!",
        "Please try again later or pick location from map.",
        [{ text: "Okay" }]
      );
    }

    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.secondary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </View>
      <Button
        title="Get User Location"
        color={Colors.secondary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: { marginBottom: 20, alignItems: "center" },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 200,
    borderColor: Colors.secondary,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
