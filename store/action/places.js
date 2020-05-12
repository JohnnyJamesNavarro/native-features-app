import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image) => {
  return async (dispatch) => {
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
        "Dummy Address",
        15.6,
        12.3
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: queryResult.insertId,
          title: title,
          image: newPath,
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
