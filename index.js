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
  "./assets/sounds/Aqua Caelestis.mp3",
  "./assets/sounds/Ennio Morricone.mp3",
  "./assets/sounds/River Flows in You.mp3",
  "./assets/sounds/Summer Wind.mp3",
];

const prevSoundsBtn = document.querySelector(".play-prev");
const nextSoundsBtn = document.querySelector(".play-next");
const playSoundsBtn = document.querySelector(".play");

const audio = new Audio(`${soundsArr[0]}`);

playSoundsBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  playSoundsBtn.classList.toggle("pause");
});
