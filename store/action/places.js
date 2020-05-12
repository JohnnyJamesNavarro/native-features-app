import * as FileSystem from "expo-file-system";

export const ADD_PLACE = "ADD_PLACE";

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
    } catch (err) {
      throw err;
    }

    dispatch({
      type: ADD_PLACE,
      placeData: {
        title: title,
        image: newPath,
      },
    });
  };
};
