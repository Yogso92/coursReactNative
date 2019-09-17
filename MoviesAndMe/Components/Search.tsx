import React from 'react'
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native'
import {getFilmsFromApiWithSearchedText, getFilmDetailFromApi} from '../API/TMDBapi'
import {connect} from 'react-redux'
import FilmList from './FilmList'

class Search extends React.Component {
  searchedText: string = "";
  _searchingText: string ="";
  _key:number = 0;
  page: number;
  totalPages: number;
  constructor(props){
    super(props)
    this.state ={
      films: [],
      isLoading: false
      }
    this.page = 0
    this.totalPages = 0
    this._loadFilms = this._loadFilms.bind(this)
  }
  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", {
      filmId: idFilm
    })
  }
  _displayLoading(){
    if (this.state.isLoading){
      return (
        <View style = {styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }
  _isItemFavorite(id){
    if (this.props.favoritesFilm.findIndex((item, index) => item.id === id) !== -1) {
      return true
    }
    else{
      return false
    }
  }
  _resetFilms(){
    
    this.page = 0
    this.totalPages = 0
    this.setState({films: []})
  }
  _loadNextFilms(){
    if(this.totalPages > this.page){
      this.setState({isLoading: true})
      getFilmsFromApiWithSearchedText(this._searchingText, (this.page+1)).then((data) => {
        this.setState({films: [...this.state.films, ...data.results], isLoading: false}) 
        this.page = data.page;
        this.totalPages = data.total_pages
      })
    
    }
  }
  _loadFilms(){
    this._searchingText = this.searchedText
    if(this.searchedText.length > 0){
      this.setState({isLoading: true})
      this._resetFilms()
      getFilmsFromApiWithSearchedText(this._searchingText, (this.page+1)).then((data) => {
        this.setState({films: data.results, isLoading: false}) 
        this.page = data.page;
        this.totalPages = data.total_pages;
        console.log(this.state.films)
      })

    }
      
  }
  _searchedTextInputChanged(text: string){
    this.searchedText =  text
  }
  

  render() {
    return (
      <View style = {styles.mainContainer}>
        <TextInput style= {styles.textinput} placeholder ="Search for a movie" onChangeText ={(text) => this._searchedTextInputChanged(text)} onSubmitEditing = 
        {() => {
          this._loadFilms()
          }}
        />
        <Button title='Search' onPress={() => this._loadFilms()}/>
        
          <FilmList style={{flex: 1}}
            films={this.state.films}
            loadFilms = {this._loadFilms}
            page = {this.page}
            totalPage = {this.totalPages}
            navigation = {this.props.navigation}
            //component se re rend si extra data et data changent
            />
        
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    marginLeft:5, 
    marginRight: 5, 
    height: 50, 
    borderColor: "#000000", 
    borderWidth: 1, 
    paddingLeft: 5
  },
  mainContainer: {
    flex:1, 
    padding: 10
  },
  loading_container: {
    position: 'absolute',
    opacity: 0.7,
    backgroundColor: '#ffffff',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const mapStateToProps = (state) => {
  return {
      favoritesFilm: state.favoritesFilm
  }
}
export default connect(mapStateToProps)(Search);
