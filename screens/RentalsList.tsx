import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
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
        const { name, email, phone, propertyType, bedroomAmount } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
          propertyType,
          bedroomAmount,
        });
      });
      setFilteredDataSource(users);
      setUsers(users);
    });
  }, []);

  return (
    <ScrollView>
      <Searchbar placeholder="Search" textAlign={"auto"} value={search} />

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
                uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.propertyType}</ListItem.Title>
              <ListItem.Subtitle>Room: {user.bedroomAmount}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
      <View style={styles.button}>
        <Button
          onPress={() => props.navigation.navigate("CreateRentalScreen")}
          title="Create New Property"
          color="#fff"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    height: 40,
    backgroundColor: "#FF5E78",
    borderRadius: 4,
    marginHorizontal: 80,
  },
});
export default UserScreen;
