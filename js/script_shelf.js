//参考 : https://qiita.com/WitTarou/items/7d791e0d6c5e2bc36c4c

alert("What can I do for you?");

console.log("スクリプト動いてます");

document.addEventListener('DOMContentLoaded', function () {
    const resizeFix = function () {
        const checkHeight = window.innerWidth / 1920 * 1080;
        const marginTop = window.innerHeight - checkHeight;
        const checkWidth = window.innerHeight / 1080 * 1920;
        const marginLeft = window.innerWidth - checkWidth;

        if (checkHeight > window.innerHeight) { //
            document.getElementsByClassName('wrap')[0].style.transform = 'scale(' + window.innerHeight / 1080 + ')';
            document.getElementsByClassName('wrap')[0].style.marginLeft = marginLeft / 2 + 'px';
            document.getElementsByClassName('wrap')[0].style.marginTop = 0 + 'px';
        } else {
            document.getElementsByClassName('wrap')[0].style.transform = 'scale(' + window.innerWidth / 1920 + ')';
            document.getElementsByClassName('wrap')[0].style.marginLeft = 0 + 'px';
            document.getElementsByClassName('wrap')[0].style.marginTop = marginTop / 2 + 'px';
        }
    }

    resizeFix();

    window.addEventListener('resize', function () {
        resizeFix();
    });
});