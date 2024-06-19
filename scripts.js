const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const playPauseImg = document.getElementById('play-pause-img');
const volumeSlider = document.getElementById('volume');
const progressSlider = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const titleDisplay = document.getElementById('title');
const artistDisplay = document.getElementById('artist');
const albumArtImg = document.getElementById('album-art-img');

const tracks = [
    {
        title: "Look Mom",
        artist: "John Michael Howell, Ryan Mack",
        src: "music/LookMom.mp3",
        img: "img/LookMom.png"
    },
    {
        title: "Wish You Were Here",
        artist: "Neck Deep",
        src: "music/WishYouWereHere.mp3",
        img: "img/WishYouWereHere.png"
    },
    {
        title: "Mess it up",
        artist: ".Gio",
        src: "music/messitup.mp3",
        img: "img/messitup.png"
    },
    {
        title: "December",
        artist: "Neck Deep",
        src: "music/December.mp3",
        img: "img/December.png"
    },
    {
        title: "Mr.Feel",
        artist: "John Michael Howell",
        src: "music/Mr.Feel.mp3",
        img: "img/Mr.Feel.png"
    },
    {
        title: "Nuansa Bening",
        artist: "Vidi",
        src: "music/NuansaBening.mp3",
        img: "img/NuansaBening.png"
    },
];

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    titleDisplay.textContent = track.title;
    artistDisplay.textContent = track.artist;
    albumArtImg.src = track.img;
    progressSlider.value = 0;
    currentTimeDisplay.textContent = '0:00';
    durationDisplay.textContent = '0:00';
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.querySelector('img').setAttribute('src', 'img/play.png');
    } else {
        audio.play();
        playPauseBtn.querySelector('img').setAttribute('src', 'img/pause.png');
    }
    isPlaying = !isPlaying;
});




volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = (currentTime / duration) * 100;
    progressSlider.value = progress;
    updateDisplayTime(currentTime, currentTimeDisplay);
    updateDisplayTime(duration, durationDisplay);
});

progressSlider.addEventListener('input', (e) => {
    const duration = audio.duration;
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
});

document.getElementById('prev').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
});

document.getElementById('next').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
});

function updateDisplayTime(time, display) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Load the initial track
loadTrack(currentTrackIndex);

function kirimData(event) {
    event.preventDefault(); // Prevent form submission

    const nama = document.getElementById('nama').value;
    const jenisKelamin = document.querySelector('input[name="JK"]:checked').value;
    const jenisMusikYangDisukai = document.getElementById('music').value;
    const laguFavorit = document.getElementById('lagu').value;

    const message = `
    Nama: ${nama}
    Jenis Kelamin: ${jenisKelamin}
    Jenis Musik yang Disukai: ${jenisMusikYangDisukai}
    Lagu Favorit: ${laguFavorit}
    `;

    alert(message);
}
