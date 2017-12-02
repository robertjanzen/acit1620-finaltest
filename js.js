var currentDiv = 0;
var totalDiv = -1;
var divArray = [];
var tostate = "0";
var fromstate = "0";
var bodystate = "0";

// ---------------------------- Listeners ----------------------------
document.getElementById("body").addEventListener("click", function() { showBodyInput(); });
document.getElementById("to").addEventListener("click", function() { showToInput(); });
document.getElementById("from").addEventListener("click", function() { showFromInput(); });
document.getElementById("postcardbutton").addEventListener("click", function() { createPostcard(); });
document.getElementById("gallerybutton").addEventListener("click", function() { showPostcards(); });
document.getElementById("add").addEventListener("click", function() { createCard(); });
document.getElementById("saveonline").addEventListener("click", function() { saveOnline(); });
document.getElementById("loadonline").addEventListener("click", function() { fetchOnline(); });
document.getElementById("savelocally").addEventListener("click", function() { localSave(); });
document.getElementById("loadlocally").addEventListener("click", function() { localLoad(); });

document.getElementById("cardbgurl").addEventListener("keyup", function(ev) {
    if (ev.keyCode == 13){
        updateBg();
    }
});

document.getElementById("cardto").addEventListener("keyup", function(ev) {
    if (ev.keyCode == 13){
        updateTo();
    }
});

document.getElementById("cardbody").addEventListener("keyup", function(ev) {
    if (ev.keyCode == 13){
        updateBodyText();
    }
});

document.getElementById("cardfrom").addEventListener("keyup", function(ev) {
    if (ev.keyCode == 13){
        updateFrom();
    }
});

// ---------------------------- Functions ----------------------------
function updateFrom() {
    var writefrom = document.getElementById("cardfrom").value;
    document.getElementById("from").innerHTML = "From: "+writefrom;
}

function updateBodyText(){
    var bodytext = document.getElementById("cardbody").value;
    document.getElementById("bodytext").innerHTML = bodytext;
}

function updateTo() {
    var writeto = document.getElementById("cardto").value;
    document.getElementById("to").innerHTML = "To: "+writeto;
}

function showPostcards() {
    document.getElementById("postcard").style.display = "none";
    document.getElementById("gallery").style.display = "block";
}

function createPostcard() {
    document.getElementById("postcard").style.display = "block";
    document.getElementById("gallery").style.display = "none";
}

function updateBg() {
    var url = document.getElementById("cardbgurl").value;
    document.getElementById("body").style.backgroundImage = "url("+url+")";
}

function showBodyInput() {
    if (bodystate == "0"){
        document.getElementById("cardbody").style.display = "block";
        document.getElementById("cardbgurl").style.display = "block";
        bodystate = "1";
    } else if (bodystate == "1"){
        document.getElementById("cardbody").style.display = "none";
        document.getElementById("cardbgurl").style.display = "none";
        bodystate = "0";
    }
}

function showToInput() {
    if (tostate == "0"){
        document.getElementById("cardto").style.display = "block";
        tostate = "1";
    } else if (tostate == "1"){
        document.getElementById("cardto").style.display = "none";
        tostate = "0";
    } 
}

function showFromInput() {
    if (fromstate == "0"){
        document.getElementById("cardfrom").style.display = "block";
        fromstate = "1";
    } else if (fromstate == "1"){
        document.getElementById("cardfrom").style.display = "none";
        fromstate = "0";
    }  
}

function createCard() {
    
    // Get url and title from current div first
    var old = currentDiv.toString();
    var writeto = document.getElementById("to").innerHTML;
    var writefrom = document.getElementById("from").innerHTML;
    var nurl = document.getElementById("body").style.backgroundImage;
    var bodytext = document.getElementById("bodytext").innerHTML;
    
    totalDiv += 1;
    currentDiv = totalDiv;
    
    // Create new display items
    var ncard = document.createElement("div");   // card
    var nto = document.createElement("div");   // to
    var nfrom = document.createElement("div"); // from
    var nbody = document.createElement("div"); // body
    var nbodytext = document.createElement("div"); // bodytext
    //var cardcss = document.getElementById("card").style.cssText;
    
    // Array of objects to represent each <display item> on screen
    var img_obj = {body:nurl,to:writeto,from:writefrom,bodytext:bodytext};
    pushArr(img_obj);
    
    nto.innerHTML = writeto;
    nto.id = "to"+currentDiv;
    nfrom.innerHTML = writefrom;
    nfrom.id = "from"+currentDiv;
    nbody.style.backgroundImage = nurl;
    nbody.id = "body"+currentDiv;
    nbodytext.innerHTML = bodytext;
    nbodytext.id = "bodytext"+currentDiv;
    
    
    nto.className = "to";
    nfrom.className = "from";
    nbodytext.className = "bodytext";
    nbody.className = "body";
    
    // Event listener for each new div, sets the currentDiv variable
    ncard.id = "card"+currentDiv;
    ncard.className = "items";
    ncard.addEventListener("click", function(){
        currentDiv = parseInt(ncard.id.substring(5));
    });
    
    nbody.appendChild(nbodytext);
    ncard.appendChild(nto);
    ncard.appendChild(nfrom);
    ncard.appendChild(nbody);
    
    // Append
    document.getElementById("gallery").appendChild(ncard);
}

