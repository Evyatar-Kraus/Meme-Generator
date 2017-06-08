"use strict"

var gImgs = [
    { id: 1, url: "assets/img/too-funny.png", keywords: ['funny', 'too', 'hilarious'] },
    { id: 2, url: "assets/img/busy.jpg", keywords: ['busy', 'bird', 'computer'] },
    { id: 3, url: "assets/img/haha.png", keywords: ['hilarious', 'haha', 'ha'] },
    { id: 4, url: "assets/img/hilarious.png", keywords: ['funny', 'too', 'hilarious'] },
    { id: 5, url: "assets/img/positive.jpg", keywords: ['positive', 'good', 'bird'] },
    { id: 6, url: "assets/img/shock.jpg", keywords: ['what', 'shock', 'surprise'] },
    { id: 7, url: "assets/img/suprise.jpg", keywords: ['surprise', 'amazed'] },
    { id: 8, url: "assets/img/troll.png", keywords: ['troll', 'face'] }
    ]; 
var gState = {
    selectedImgId: 5,
    txts: {
        firstText: '', 
        secondText: '',
        topSize: 30,
        bottomSize: 30,
        topAlign: 'center',
        bottomAlign: 'center',
        topColor: 'black',
        bottomColor: 'black'
    }
}

function renderCanvas(){
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var imageObj = new Image();
    context.clearRect ( 0 , 0 ,canvas.height , canvas.width );
    imageObj.onload = function(){
        context.drawImage(imageObj, 0, 0);
        // context.fillStyle = gState.txts.color;
        drawTexts(canvas, context);
    };
    imageObj.src = gImgs.filter(function(el){
        return el.id === gState.selectedImgId;
    })[0].url;
    return [canvas, context];
}
//func for text right/center/left & for size text +/-
function drawTexts(canvas, context) {
    [gState.txts.firstText, gState.txts.secondText].forEach(function(text) {
        var align = (text === gState.txts.firstText) ? gState.txts.topAlign : gState.txts.bottomAlign;
        var size = (text === gState.txts.firstText) ? gState.txts.topSize : gState.txts.bottomSize;
        var color = (text === gState.txts.firstText) ? gState.txts.topColor : gState.txts.bottomColor;
        var yCoords = (text === gState.txts.firstText) ? 40 : canvas.height-40;
        context.font = size + "px Calibri";
        context.fillStyle = color;
        if(align === 'left'){
            context.textAlign = align;
            context.fillText(text, 40, yCoords);
        }
        else if(align === 'right'){
            context.textAlign = align;
            context.fillText(text, canvas.width-40, yCoords);
        }
        else{
            context.textAlign = 'center';
            context.fillText(text, canvas.width/2, yCoords);
        }
    });
}

window.addEventListener('load', function(){
    renderCanvas();
    //click on some on hexagon-img that choose the img in array gImage by id
    document.querySelector('.hexLink img').addEventListener('click', function(event){
        gState.selectedImgId = ParseInt(event.target.id.split('img')[1]);
        renderCanvas();
    });
//first text from input to img
    document.querySelector('#myTextFirst').addEventListener('keyup', function(event){
        gState.txts.firstText = event.target.value;
        renderCanvas();
    },false);
//second text from input to img
    document.querySelector('#myTextSecond').addEventListener('keyup', function(event){
        gState.txts.secondText = event.target.value;
        renderCanvas();
    },false);

//save this img with text to lacalstorage
    document.querySelector('#btnSave').addEventListener('click', function(event){
        let [canvas, context] = renderCanvas();
        localStorage.setItem('myImg', canvas.toDataURL());
    });
//put text on img right/center/left on top align buttons
    var classname = document.getElementsByClassName("topAlign");
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', function(event){
            gState.txts.topAlign = event.target.id;
            if(event.target.nodeName === "SPAN") {
                gState.txts.topAlign = event.target.parentElement.id;
            }
            renderCanvas();
        }, false);
    }
//put text on img right/center/left on buttom align buttons
    var classname = document.getElementsByClassName("bottomAlign");
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', function(event){
            gState.txts.bottomAlign = event.target.id;
            if(event.target.nodeName === "SPAN") {
                gState.txts.bottomAlign = event.target.parentElement.id;
            }
            renderCanvas();
        }, false);
    }
//zoom - to bottom button
    document.querySelector('#topMinus').addEventListener('click', function(event){
        gState.txts.topSize--;
        renderCanvas();
    });
//zoom + to bottom button
    document.querySelector('#topPlus').addEventListener('click', function(event){
        gState.txts.topSize++;
        renderCanvas();
    });
//zoom - to bottom button
    document.querySelector('#bottomMinus').addEventListener('click', function(event){
        gState.txts.bottomSize--;
        renderCanvas();
    });
//zoom + to bottom button
    document.querySelector('#bottomPlus').addEventListener('click', function(event){
        gState.txts.bottomSize++;
        renderCanvas();
    });
//arhive text from img on top
    document.querySelector('#topArhive').addEventListener('click', function(event){
        gState.txts.firstText = '';
        renderCanvas();
    });
//arhive text from  on button
        document.querySelector('#bottomArhive').addEventListener('click', function(event){
            gState.txts.secondText = '';
        renderCanvas();
    });
//add color to top text  
        document.querySelector('#topColor').addEventListener('change', function(event){
            gState.txts.topColor = event.target.value;
            renderCanvas();
        },false);
//add color to bottom text  
        document.querySelector('#bottomColor').addEventListener('change', function(event){
            gState.txts.bottomColor = event.target.value;
            renderCanvas();
        },false);


// //add stroke text
//         document.querySelector('#bottomStroke').addEventListener('change', function(event){




//             gState.txts.bottomColor = event.target.value;
//             renderCanvas();
//         },false);
});