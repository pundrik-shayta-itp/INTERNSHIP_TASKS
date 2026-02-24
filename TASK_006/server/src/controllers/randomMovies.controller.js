import { BASEURL } from "../index.js";

export const randomMoviesGenerator=async(req,res)=>{
    try{
        console.log("Random movie generated");
        const apiResponse=await fetch(`${BASEURL}titles`);
        let data=await apiResponse.json();
        return res.status(200).json({message:"ok",data});
    }catch(e){
        console.log(e);
        return res.status(400).json({message:"Something is wrong in random movie generator"});
    };
};