function pushArr(newDiv) {
    divArray.push(newDiv);
    console.log(divArray);
}

function saveOnline() {
    var mdata = new FormData();
   
    mdata.append("type", "insert");
    mdata.append("bgimg", document.getElementById("body").style.backgroundImage);
    mdata.append("mto", document.getElementById("to").innerHTML);
    mdata.append("mbody", document.getElementById("bodytext").innerHTML);
    mdata.append("mfrom", document.getElementById("from").innerHTML);
    
    fetch("http://www.bcitdigitalarts.ca/vote/server/exam.php", {
        method: "POST",
        body:mdata
    }).then((resp)=>{
        return resp.json();
    }).then((json)=>{
        console.log(json);
    });
}

function fetchOnline() {
    
    var mdata = new FormData();
    
    mdata.append("type", "read");
    
    fetch("http://www.bcitdigitalarts.ca/vote/server/exam.php", {
        method: "POST",
        body:mdata
    }).then((resp)=>{
        return resp.json();
    }).then((json)=>{
        var newarr = json.data;
        parsedata(newarr);
    });
}

function parsedata(arr) {
    var values = arr.map((value, index)=>{
        console.log(value);
        /*value.type == "read" -- Couldn't get this check to work*/
        if(1) {
            // Get url and title from current div first
            var old = currentDiv.toString();
            var writeto = document.getElementById("to").innerHTML;
            var writefrom = document.getElementById("from").innerHTML;
            var nurl = document.getElementById("body").style.backgroundImage;
            var bodytext = document.getElementById("bodytext").innerHTML;

            totalDiv += 1;
            currentDiv = totalDiv;

            // Create new display items
            var ncard = document.createElement("div"); // card
            var nto = document.createElement("div");   // to
            var nfrom = document.createElement("div"); // from
            var nbody = document.createElement("div"); // body
            var nbodytext = document.createElement("div"); // bodytext
            //var cardcss = document.getElementById("card").style.cssText;

            /*
            // Array of objects to represent each <display item> on screen
            var img_obj = {src:url,title:curtitle};
            pushArr(img_obj);
            */

            nto.innerHTML = value.mto;
            nto.id = "to"+currentDiv;
            nfrom.innerHTML = value.mfrom;
            nfrom.id = "from"+currentDiv;
            console.log(value.bgimg.substring(0,1));
            if (value.bgimg.substring(0,1) == "u"){
                
                nbody.style.backgroundImage = value.bgimg;  
            } else {
                nbody.style.backgroundImage = "url("+value.bgimg+")";
            }
            
            nbody.id = "body"+currentDiv;
            nbodytext.innerHTML = value.mbody;
            nbodytext.id = "bodytext"+currentDiv;


            nto.className = "to";
            nfrom.className = "from";
            nbodytext.className = "bodytext";
            nbody.className = "body";

            // Event listener for each new div, sets the currentDiv variable
            ncard.id = "card"+currentDiv;
            ncard.className = "items";
            ncard.addEventListener("click", function(){
                currentDiv = parseInt(ncard.id.substring(5));
            });

            nbody.appendChild(nbodytext);
            ncard.appendChild(nto);
            ncard.appendChild(nfrom);
            ncard.appendChild(nbody);

            // Append
            document.getElementById("gallery").appendChild(ncard);  
        }
    });
}

function localSave() {
    var arrText = JSON.stringify(divArray);
    localStorage.setItem("items",arrText);
}

function localLoad() {
    var arrText = localStorage.getItem("items");
    var arr = JSON.parse(arrText);
    createfromlocal(arr);
}

function createfromlocal(arr) {
    var values = arr.map((value, index)=>{
        // Get url and title from current div first
        var old = currentDiv.toString();

        totalDiv += 1;
        currentDiv = totalDiv;

        // Create new display items
        var ncard = document.createElement("div");   // card
        var nto = document.createElement("div");   // to
        var nfrom = document.createElement("div"); // from
        var nbody = document.createElement("div"); // body
        var nbodytext = document.createElement("div"); // bodytext
        //var cardcss = document.getElementById("card").style.cssText;

        //var img_obj = {body:nurl,to:writeto,from:writefrom,bodytext:bodytext};
        
        nto.innerHTML = value.to;
        nto.id = "to"+currentDiv;
        nfrom.innerHTML = value.from;
        nfrom.id = "from"+currentDiv;
        nbody.style.backgroundImage = value.body;
        nbody.id = "body"+currentDiv;
        nbodytext.innerHTML = value.bodytext;
        nbodytext.id = "bodytext"+currentDiv;


        nto.className = "to";
        nfrom.className = "from";
        nbodytext.className = "bodytext";
        nbody.className = "body";

        // Event listener for each new div, sets the currentDiv variable
        ncard.id = "card"+currentDiv;
        ncard.className = "items";
        ncard.addEventListener("click", function(){
            currentDiv = parseInt(ncard.id.substring(5));
        });

        nbody.appendChild(nbodytext);
        ncard.appendChild(nto);
        ncard.appendChild(nfrom);
        ncard.appendChild(nbody);

        // Append
        document.getElementById("gallery").appendChild(ncard);
    });
}