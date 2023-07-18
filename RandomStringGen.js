//____________________________
//Program   : RandomStringGen.js
//Author    : Ben Morgan
//Date      : 12/13/2021
//Purpose   : Generate a random string of input length for basic passwords or other purposes.
//Updated   : 07/18/2023 - update copy to clipboard function to use document.execCommand
//Last Run  :   
//____________________________

function buildString()
{   
    // get desired length of result string
    var len = document.getElementById("strlen").value;
    if (isNaN(len) || len.length < 1) {
        len = 30;
        document.getElementById("strlen").value = 30;
    }
    var resultstr = "";
    
    // build ascii value arrays for upper/lower alpha characters and digits
    // further information on code below to build arrays, see https://jasonwatmore.com/post/2021/10/02/vanilla-js-create-an-array-with-a-range-of-numbers-in-a-javascript
    let charall = [];
    const alphaU = [...Array(90 - 65 + 1).keys()].map(x => x + 65); // uppercase alpha ASCII characters
    const alphaL = [...Array(122 - 97 + 1).keys()].map(x => x + 97); // uppercase alpha ASCII characters
    const digit = [...Array(57 - 48 + 1).keys()].map(x => x + 48); // digit ASCII characters
    const dash = [45]; // dash
    const undscr = [95]; // underscore
    const spec = [32,33,34,35,36,37,38,39,40,41,42,43,44,46,47,58,59,60,61,62,63,64,91,92,93,94,96,123,124,125,126]; // special characters other than dash and underscore
    const ansiHi = [...Array(255 - 128 + 1).keys()].map(x => x + 128); // high ansi characters
    const space = 32;
    const pound = 35;
    const pct = 37;
    const amp = 38;
    const ast = 42;
    const fsl = 47;
    const bsl = 92;
    const asc = 64;    
    
    // add items based on selections:
    
    if (document.getElementById('inAlphaU').checked) {
            charall = charall.concat(alphaU);
        }
    if (document.getElementById('inAlphaL').checked) {
            charall = charall.concat(alphaL);
        }
    if (document.getElementById('inDigit').checked) {
            charall = charall.concat(digit);
        }
    if (document.getElementById('inDash').checked) {
            charall = charall.concat(dash);
        }
    if (document.getElementById('inUndscr').checked) {
            charall = charall.concat(undscr);
        }
    if (document.getElementById('inSpec').checked) {
            charall = charall.concat(spec);
        }
    if (document.getElementById('inAnsiHi').checked) {
            charall = charall.concat(ansiHi);
        }
    
    // remove items based on exclusions:
    
    if (document.getElementById('exSpace').checked) {
            var indspace = charall.indexOf(space);
            if (indspace > -1) {
                charall.splice(indspace, 1);
            }
        }
    if (document.getElementById('exPound').checked) {
            var indpound = charall.indexOf(pound);
            if (indpound > -1) {
                charall.splice(indpound, 1);
            }
        }
    if (document.getElementById('exPct').checked) {
            var indpct = charall.indexOf(pct);
            if (indpct > -1) {
                charall.splice(indpct, 1);
            }
        }
    if (document.getElementById('exAmper').checked) {
            var indamp = charall.indexOf(amp);
            if (indamp > -1) {
                charall.splice(indamp, 1);
            }
        }
    if (document.getElementById('exAst').checked) {
            var indast = charall.indexOf(ast);
            if (indast > -1) {
                charall.splice(indast, 1);
            }
        }
    if (document.getElementById('exSlash').checked) {
            var indfsl = charall.indexOf(fsl);
            if (indfsl > -1) {
                charall.splice(indfsl, 1);
            }
        }
    if (document.getElementById('exBackslash').checked) {
            var indbsl = charall.indexOf(bsl);
            if (indbsl > -1) {
                charall.splice(indbsl, 1);
            }
        }
    if (document.getElementById('exAscii').checked) {
            var indasc = charall.indexOf(asc);
            if (indasc > -1) {
                charall.splice(indasc, 1);
            }
        }
       
    // build result string
    
    if (charall.length > 0) {
        for (let i = 0; i < len; i++) {
            var ch = charall[Math.floor(Math.random()*charall.length)];
            resultstr += String.fromCharCode(ch);
        }
          
        textToClipboard(resultstr);
        document.getElementById("Result").innerHTML = 'Your string: ' + resultstr + '<br><br> Copied to clipboard';     
    }
    else {
        document.getElementById("Result").innerHTML = 'You must select characters to include in the string.'; 
    }
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
    // navigator.clipboard.writeText(txt);
    document.execCommand("copy");
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
        
    var checkedList = "";
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked') // list of all checked checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
        if (i > 0) {
            checkedList += "-";
        }
        checkedList += checkboxes[i].id;
    }
    
    setCookie("checkopt",checkedList,365);    
}

function retrieveSettings() {
    // retrieve any settings if cookies exist
    let decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie.length > 0) {      
        //strlen - last saved length value
        strlenck = getCookie("strlen");
        if (isNaN(strlenck) || strlenck.length < 1) {
            document.getElementById("strlen").value = 30; //default value to start
        }
        else {
            document.getElementById("strlen").value = strlenck;
        }        
        
        //checkopt - last saved checkboxes selected
        checkoptck = getCookie("checkopt");
        if(checkoptck.length > 0) {
            var cbxarr = checkoptck.split("-");
            for(k = 0; k < cbxarr.length; k++) {
                document.getElementById(cbxarr[k]).checked = true;
            }
        }       
        
    }
   
}