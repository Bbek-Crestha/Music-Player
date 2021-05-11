const musicContainer = document.querySelector(".music-container");
const musicInfo = document.querySelector(".music-info");
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#music-title");
const cover = document.querySelector("#cover");
const audio = document.querySelector("#audio");

// song titles
const songs = [
  "batash",
  "cheap thrills",
  "lab pe aati",
  "lovely",
  "varian",
  "mari jau",
];

// keep track of songs
let songIndex = 0;

// update song details
function loadSong(song) {
  title.textContent = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `image/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  play.querySelector("i").classList.remove("fa-play");
  play.querySelector("i").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  play.querySelector("i").classList.remove("fa-pause");
  play.querySelector("i").classList.add("fa-play");

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;
  progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// initially load song into dom
loadSong(songs[songIndex]);

// event listeners
play.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prev.addEventListener("click", prevSong);

next.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
