// const express = require('express');
// const app = express();
// const path = require('path')
// //handle form data
// app.use(express.json());
// // app.use(express.urlencoded({extended: true}));
// //static file - html,css,js,video img file
// //node modules package already path 
// app.use(express.static(path.join(__dirname, 'public')));
// //ejs- how to look frontend we can do calculation
// //set up ejs from view engine //ejs poer calculation while html can't do
// app.set('view engine','ejs') //it will render pages ejs //setup ejs
// app.get("/",function(req,res){
//     // res.send("hello");
//     res.render("index"); //it render only ejs folder file
// })
// app.get('/profile/:username',function(req,res){
//     res.send(`welcome to home,${req.params.username}`);
// })
// //dynamic routing
// app.get('/profile/:username/:age',(req,res)=>{
//     res.send(`chal ${req.params.username} your age ${req.params.age}`);
// })
// app.listen(3000, function(req,res){
//     console.log("main file runs");
// });


const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req,res){
    // res.render('index');
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files: files});
    })
})
app.get(`/file/:filename`, function(req,res){
    //utf-8-convert buffer data to english char
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("server",{filename: req.params.filename, filedata: filedata});
    })
})
app.get('/edit/:filename',function(req,res){
    res.render('edit',{filename: req.params.filename});
})
app.post('/edit',function(req,res){
    fs.rename(`./files/${req.body.old}`,`./files/${req.body.new}`,function(err){
        res.redirect('/');
    })
    console.log(req.body.old);
})
app.post ('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect("/");  
    });
    // console.log(req.body)
})
app.listen(3000, function(req,res){
    console.log('server running');
})