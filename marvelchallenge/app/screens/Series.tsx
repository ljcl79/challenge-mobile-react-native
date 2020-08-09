import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from "react-native-elements";

interface SeriesProps {
  heroe: Serie[]
}

const Series = (props: SeriesProps) => (
  <FlatList
            data={props.heroe}
            keyExtractor = { (item, index) => index.toString() }
            renderItem={({ item }) => (
            <View style={styles.cardSerie}>
              <Text style={styles.tituloSerie}>{item.name}</Text>
            </View>    
            )}
  />

);

const styles = StyleSheet.create({
  cardSerie : {
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
  tituloSerie: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'OpenSans',
    fontWeight: 'bold',
  },
});

export default Series;