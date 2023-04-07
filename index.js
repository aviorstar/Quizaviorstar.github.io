const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

//Рандомный порядок вопросов
// function shuffle(questions) {
// 	let j, temp;
// 	for (let i = questions.length - 1; i > 0; i--) {
// 		j = Math.floor(Math.random()*(i + 1));
// 		temp = questions[j];
// 		questions[j] = questions[i];
// 		questions[i] = temp;
// 	}
// 	return questions;
// };
// shuffle();

// Находим элементы
const headerContainer = document.querySelector ('#header');
const listContainer = document.querySelector ('#list');
const btnSubmit = document.querySelector ('#submit');


// Переменные игры

let score = 0; //кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

clearPage();
showQuestion();

btnSubmit.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
};

function showQuestion(){
	
	//Вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	//Варианты ответа
	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']){
		// for ([index, answerText] of questions[questionIndex]['answers'].entries()){

		const questionTemplate = 
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`
		
		let answerHTML = questionTemplate.replace('%answer%', answerText);
		answerHTML = answerHTML.replace('%number%', answerNumber);

		// const answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', answerNumber)

		listContainer.innerHTML = listContainer.innerHTML + answerHTML; //  или listContainer.innerHTML += answerHTML;
		answerNumber++;
	};

}

function checkAnswer(){
	
// Находим выбранную радио кнопку
	const checkRadio = listContainer.querySelector('input[type="radio"]:checked');
	console.log(checkRadio);

// Если ответ не выбран - ничего не делаем, выходим из функции
	if (!checkRadio){
		btnSubmit.blur();
		alert ('Вы не выбрали ответ.\nПожалуйста, выбирете один из предложенных вариантов')
		return;
	}
	
	const userAnswer = parseInt(checkRadio.value);


	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}
	console.log ('score = ', score);
	
	if (questionIndex !== questions.length - 1){
		// console.log ('Это Не последний вопрос');
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else{
		// console.log ('Это последний вопрос');
		clearPage();
		showResults();

	}
};

function showResults(){

	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
			
		`;
	let  title, message;
	

	//Варианты заголовков и текста
	if (score === questions.length){
		title = 'Поздравляем! 🎉';
		message = 'Вы ответили верно на все вопросы'
	} else if (score*100/questions.length >= 50){
		title = 'Неплохой результат! 😉';
		message = 'Вы дали более половины првильных ответов';
	} else {
		title = 'Стоит постараться! 😐';
		message = 'Пока у Вас меньше половины правильных ответов';
		document.getElementById('#imageResult').setAttribute('src', result_bad.jpg);
		
		// image.innerHTML = '<img src="result_bad.jpg" alt="image">';
	}

	//Результат
	let result = `${score} из ${questions.length}`;

	//Финальный ответ, подставляем данные в шаблон

	const finalMessage = resultsTemplate
								.replace('%title%', title)
								.replace('%message%', message)
								.replace('%result%', result)
	headerContainer.innerHTML = finalMessage;


	//Меняем кнопку на "Играть снова"
	btnSubmit.blur();
	btnSubmit.innerHTML = 'Начать заново';
	btnSubmit.onclick = ()=>{history.go()};
};