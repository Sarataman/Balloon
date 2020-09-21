let colors = ['yellow', 'red', 'blue', 'violet', 'green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total =  100;
let currentBalloon = 0;
let endGame = false;
let totalShadow = document.querySelector('.total-shadow')

function createBalloon() {
	let div = document.createElement('div');
	let rand = Math.floor(Math.random()*colors.length);
	div.className = 'balloon balloon-'+colors[rand];

	rand = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = rand + 'px';
    div.dataset.number = currentBalloon;
    currentBalloon++;

	body.appendChild(div);
	animateBalloon(div);
}

function animateBalloon(elem){
	let pos = 0;
	let random = Math.floor(Math.random() * 6 - 3);
	let interval = setInterval(frame, 10 - Math.floor(num/10) + random);

	function frame(){
        if(pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)) {
            clearInterval(interval);
			endGame = true;
		} else{
			pos++;
			elem.style.top = windowHeight - pos + 'px';
		}
	}
}

function deleteBalloon(elem) {
    elem.remove();
    num++;
    updateScore();
    popBalloonSound();
}

function popBalloonSound() {
    let audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
}

function updateScore() {
    for(let i = 0; i < scores.length; i++) {
        scores[i].textContent = num;
    }
}

function startGame() {
    newGame();
    let timeout = 0;
    let loop = setInterval(function() {
        timeout = Math.floor(Math.random() * 600 - 100)
        if(!endGame && num !== total) {
            createBalloon();
        }else if(num !== total){
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display = 'block';
        }else {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block';
        }
    }, 800 + timeout)
}

function newGame() {
    let removal = document.querySelectorAll('.balloon');
    for(let i = 0; i < removal.length; i++) {
        removal[i].remove();
    }
    endGame = false;
    num = 0;
    updateScore();
}

document,addEventListener('click', function(e) {
    if(e.target.classList.contains('balloon')){
        deleteBalloon(e.target);
    }
})

document.querySelector('.restart').addEventListener('click', function() {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
})

document.querySelector('.cancel').addEventListener('click', function() {
    totalShadow.style.display = 'none'
})

startGame()
