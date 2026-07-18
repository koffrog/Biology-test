const questions = [
{
question: "Жасушаның негізгі құрылымдық және қызметтік бірлігі?",
answers: [
"Ұлпа",
"Жасуша",
"Мүше",
"Жүйе"
],
correct: 1,
explanation: "Жасуша – тірі ағзалардың құрылымдық және қызметтік бірлігі."
},

{
question: "Адамда қанша хромосома бар?",
answers: [
"23",
"44",
"46",
"48"
],
correct: 2,
explanation: "Адамның дене жасушаларында 46 хромосома болады."
},

{
question: "АТФ қай органоидта түзіледі?",
answers: [
"Рибосома",
"Ядро",
"Митохондрия",
"Лизосома"
],
correct: 2,
explanation: "АТФ негізінен митохондрияда синтезделеді."
},

{
question: "Фотосинтез қай органоидта жүреді?",
answers: [
"Митохондрия",
"Хлоропласт",
"Ядро",
"Лизосома"
],
correct: 1,
explanation: "Фотосинтез хлоропластта жүреді."
},

{
question: "ДНҚ қай жерде орналасады?",
answers: [
"Ядро",
"Рибосома",
"Гольджи аппараты",
"Вакуоль"
],
correct: 0,
explanation: "Эукариот жасушасында ДНҚ негізінен ядроның ішінде орналасады."
}
];

let current = 0;
let score = 0;

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");

function loadQuestion(){

result.innerHTML="";
nextBtn.style.display="none";

question.innerHTML=(current+1)+". "+questions[current].question;

answers.innerHTML="";

questions[current].answers.forEach((text,index)=>{

const btn=document.createElement("button");

btn.className="answer";

btn.innerHTML=text;

btn.onclick=()=>checkAnswer(index);

answers.appendChild(btn);

});

}

function checkAnswer(index){

const buttons=document.querySelectorAll(".answer");

buttons.forEach(btn=>btn.disabled=true);

if(index===questions[current].correct){

buttons[index].classList.add("correct");

score++;

result.innerHTML="✅ Дұрыс!<br>"+questions[current].explanation;

}else{

buttons[index].classList.add("wrong");

buttons[questions[current].correct].classList.add("correct");

result.innerHTML="❌ Қате!<br>"+questions[current].explanation;

}

nextBtn.style.display="block";

}

nextBtn.onclick=()=>{

current++;

if(current<questions.length){

loadQuestion();

}else{

document.querySelector(".card").innerHTML=`
<h2>Тест аяқталды!</h2>
<h3>${score} / ${questions.length}</h3>
<button onclick="location.reload()">Қайта бастау</button>
`;

}

}

loadQuestion();
