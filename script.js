var today = new Date()

var hour = document.getElementById('wakeup-hour');
var mins = document.getElementById('wakeup-mins');
var remAud = document.getElementById('rem-audio');
var audDur = document.getElementById('audio-duration');
var warn = document.getElementById('warn');

hour.value = localStorage.getItem("hour");
mins.value = localStorage.getItem("mins");
remAud.value = localStorage.getItem("rem-audio");
audDur.value = localStorage.getItem("audio-duration");

function playAudio() {
    window.location.replace(localStorage.getItem("rem-audio"));
}

function hourChange() {
    var input = hour.value.toString();
    if (input.length > 2) {hour.value = input.substring(0, 2);}
    if (parseInt(input) < 0) {hour.value = "0"}
    if (parseInt(input) > 23) {hour.value = "23"}
    localStorage.setItem("hour", hour.value);
}

function minsChange() {
    var input = mins.value.toString();
    if (input.length > 2) {mins.value = input.substring(0, 2);}
    if (parseInt(input) < 0) {mins.value = "0"}
    if (parseInt(input) > 59) {mins.value = "59"}
    localStorage.setItem("mins", mins.value);
}

function audioChange() {
    var audioLink = remAud.value.toString();
    localStorage.setItem("rem-audio", audioLink);
}

function durChange() {
    var input = audDur.value.toString();
    if (input.length > 2) {audDur.value = input.substring(0, 2);}
    if (parseInt(input) < 0) {audDur.value = "0"}
    if (parseInt(input) > 60) {audDur.value = "60"}
    localStorage.setItem("audio-duration", audDur.value);
}

function begin() {
    
    if (hour.value === "") {hour.value = "00"}
    if (mins.value === "") {mins.value = "00";}

    if (remAud.value === "") {
        warn.style.color = "yellow";
        warn.textContent="This is a mandatory field*"; 
        return;
    }

    if (warn.style.color = "yellow") {
        warn.style.color = "gray";
        warn.textContent="Timed to finish before wake-up"; 
    }
    if (hour.value.length < 2) {hour.value = "0" + hour.value[0];}
    if (mins.value.length < 2) {mins.value = "0" + mins.value[0];}

    var curHMins = today.getHours() * 60;
    console.log("Current Hours To Minutes : " + curHMins)
    var curMins = curHMins + today.getMinutes();
    console.log("Current Total Minutes : " + curMins)

    var wakeHMins = parseInt(localStorage.getItem("hour")) * 60;
    console.log("Wake Hour Minutes : " + wakeHMins)
    var wakeMins = wakeHMins + parseInt(localStorage.getItem("mins"));
    console.log("Wake Total Minutes : " + wakeMins)

    var timeToWake;

    //======== Tomorrow
    if (wakeMins < curMins) {

        var leftOfToday = 1440 - curMins;
        timeToWake = leftOfToday + wakeMins;
        console.log("Tomorrow - TTW : " + timeToWake)

    } else {

        //==== Later Today
        timeToWake = wakeMins - curMins;
        console.log("Later Today - TTW : " + timeToWake)

    }

    var startTime = timeToWake - parseInt(localStorage.getItem("audio-duration"));
    var delay = startTime * 60000;
    if (delay < 0) {
        delay = 0;
    }
    console.log("Start Time : " + startTime)
    console.log("Delay : " + delay)

    setTimeout(playAudio, delay);

}