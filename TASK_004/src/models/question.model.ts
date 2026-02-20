import {readFile, readFileSync} from "fs";
import { type QuestionType,type QuestionArrayType } from "../types/questions.type.ts";


export default class QuestionProvider{
    private static instance:QuestionProvider|null =null;

    readonly questions:QuestionArrayType=[];

    private constructor(arr:QuestionArrayType){
        this.questions=arr;
    }

    public static getInstance():QuestionProvider{
        if(QuestionProvider.instance===null){
            const data=JSON.parse(readFileSync("data/questions.json","utf-8"));
            QuestionProvider.instance = new QuestionProvider(data);
        }
        return QuestionProvider.instance;
    }

    getQuestion(index:number):QuestionType{
        if(index>=(this.questions.length)){
            throw new Error("No Question Present at this index.");
        }
        const question:QuestionType=this.questions[index]!;
        return question;
    }
}

