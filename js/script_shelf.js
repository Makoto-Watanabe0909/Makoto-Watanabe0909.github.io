console.log("スクリプト動いてます");

var trackChoice = 0;
var songsNum = 3;

document.getElementById("recordplayer").onclick = function() {

  var song = document.getElementById('songbar');
  var songlist = new Array('sound/A.mp3', 'sound/B.mp3', 'sound/C.mp3');

  trackChoice = trackChoice + 1;
  if(trackChoice >= songsNum)trackChoice = 0;
	
  song.src = songlist[trackChoice];
  song.load();
  song.play();
};