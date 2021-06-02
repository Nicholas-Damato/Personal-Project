const initialState = {
    items: []
}

const ADD = 'ADD'

export function addToPage(user){
    return {
        type: ADD,
        payload: user
    }
}

export default function itemReducer(state = initialState, action){
    switch (action.type){
        case ADD:
            return {...state, user: action.payload}
        default: 
            return {...state}
    }
}