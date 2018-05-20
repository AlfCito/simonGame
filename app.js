window.onload = function(){

  let aiArr = [];
  let userArr = [];
  let counter = 0;

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

  ////////////////

  randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  createSequence = () => {
    for(let i = 0; i < maxMoves; i++ ){
      aiArr.push(randomNum(0, btns.length));
    }
  }

  createSequence();

  ////////////////

  createButtons = () => {
    for(let i = 0; i < btns.length; i++){

      let div = document.createElement('div');
      div.className = 'btnContainer';
      div.setAttribute("id", i);
      div.style.backgroundColor = btns[i].color;

      div.addEventListener('click', function(e){
        e.preventDefault;
        animaBtn(i);
        counter++;
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

    checkClick(i);

  }

  createButtons();

  
  ////////////////

  start = () => {
    console.log('aiArr');    
    console.log(aiArr);    
  }

  checkClick = (i) => {
    userArr.push(i)
    if(userArr[counter] === aiArr[counter]){
      console.log('iguales');
    }else{
      console.log('error');
    }
    console.log('userArr');
    console.log(userArr);
  } 
  

  start();




}