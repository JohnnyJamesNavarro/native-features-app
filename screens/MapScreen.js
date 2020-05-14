import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam("initialLocation");
  const readOnly = props.navigation.getParam("readOnly");

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.latitude : 37.77,
    longitude: initialLocation ? initialLocation.longitude : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (readOnly) return;

    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) return;
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation)
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFunction = navData.navigation.getParam("saveLocation");
  const readOnly = navData.navigation.getParam("readOnly");

  if (readOnly) {
    return {
      headerTitle: "Interactive Map",
    };
  }

  return {
    headerTitle: "Interactive Map",
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFunction}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
    textTransform: "capitalize",
  },
});
