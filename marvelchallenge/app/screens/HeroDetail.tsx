/*
  HereoDetail Screen. Apresenta os detalhes do heroe, mesmo que a sua participação em series e comics
*/
import React, {useState, useEffect} from "react";
import { Image, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenComponent } from "react-navigation";
import Series from './Series';
import Comics from './Comics';
import { ScrollView } from "react-native-gesture-handler";

interface Params {
  heroe: Heroe;
}

interface Props {}

let favHeroes: FavHeroe[];

const HeroeDetail: NavigationScreenComponent<Params, null, Props> = props => {
    const [iconfav, setIconFav] = useState("heart-o");
    const [showSeries, setShowSeries] = useState(false);
    const [showComics, setShowComics] = useState(false);
    const { heroe } = props.navigation.state.params!;  
    
    useEffect(() => {
        async function init() {            
            const jsonValueI = await AsyncStorage.getItem('@favorites');
            if (jsonValueI != null)
                favHeroes = JSON.parse(jsonValueI!);
            else
                favHeroes = [];
            let isF = favHeroes.find(item => item.id === heroe.id);
            
            if (isF)
                setIconFav("heart");
        }
        init();
    }, []);

    
    async function onHeroePress(heroeid: string) {
        console.log(favHeroes);
        let isF = favHeroes.find(item => item.id === heroeid);
        console.log(favHeroes);
        
        if (isF) {
            setIconFav("heart-o");
            favHeroes = favHeroes.filter(item => item.id !== heroeid);
        }
        else {
            setIconFav("heart");
            favHeroes.push({id: heroeid})
        }

        const jsonValueO = JSON.stringify(favHeroes);
        await AsyncStorage.setItem('@favorites', jsonValueO);    
    }

    return (
        <ScrollView>
            <Icon name={iconfav} size={30} color="yellow" style={{ position: 'absolute', top: 10, right: 10, zIndex: 99999 }} onPress={() => onHeroePress(heroe.id)}/>
            <Image source={{ uri: heroe.thumbnail.path+'.'+heroe.thumbnail.extension }} style={styles.image} />
            <View style={styles.bodyContainer}>
            <Text style={styles.title}>{heroe.name}</Text>
            <Text style={styles.text}>{heroe.description}</Text>
            </View>
            <TouchableHighlight style={styles.btnSeries} onPress={() => setShowSeries(!showSeries)}>
                <Text style={styles.textSeries}>Series:</Text>
            </TouchableHighlight>
            { showSeries ? <Series heroe={heroe.series.items} /> : null }
            <TouchableHighlight style={styles.btnComics} onPress={() => setShowComics(!showComics)}>
                <Text style={styles.textComics}>Comics:</Text>
            </TouchableHighlight>
            { showComics ? <Comics heroe={heroe.comics.items} /> : null }
           
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  bodyContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "cover"
  },
  text: {
    paddingBottom: 20,
    textAlign: "justify",
    fontSize: 17
  },
  title: {
    paddingBottom: 20,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold"
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
  },
  btnSeries: {
    marginTop: 10,
    padding: 20,
    backgroundColor: "navy",
  },
  textSeries: {
    color: "white",
    fontSize: 20,
  },

  btnComics: {
    marginTop: 10,
    padding: 20,
    backgroundColor: "darkgreen",
  },
  textComics: {
    color: "white",
    fontSize: 20
  },
});


export default HeroeDetail;
