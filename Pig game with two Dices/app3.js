/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 in any of the dices, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game or set the Final Score to desired points.
*/




var scores, roundScore, activePlayer,gamePlay, lastdice;

init();

// anonymous function
document.querySelector('.btn-roll').addEventListener('click',function () {
    if(gamePlay){
        // random number
        var dice =Math.floor(Math.random()*6)+1;   //dice one
        var dice1 = Math.floor(Math.random()*6)+1; // dice two

        // display the  dice
        var diceDOM = document.getElementById("dice-1");
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice+'.png';

        var dice1DOM = document.getElementById("dice-2");
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-'+dice1+'.png';

        // (dice>1&&dice1>1)?document.getElementById("current-"+activePlayer).textContent = roundScore += (dice+dice1): newPlayer();
        if(dice>1&&dice1>1){
                document.getElementById("current-"+activePlayer).textContent = roundScore += (dice+dice1);
        }else{
            newPlayer()
        }

    }
});

function hideDice() {
    document.getElementById("dice-1").style.display = 'none';
    document.getElementById("dice-2").style.display = 'none';
}

function newPlayer() {
    roundScore=0;
    activePlayer ===1? activePlayer=0: activePlayer=1;
    //hideDice();
    document.getElementById("current-0" ).textContent = '0';
    document.getElementById("current-1" ).textContent = '0';

    document.querySelector('.player-0-panel ').classList.toggle('active');
    document.querySelector('.player-1-panel ').classList.toggle('active');

}

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlay){
        scores[activePlayer] +=roundScore;
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        var  input =  document.getElementById('t1').value;
        var max;
        console.log(input);
        if(input){max=input;}else max=100;
        if(scores[activePlayer]>=max){
            document.getElementById('name-'+activePlayer).textContent = 'WINNER!!!';
            hideDice();
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            gamePlay = false;
        }else{
            newPlayer();
        }

    }

});

function init(){

    lastdice=0;
    gamePlay = true;
    scores  =[0,0];
    activePlayer=0;
    roundScore=0;
    hideDice();
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
