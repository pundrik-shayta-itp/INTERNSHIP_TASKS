import express from "express";
import dotenv from "dotenv";
import NodeCache from "node-cache";
import cors from "cors";


dotenv.config();

const app=express();
app.use(express.json());
app.use(cors());

const weatherCache=new NodeCache({stdTTL:300});


const PORT:number=8000;
const base_url:string=process.env.BASEURL!;
const api_key:string =process.env.API_KEY!;


function storeInCache(key:number|string,value:any,ttl:number=120):boolean{
    const checkCache:boolean=weatherCache.has(key);
    if(checkCache){
        weatherCache.del(key);
    }
    return weatherCache.set(key,value,ttl);
    
}   

function getDataFromCache(location : string): object |null { 
    const checkCache:boolean=weatherCache.has(location);
    // console.log(checkCache);
    if(checkCache){
        console.log("Cache Hit!");
        return weatherCache.get(location)!;
    }
    return null;
}

async function getDataFromApi(location:string):Promise<{}>{

    const params={
        key:api_key,
        q:location,
        aqi:"yes"
    }

    const paramsstr:string=new URLSearchParams(params).toString();
    console.log("url hit!");
    let  apiResponse=await fetch(`${base_url}current.json?${paramsstr}`);
    // console.log(apiResponse);
    let data=await apiResponse.json();
    console.log(data);
    return data;
}

app.post("/get_weather",async(req,res)=>{
    try {

        // console.log(req);
        let {body}=req;
        
        let location:string|null =body?.location;
        if(!location){
            return res.status(422).json({message:"Location is Compulsory to process the request."});
        }
        location=location.toLowerCase().trim();
        let data:object|null = null;

        data=getDataFromCache(location);

        if(data){
            return res.status(200).json({message:"ok",data});
        }else{
            data=await getDataFromApi(location);
            const cacheUpdate=storeInCache(location,data,120);
            return res.status(200).json({message:"ok",cacheUpdate,data});
        }

    } catch (error) {
        console.log(`Error : ${error}`);
        throw new Error("Something is Wrong");
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})