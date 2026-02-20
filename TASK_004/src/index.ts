import {createServer, ServerResponse, IncomingMessage } from "node:http";
import QuizController from "./controllers/quiz.controller.ts";

const PORT=8080;

let controller:QuizController;

let current_question_index=0;



const server=createServer((req:IncomingMessage,res:ServerResponse):void=>{

    const {url,method}=req;

    if(url==='/' && method==='GET'){
        controller=QuizController.getQuizController();
        let html:string|undefined=controller.startQuiz();

        res
        .writeHead(200,"OK",{"content-type":"text/html",})
        .write(html);
        res.end();
        return;
    }else if(url==='/question' && method==='GET'){
        controller=QuizController.getQuizController();
        // console.log("yes");
        let html:string|undefined=controller.getNextQuestion(current_question_index);
        current_question_index++;
        // console.log(current_question_index);
        res
        .writeHead(200,"OK",{"content-type":"text/html",})
        .write(html);
        res.end();

        return;
    }else if(url==='/end' && method==='GET'){
        let html=controller.endQuiz();
        current_question_index=0;

        res.writeHead(200,"OK",{"content-type":'text/html'}).write(html);

        res.end();
        return;
    }
})


server.listen(PORT,()=>{
    console.log("Server is running");
})