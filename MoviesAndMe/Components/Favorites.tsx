import React from "react";
import { View, StyleSheet } from "react-native";
import FilmList from "./FilmList";
import { connect } from 'react-redux'

class Favorites extends React.Component{
    constructor(props){
        super(props)
        this._loadFilms = this._loadFilms.bind(this)
        this.state = {
            films : []
        }
    }
    _loadFilms(){
        this.setState({films: this.props.favoritesFilm})
    }
    render(){
        return(
            <View style = {styles.mainContainer}>
                <FilmList
                    films={this.props.favoritesFilm}
                    navigation = {this.props.navigation}
                    favoriteList = {true}
                    //component se re rend si extra data et data changent
                />
            </View>
        )
    }
    componentDidMount(){

    }
    componentDidUpdate(){
        console.log("update")
    }
}
const styles = StyleSheet.create({
    mainContainer: {
      flex:1, 
      padding: 10
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
  }
export default connect(mapStateToProps)(Favorites)