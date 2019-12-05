import { GET_TOPICS, DELETE_TOPIC, ADD_TOPIC, CHANGE_TOPIC, ADDING_TOPIC } from "../actions/types.js"

const initialState = {
    topics: [],
    activeTopic: 1,
    addingTopic: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_TOPICS:
            return {
                ...state,
                topics: action.payload,
                addingTopic: false,
                activeTopic: 1
            };
        case DELETE_TOPIC:
            return {
                ...state,
                leads: state.topics.filter(topic => topic.id !== action.payload),
                addingTopic: false,
                activeTopic: 1
            };
        case ADD_TOPIC:
            return {
                ...state,
                addingTopic: false,
                topics: [...state.topics, action.payload]
            };
        case CHANGE_TOPIC:
            const nuState = 
            {
                ...state,
                addingTopic: false,
                activeTopic: action.payload
            }
            return nuState
        case ADDING_TOPIC:
            return {
                ...state,
                addingTopic: true
            };
    }
    return state
}