let current = 0;
let score = 0;

let mistakes = JSON.parse(localStorage.getItem("mistakes")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let testQuestions = [];
let answered = false;


const question = document.getElementById("question");
const answers = document.getElementById("answers");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const scoreText = document.getElementById("score");

const explanation = document.getElementById("explanation");

const test = document.getElementById("test");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");



// Тест бастау
function startTest(){

    let topic = document.getElementById("topic").value;


    if(topic === "all"){
        testQuestions = [...questions];
    }

    else{
        testQuestions = questions.filter(q => q.topic === topic);
    }


    // случайный порядок
    testQuestions.sort(() => Math.random() - 0.5);


    current = 0;
    score = 0;


    document.querySelector(".menu").style.display="none";
    document.querySelector(".settings").style.display="none";

    result.classList.add("hidden");
    test.classList.remove("hidden");


    loadQuestion();
}



// загрузка вопроса

function loadQuestion(){

    answered = false;

    explanation.innerHTML = "";

    nextBtn.style.display="none";


    let q = testQuestions[current];


    question.innerHTML =
    (current + 1) + ". " + q.question;


    progress.innerHTML =
    `${current + 1}/${testQuestions.length}`;


    scoreText.innerHTML =
    `Дұрыс: ${score}`;



    answers.innerHTML="";


    q.answers.forEach((answer,index)=>{


        let button=document.createElement("button");

        button.className="answer";

        button.innerHTML=answer;


        button.onclick=()=>checkAnswer(index);


        answers.appendChild(button);

    });



    // избранное

    let fav=document.createElement("button");

    fav.innerHTML="⭐";

    fav.className="favorite";


    fav.onclick=()=>addFavorite(q);


    answers.appendChild(fav);

}



// проверка ответа

function checkAnswer(index){

    if(answered) return;

    answered=true;


    let q=testQuestions[current];


    let buttons=document.querySelectorAll(".answer");


    buttons.forEach(btn=>{
        btn.disabled=true;
    });



    if(index === q.correct){

        score++;

        buttons[index].style.background="#8bc34a";


        explanation.innerHTML =
        "✅ Дұрыс жауап!";


    }

    else{

        buttons[index].style.background="#ff6b6b";


        buttons[q.correct].style.background="#8bc34a";


        explanation.innerHTML =
        "❌ Қате жауап.<br>" +
        "Дұрыс жауап: " +
        q.answers[q.correct];


        saveMistake(q);

    }


    scoreText.innerHTML =
    `Дұрыс: ${score}`;


    nextBtn.style.display="block";


}




// следующий вопрос

function nextQuestion(){


    current++;


    if(current < testQuestions.length){

        loadQuestion();

    }

    else{

        finishTest();

    }

}




// результат

function finishTest(){


    test.classList.add("hidden");

    result.classList.remove("hidden");


    let percent =
    Math.round(
        score / testQuestions.length * 100
    );


    resultText.innerHTML =
    `
    Сенің нәтижең:<br><br>

    ✅ Дұрыс: ${score}<br>

    ❌ Қате: ${testQuestions.length-score}<br>

    📊 Процент: ${percent}%

    `;


}



// ошибки

function saveMistake(q){

    let exists =
    mistakes.some(
        item=>item.question===q.question
    );


    if(!exists){

        mistakes.push(q);

        localStorage.setItem(
            "mistakes",
            JSON.stringify(mistakes)
        );

    }

}




function showErrors(){

    alert(
    "Қате сұрақтар саны: "
    + mistakes.length
    );

}




// избранное

function addFavorite(q){

    let exists =
    favorites.some(
        item=>item.question===q.question
    );


    if(!exists){

        favorites.push(q);


        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );


        alert("⭐ Таңдаулыларға қосылды");

    }

}
