//参考 : https://qiita.com/yonedaco/items/ea234e95473d739c7447

alert("Extra Texture!!! ver.7");

var newspaper = document.getElementById("newspaper"); //新聞を拾ってくる
newspaper.style.position = "absolute"; //位置基準の変更

newspaper.onmousedown = function(event){
	document.addEventListener("mousemove",onMouseMove); //マウス動かした時に呼ばれる関数を有効に
}

newspaper.ondragstart = function(event){
  return false;
}//とりあえず不要な関数（一応なにかに使うかもしれんから書いとく）

var onMouseMove = function(event){
  var x = event.clientX;
  var y = event.clientY;
  var width = newspaper.offsetWidth;
  var height = newspaper.offsetHeight;
  newspaper.style.top = (y-height/2) + "px";
  //newspaper.style.left = (x-width/2) + "px";
}

newspaper.onmouseup = function(event){
  var x = event.clientX;
  var y = event.clientY;
  var width = newspaper.offsetWidth;
  var height = newspaper.offsetHeight;
	
  document.removeEventListener("mousemove",onMouseMove);
}