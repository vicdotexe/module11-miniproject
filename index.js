//Add server code here!
const express = require('express');
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/index.html"));
})

app.get("/api/books", (req,res)=>{
    fs.readFile("./db/books.json", "utf8", (err,data)=>{
        if (err){
            throw err;
        }else{
            const booksArr = JSON.parse(data);
            res.json(booksArr);
        }
    })
})

app.get("/api/books/:id", (req,res)=>{
    fs.readFile("./db/books.json", "utf8", (err,data)=>{
        if (err){
            throw err;
        }else{
            const booksArr = JSON.parse(data);
            const book = booksArr.find(x=>x.id == req.params.id);
            if (!book){
                return res.send("That ID doesn't exist.");
            }else{
                return res.json(book);
            }
        }
    })
})

app.post("/api/books", (req,res)=>{
    fs.readFile("./db/books.json", "utf8", (err,data)=>{
        if (err){
            throw err;
        }else{
            const booksArr = JSON.parse(data);
            const book = req.body;
            booksArr.push(book);
            fs.writeFile("./db/books.json", JSON.stringify(booksArr), (err)=>{if (err){throw err;}});
            console.log(book);
            res.send("Added Book");
        }
    })
})

app.get("*", (req,res)=>{
    res.send("404");
})

app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)});