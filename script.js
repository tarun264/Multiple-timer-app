const cardList = document.getElementById("Main_section");
const noCardsText = document.getElementById("no_card_container");

const inputHours = document.getElementById("hours");
const inputMinutes = document.getElementById("minutes");
const inputSeconds = document.getElementById("seconds");

const audioClip = document.createElement('audio');
audioClip.src = 'alarm-clock-short-6402.mp3';

const setTimerBtn = document.getElementById("setTimerButton");
setTimerBtn.addEventListener("click", getData);

const tObj = { hours: 0, minutes: 0, seconds: 0 };
// get data in number data type from the input fields
function getData() {
  // const tObj = { hours: 0, minutes: 0, seconds: 0};
  let inHour = parseInt(inputHours.value);
  let inMin = parseInt(inputMinutes.value);
  let inSec = parseInt(inputSeconds.value);
  if (inHour < 0) {
    alert("Input hours value is invalid enter positive integers only");
    inputHours.value = "";
    return;
  } else {
    tObj.hours = inputHours.value == 0 ? 0 : inHour;
  }

  if (inMin < 0 || inMin > 60) {
    alert(
      "Minutes value inputed is invalid. Enter positive integers or value under 60 only"
    );
    inputMinutes.value = "";
    return;
  } else {
    tObj.minutes = inputMinutes.value == 0 ? 0 : inMin;
  }

  if (inSec < 0 || inSec > 60) {
    alert(
      "Seconds value inputed is invalid. Enter positive integers or value under 60 only"
    );
    inputSeconds.value = "";
    return;
  } else {
    tObj.seconds = inputSeconds.value == 0 ? 0 : inSec;
  }

  if (tObj.hours + tObj.minutes + tObj.seconds > 0) {
    let timeObj = {...tObj};
    createNewTimer(timeObj);
    inputHours.value = "";
    inputMinutes.value = "";
    inputSeconds.value = "";
  } else {
    alert("Add more then 0 secs to set a timer");
    return;
  }
}

function createNewTimer(timeObj) {
    const card = document.createElement('div');
    card.className = "TimerCard";

    const para = document.createElement('p');
    para.innerText = "Time Left : ";
    card.appendChild(para);

    const timerDisplay = document.createElement('h1');
    card.appendChild(timerDisplay);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener('click', handleCardDelete);

    const stopBtn = document.createElement('button');
    stopBtn.innerText = 'stop';
    stopBtn.addEventListener('click', ()=>{
      clearInterval(interval);
      setTimeout(()=>{
        card.replaceChild(deleteBtn, stopBtn);
        
      },1000);
    });
    card.appendChild(stopBtn);
    cardList.appendChild(card);

    let TimeInMiliSeconds = (timeObj.hours*3600 + timeObj.minutes*60 + timeObj.seconds)*1000;
    // console.log(TimeInMiliSeconds);
    UpdateTimerTextDisplay();

    const interval = setInterval(()=>{
      TimeInMiliSeconds = TimeInMiliSeconds - 1000;
      if(TimeInMiliSeconds <= 0){
        // we have reached timer end
        clearInterval(interval);
        card.replaceChild(deleteBtn, stopBtn);
        card.className = 'TimerCardCompleted';
        para.innerText = '';
        timerDisplay.innerText = ' Timer is Up ! ';
        playAudiAlert();
      } else {
        UpdateTimerTextDisplay();
      }
    }, 1000);

    function UpdateTimerTextDisplay(){
      const dispHours = parseInt(TimeInMiliSeconds/3600000);
      const dispMinutes = parseInt((TimeInMiliSeconds%3600000)/60000);
      const dispSeconds = parseInt((TimeInMiliSeconds%60000) / 1000);
      timerDisplay.innerText = `${formatTime(dispHours)} : ${formatTime(dispMinutes)} : ${formatTime(dispSeconds)}`;
    }

    function  formatTime(timeValue){
      return (timeValue < 10) ? `0${timeValue}` : timeValue;
    }
}



// if all card are deleted show msg "there are no cards currently"
function CheckForNoCard() {
  if (cardList.children.length <= 2) {
    noCardsText.classList.add("show");
  }
}
// CheckForNoCard();

//handel delete card
function handleCardDelete(event) {
  pauseAudioAlert();
  let currentCard = event.target.parentNode;
  currentCard.remove();
  CheckForNoCard();
}

function playAudiAlert(){
  audioClip.play();
}

function pauseAudioAlert(){
  audioClip.pause();
}