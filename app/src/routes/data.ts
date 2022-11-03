import express from 'express';
import { pool } from '../app';
export const dataRouter = express.Router();


dataRouter.post('/good',async (req,res) => {
    console.log(req.body.session);
    if (req.body.session === null) {
      return res.status(401).send({ error: "Unauthorized access!" });
    }

    const body = req.body;

    if (!(body.value && body.option)) {
      return res.status(400).send({ error: "Data not formatted properly!" });
    }

    console.log(body.value);
    console.log(body.option);

    if (!(body.option == "ID" && typeof(body.value) == 'number') && !(typeof(body.value) == 'string')){
      return res.status(400).send({ error: "Data not formatted properly!" });
    }

    // filtriranje “or”,“OR”,“oR”,“Or”
    const valArray = body.value.split(" ");
    valArray.filter((el:string) => (el.toLowerCase() != "or"));
    body.value = valArray.join(" ");

    // ako uključuje navodnike
    if (body.value.includes("\"") || body.value.includes("\'")) {
      return res.status(400).send({ error: "Data not formatted properly!" });
    }

    // whitelisting
    let languages = ["English","Dutch","German"];
    if (body.option === "nativeLang" && !languages.includes(body.value)) { 
      return res.status(400).send({ error: "Data not formatted properly!" });
    }

    const books = (await pool.query("SELECT * FROM book WHERE " + body.option + " = '" + body.value + "';")).rows;
    console.log(books);

    return res.json({
      books: books,
   });
});

dataRouter.post('/bad',  async (req,res) => {
    console.log(req.body.session);
    if (req.body.session === null) {
      return res.status(401).send({ error: "Unauthorized access!" });
    }

    const body = req.body;

    if (!(body.value && body.option)) {
      return res.status(400).send({ error: "Data not formatted properly!" });
    }

    console.log(body.value);
    console.log(body.option);

    let books = undefined;

    if (body.option === 'idBook') {
      console.log("SELECT * FROM book WHERE idbook = " + body.value + ";");
      books = (await pool.query("SELECT * FROM book WHERE idbook = " + body.value + ";")).rows;
    } else {
      console.log("SELECT * FROM book WHERE " + body.option + " = '" + body.value + "';")
      books = (await pool.query("SELECT * FROM book WHERE " + body.option + " = '" + body.value + "';")).rows;
    }
    console.log(books);

    return res.json({
      books: books,
   });
});

dataRouter.get('/logout', (req, res) => {
    // logout logic
  
    // clear the user from the session object and save
    req.session.destroy((err) => {
        return res.send({error: err});
    
    });
})