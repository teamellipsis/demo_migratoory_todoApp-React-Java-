export const COMPLETD_TODO = "completed" 
export default function addCompleted(todo){
    return {
        type:   COMPLETD_TODO,
        payload:{
            todo : todo
        }
    }
}