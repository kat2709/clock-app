// background images
const imgArr = [
  "./assets/img/bg.jpg",
  "./assets/img/bg1.jpg",
  "./assets/img/bg2.jpg",
  "./assets/img/bg3.jpg",
  "./assets/img/bg4.jpg",
  "./assets/img/bg5.jpg",
  "./assets/img/bg6.jpg",
];
let count = 0;
const nextImgBtn = document.querySelector(".slide-next");
const prevImgBtn = document.querySelector(".slide-prev");

nextImgBtn.addEventListener("click", () => {
  if (count >= imgArr.length - 1) {
    count = 0;
  } else {
    count++;
  }
  console.log(count, imgArr[count]);
  document.body.style.background = `url("${imgArr[count]}") center/cover, rgba(0, 0, 0, 0.5)`;
});

prevImgBtn.addEventListener("click", () => {
  if (count <= 0) {
    count = imgArr.length - 1;
  } else {
    count--;
  }
  console.log(count, imgArr[count]);
  document.body.style.background = `url("${imgArr[count]}") center/cover, rgba(0, 0, 0, 0.5)`;
});

// sounds
const soundsArr = [
  { url: "./assets/sounds/Aqua Caelestis.mp3", name: "Aqua Caelestis" },
  { url: "./assets/sounds/Ennio Morricone.mp3", name: "Ennio Morricone" },
  { url: "./assets/sounds/River Flows in You.mp3", name: "River Flows in You" },
  { url: "./assets/sounds/Summer Wind.mp3", name: "Summer Wind" },
];

let musicIdx = 0;

const prevSoundsBtn = document.querySelector(".play-prev");
const nextSoundsBtn = document.querySelector(".play-next");
const playSoundsBtn = document.querySelector(".play");

let audio = new Audio(`${soundsArr[musicIdx].url}`);

playSoundsBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  playSoundsBtn.classList.toggle("pause");
});

// time
const hoursDisplay = document.querySelector("#hours");
const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");

const weekdayDisplay = document.querySelector("#weekday");
const monthDisplay = document.querySelector("#month");
const dayDisplay = document.querySelector("#day");

const greetingDisplay = document.querySelector(".greeting");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function showTime() {
  let todayDate = new Date();
  let weekday = weekdays[todayDate.getDay()];
  weekdayDisplay.innerHTML = weekday;

  let month = todayDate.getMonth();
  month = months[month];
  monthDisplay.innerHTML = month;

  let day = todayDate.getDate();
  dayDisplay.innerHTML = day;

  let hours = todayDate.getHours();
  let minutes = todayDate.getMinutes();
  let seconds = todayDate.getSeconds();

  hoursDisplay.innerHTML = String(hours).padStart(2, "0");
  minutesDisplay.innerHTML = String(minutes).padStart(2, "0");
  secondsDisplay.innerHTML = String(seconds).padStart(2, "0");

  //greeting
  if (hours >= 0 && hours < 6) {
    greetingDisplay.innerText = "Good nigth,";
  }
  if (hours >= 6 && hours < 12) {
    greetingDisplay.innerText = "Good morning,";
  }
  if (hours >= 12 && hours < 18) {
    greetingDisplay.innerText = "Good afternoon,";
  }
  if (hours >= 18) {
    greetingDisplay.innerText = "Good evening,";
  }
}
let countdown = setInterval(showTime, 1000);

function changeGreeting() {}

showTime();
