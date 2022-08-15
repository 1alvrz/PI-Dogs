import { GET_ALL_DOGS, GET_DOG_BY_NAME, GET_ALL_TEMPERS, 
    GET_DOG_BY_TEMPER, GET_DOGS_BY_DB, GET_DOGS_BY_API, ORDER_DOGS, SET_DOG, GET_DOG_BY_ID, EMPTY_DOG } from "./actionsTypes";

import axios from "axios";

const URL = "http://localhost:3001";

export const getAllDogs = () => dispatch => {
    return fetch(`${URL}/dogs`)
        .then(respuesta => respuesta.json())
        .then(json => {return dispatch({type: GET_ALL_DOGS, payload: json})})
};

export const getDogByName = (name) => dispatch => {
    return fetch(`${URL}/dogs?name=${name}`)
        .then(respuesta => respuesta.json())
        .then(json => {return dispatch({type: GET_DOG_BY_NAME, payload: json})})
    };

export const getAllTempers = () => async dispatch => {
    const {data} = await axios.get(`${URL}/temperaments`);
    return dispatch({type: GET_ALL_TEMPERS, payload: data});
};

export const getDogByTemper = (temper) => {
    return {
        type: GET_DOG_BY_TEMPER,
        payload: temper
    }
}

export const getDogByDb = () => {
    return {
        type: GET_DOGS_BY_DB,
        payload: "db"
    }
}

export const getDogByApi = () => {
    return {
        type: GET_DOGS_BY_API,
        payload: "db"
    }
}

export const orderDogs = (orden) => {
    return {
        type: ORDER_DOGS,
        payload: orden
    }
}

export const setDog =  (dog) => async dispatch => {
   
    let dogPost = await axios.post(`${URL}/dogs`, dog);
    return dispatch({
        type: SET_DOG,
        payload: dogPost
    });
}

export const getDogById = (id) => async dispatch => {
    const {data} = await axios.get(`${URL}/dogs/${id}`);
    return dispatch({
        type: GET_DOG_BY_ID,
        payload: data
    })
}

export const emptyDog = () => dispatch => {
    return dispatch({
        type: EMPTY_DOG,
        payload: {}
    })
}
