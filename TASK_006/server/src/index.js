import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { randomMoviesGenerator } from "./controllers/randomMovies.controller.js";
import { titleMoviesGenerator } from "./controllers/titlesMovies.controller.js";

dotenv.config({path:"./src/.env"});
const app=express();

app.use(cors());
app.use(express.json());

const PORT=process.env.PORT;

export const BASEURL=process.env.BASE_URL;

app.get('/',randomMoviesGenerator);

app.get('/titles',titleMoviesGenerator);


app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}.`);
})
