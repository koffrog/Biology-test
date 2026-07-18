let current = 0;
let score = 0;

let testQuestions = [];

let mistakes = JSON.parse(localStorage.getItem("mistakes")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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




// НАЧАТЬ ТЕСТ

function startTest(){

    testQuestions = [...questions];

    // перемешивание вопросов
    testQuestions.sort(() => Math.random() - 0.5);


    current = 0;
    score = 0;


    document.getElementById("menu")
    .classList.add("hidden");


    document.getElementById("settings")
    .classList.add("hidden");


    result.classList.add("hidden");

    test.classList.remove("hidden");


    loadQuestion();

}




// ЗАГРУЗКА ВОПРОСА

function loadQuestion(){

    answered = false;

    nextBtn.style.display="none";

    explanation.innerHTML="";


    let q = testQuestions[current];


    question.innerHTML =
    `${current+1}. ${q.question}`;


    progress.innerHTML =
    `${current+1}/${testQuestions.length}`;


    scoreText.innerHTML =
    `Дұрыс: ${score}`;


    answers.innerHTML="";



    q.answers.forEach((answer,index)=>{


        let btn=document.createElement("button");


        btn.className="answer";


        btn.innerHTML=answer;


        btn.onclick=function(){

            checkAnswer(index);

        };


        answers.appendChild(btn);


    });



    let star=document.createElement("button");

    star.innerHTML="⭐";

    star.className="favorite";


    star.onclick=function(){

        addFavorite(q);

    };


    answers.appendChild(star);


}





// ПРОВЕРКА ОТВЕТА

function checkAnswer(index){


    if(answered) return;


    answered=true;


    let q=testQuestions[current];


    let buttons=document.querySelectorAll(".answer");


    buttons.forEach(btn=>{

        btn.disabled=true;

    });



    if(index===q.correct){


        score++;


        buttons[index].style.background="#8bc34a";


        explanation.innerHTML=
        "✅ Дұрыс жауап!";


    }


    else{


        buttons[index].style.background="#ff6b6b";


        buttons[q.correct].style.background="#8bc34a";


        explanation.innerHTML=
        "❌ Қате! Дұрыс жауап: "
        + q.answers[q.correct];


        saveMistake(q);


    }


    scoreText.innerHTML=
    `Дұрыс: ${score}`;


    nextBtn.style.display="block";


}





// СЛЕДУЮЩИЙ ВОПРОС

function nextQuestion(){


    current++;


    if(current < testQuestions.length){

        loadQuestion();

    }

    else{

        finishTest();

    }

}





// РЕЗУЛЬТАТ

function finishTest(){


    test.classList.add("hidden");


    result.classList.remove("hidden");


    let percent =
    Math.round(
        score / testQuestions.length * 100
    );


    resultText.innerHTML=

    `
    Барлық сұрақ: ${testQuestions.length}<br><br>

    ✅ Дұрыс жауап: ${score}<br>

    ❌ Қате жауап: ${testQuestions.length-score}<br><br>

    📊 Нәтиже: ${percent}%

    `;


}




// СОХРАНЕНИЕ ОШИБОК

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





// ПОКАЗАТЬ ОШИБКИ

function showErrors(){


    alert(
    "Қате сұрақтар саны: "
    + mistakes.length
    );


}




// ДОБАВИТЬ В ИЗБРАННОЕ

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


        alert("⭐ Сұрақ сақталды");


    }


}




// ПОКАЗАТЬ ИЗБРАННОЕ

function showFavorites(){


    alert(
    "⭐ Таңдаулы сұрақтар: "
    + favorites.length
    );


}
