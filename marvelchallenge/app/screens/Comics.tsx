import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from "react-native-elements";

interface ComicsProps {
  heroe: Comic[]
}

const Comics = (props: ComicsProps) => (
  <FlatList
            data={props.heroe}
            keyExtractor = { (item, index) => index.toString() }
            renderItem={({ item }) => (
            <View style={styles.cardComic}>
              <Text style={styles.tituloComic}>{item.name}</Text>
            </View>    
            )}
  />

);

const styles = StyleSheet.create({
  cardComic : {
    height: 50,
    flex:1,
    marginVertical: 5,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#000",
    flexWrap: "nowrap",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3
  },
  tituloComic: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'OpenSans',
    fontWeight: 'bold',
  },
});

export default Comics;