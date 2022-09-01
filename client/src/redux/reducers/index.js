import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DETAIL,
    CREATE_DOG,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_ORIGIN,
    SORT_BY_NAME,
    SORT_BY_WEIGHT,
} from "../actions/index";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.allDogs; 

            let temperamentFilter =  action.payload === 'all' ? allDogs  : allDogs.filter((temp)=> temp.temperament?.includes(action.payload))
            return{
              ...state,
              dogs: temperamentFilter
            }
        case FILTER_BY_ORIGIN:
            let createFilter = action.payload === 'created'
            ? state.allDogs.filter((e)=> e.createInDb)
            : state.allDogs.filter((e)=> !e.createInDb) 
            return{
              ...state,
              dogs: action.payload === 'all' ? state.allDogs : createFilter
            };
        case SORT_BY_NAME:
            const sortedName = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedName,
            }

        case SORT_BY_WEIGHT:
         
            let sortedArr2 = action.payload === "asc" ? state.dogs.sort(function (a, b) {
                if (Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])) {
                  return 1;
                }
                if ( Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])) {
                  return -1;
                }
                return 0;
              })
            :  state.dogs.sort(function (a, b) {
                if (Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])) {
                  return -1;
                }
                if (Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])) {
                  return 1;
                }
                return 0;
              });
              return {
          ...state,
          dogs: sortedArr2,
        };
        case CREATE_DOG:
            return {
                ...state,
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            }

        default:
            return state;
    }
}

export default rootReducer;