window.onload = function(){

  let gameArr = [];
  let userArr = [];
  let userPlays = 0;
  let aiPlays = 0;
  let gamePlays = 0;
  let strict = false;
  let winnerPlayer = false;

  let textHandler;

  let userTurn = false;

  const maxMoves = 20;

  let btns = [
    red = {
      id : 0,
      color : 'red',
      soundPath : 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
    },
    blue = {
      id : 1,
      color : 'blue',
      soundPath : 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
    },
    yellow = {
      id : 2,
      color : 'yellow',
      soundPath : 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
    },
    green = {
      id : 3,
      color : 'green',
      soundPath : 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
    },
  ];

  document.getElementById('init').addEventListener('click', function(e){
    start();   
  });

  document.getElementById('Strict').addEventListener('change', function(e){
    strict = this.checked;   
  });

/*  CREATE BUTTONS   */

  createButtons = () => {
    for(let i = 0; i < btns.length; i++){

      let div = document.createElement('div');
      div.className = 'btnContainer';
      div.setAttribute("id", i);
      div.style.backgroundColor = btns[i].color;

      // on click
      div.addEventListener('click', function(e){

        // if is the user turn
        if(userTurn){

          e.preventDefault;
          // push the current button to the user sequence array
          userArr.push(i);  
          // animate this button
          animaBtn(i); 
          //check if the click is correct or not
          checkClick(userPlays);

        }
        
      }, false);

      document.getElementById('btnsColor').appendChild(div);
    }    
  }

  animaBtn = (i) => {

    document.getElementById(i).classList.remove('colorAnima');
    void document.getElementById(i).offsetWidth;
    document.getElementById(i).classList.add('colorAnima');

    var audio = new Audio(btns[i].soundPath);
    audio.play();

  }

  checkClick = (i) => {
    // i = userPlays
    let indexNum = i;
    // compare value of the current userPlay (index of the array)
    if(userArr[indexNum] === gameArr[indexNum]){ 
      // if we are at the end we have a winner
      if(userArr.length === gameArr.length){
        userTurn = false;
        winner();
      }else if(userPlays+1 < gamePlays){  //if the player havent reach the current game plays keep going
        userPlays++;
      }else if(userPlays+1 === gamePlays){  //else if player reach the last gamePlay call the AI
        // Stop user turn and call AI  
        setTimeout(function () {
          userTurn = false;
          addCount(); 
          aiMove();
        }, 500);
        
      }
    }else{
      loser();
      userTurn = false;
    }    
  } 

  createButtons();

  ////////////////

  start = () => {

    gameArr = [];

    randomNum = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    createSequence = () => {
      for(let i = 0; i < maxMoves; i++ ){
        let num;
        num = randomNum(0, btns.length);
        if(gameArr.length > 2){
          if(num === gameArr.length && num === gameArr.length-1){
            gameArr.push(randomNum(0, btns.length));
          }else{
            gameArr.push(num)
          }
        }else{
          gameArr.push(num);
        }
        
      }
    }

    createSequence();

    winnerPlayer = false;

    aiPlays = 0;
    gamePlays = 0;

    userPlays = 0;
    userArr = [];

    addCount(); 
    aiMove();

    document.getElementById('turns').innerHTML = '1';
  }  

  addCount = () => {
    gamePlays++;
    setTimeout(function () {
      document.getElementById('turns').innerHTML = gamePlays;
    }, 1000);
  }

  aiMove = () => {

    // timer speed by play count
    /*
    function timer(max, counter){
      time = ((gameArr.length-counter) * max)/gameArr.length;
      if(time < 200){
        return 200;
      }else{
        return time;
      }      
    }
    */

    function timer(max, min, currentPlay){
      let difference = max-min;
      let time = ((gameArr.length-currentPlay) * difference)/gameArr.length;
      if(time < min){
        return min;
      }else{
        return time;
      }      
    }

    let userReset = () => {
      userPlays = 0;
      userArr = [];
      userTurn = true; 
    }

    if(gamePlays == 1){
      animaBtn(gameArr[0]);
      userReset();

    }else{

      function timeout(counter) {

        if(counter < gamePlays){
          setTimeout(function () {
            animaBtn(gameArr[counter]);
            counter++;          
            if(counter == gamePlays){
              userReset();
            }
            timeout(counter);
          }, timer(1000, 400, gamePlays));
          
        };                 
      }
      timeout(0);
    }   
     
  }  

  winner = () => {

    winnerPlayer = true;

    let repeat = 5;

    function winnerAnima(counter) {
      if(counter <= repeat){
        setTimeout(function () {
          animaBtn(gameArr[gameArr.length-1]);
          counter++;          
          winnerAnima(counter);
        }, 200);        
      }         
    }

    info('**');  
    winnerAnima(0);
  }

  loser = () => {

    let repeat = btns.length-1;

    function errorSound(counter) {
      if(counter <= repeat){
        setTimeout(function () {
          var audio = new Audio(btns[counter].soundPath);
          audio.play();
          counter++;       
          errorSound(counter);
        }, 50);        
      }         
    }
    
    info('!!');
    errorSound(0); 

  }

  info = (infoText) => {

    let repeat = 6;
    let counter = 0;

    let text = document.getElementById('turns');
    text.innerHTML = infoText;

    textHandler = setInterval(function() {
        text.style.display = (text.style.display == 'none' ? '' : 'none');
        counter++;
        if(counter >= repeat){
          clearInterval(textHandler);
          repeatMode();          
        }
    }, 200);
  }

  repeatMode = () => {
    if(!winnerPlayer){

      if(!strict){
        setTimeout(function () {
          document.getElementById('turns').innerHTML = gamePlays;
        }, 800);
        aiMove();
      }else{
        start();
      }

    }
  }

}

/* TO DO */

// Work on the design