import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import ENV from "../env";

const MapPreview = ({ location, children, style, onPress }) => {
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.mapPreview, ...style }}
    >
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: { alignItems: "center", justifyContent: "center" },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
