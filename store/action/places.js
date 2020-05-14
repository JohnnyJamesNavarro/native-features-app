import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    if (!resData.results) {
      throw new Error("Something went wrong!");
    }

    const address = resData.results[0].formatted_address;

    // Split the file name by / and then pop the final part which is the file name.
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image, // Remember that 'image' is actually the entire path to the selected image.
        to: newPath,
      });

      const queryResult = await insertPlace(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: queryResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const queryResult = await fetchPlaces();

      dispatch({ type: SET_PLACES, places: queryResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
