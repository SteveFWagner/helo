

const initialState={
    id:0,
    username:``,
    profile_pic:``
}

const UPDATE_USER="UPDATE_USER"

export function updateUser(id,username,profile_pic){
    console.log("@actionBuilder",id,username,profile_pic)
    return{
        type:UPDATE_USER,
        payload:{id,username,profile_pic}
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case UPDATE_USER:
            let {id,username,profile_pic} = action.payload
            return{...state, id, username, profile_pic}
        default:
            return state
    }
}