/*
 * Create a list that holds all of your cards
 */
 let cardElements = document.querySelectorAll('.card');
 let openCardsList = [];
 let openedCardList = [];
 let restart = document.querySelector('.restart');
 let moves = document.querySelector('.moves');
 let timer = document.querySelector('.timer');
 let timerCount = 60;
 let timerFun
 let stars = document.querySelectorAll('.fa-star')
 let localStarsInitial = document.querySelectorAll('.fa-star');
 const mainHeading = document.querySelector('.stars');
 


 //stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order

function shuffle(){

	var ul = document.querySelector('.deck');
	for (var i = ul.children.length; i >= 0; i--) {
	    ul.appendChild(ul.children[Math.random() * i | 0]);
    }

 }

for (let cardElement of cardElements) {
          
    

    cardElement.addEventListener('click', function(event){
    	if (!cardElement.classList.contains('open') && !cardElement.classList.contains('show') && !cardElement.classList.contains('match')){
    			showCard(cardElement);
    	}

    	
    });

}
// show card and and increase elements
function showCard(cardElement) {
	moves.innerHTML++;
	cardElement.classList.add("show", "open");
	openCards(cardElement);
}

//keep track of all open card

function openCards(cardElement) {
	
	if (openCardsList.length == 1){

		openCardsList.push(cardElement);

		console.log(openCardsList[0].innerHTML+openCardsList[1].innerHTML);

		if (openCardsList[0].innerHTML == openCardsList[1].innerHTML){
			openedCards();
			openCardsList = [];
			console.log(openCardsList);
		}

		else {
			setTimeout(wrongPick, 100);
	   }
		
	}
	else {
		openCardsList.push(cardElement);//1,2
	}
	console.log(openCardsList);
}

// keep track of matched cards
function openedCards(){
	
	for (const [index,value] of openCardsList.entries()){
		value.classList.add("match");
		openedCardList.push(value);
	}
	console.log(openedCardList);
	if (openedCardList.length == 16){
		winMessage();
		clearInterval(timerFun);
		openedCardList = [];
		
	}
	
}

// in case two cards are not matched

function wrongPick(){

	for (const [index,value] of openCardsList.entries()){
			console.log("inside the loop");
			value.classList.remove("show","open","match");
		 }

		 openCardsList = [];

}

restart.addEventListener('click', function(event){
    	initial();


    });


//inital game plan

function initial(){
	shuffle();
	moves.innerHTML=0;
	setTimer();
	for (let cardElement of cardElements) {
    	cardElement.classList.remove("show","open","match");
    }
    timerCount = 60;

    localStarsInitial = document.querySelectorAll('.fa-star');

    if (localStarsInitial.length == 2){

    mainHeading.appendChild(stars[0]);
    mainHeading.appendChild(stars[1]);
}

 else {
 	mainHeading.appendChild(stars[0]);

 }
}

// 1 second timer decresse
function setTimer() {
    timerFun = setInterval(function(){
	timerCount--;
	timer.innerHTML=" "+timerCount;
	console.log(timerCount);
	if (timerCount == 0){
		clearInterval(timerFun);
		swal("OPS", "You lost sorry:(", "warning");
	}

},1000);
}

function clearTime(){
	clearinterval(timerFun);
}

// for stars

function starts(){
	if (moves.innerHTML <= 35){
		//do nothing perfiect!!
	}
	 else if (moves.innerHTML >= 35 && moves.innerHTML <= 50 ){
		stars[0].remove();

	}
	else {
		stars[0].remove();
		stars[1].remove();
	}
			
}
//Star rating
//Time taken to win the game
//Play again button

function winMessage(){
 starts();

let localStars = document.querySelectorAll('.fa-star')
  Swal.fire({
  title: "your time is "+ timerCount + " seconds",
  //text: "time is "+ timerCount + " seconds",
  type: 'success',
  html: localStars,
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'restart'
}).then((result) => {
  if (result.value) {
    initial();
  }
})


}

initial();




