import { BASEURL } from "../index.js";

export const titleMoviesGenerator= async(req , res )=>{
    try {
        // console.log(req);
        let {query}=req.query;
        query=query.trim();
        console.log(query);
        if(!query){
            return await fetch("http://localhost:8000/");
        }else{
            let params={
                query:query,
                limit:50
            }
            const paramsstr=new URLSearchParams(params).toString();
            console.log(paramsstr);
            const apiResponse=await fetch(`${BASEURL}/search/titles?${paramsstr}`);
            let data=await apiResponse.json();
            return res.status(200).json({message:"ok",data});
        }
    } catch (error) {
        console.log("error");
        return res.status(400).json({message:"Something is wrong with title movies generator."});
    }
}