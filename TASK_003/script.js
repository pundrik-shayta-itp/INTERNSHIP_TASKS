const questions=[
    {
        question:"What is the time complexity of binary search algorithm in a sorted array?",
        options:["O(n)","O(log n)","O(n log n)","O(1)"],
        answer:1
    },
    {
        question:"What data structure you use to implement LRU cache?",
        options:["Array","Linked List","HashMap + Doubly Linked List","Stack"],
        answer:2
    },
    {
        question:"What is the time complexity of finding LCA in a Tree of q queries ?",
        options:["O(n)","O(log n)","O(n log n)","O(1)"],
        answer:2
    },
    {
        question:"Which algorithm is used to check whether an undirected graph able to visit each edge exactly once and return to starting point?",
        options:["Dijkstra's Algorithm","Eulerian Path Algorithm","Kruskal's Algorithm","Prim's Algorithm"],
        answer:1
    },
    {
        question:"What is the time complexity of inserting an element in a max-heap?",
        options:["O(n)","O(log n)","O(n log n)","O(1)"],
        answer:1
    },
    {
        question:"Which of the following sorting algorithms is not stable?",
        options:["Bubble Sort","Merge Sort","Quick Sort","Insertion Sort"],
        answer:2
    },
    {
        question:"What is the time complexity of finding the shortest path in a graph with negative weights but no negative cycles?",
        options:["O(V + E)","O(E log V)","O(V^2)","O(V^3)"],
        answer:0
    },
    {
        question:"Which data structure is used in breadth-first search (BFS) algorithm?",
        options:["Stack","Queue","Priority Queue","HashMap"],
        answer:1
    },
    {
        question:"What is the time complexity of accessing an element in a hash table?",
        options:["O(n)","O(log n)","O(1)","O(n log n)"],
        answer:2
    },
    {
        question:"What is the worst-case time complexity of accessing an element in a hash table?",
        options:["O(1)","O(n)","O(log n)","O(n log n)"],
        answer:1
    }
]

const btns_element=document.querySelector(".answer-buttons");
const start_btn_element=document.querySelector("#btn-start");
const question_container_element=document.querySelector(".question-container");
const intro_element=document.querySelector(".intro");
const container_1_element=document.querySelector(".container-1");
const contestant_name_input_element=document.getElementById("input-name");
const contestant_details_element=document.querySelector(".contestant-details");
const contestant_name_element=document.querySelector(".contestant-name");
const contestant_score_element=document.querySelector(".contestant-score");
const question_status_element=document.querySelector(".question-status");
const confirm_btn_element=document.querySelector(".btn-confirm");
const next_btn_element=document.querySelector(".btn-next");
const question_element=document.querySelector(".question");
const option_1_element=document.getElementById("option-1");
const option_2_element=document.getElementById("option-2");
const option_3_element=document.getElementById("option-3");
const option_4_element=document.getElementById("option-4");

const question_statuses=["Unanswered","Correct","Incorrect"];


let contestant_name="";
let score=0;
let question_status_text="Unanswered";
let current_question_index=0;
let current_correct_answer=0;
let current_answer_choice=-1;


start_btn_element.addEventListener("click",()=>{
    contestant_name=contestant_name_input_element.value;
    if(contestant_name!=""){
        contestant_name=contestant_name_input_element.value;
        current_correct_answer=questions[0].answer;
        question_element.innerHTML=`Q.${current_question_index+1} : ${questions[current_question_index].question}`;
        option_1_element.innerHTML=questions[current_question_index].options[0];
        option_2_element.innerHTML=questions[current_question_index].options[1];
        option_3_element.innerHTML=questions[current_question_index].options[2];
        option_4_element.innerHTML=questions[current_question_index].options[3];  
        contestant_name_element.innerHTML=`Contestant: ${contestant_name}`;
        contestant_score_element.innerHTML=`Score : ${score}`;
        question_status_element.innerHTML=`Status:  ${question_status_text}`;
        question_container_element.classList.remove("hidden");
        intro_element.classList.add("hidden");
        container_1_element.classList.add("hidden");
        contestant_details_element.classList.remove("hidden");
    }else{
        alert("Please enter your name to start the quiz.");
    }

})


btns_element.addEventListener("click",function(e){
    if(e.target && e.target.classList.contains("btn-answer")){
        current_answer_choice=parseInt(e.target.value);
    }
});

confirm_btn_element.addEventListener("click",(e)=>{
    if(current_answer_choice==-1){

    }else{
        if(current_answer_choice==current_correct_answer){
            score+=1;
            question_status_text=question_statuses[1];
            contestant_score_element.innerHTML=`Score : ${score}`;
            question_status_element.innerHTML=`Status:  ${question_status_text}`;
        }else{
            question_status_text=question_statuses[2];
            question_status_element.innerHTML=`Status:  ${question_status_text}`;
        }
    }

    confirm_btn_element.classList.add("hidden");
})

next_btn_element.addEventListener("click",(e)=>{
    current_answer_choice=-1;
    current_question_index+=1;
    if(current_question_index<questions.length){
        question_status_text=question_statuses[0];
        contestant_name_element.innerHTML=`Contestant: ${contestant_name}`;
        contestant_score_element.innerHTML=`Score : ${score}`;
        question_status_element.innerHTML=`Status:  ${question_status_text}`;
        question_element.innerHTML=`Q.${current_question_index+1} : ${questions[current_question_index].question}`;
        option_1_element.innerHTML=questions[current_question_index].options[0];
        option_2_element.innerHTML=questions[current_question_index].options[1];
        option_3_element.innerHTML=questions[current_question_index].options[2];
        option_4_element.innerHTML=questions[current_question_index].options[3]; 
        current_correct_answer=questions[current_question_index].answer;
        confirm_btn_element.classList.remove("hidden");
    }else{
        alert(`Quiz Completed! ${contestant_name} final score is ${score} out of ${questions.length}.`);
        location.reload();
    }
})