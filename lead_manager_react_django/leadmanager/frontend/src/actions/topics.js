import { GET_TOPICS, DELETE_TOPIC, ADD_TOPIC , CHANGE_TOPIC, ADDING_TOPIC } from "../actions/types.js"
import axios from 'axios'
import {createMessage, returnErrors} from "./messages"
import {tokenConfig} from "./auth"

export const changeTopic = id => dispatch => {
    dispatch({type: CHANGE_TOPIC, payload: id})
}

export const addingTopic = () => dispatch => {
    dispatch({type:ADDING_TOPIC, payload: ''})
}




export const getTopics = () => (dispatch, getState) => {
    axios
        .get('/api/topics/', tokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_TOPICS,
                payload: response.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteTopic = (id) => (dispatch, getState) => {
    axios.delete(`/api/topics/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Topic Deleted'}))
            dispatch({type: DELETE_TOPIC, payload: id})
        })
        .catch(err => console.log(err))
}

export const addTopic = (attr) => (dispatch, getState) => {
    axios.post('/api/topics/', attr, tokenConfig(getState))
        .then(response => {
            dispatch(createMessage({ addLead: 'Topic Added'}))
            dispatch({type: ADD_TOPIC, payload: response.data})
        })
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}