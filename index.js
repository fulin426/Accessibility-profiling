const STORE = [
	{question: 'Which one of the following is NOT tax-sheltered or tax-deferred?',
	answer: ['403(b) plan',
			'Taxable Brokerage Account',
			'401k' ,
			'Roth-IRA'],
	correct: 'Taxable Brokerage Account'},
	{question: 'What age does the IRS allow 401k withdraws without a 10% penalty?',
	answer: ['Age 59 1/2',
			'Age 62',
			'Age 65' ,
			'Age 70'],
	correct: 'Age 59 1/2'},
	{question: 'What does REIT stand for? ',
    answer: ['Rated Excellent Investment Track',
			'Random Energy Information Technology',
			'Real Excess In Temperature' ,
			'Real Estate Investment Trust'],
	correct: 'Real Estate Investment Trust'	},
	{question: 'Which one of these retirement plans requires after tax contributions?',
    answer: ['Roth 401(K)',
			'Roth IRA',
			'401(K)' ,
			'403(b)'],
	correct: 'Roth IRA'},
	{question: 'What is the difference between active and passive portfolio management?',
    answer: ['Index funds are constructed to track the market index',
			'Actively managed funds employ managers to manage the porfolio',
			'Index funds are passively managed' ,
			'All of the above'],
	correct: 'All of the above'},
	{question: 'Which investment offers the highest potential long term growth?',
    answer: ['Bonds',
			'High yield savings account',
			'Stocks' ,
			'Residential real estate'],
	correct: 'Stocks'},
	{question: 'At what age should you be focused on saving for retirement?',
    answer: ['20-30s',
			'30-40s',
			'40-50s' ,
			'Every age'],
	correct: 'Every age'},
	{question: 'How should you react to changes in market conditions?',
    answer: ['Allocate to a heavier bond location to prepare for bear markets',
			'Allocate to a heavier stock portion during bull markets',
			'Re-balance periodically based on your own risk tolerance',
			'None of the above'],
	correct: 'Re-balance periodically based on your own risk tolerance'},
	{question: 'Why should you include bonds in your investment portfolio?',
    answer: ['They help reduce volality',
			'They provide downside protection',
			'They provide a source of income through their yeilds' ,
			'All of the above'],
	correct: 'All of the above'},
	{question: 'If given a large sum of money to invest what is the best strategy?',
    answer: ['Wait for a pull back in the market',
			'Dollar cost average',
			'Keep it all in cash' ,
			'Invest the entire sum'],
	correct:'Invest the entire sum'}
]

const questionNumber = [0];
const score = [0];

//Start page elements
function startPageElements() {
	return `<div class="question-current">
        <p class="question-display">Test Your Personal Finance Knowledge</p>
      </div>
      <div class="container startpage">
        <button class="button-start" role="button">Let's Start!</button>
      </div>
    </div>
    <footer role="contentinfo">*Disclaimer: The information on this site is provided for discussion purposes only, and should not be misconstrued as investment advice.</footer>`;
}

//Generate Start Page
function generateStartPage() {
	let startPage = startPageElements();
	$('.question-form').html(startPage);
}

// Generate the html for question
function generateQuestionElement(item) {
	return`		
	<div class="question-current">
			<legend class="question-display">${item[questionNumber].question}</legend>
		</div>
		<div class="container">
		<label class="answers">
			<input type="radio" for="answer-1" aria-labelledby="answer" value="${item[questionNumber].answer[0]}"required/>
			<span>${item[questionNumber].answer[0]}</span>
		</label>
		<label class="answers">
		    <input type="radio" for="answer-2" aria-labelledby="answer" value="${item[questionNumber].answer[1]}">
		    <span>${item[questionNumber].answer[1]}</span>
		</label>
		<label class="answers">
		    <input type="radio" for="answer-3" aria-labelledby="answer" value="${item[questionNumber].answer[2]}">
		    <span>${item[questionNumber].answer[2]}</span>
		</label>
		<label class="answers">
		    <input type="radio" for="answer-4" aria-labelledby="answer" value="${item[questionNumber].answer[3]}">
		    <span>${item[questionNumber].answer[3]}</span>
		</label>
		<div class="button-holder">
			<button type="submit" class="button-submit" role="button">Submit</button>
		</div>
		<div class="question-score">
			<p>Question: <span class="queston-number">${questionNumber[0] + 1}</span>/10</p>
			<p>Current Score: <span class="current-score">${score}</span>/10</p>
		</div>	
	</div>`;
}

