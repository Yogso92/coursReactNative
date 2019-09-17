const initialState = {
    historicFilms: []
  }
  
  function manageHistoricFilms(state = initialState, action) {
    let newState
    switch(action.type){
      case 'TOGGLE_FILMDETAIL':
        const filmIndex = state.historicFilms.findIndex(item => item.id === action.value.id)
        if( filmIndex === -1){
          newState = {...state, historicFilms: [...state.historicFilms, action.value]}
        }
        return newState || state
      case 'REMOVE_HISTORIC_FILM':
        const filmIndex = state.historicFilms.findIndex(item => item.id === action.value.id)
        if(filmIndex !== -1){
          newState = {...state, 
                      historicFilms: state.historicFilms.filter(
                        (item, index) =>  item.id !== action.value.id
                      )}
        }
        return newState || state
      case 'RESET_HISTORIC':
        newState = {...state,
                   historicFilms: []}
        return newState
      default:
        return state
    }
    
  }
  
  export default manageHistoricFilms
  