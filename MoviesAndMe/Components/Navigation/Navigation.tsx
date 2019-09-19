
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Search from '../Search';
import FilmDetail from '../FilmDetail';
import Favorites from '../Favorites';
import {Ionicons} from '@expo/vector-icons'
import { Image, StyleSheet } from 'react-native';
import React from 'react'
import Test from '../Test';

const SearchStackNavigator = createStackNavigator({
    Search: { //nom de la vue
        screen: Search, //nom du component
        navigationOptions:{
            title:'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})
const FavoriteStackNavigator = createStackNavigator({
    Favorites:{
        screen: Favorites,
        navigationOptions: {
            title: "Favoris"
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})
const TestStackNavigator = createStackNavigator({
    Test: {
        screen: Test,
        navigationOptions: {
            title: "Ecran test"
        }
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search: SearchStackNavigator,
    Favorites:  FavoriteStackNavigator,
    Test: TestStackNavigator
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) =>{
                const {routeName} = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName == "Search"){
                    iconName = "md-search"
                } else if(routeName == "Favorites"){
                    iconName = "md-star"+ (focused ? '' : '-outline')
                }   else if(routeName == "Test"){
                    iconName = "md-build"
                }
                return <IconComponent name = {iconName} size = {25} color = {tintColor} backgroundColor/>
            },
        }),
        tabBarOptions: {
            activeTintColor: '#0066FF',
            inactiveTintColor: 'gray',
            activeBackgroundColor: '#D3D3D3',
            inactiveBackgroundColor: 'white'
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(MoviesTabNavigator)