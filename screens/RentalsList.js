import React, { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";
import { Searchbar } from "react-native-paper";

const UserScreen = (props) => {
  const [users, setUsers] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    firebase.db.collection("rentals").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone, propertyType, price } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
          propertyType,
          price,
        });
      });
      setFilteredDataSource(users);
      setUsers(users);
    });
  }, []);

  // const searchFilterFunction = (text) => {
  //   // Check if searched text is not blank
  //   if (text) {
  //     // Inserted text is not blank
  //     // Filter the masterDataSource
  //     // Update FilteredDataSource
  //     const newData = users.filter(function (item) {
  //       const itemData = `${item.propertyType}
  //         ? ${item.propertyType.toUpperCase()}
  //         : ${"".toUpperCase()}`;
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilteredDataSource(newData);
  //     setSearch(text);
  //   } else {
  //     // Inserted text is blank
  //     // Update FilteredDataSource with masterDataSource
  //     setFilteredDataSource(users);
  //     setSearch(text);
  //   }
  // };
  // const ItemView = ({ item }) => {
  //   return (
  //     // Flat List Item
  //     <Text onPress={() => getItem(item)}>{item.propertyType}</Text>
  //   );
  // };
  // const getItem = (item) => {
  //   // Function for click on an item
  //   alert(item.propertyType);
  // };

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateRentalScreen")}
        title="Create Your Property"
      />
      <Searchbar
        placeholder="Search"
        // onChangeText={(text) => searchFilterFunction(text)}
        // value={search}
      />

      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("RentalDetailScreen", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri: "https://uifaces.co/our-content/donated/KBoDdl1J.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.propertyType}</ListItem.Title>
              <ListItem.Subtitle>{user.name}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};
export default UserScreen;
