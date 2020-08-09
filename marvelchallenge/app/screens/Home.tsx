/*
  Home Screen principal do app
*/
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { FlatList  } from "react-native-gesture-handler";
import { Image, Text, SearchBar  } from "react-native-elements";
import { getHeroes, getHeroeDetail } from "../services/heroeService";
import { NavigationScreenComponent } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {}

let favHeroes: FavHeroe[];

const Home: NavigationScreenComponent<null,  Props> = props => {
    const [iconfav, setIconFav] = useState("heart-o");
    const [marvelHeroes, setMarvelHeroes] = useState<Heroe[]>([]);
    const [page, setPage] = useState(0);
    const [name, setName] = useState("");

    
    useEffect(() => {
        async function init() {
            const response = await getHeroes(page,name);
            const result = response.data;
            const heroes = result.results;
            setMarvelHeroes(heroes);
            
        }
        init();
        }, []);

    function onHeroePress(heroe: Heroe) {
        props.navigation.navigate("heroDetail", { heroe });
    }

    async function loadMoreHeroes() {
      if (iconfav == 'heart-o') {
          const currentPage = page+1;
          const response = await getHeroes(currentPage,name);
          const result = response.data;
          const heroes = marvelHeroes;
          heroes.push(...result.results);
          setMarvelHeroes(heroes);
          setPage(currentPage);
      }
    }

    async function searchHeroes(text: string) {
        setName(text);
        const currentPage = 0;
        const response = await getHeroes(currentPage,text);
        const result = response.data;
        const heroes = result.results;
        setMarvelHeroes(heroes);
        setPage(currentPage);
        
    }

    async function showFavorities() {
      if (iconfav == 'heart-o') {
        const heroes = [];

        const jsonValueI = await AsyncStorage.getItem('@favorites');
        if (jsonValueI != null)
            favHeroes = JSON.parse(jsonValueI!);
        else
            favHeroes = [];
          
        for(let i = 0; i < favHeroes.length; i++){
          const response = await getHeroeDetail(favHeroes[i].id);
          const result = response.data;
          heroes.push(...result.results);
        }
        heroes.sort((a, b) => (a.name > b.name) ? 1 : -1)
        setMarvelHeroes(heroes);
        setIconFav('heart');
      } else {
        const response = await getHeroes(page,name);
        const result = response.data;
        const heroes = result.results;
        setMarvelHeroes(heroes);
        setIconFav('heart-o');
      }
  }

    return (
    <View style={styles.viewStyle}>
      <View style={{flexDirection: 'row',}}>
        <View style={{flex: 1}}>
        <SearchBar
        searchIcon={true}
        containerStyle={{backgroundColor: 'red',borderBottomColor: 'transparent',borderTopColor: 'transparent'}}
        onChangeText={text => searchHeroes(text)}
        placeholder="Procurar..."
        value={name}
        />
        </View>
        <View style={{flex: 0.1, backgroundColor: 'red', paddingTop:20}}>
          <Icon name={iconfav} size={30} color="yellow" onPress={() => showFavorities()}/>
        </View>
      </View>
      <FlatList
            data={marvelHeroes}
            keyExtractor = { (item, index) => index.toString() }
            onEndReached={loadMoreHeroes}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => onHeroePress(item)}
            >  
            <View style={styles.cardheroe}>
                <View style={{flexDirection: 'row',}}>
                    <View style={{flex:1,flexDirection: 'column'}}>
                        <Image source={{ uri: item.thumbnail.path+'.'+item.thumbnail.extension }} style={styles.image} />
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.titulo}>{item.name}</Text>
                        <Text style={styles.resumo}  ellipsizeMode={"tail"} numberOfLines={8}>{item.description}</Text>
                    </View>
                </View>
            </View>    
            </TouchableOpacity>
            )}
        />
    </View>
    
    );
}

const styles = StyleSheet.create({
    image: {
        height: 198,
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
      cardheroe : {
        height: 200,
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
      description : {
        flex:1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: "white",
        height: 140,
    },
      titulo: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'OpenSans',
        fontWeight: 'bold',
      },

      resumo: {
        marginTop: 10,
        color: '#000011',
        fontSize: 14,
        fontFamily: 'OpenSans'        
      },
      viewStyle: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor:'white',
        marginTop: Platform.OS == 'ios'? 30 : 0
      },
});

export default Home;