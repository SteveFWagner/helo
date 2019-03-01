import React, {Component} from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'

class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            search:'',
            myPosts:true,
            posts:[{
                title:"",
                author:"",
                profile_pic:""
            }]
        }
    }

    handleUserInput=(prop,val)=>{
        this.setState({
            [prop]:val
        })
    }

    handleCheckBox=()=>{
        this.setState({
            myPosts:!this.state.myPosts
        })
    }

    componentDidMount(){
        this.getPosts()
    }

    handleReset= async()=>{
        await this.setState({
            search:''
        })
        // console.log('waited!')
        this.getPosts()
    }

                        //yes, i know its not DRY -.-
    getPosts=()=>{
        let {search,myPosts} = this.state
        let {id} = this.props
        if(myPosts === true && search !== ''){
            // console.log('hit1')
            Axios.get(`/api/posts/${id}?search=${search}&not=0`).then( res =>{
                console.log('res @ hit1',res)
                this.setState({
                    posts:res.data
                })
            })
        }else if(myPosts === true && search === ''){
            // console.log('hit2')
            Axios.get(`/api/posts/${id}?search=0&not=0`).then( res =>{
                console.log('res @ hit2',res)
                this.setState({
                    posts:res.data
                })
            })
        }else if (myPosts === false && search !== ''){
            // console.log('hit3')
            Axios.get(`/api/posts/${id}?search=${search}&not=${id}`).then( res =>{
                console.log('res @ hit3',res)
                this.setState({
                    posts:res.data
                })
            })
        }else if (myPosts === false && search === ''){
            // console.log('hit4')
            Axios.get(`/api/posts/${id}?search=0&not=${id}`).then( res =>{
                console.log('res @ hit4',res)
                this.setState({
                    posts:res.data
                })
            })
        }
    
    }

    render(){
        console.log("state @ dash", this.state)
        let mappedPosts = this.state.posts.map((val,i,arr)=>{
            let {title,author,profile_pic} = val
            return(
                <div key={i} style={{border:'3px solid', margin:'3px'}}>
                    <h4>Title: {title}</h4>
                    <h6>Author: {author}</h6>
                    <img src={profile_pic} alt='authorPic'/>
                </div>
            )
        })
        return(
            <div>
                <input placeholder="Search by Title" onChange={(e)=>this.handleUserInput('search',e.target.value)}/>
                <button onClick={this.getPosts}>Search</button>
                <button onClick={this.handleReset}>Reset</button>
                My Posts<input type='checkbox' checked value={this.state.myPosts} onChange={this.handleCheckBox}/>
                <div>
                    {mappedPosts}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        id:state.id
    }
}

export default connect(mapStateToProps)(Dashboard)