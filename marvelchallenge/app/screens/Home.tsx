import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList  } from "react-native-gesture-handler";
import { Image, Text } from "react-native-elements";
import { getHeroes } from "../services/heroeService";
import { NavigationScreenComponent } from "react-navigation";

interface Props {}

const Home: NavigationScreenComponent<null,  Props> = props => {
    const [marvelHeroes, setMarvelHeroes] = useState<Heroe[]>([]);
    const [page, setPage] = useState(0);
    const [name, setName] = useState("");
    
    useEffect(() => {
        async function init() {
            const response = await getHeroes(page,name);
            const result = response.data;
            const heroes = result.results;
            setName(name)
            setMarvelHeroes(heroes);
        }
        init();
        }, []);

        function onHeroePress(heroe: Heroe) {
            props.navigation.navigate("heroDetail", { heroe });
        }

        async function loadMoreHeroes() {
            const currentPage = page+1;
            const response = await getHeroes(currentPage,name);
            const result = response.data;
            const heroes = marvelHeroes;
            marvelHeroes.push(...result.results);
            setMarvelHeroes(heroes);
            setPage(currentPage);
        }

        console.log(marvelHeroes);
        return (
            
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
        
        );
}

const styles = StyleSheet.create({
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
});

export default Home;