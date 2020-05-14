import React from "react";
import { StyleSheet, View, Image } from "react-native";

import ENV from "../env";

const MapPreview = ({ location, children, style }) => {
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`;
  }

  return (
    <View style={{ ...styles.mapPreview, ...style }}>
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </View>
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