//Renders the list of questions
//Insert the generated html into the DOM
function renderQuestion() {
	const questionElements = generateQuestionElement(STORE);
	$('.question-form').html(questionElements);
}

//Start page button click, remove Start page items and generates questions
function quizStart() {
  $(".button-start").on('click', function() {
		//$('.container-startpage').remove();
		renderQuestion();
	});
}

//Counter for the current number of questions
function counterQuestion() {
	return questionNumber[0] ++;
}

//Counter for current score
function counterScore() {
	return score[0] ++;
}

//Generate correct answer html 
function generateCorrect(item) {
	return `<div class="question-current"></div>	
	<div class="container feedback">
		<div class="result-wrapper">
		  <div class="result">
			  <p>You Are Correct!</p>
		  </div>
		  <div class="button-holder">
			  <button class="button-next" role="button">Next</button>
		  </div>
		</div>
	</div> `;
}

//Generate incorrect answer page html 
function generateIncorrect(item) {
	return `<div class="question-current"></div>
	<div class="container feedback">
		<div class="result-wrapper">
		  <div class="result">
		  	<p>Sorry Incorrect!</p>
		  	<p>The correct answer is <span class="correct-answer">${item[questionNumber].correct}</span></p>
	  	</div>
	  	<div class="button-holder">
		  	<button class="button-next" role="button">Next</button>
		  </div>
		</div>
	</div>`;
}
//Generate results page html 
function generateResults() {
	return `<div class="question-current"></div>
	<div class="container feedback">
		<div class="result-wrapper">
		  <div class="result">
			  <p>Your final score is <span class="current-score">${score}</span>/10 Correct</p>
		  </div>
		  <div class="button-holder">
			  <button class="button-restart" role="button">Restart Quiz</button>
		  </div>
		</div>  
	</div>`;
}

//Submit answer with mouse
function submitAnswer() {
	$('form').on('submit', function(event) {
		event.preventDefault();
		//Get value from selected radio button
		let selected = $('input:checked').val();
		//Evaluates if the answer is correct or not and displays feedback page
		if ( selected === STORE[questionNumber].correct) {
			//If correct add 1 to current score
			counterScore();
			let correctAnswerPage = generateCorrect(STORE);
			//Insert correct feedback page into DOM
			$('.question-form').html(correctAnswerPage);
		} else{
			//Insert incorrect feedback page into DOM
			let incorrectAnswerPage = generateIncorrect(STORE);
			$('.question-form').html(incorrectAnswerPage);
		}
	});
}

//Takes user to next question
function nextQuestion() {
  $('form').on('click', '.button-next', function() {
  	counterQuestion();
  	//After 10 questions get direct user to result page
	if (questionNumber[0] === 10) {
		resultsPage = generateResults();
		//Insert results feedback page into DOM
		$('.question-form').html(resultsPage);
	} else {
  		renderQuestion();
  		}
  });
}

//Restarts the quiz
function restartQuiz() {
  $('.question-form').on('click','.button-restart', function() {
    //Reload from current url, will reset counters to 0
    location.reload();
  });
}

//Effects for general buttons
function buttonEffects() {
	$('.question-form').on('mouseenter', 'button', function() {
		$(this).css({background: '#dc5e4d'});
	});
	$('.question-form').on('mouseleave', 'button', function() {
		$(this).css({background: '#ad3d2e'});
	});
}

//Effects for answers
function answerButtonEffects() {  
  $('.question-form').on('mouseenter', '.answers', function() {
    $(this).fadeTo(80, 0.8);
  });
  $('.question-form').on('mouseleave', '.answers', function() {
    $(this).fadeTo(120, 1.0);
  })
}

/*This will be our initial callback when the page loads.
It will handle loading the start page, generating the questions,
keeping score, display feedback/results, and loading effects*/
function beginQuizApp() {
  generateStartPage();
  quizStart();
  nextQuestion();
  submitAnswer();
  restartQuiz();
  buttonEffects();
  answerButtonEffects();
}

// when the page loads, call 'beginQuizApp'
$(beginQuizApp);



















