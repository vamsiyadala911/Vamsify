let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/Heeriye.mp3');

let currentSong = 1;

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
})

progressBar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName('playMusic'));

makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index = parseInt(e.target.id);
        currentSong = index;
        audio.src = `Audio/${index}.mp3`;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    })
});

let allMusic = Array.from(document.getElementsByClassName('music-card'));

songs = [
    { songName: 'Heeriye', songDes: ``, songImage: 'Images/Heeriye.jpg', songPath: 'Audio/1.mp3' },
    { songName: 'Sahibha', songDes: '', songImage: 'Images/Sahibha.jpg', songPath: 'Audio/2.mp3' },
    { songName: 'paro', songDes: '', songImage: 'Images/paro.jpeg', songPath: 'Audio/3.mp3' },
    { songName: 'samojho Na', songDes: '', songImage: 'Images/samjho Na.jpeg', songPath: 'Audio/4.mp3' },
    { songName: 'Attention', songDes: '', songImage: 'Images/Attention.jpg', songPath: 'Audio/5.mp3' },
    { songName: 'How long i can', songDes: '', songImage: 'Images/How.jpg', songPath: 'Audio/6.mp3' },
    { songName: 'Darshana', songDes: '', songImage: 'Images/Darshana.jpeg', songPath: 'Audio/7.mp3' },
    { songName: 'Adiye', songDes: '', songImage: 'Images/Adiye.jpg', songPath: 'Audio/8.mp3' },
    { songName: 'Nagumo', songDes: '', songImage: 'Images/Nagumo.webp', songPath: 'Audio/9.mp3' },
    { songName: 'pavazha malli', songDes: '', songImage: 'Images/pavazha.jpg', songPath: 'Audio/10.mp3' },
    { songName: 'Aasa koda', songDes: '', songImage: 'Images/Aasa koda.jpg', songPath: 'Audio/11.mp3' },
    { songName: 'promise', songDes: '', songImage: 'Images/promise.jpg', songPath: 'Audio/12.mp3' },
    { songName: 'kalyani', songDes: '', songImage: 'Images/kalyani.jpg', songPath: 'Audio/13.mp3' },
    { songName: 'Shape of you', songDes: '', songImage: 'Images/shape of you.jpg', songPath: 'Audio/14.mp3' },
    { songName: 'Sufiyana', songDes: '', songImage: 'Images/sufiyana.jpeg', songPath: 'Audio/15.mp3' },
    { songName: 'kalavathi', songDes: '', songImage: 'Images/kalavathi.jpeg', songPath: 'Audio/16.mp3' },
    { songName: 'samayama', songDes: '', songImage: 'Images/samayama.jpg', songPath: 'Audio/17.mp3' },
    { songName: 'Ammayi', songDes: '', songImage: 'Images/Ammayi.jpg', songPath: 'Audio/18.mp3' }
]

order = [...songs];

allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs (originalOrder) {
    order = [...originalOrder];
    for(i = order.length - 1; i > 0; i--){
        let j = Math.floor((Math.random) * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

shuffle.addEventListener('click', () => {
    if(!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order = shuffleSongs(songs);
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');

        order = songs;
    }
});

repeat.addEventListener('click', () => {
    if(!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
})

playNextSong = () => {
    if(!songOnRepeat){
        let nextSong = (currentSong + 1) % playMusic.length;
        currentSong = nextSong == 0 ? 18 : nextSong;
    
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    } else {
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    }
}

playPrevSong = () => {
    let prevSong = (currentSong - 1);
    currentSong = prevSong == 0 ? 18 : prevSong;
    audio.src = `Audio/${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
}

function updateNowBar () {
    nowBar.getElementsByTagName('img')[0].src = order[currentSong-1].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentSong-1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentSong-1].songDes;
}

forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
})

audio.addEventListener('ended', () => {
    playNextSong();
})

backward.addEventListener('click', () => {
    playPrevSong();
});