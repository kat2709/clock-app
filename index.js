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
  document.body.style.background = `url("${imgArr[count]}") center/cover, rgba(0, 0, 0, 0.5)`;
});

prevImgBtn.addEventListener("click", () => {
  if (count <= 0) {
    count = imgArr.length - 1;
  } else {
    count--;
  }
  document.body.style.background = `url("${imgArr[count]}") center/cover, rgba(0, 0, 0, 0.5)`;
});

// audio player
const playList = document.querySelector(".play-list");
const prevBtn = document.querySelector(".play-prev");
const nextBtn = document.querySelector(".play-next");
const playBtn = document.querySelector(".play");
const audio = document.querySelector("#audio");
const songTitle = document.querySelector(".song-title");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");

const songs = [
  "Aqua Caelestis",
  "Ennio Morricone",
  "River Flows in You",
  "Summer Wind",
];

let songIndex = 2;

loadMusic(songs[songIndex]);

function loadMusic(song) {
  songTitle.innerHTML = song;
  const name = song.toLocaleLowerCase().replaceAll(' ', '_')
  audio.src = `./assets/sounds/${name}.mp3`;
}

function playSong() {
  playList.classList.add("show-song");

  playBtn.classList.remove("play");
  playBtn.classList.add("pause");

  audio.play();
}

function pauseSong() {
  playList.classList.remove("show-song");

  playBtn.classList.add("play");
  playBtn.classList.remove("pause");

  audio.pause();
}

playBtn.addEventListener("click", () => {
  const isPlaying = playList.classList.contains("show-song");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadMusic(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadMusic(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

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

// weather
const weatherBox = document.querySelector(".weather-box");
const inputCity = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature");
const weatherDescr = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

loadWeather();

async function loadWeather() {
  let value = "Minsk";
  const urlMinsk = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=en&appid=797ef741d117c2472e6a5597e0adaffc&units=metric`;
  const resMinsk = await fetch(urlMinsk);
  const dataMinsk = await resMinsk.json();

  weatherIcon.classList.add(`owf-${dataMinsk.weather[0].id}`);
  temp.textContent = `${dataMinsk.main.temp}°C`;
  weatherDescr.textContent = dataMinsk.weather[0].description;
  wind.textContent = `Wind speed: ${dataMinsk.wind.speed} m/s`;
  humidity.textContent = `Humidity: ${dataMinsk.main.humidity}%`;

  weatherBox.classList.remove("err");
}

async function showWeather() {
  try {
    let value = inputCity.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=en&appid=797ef741d117c2472e6a5597e0adaffc&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.classList = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temp.textContent = `${data.main.temp}°C`;
    weatherDescr.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherBox.classList.remove("err");
  } catch (err) {
    weatherBox.classList.add("err");
  }
}

inputCity.addEventListener("keyup", showWeather);

// quotes
const arrQuotes = [
  {
    text: "Learning is a treasure that will follow its owner everywhere.",
    author: "Chinese Proverb",
  },
  {
    text: "Knowledge is power.",
    author: "Sir Francis Bacon",
  },
  {
    text: "Start writing, no matter what. The water does not flow until the faucet is turned on.",
    author: "Louis L'Amour",
  },
  {
    text: "Read a thousand books, and your words will flow like a river.",
    author: "Lisa See",
  },
  {
    text: "Get it down. Take chances. It may be bad, but it's the only way you can do anything really good.",
    author: "William Faulkner",
  },
  {
    text: "Start before you're ready.",
    author: "Steven Pressfield",
  },
  {
    text: "It is perfectly okay to write garbage as long as you edit brilliantly.",
    author: "C. J. Cherryh",
  },
  {
    text: "Half my life is an act of revision.",
    author: "John Irving",
  },
  {
    text: "I love deadlines. I like the whooshing sound they make as they fly by.",
    author: "Douglas Adams",
  },
  {
    text: "If my doctor told me I had only six minutes to live, I wouldn't brood. I'd type a little faster.",
    author: "Isaac Asimov",
  },
  {
    text: "If I waited for perfection, I would never write a word.",
    author: "Margaret Atwood",
  },
  {
    text: "Difficulties mastered are opportunities won.",
    author: "Winston Churchill",
  },
  {
    text: "You can make anything by writing.",
    author: "C.S. Lewis",
  },
];

const quoteBtn = document.querySelector(".change-quote");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

function changeQuote() {
  const randomNumber = Math.floor(Math.random() * arrQuotes.length);
  quote.textContent = `"${arrQuotes[randomNumber]["text"]}"`;
  author.textContent = `"${arrQuotes[randomNumber]["author"]}"`;
}

quoteBtn.addEventListener("click", changeQuote);
