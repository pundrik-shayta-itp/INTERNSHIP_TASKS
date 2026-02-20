import {type QuestionType,type QuestionArrayType } from "../types/questions.type.ts";
import QuestionProvider from "../models/question.model.ts";
import EtaLoader from "../utils/eta.loader.ts";

export default class QuizController{
    static QuizController:QuizController|null=null;
    static EtaLoader:EtaLoader=EtaLoader.getEtaLoader();
    QuestionProvider:QuestionProvider|null=null;

    private constructor(){
        this.QuestionProvider=QuestionProvider.getInstance();
    }

    static getQuizController(){
        if(QuizController.QuizController) return QuizController.QuizController;

        QuizController.QuizController=new QuizController();
        return QuizController.QuizController;
    }

    startQuiz():string | undefined{
        let html=QuizController.EtaLoader.eta?.render('index',{
            route:'/',
        })

        return html;
    }

    getNextQuestion(current_question_index:number){
        if(current_question_index===10) return this.endQuiz();
        let question:QuestionType=this.QuestionProvider?.getQuestion(current_question_index)!;
        let html=QuizController.EtaLoader.eta?.render('index',{
            route:'/question',
            question:question.question,
            options:question.options,
            answer:question.answer,
            question_index:current_question_index,
        })
        return html;
    }

    endQuiz(){
        let html=QuizController.EtaLoader.eta?.render('index',{
            route:"/end",
            answer:1,
            question_index:10,
        })
        return html;
    }
}