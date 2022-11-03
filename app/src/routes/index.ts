import express from 'express';
import { pool } from '../app';
import * as bcrypt from "bcrypt";

export const indexRouter = express.Router();


indexRouter.post('/good', async (req,res) => {
    const body:any = req.body;

    if (!(body.email && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly!" });
    }

    console.log(body.email);
    console.log(body.password);

    const user = (await pool.query(`SELECT * FROM appUser WHERE email='` + body.email +  `';`)).rows[0];
    console.log(user);
  
    if (user === undefined) {
        return res.status(403).send({ error: "User not found!" });
    } 

    if (!bcrypt.compareSync(body.password,user.passwordhash)) {
        return res.status(403).send({ error: "User not found!" });
    }
    
    req.session.user = user.iduser;
    console.log(req.session);

    return res.json({
        session: req.session,
    });
});

indexRouter.post('/bad', async (req,res) => {
    const body = req.body;

    if (!(body.email && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly!" });
    }

    console.log(body.email);
    console.log(body.password);

    const user:any = (await pool.query(`SELECT * FROM appUser WHERE email='` + body.email +  `';`)).rows[0];
    console.log(user);
  
    // loše poruke o greškama
    if (user === undefined) {
        return res.status(403).send({ error: "Email is not valid!" });
    } 

    if (user.password !== body.password) {
        return res.status(403).send({ error: "Password is not valid!" });
    }
    
    req.session.user = user.username;
    req.sessionID = user.username + 'sessionid';

    console.log(req.session);
    
    return res.json({
        session: req.session,
    });
      

});