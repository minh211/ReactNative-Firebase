import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Item, User } from "./CreateRentalScreen";
import DropDownPicker from "react-native-dropdown-picker";

interface UserId extends User {
  id: string;
}

const RentalDetailScreen = (props) => {
  const initialState: UserId = {
    id: "",
    name: "",
    email: "",
    phone: "",
    note: "",
    price: "",
  };
  const options: Item[] = [
    { label: "Flat", value: "Flat" },
    { label: "House", value: "House" },
    { label: "Bungalow", value: "Bungalow" },
    { label: "Mansion", value: "Mansion" },
  ];

  const options2: Item[] = [
    { label: "Studio", value: "Studio" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
  ];

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [propertyType, setPropertyType] = useState();
  const [bedroomAmount, setBedroomAmount] = useState();
  const [items, setItems] = useState(options);
  const [items2, setItems2] = useState(options2);

  const [user, setUser] = useState<UserId>(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("rentals").doc(id);
    const doc = await dbRef.get();
    const user = doc.data() as User & { id: string };
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteRequest = async () => {
    setLoading(true);
    const dbRef = firebase.db
      .collection("rentals")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false);
    props.navigation.navigate("RentalsList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the Request",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteRequest() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateRequest = async () => {
    const userRef = firebase.db.collection("rentals").doc(user.id);
    await userRef.update({
      name: user.name,
      email: user.email,
      phone: user.phone,
      price: user.price,
      note: user.note,
    });
    setUser(initialState);
    props.navigation.navigate("RentalsList");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <KeyboardAwareScrollView>
        <View>
          <TextInput
            placeholder="Name"
            autoCompleteType="username"
            style={styles.inputGroup}
            value={user.name}
            onChangeText={(value) => handleTextChange(value, "name")}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View>
          <TextInput
            autoCompleteType="email"
            placeholder="Email"
            style={styles.inputGroup}
            value={user.email}
            onChangeText={(value) => handleTextChange(value, "email")}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View>
          <TextInput
            placeholder="Phone"
            autoCompleteType="tel"
            style={styles.inputGroup}
            value={user.phone}
            onChangeText={(value) => handleTextChange(value, "phone")}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Price"
            onChangeText={(value) => handleTextChange(value, "price")}
            value={user.price}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Note"
            onChangeText={(value) => handleTextChange(value, "note")}
            value={user.note}
          />
        </View>
        <View style={styles.btn}>
          <Button
            title="Delete"
            onPress={() => openConfirmationAlert()}
            color="#ffffff"
          />
        </View>
        <View style={styles.btn}>
          <Button
            title="Update"
            onPress={() => updateRequest()}
            color="#ffffff"
          />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#1E3163",
  },
  dropdown: {
    marginTop: 10,
    borderRadius: 4,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    backgroundColor: "#FFEDED",
    marginVertical: 5,
    padding: 15,
    borderRadius: 4,
  },
  btn: {
    marginTop: 10,
    height: 40,
    backgroundColor: "#FF5E78",
    borderRadius: 4,
    marginHorizontal: 80,
  },
});

export default RentalDetailScreen;
