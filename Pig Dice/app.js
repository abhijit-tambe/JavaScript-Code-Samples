/*
GAME RULES:
- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game set the Final Score to desired points.

*/

var scores, roundScore, activePlayer,gamePlay;

init();



// anonymous function
document.querySelector('.btn-roll').addEventListener('click',function () {
    if(gamePlay){
    // random number
    var dice =Math.floor(Math.random()*6)+1;
    // display the  dice
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';

        dice>1?document.getElementById("current-"+activePlayer).textContent = roundScore += dice: newPlayer();
    }
});

function newPlayer() {
    roundScore=0;
    activePlayer ===1? activePlayer=0: activePlayer=1;
    document.querySelector(".dice").style.display = 'none';
    document.getElementById("current-0" ).textContent = '0';
    document.getElementById("current-1" ).textContent = '0';
    document.querySelector('.player-0-panel ').classList.toggle('active');
    document.querySelector('.player-1-panel ').classList.toggle('active');

}

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlay){
    scores[activePlayer] +=roundScore;
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        var  input =  document.querySelector('.inp-max').value;
        var max;
        console.log(input);
        if(input){max=input;}else max=100;
    if(scores[activePlayer]>=max){
        document.getElementById('name-'+activePlayer).textContent = 'WINNER!!!';
        document.querySelector(".dice").style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        gamePlay = false;
    }else{
        newPlayer();
    }

    }

});

function init(){
    gamePlay = true;
    scores  =[0,0];
    activePlayer=0;
    roundScore=0;
    document.querySelector(".dice").style.display = 'none';
    document.getElementById('score-0').textContent ='0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent ='0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-1-panel ').classList.remove('winner');
    document.querySelector('.player-0-panel ').classList.remove('winner');
    document.querySelector('.player-1-panel ').classList.remove('active');
    document.querySelector('.player-0-panel ').classList.remove('active');
    document.querySelector('.player-0-panel ').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click',init); // call back function



