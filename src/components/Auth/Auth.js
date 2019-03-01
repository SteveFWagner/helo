import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser} from '../../dux/reducer'

class Auth extends Component{
    constructor(props){
        super(props)
        this.state={
            username:``,
            password:``
        }
        this.login=this.login.bind(this)
    }
    handleUserInput(prop,val){
        this.setState({
        [prop]:val
        })
    }

    registerUser=()=>{
        const {username,password} = this.state
        axios.post('/api/auth/register',{username,password}).then((res)=>{
            let {id,username,profile_pic} = res.data[0]
            this.props.updateUser(id,username,profile_pic)
            this.props.history.push('/dashboard')
        })
    }
    
    login=()=>{
        const{username,password} = this.state
        axios.post('/api/auth/login',{username,password}).then(res=>{
            console.log("res@auth",res.data[0])
            let {id,username,profile_pic} = res.data[0]
            this.props.updateUser(id,username,profile_pic)
            this.props.history.push('/dashboard')
        })
    }
    render(){
        // console.log("Auth",this.props)
        return(
            <div>
                <input type='text' placeholder="Username" onChange={(e)=>this.handleUserInput('username',e.target.value)}/>
                <input type='password' placeholder="Password" onChange={(e)=>this.handleUserInput('password',e.target.value)}/>
                <button onClick={this.login}>Login</button>
                <button onClick={this.registerUser}>Register</button>
            </div>
        )
    }
}


export default connect(null,{updateUser})(Auth)