import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

let joke = ""
let setup = ""
let delivery = ""

app.get('/', (req, res) => {
  res.render("index.ejs", {joke : joke, setup: setup, delivery : delivery})
})
  
app.post("/joke", async (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body))
    console.log(obj.Category)
    res.locals = setup, delivery
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/" + obj.Category)
        setup = response.data.setup
        delivery = response.data.delivery
        joke = response.data.joke
        console.log({joke : joke, setup : setup, delivery : delivery})
        res.render("index.ejs", {joke : joke, setup : setup, delivery : delivery})
    } catch (error) {
        console.error(error);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})