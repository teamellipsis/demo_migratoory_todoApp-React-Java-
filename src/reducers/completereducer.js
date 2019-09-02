import{COMPLETD_TODO} from '../actions/completed';

export default function completetodoReducer(state=[], {type,payload}){
    switch(type){
        case COMPLETD_TODO:
            return{todos: [
                ...state.todos,
                payload.todo
            ]}
            default:
            return state
    }
   
}