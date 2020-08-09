import { createAppContainer, createStackNavigator } from "react-navigation";
import Home from "./screens/Home";
import HeroeDetail from './screens/HeroDetail';

const AppStack = createStackNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: { 
        headerTitle: "Marvel Challenge",
        headerStyle: {
          backgroundColor: 'red',
          color: '#fff',
          fontWeight: 'bold',
        }, 
        headerTintColor: '#fff',
      }
    },
    heroDetail: {
      screen: HeroeDetail,
      navigationOptions: { 
        headerTitle: "Heroe Detail",
        headerStyle: {
          backgroundColor: 'red',
          color: '#fff',
          fontWeight: 'bold',
        }, 
        headerTintColor: '#fff',
      }
      
    }
  },
  {
    //
  }
);

export const RootNavigator = createAppContainer(AppStack);

export default RootNavigator;
