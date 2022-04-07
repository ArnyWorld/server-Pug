const express = require('express');
const app = express();

const pug = require('pug');

app.use(express.static(__dirname+"/public"));

let animales = [
    {title:"Caiman", text:"Caiman verde", image:"caiman.jpg"},
    {title:"Elephant", text:"Elefante Africano Grande ", image:"elephant.jpg"},
    {title:"Frog", text:"Sapo verde", image:"frog.jpg"},
    {title:"Rabbit", text:"Conejo Chileno", image:"rabbit.jpg"},
    {title:"Turtle", text:"Tortuga Grande", image:"turtle.jpg"},
]

app.get("/",(req,res)=>{
    //res.send("Hola MUndo desde express");
    res.render("index.pug",{
        title:"Animales",
        text:"Bienvenidos",
        image:"portada.jpg",
        animales
    })
})

app.get("/photos/:animal",(req,res)=>{
    
    let datosAnimal = animales.filter((animal)=>{
        if(req.params.animal == animal.title){
            return animal
        } 
    })[0];

    res.render("animal.pug",{
        title:req.params.animal,
        data:datosAnimal
    })
})

app.use((req, res)=>{
    res.status(400);
    let error = req.originalUrl;
    res.render("404.pug", {texto:error});
});

app.listen(3000, ()=>{
    console.log("Servidor en el puerto 3000");
});

