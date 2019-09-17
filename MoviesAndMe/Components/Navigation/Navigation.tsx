
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Search from '../Search';
import FilmDetail from '../FilmDetail';
import Favorites from '../Favorites';
import {Ionicons} from '@expo/vector-icons'
import { Image, StyleSheet } from 'react-native';
import React from 'react'

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

const MoviesTabNavigator = createBottomTabNavigator({
    Search: SearchStackNavigator,
    Favorites:  FavoriteStackNavigator
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
                }
                return <IconComponent name = {iconName} size = {25} color = {tintColor}/>
            }
        }),
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray'
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