import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as placesActions from "../store/action/places";

import ImagePicker from "../components/ImagePicker";

const NewPlaceScreen = (props) => {
  const [title, setTitleValue] = useState("");
  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={titleChangeHandler}
        />
        <ImagePicker />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "New Place",
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    marginBottom: 20,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
