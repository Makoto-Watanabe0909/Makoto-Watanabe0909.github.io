
var trackChoice = 0;
var songsNum = 4;

var putonSound = new Audio();
putonSound.preload = "auto";
putonSound.src = "sound/puton.wav";
putonSound.load();

console.log("スクリプト動いてます");

var song = document.getElementById('songbar');
var songlist = new Array('sound/lennybruce.wav', 'sound/picnic.wav', 'sound/cutlery.wav', 'sound/prevert.wav');
putonSound.volume = 0.5;
song.volume = 0.15;
trackChoice = songsNum;

var cover = document.getElementById('ex');
var cover2 = document.getElementsByClassName('cover')[0];
cover.style.opacity = "1";

function songplay() {
  putonSound.play();
  trackChoice = trackChoice + 1;
  if(trackChoice >= songsNum)trackChoice = 0;
	
  song.src = songlist[trackChoice];
  song.load();
  song.play();
}

cover.onclick = function() {
	cover.style.display ="none";
	cover2.style.display ="none";
	songplay();
};

document.getElementById("recordplayer").onclick = function() {
	songplay(); 
};


