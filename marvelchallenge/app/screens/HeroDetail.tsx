import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-root-toast";
import { favoriteHeroe } from "../services/heroeService";
import { NavigationScreenComponent } from "react-navigation";

interface Params {
  heroe: Heroe;
}

interface Props {}

const HeroeDetail: NavigationScreenComponent<Params, null, Props> = props => {
  const { heroe } = props.navigation.state.params!;

  async function setFavorite(value: boolean) {
    await favoriteHeroe(heroe.id);

    Toast.show(value ? "You liked the cat! 👍" : "You didn't like the cat 👎", {
      backgroundColor: value ? "#49e656" : "#eb5050"
    });
    props.navigation.goBack();
  }

  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: heroe.thumbnail.path+'.'+heroe.thumbnail.extension }} style={styles.image} />
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>Do you like this cat?</Text>
        <Button
          icon={<Icon name="thumbs-o-up" size={18} color="white" />}
          style={styles.button}
          buttonStyle={styles.buttonGreen}
          onPress={() => setFavorite(true)}
        />
        <Button
          icon={<Icon name="thumbs-o-down" size={18} color="white" />}
          style={styles.button}
          buttonStyle={styles.buttonRed}
          onPress={() => setFavorite(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: "center"
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "cover"
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20
  },
  text: {
    paddingBottom: 20,
    textAlign: "center",
    fontSize: 17
  },
  button: {
    marginBottom: 20,
    width: 200
  },
  buttonGreen: {
    backgroundColor: "#49e656"
  },
  buttonRed: {
    backgroundColor: "#eb5050"
  }
});

export default HeroeDetail;
