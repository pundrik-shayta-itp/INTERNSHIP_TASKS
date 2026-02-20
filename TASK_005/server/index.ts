import express from "express";

const app=express();
const PORT=process.env.PORT;

app.use(express.json());

app.get("/",(req,res)=>{
    console.log(req.body);
    return res.json();
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})