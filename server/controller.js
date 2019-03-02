module.exports={
    register: (req,res)=>{
        const {username, password} = req.body
        const db = req.app.get('db')
        db.register(username,password).then((resp)=>{
            console.log(resp)
            res.status(200).send(resp)
        }).catch(err=> res.sendStatus(409))
    },
    login:(req,res)=>{
        const {username, password} = req.body
        const db = req.app.get('db')
        db.login(username,password).then((resp)=>{
            console.log(resp)
            res.status(200).send(resp)
        }).catch(err=> res.sendStatus(409))
    },
    getPosts: (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {search,not} = req.query
        console.log(req.query, id)
        if(not !== '0' && search !== '0'){
            // console.log('hithithit')
            db.get_posts_wo_user_search(not,search).then(resp =>{
                res.status(200).send(resp)
            }).catch(err=> res.sendStatus(500))
        }else if( not !== '0' && search === '0'){
            db.get_posts_wo_user(not).then(resp =>{
                // console.log('hithit')
                res.status(200).send(resp)
            }).catch(err=> res.sendStatus(500))
        }else if( not === '0' && search !== '0'){
            db.get_posts_search(search).then(resp =>{
                // console.log('hithit')
                res.status(200).send(resp)
            }).catch(err=> res.sendStatus(500))
        }else if(not === '0' && search === '0'){
            db.get_posts(search).then(resp =>{
                // console.log('hithit')
                res.status(200).send(resp)
            }).catch(err=> res.sendStatus(500))
        }
        

    },
    getPost: (req,res)=>{
        const db = req.app.get('db')
        let {id} = req.params
        db.get_post(id).then(resp=>{
            res.status(200).send(resp)
        }).catch(err=> res.sendStatus(500))
    }
}