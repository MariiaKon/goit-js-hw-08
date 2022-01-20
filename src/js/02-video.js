import throttle from "lodash.throttle"

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);
let currentTime;

player.on('timeupdate', throttle(({ seconds }) => {
    currentTime = seconds;
    localStorage.setItem("videoplayer-current-time", currentTime);
}, 1000));

currentTime = localStorage.getItem("videoplayer-current-time");
player.setCurrentTime(currentTime)
    .then((currentTime) => {})
    .catch((err) => {console.log('error');});