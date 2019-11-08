const ANALOG = document.getElementById("analog");

function getActiveDivIds(numDivs, value) {
    let i = 0;
    let ret = [];
    while (i < numDivs) {
        val = 1 << i
        if (val & value) {
            ret.push(val);
        }
        ++i;
    }
    return ret;
}

function getActiveHourDivIds(hour) {
    return getActiveDivIds(5, hour);
}

function getActiveMinuteDivIds(minute) {
    return getActiveDivIds(6, minute);
}

function getActiveSecondDivIds(second) {
    return getActiveDivIds(6, second);
}

function hourDivHtmlId(intId) {
    return `h${intId}`;
}

function minuteDivHtmlId(intId) {
    return `m${intId}`;
}

function secondDivHtmlId(intId) {
    return `s${intId}`;
}

const COLORS = {
    'h': 'blue',
    'm': 'green',
    's': 'red'
}

function toggleCircle(htmlId, state) {
    let type = htmlId[0];
    let color;
    if (state) {
        color = COLORS[type];
    } else {
        color = "white";
    }
    circle = document.getElementById(htmlId);
    circle.style.backgroundColor = color;
}

var prevActiveHIds = [];
var prevActiveMIds = [];
var prevActiveSIds = [];


function tick() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    let activeHIds = getActiveHourDivIds(h);
    let activeMIds = getActiveMinuteDivIds(m);
    let activeSIds = getActiveSecondDivIds(s);

    _updateCircles(prevActiveSIds, activeSIds, 's');
    _updateCircles(prevActiveMIds, activeMIds, 'm');
    _updateCircles(prevActiveHIds, activeHIds, 'h');
    _updateAnalog();

    prevActiveHIds = activeHIds;
    prevActiveMIds = activeMIds;
    prevActiveSIds = activeSIds;

}

function _updateCircles(previousActiveIds, activeIds, type) {
    previousActiveIds = previousActiveIds.map(x => type+x);
    activeIds = activeIds.map(x => type+x);

    let offDiff = previousActiveIds.filter(x => !activeIds.includes(x))
    let onDiff = activeIds.filter(x => !previousActiveIds.includes(x))
    for (let id of offDiff) {
        toggleCircle(id, 0);
    }
    for (let id of onDiff) {
        toggleCircle(id, 1);
    }
}

function _updateAnalog() {
    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    let date = new Date();
    h = pad(date.getHours(), 2);
    m = pad(date.getMinutes(), 2);
    s = pad(date.getSeconds(), 2);
    ANALOG.innerHTML = `${h}:${m}:${s}`;
}

exports._test = {
    getActiveHourDivIds: getActiveHourDivIds,
    getActiveMinuteDivIds: getActiveMinuteDivIds,
    getActiveSecondDivIds: getActiveSecondDivIds,
    hourDivHtmlId: hourDivHtmlId,
    minuteDivHtmlId: minuteDivHtmlId,
    secondDivHtmlId: secondDivHtmlId
}

exports._api = {
    tick: tick,
}