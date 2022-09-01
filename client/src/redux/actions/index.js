import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DETAIL = 'GET_DETAIL';
export const CREATE_DOG = 'CREATE_DOG';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT';


export function getDogs(name) {
    return async function (dispatch) {
        try {
            if (name) {
                return axios.get('/dogs?name=' + name)
                    .then(res => dispatch({ type: GET_DOGS, payload: res.data }))
                    .catch(err => dispatch({type: GET_DOGS, payload: err.data}))
            } else {
                let json = await axios.get('/dogs', {});
                return dispatch({
                    type: GET_DOGS,
                    payload: json.data,
                })
            }
        } catch(err){
            return alert('Dog not found')
        }
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        let json = await axios.get('/temperaments', {});
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data,
        })
    }
}

export function filterDogsByTemperament(payload) {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function filterDogsByOrigin(payload) {
    return {
        type: FILTER_BY_ORIGIN,
        payload,
    }
}

export function sortByName(payload) {
    return {
        type: SORT_BY_NAME,
        payload,
    }
}

export function sortByWeight(payload) {
    return {
        type: SORT_BY_WEIGHT,
        payload,
    }
}




export const postDog =({name, heightMin , heightMax, weightMin, weightMax, years, temperament }) =>{
    return async ( dispatch) =>{
    
        await axios.post('/dogs/create',{
            name,
            height: heightMin + ' - ' + heightMax,
            weight: weightMin + ' -' + weightMax,
            life_span: years + " years",
            temperament,

        })
        dispatch({
            type: CREATE_DOG
        })
    }}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('/dogs/' + id);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}