import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Checkbox } from "react-native-paper";

import firebase from "../database/firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface Item {
  label: string;
  value: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  price: string;
  note: string;
}

const AddRentalScreen = (props) => {
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

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateText, setDateText] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const dateAndTime = moment(date).format("MMMM Do YYYY, h:mm:ss a");
    setDateText(dateAndTime);
    hideDatePicker();
  };

  const [furnished, setFurnished] = React.useState(false);
  const [unFurnished, setUnFurnished] = React.useState(false);
  const [partFurnished, setPartFurnished] = React.useState(false);

  const initialState: User = {
    name: "",
    email: "",
    phone: "",
    price: "",
    note: "",
  };

  const [state, setState] = useState(initialState);

  const handleChangeText = (
    value: string,
    name: "name" | "email" | "phone" | "price" | "note"
  ) => {
    setState({ ...state, [name]: value });
  };

  const saveNewRequest = async () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPrice = /^-?\d+\.?\d*$/;
    const regexPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!propertyType) {
      alert("Property Type is require!");
      return false;
    }

    if (!bedroomAmount) {
      alert("Bedroom is require!");
      return false;
    }

    if (state.name === "") {
      alert("Name is require!");
      return false;
    }

    if (!regexPrice.test(state.price)) {
      alert("Monthly Price are numbers only and required!");
      return false;
    }

    if (!regex.test(state.email)) {
      alert("Invalid email format");
      return false;
    }

    if (!dateText) {
      alert("Date and Time cannot be blank");
      return false;
    }

    if (!regexPhone.test(state.phone)) {
      alert("Phone numbers is not correct format");
      return false;
    }

    try {
      await firebase.db.collection("rentals").add({
        name: state.name,
        email: state.email,
        phone: state.phone,
        price: state.price,
        note: state.note,
        propertyType: propertyType,
        bedroomAmount: bedroomAmount,
        datetime: dateText,
        furnished: furnished,
        unFurnished: unFurnished,
        partFurnished: partFurnished,
      });
      props.navigation.navigate("RentalsList");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAwareScrollView>
        <DropDownPicker
          style={styles.dropdown}
          placeholder={"Property Type"}
          open={open}
          value={propertyType}
          items={items}
          setOpen={setOpen}
          setValue={setPropertyType}
          setItems={setItems}
          zIndex={3000}
          zIndexInverse={1000}
          // rules={{ required: true }}
        />
        <DropDownPicker
          style={styles.dropdown}
          placeholder={"Bedroom"}
          open={open2}
          value={bedroomAmount}
          items={items2}
          setOpen={setOpen2}
          setValue={setBedroomAmount}
          setItems={setItems2}
          zIndex={2000}
          zIndexInverse={2000}
          // rules={{ required: true, message: "Please select a person!" }}
        />

        <View>
          <Button title="Set Date" color="#fff" onPress={showDatePicker} />
          <TextInput
            style={styles.inputGroup}
            placeholder="Date and Time"
            value={dateText}
            editable={false}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            locale="en_GB"
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.wrapperCheckbox}>
          <Text style={{ padding: 10 }}>Property Type:</Text>
          <Checkbox
            status={furnished ? "checked" : "unchecked"}
            onPress={
              furnished
                ? () => setFurnished(false)
                : () => [
                    setFurnished(true),
                    setUnFurnished(false),
                    setPartFurnished(false),
                  ]
            }
          />
          <TextInput placeholder="Furnished" editable={false} />
          <Checkbox
            status={unFurnished ? "checked" : "unchecked"}
            onPress={
              unFurnished
                ? () => [setUnFurnished(false), setPartFurnished(false)]
                : () => [
                    setUnFurnished(true),
                    setFurnished(false),
                    setPartFurnished(false),
                  ]
            }
          />
          <TextInput placeholder="Unfurnished" editable={false} />
          <Checkbox
            status={partFurnished ? "checked" : "unchecked"}
            onPress={
              partFurnished
                ? () => [
                    setPartFurnished(false),
                    setFurnished(false),
                    setUnFurnished(false),
                  ]
                : () => [
                    setPartFurnished(true),
                    setUnFurnished(false),
                    setFurnished(false),
                  ]
            }
          />
          <TextInput placeholder="Part Furnished" editable={false} />
        </View>
        {/* Name Input */}
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Reporter Name"
            onChangeText={(value) => handleChangeText(value, "name")}
            value={state.name}
          />
        </View>

        {/* Price Input */}
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Price per month"
            onChangeText={(value) => handleChangeText(value, "price")}
            value={state.price}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Email"
            onChangeText={(value) => handleChangeText(value, "email")}
            value={state.email}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Phone"
            onChangeText={(value) => handleChangeText(value, "phone")}
            value={state.phone}
          />
        </View>

        {/* Note Input */}
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Note"
            onChangeText={(value) => handleChangeText(value, "note")}
            value={state.note}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Save Rental info"
            color="#fff"
            onPress={() => saveNewRequest()}
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
  inputGroup: {
    backgroundColor: "#FFEDED",
    marginVertical: 5,
    padding: 15,
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
  button: {
    marginTop: 10,
    height: 40,
    backgroundColor: "#FF5E78",
    borderRadius: 4,
    marginHorizontal: 80,
  },
  wrapperCheckbox: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FEF1E6",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
});

export default AddRentalScreen;
