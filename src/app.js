const express = require('express')
const path  = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
//dir for static and dynamic pages
const dir = path.join(__dirname,"../public")
const viewdir = path.join(__dirname,"../templates/views")
const partialdir = path.join(__dirname,"../templates/partials")

app.set('view engine','hbs') 
app.set('views',viewdir)
hbs.registerPartials(partialdir)
app.use(express.static(dir))

app.get('',(req,res)=>{
    res.render('index',{title:"Weather",name:"Vash"})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:"About",name:"Vash"})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:"HELP",name:"Vash"})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    return res.send({error:'Provide  an address'})

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        res.send({error})
        forecast(latitude,longitude,(error,response)=>{
            if(error)
            res.send({error})
            res.send({
                forecast:response,
                location,
                address:req.query.address
            })
        })
    })
    })


app.get('/help/*',(req,res)=>{
    res.render('404',{title:"Help article not found"})
})

app.get('*',(req,res)=>{
    res.render('404',{title:"404 Error"})
})

app.listen(port,()=>console.log("Listening on port "+port))