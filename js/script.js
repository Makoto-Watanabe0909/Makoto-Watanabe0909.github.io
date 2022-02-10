//参考 : https://qiita.com/yonedaco/items/ea234e95473d739c7447

//alert("Extra Texture!!!");

console.log("スクリプト動いてます");

var newspaper = document.getElementById("newspaper"); //新聞を拾ってくる
var shop = document.getElementById("shop"); //店
var clicktoenter = document.getElementById("click"); //クリックの表示
var forTest = document.getElementById("forTest"); //デバッグ用オブジェクト
newspaper.style.position = "absolute"; //位置基準の変更

var npX; //新聞の現在位置
var npY;
var mouseX1; //クリックしたときの座標
var mouseY1;

npX = newspaper.offsetLeft;
npY = newspaper.offsetTop;

if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
  newspaper.addEventListener('touchstart', touchStartEvent, false);
  newspaper.addEventListener('touchmove', touchMoveEvent, false);
  newspaper.addEventListener('touchend', touchEndEvent, false);
  document.addEventListener('touchmove', disableScroll, { passive: false });
} else {} //PCと端末で違う方法でドラッグの動作を実装している。

var isMoving = false;//新聞紙を動かしている時にTRUE
var isPlaying = false;
var max = 6;//効果音のファイル数
var soundIndex = 0;

var crumple = [new Audio(),new Audio(),new Audio(),new Audio(),new Audio(),new Audio()];
for (let i = 0; i < max; i++) {
    crumple[i].preload = "auto";
	crumple[i].src = "sound/crumple_"+ i + ".wav";
    crumple[i].load();
	crumple[i].addEventListener("ended", function () {
      crumple[i].currentTime = 0;
	  if(isMoving){
		musicPlay(); //まだ移動中だったら次のファイルを再生
	  }else{
		isPlaying = false;
	  }
	  isMoving = false;
    }, false);
}

function musicPlay() {
	soundIndex = Math.floor(Math.random() * max);
    crumple[soundIndex].play();
	isPlaying = true;
}

newspaper.onmousedown = function (event) { //マウスを押した時
　console.log("カチッ");
  musicPlay();
  if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
  } else {
    mouseX1 = event.clientX;
    mouseY1 = event.clientY;
  } //その瞬間の座標を記録

  document.addEventListener("mousemove", onMouseMove); //マウスを動かした時に呼ばれる関数を有効に
	
  shop.style.opacity = 1.0; // 店の画像を表示する処理をここでしてしまう
  clicktoenter.style.opacity = 1.0; // クリックの表示のやつも
}

newspaper.onmouseup = function (event) { //マウスを離した時
　console.log("パッ");
  isMoving = false;
  npX = newspaper.offsetLeft;
  npY = newspaper.offsetTop;
  document.removeEventListener("mousemove", onMouseMove);
}

newspaper.onmouseout = function (event) { //マウスが新聞から外れた時（マウスがウィンドウの外に出た場合を想定）
  isMoving = false;
  npX = newspaper.offsetLeft;
  npY = newspaper.offsetTop;
  document.removeEventListener("mousemove", onMouseMove);
}

newspaper.ondragstart = function (event) { //ドラッグを始めた時
  return false;
} //何か知らんけどこれが無いと綺麗に動かない。

var onMouseMove = function (event) {
  if(!isPlaying)musicPlay();
  isMoving = true;
  var mouseX2;
  var mouseY2;

  mouseX2 = event.clientX;
  mouseY2 = event.clientY;
	
  newspaper.style.top = (npY + mouseY2 - mouseY1) + "px";
  newspaper.style.left = (npX + mouseX2 - mouseX1) + "px";
}

/*==========以下、端末用============================================================*/

function touchStartEvent(event) {
  shop.style.opacity = 1.0;
  mouseX1 = event.touches[0].pageX;
  mouseY1 = event.touches[0].pageY;
}

function touchMoveEvent(event) {
  var mouseX2;
  var mouseY2;
	
  mouseX2 = event.touches[0].pageX;
  mouseY2 = event.touches[0].pageY;
	
  newspaper.style.top = (npY + mouseY2 - mouseY1) + "px";
  newspaper.style.left = (npX + mouseX2 - mouseX1) + "px";
}

function touchEndEvent(event) {
  npX = newspaper.offsetLeft;
  npY = newspaper.offsetTop;
}

function disableScroll(event) {
  var xxx = event.touches[0].pageX;
  var yyy = event.touches[0].pageY;
	
  var pX = newspaper.offsetLeft;
  var pY = newspaper.offsetTop;
  var pW = newspaper.width;
  var pH = newspaper.height;
	
  if (xxx > pX && xxx < pX + pW && yyy > pY && yyy < pY + pH) {
  	if (event.touches.length == 1) {
  		event.preventDefault();
  	}//スクロールは禁止　でもピンチはOK（接している指の本数で判定）
  }
}