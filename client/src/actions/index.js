import axios from "axios";
import {
    GET_DOGS,
    GET_DETAIL,
    GET_TEMPERAMENTS,
    GET_DOG_NAME,
    POST_DOG,
    ORDER,
    CLEAR_DETAIL,
    FILTER_DOGS_BY_TEMPERAMENT,
    FILTER_BY_CREATED,
} from "./action"


export function getDogs() {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs");
            return dispatch({
                type: GET_DOGS,
                payload: json.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function clearDetail () {
    return {
        type: CLEAR_DETAIL,
        payload: [],
    }
}

export function getDetail(id) {
    //console.log("getDetails")
    return async function (dispatch){
    try {
        var json = await axios.get(`http://localhost:3001/dogs/${id}`)
        // console.log(json.data)
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        });
    } catch (error) {
        console.log(error)
    }}
}

export function getDogName(name) {
    //console.log(name)
    return async function (dispatch) {
        try {
            var resp = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: GET_DOG_NAME,
                payload: resp.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDogTemperament() {
    return async function (dispatch) {
        try { 
            var json = await axios.get(`http://localhost:3001/temperament`);
            console.log(json.data)
         dispatch({          
                type: GET_TEMPERAMENTS,
                payload: json.data
            })    
        } catch (error) {
            console.log(error)
        }
    }
}


export function postDog (payload) {
    // console.log(payload)
    return async function(dispatch){
        try{
            // await axios.post('/dogs', payload);
            // return {
            //     type: POST_DOG,
            // }

            const {data} = await axios.post("http://localhost:3001/dogs", payload)
            // console.log(data )
             dispatch({type: POST_DOG, payload: data})
        } 
        catch(error){
            console.log(error)
        }
    } 
} 

export function order(payload) {
    return {
        type: ORDER,
        payload
    }
}


export function filterDogsByTemperament(payload) {
    return {
        type: FILTER_DOGS_BY_TEMPERAMENT,
        payload
    }
}

export function filterDogsByCreated (payload) {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}

export function resetPagination (payload) {
    return {
        type: 'RESET_PAGINATION',
        payload
    }
}
