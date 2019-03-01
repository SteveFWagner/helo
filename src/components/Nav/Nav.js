import React from 'react'
import {connect} from 'react-redux'

function Nav(props){
    console.log(props)
    if(props.location.pathname !== "/"){
        return(
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <h1>Welcome, {props.username}!</h1>
                <img src={props.profile_pic} alt='User'/>
            </div>
        )
    }
    return null
}

function mapStateToProps(state){
    return{
        username:state.username,
        profile_pic:state.profile_pic
    }
}
export default connect(mapStateToProps)(Nav)