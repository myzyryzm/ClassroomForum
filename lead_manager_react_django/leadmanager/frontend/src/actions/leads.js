import { GET_LEADS, DELETE_LEAD, ADD_LEAD ,GET_ERRORS } from "../actions/types.js"
import axios from 'axios'
import {createMessage, returnErrors} from "./messages"
import {tokenConfig} from "./auth"

export const getLeads = () => (dispatch, getState) => {
    axios
        .get('/api/leads/', tokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_LEADS,
                payload: response.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteLead = (id) => (dispatch, getState) => {
    axios.delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Message Deleted'}))
            dispatch({type: DELETE_LEAD, payload: id})
        })
        .catch(err => console.log(err))
}

export const addLead = (attr) => (dispatch, getState) => {
    axios.post('/api/leads/', attr, tokenConfig(getState))
        .then(response => {
            dispatch(createMessage({ addLead: 'Message Added'}))
            dispatch({type: ADD_LEAD, payload: response.data})
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}

// export function addLead (attr) {
//     console.log(attr)
//     return dispatch => fetch('/api/leads/', {
//         method: 'POST',
//             headers: {
//                 "Content-type":"application/json"
//             },
//             body: JSON.stringify({lead:attr})
//         })
//         .then(response => {
//             return response.json()
//         })
//         .then(json => {
//             dispatch({type: ADD_LEAD, payload: json})
//         })
//         .catch(err => console.log(err))
// }