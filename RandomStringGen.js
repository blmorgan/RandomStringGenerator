//____________________________
//Program   : RandomStringGen.js
//Author    : Ben Morgan
//Date      : 12/13/2021
//Purpose   : Generate a random string of input length for basic passwords or other purposes.
//Updated   : 
//Last Run  :   
//____________________________

// see this next: https://www.w3schools.com/js/js_cookies.asp

function buildString()
{
    // retrieve settings if they exist
    retrieveSettings();
    
    // get desired length of result string
    var len = document.getElementById("strlen").value;
    if (isNaN(len) || len.length < 1) {
        len = 30;
        document.getElementById("strlen").value = 30;
    }
    var resultstr = "";
    
    // build ascii value arrays for upper/lower alpha characters and digits
    // further information on code below to build arrays, see https://jasonwatmore.com/post/2021/10/02/vanilla-js-create-an-array-with-a-range-of-numbers-in-a-javascript
    const alphaU = [...Array(90 - 65 + 1).keys()].map(x => x + 65); // uppercase alpha ASCII characters
    const alphaL = [...Array(122 - 97 + 1).keys()].map(x => x + 97); // uppercase alpha ASCII characters
    const digit = [...Array(57 - 48 + 1).keys()].map(x => x + 48); // digit ASCII characters
    const charall = digit.concat(alphaU, alphaL);
    
    // build result string
    
    for (let i = 0; i < len; i++) {
        var ch = charall[Math.floor(Math.random()*charall.length)];
        resultstr += String.fromCharCode(ch);
    }
    
    //console.log(resultstr); // debug
    
    textToClipboard(resultstr);
    document.getElementById("Result").innerHTML = 'Your string: ' + resultstr + '<br><br> Copied to clipboard';     

    // save current settings
    saveSettings();

}

function textToClipboard (txt) 
{
    // copy input text to clipboard
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = txt;
    dummy.select();
    navigator.clipboard.writeText(txt);
    // document.execCommand("copy");
    document.body.removeChild(dummy);
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function saveSettings() {
    // save current selections to cookies
    setCookie("strlen",document.getElementById("strlen").value,365);
}

function retrieveSettings() {
    // retrieve any settings if cookies exist
    let decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie.length > 0) {
        console.log(decodedCookie);
    }
}