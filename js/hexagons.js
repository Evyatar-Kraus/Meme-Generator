'use strict'


var gImages = [
    {id:1,url:"assets/img/too-funny-fixed.png",keywords:['funny','too','hilarious']},
    {id:2,url:"assets/img/busy-fixed.jpg",keywords:['busy']},
    {id:3,url:"assets/img/haha-fixed.png",keywords:['hilarious','haha','ha']},
    {id:4,url:"assets/img/hilarious-fixed.png",keywords:['funny','too','hilarious']},
    {id:5,url:"assets/img/positive-fixed.jpg",keywords:['positive','good']},
    {id:6,url:"assets/img/shock-fixed.jpg",keywords:['what','shock','surprise']},
    {id:7,url:"assets/img/suprise-fixed.jpg",keywords:['surprise','amazed']},
    {id:8,url:"assets/img/troll-fixed.png",keywords:['troll','face']}
    ];

var elSearchByKeyword = document.querySelector('.image-search');
var gSearchRenderTimeout;

//rendering meme hexagons images when page loads or when returning from editor
function renderMemeImages() {
    var hexGrid = document.querySelector('#hexGrid');
    hexGrid.innerHTML = '';
    gImages.forEach(function (image, imageIndex) {
        var strHtml = '';
        strHtml += '<li class= "hex" onclick="openMemeEditor('+imageIndex+')"><div class="hexIn"><a class="hexLink" href="#"><img src="' + image.url +'" alt="" /><h1>Click The Meme</h1><p>To open the Meme Generator</p></a></div></li>';
        
        hexGrid.innerHTML += strHtml;
       
    });
}

//rendering meme hexagons images by keywords search
function renderImagesByKeyword(searchValue) {
    var hexGrid = document.querySelector('#hexGrid');
    hexGrid.innerHTML = '';
    var imagesWithKeyword = gImages.filter(function(image){
        return image.keywords.some(function(keyword){
            return keyword === searchValue;
        });
    });
    console.log(imagesWithKeyword);
    imagesWithKeyword.forEach(function (image, imageIndex) {
        var strHtml = '';

        strHtml += '<li class= "hex" onclick="openMemeEditor('+imageIndex+
        ')"><div class="hexIn"><a class="hexLink" href="#"><img src="' +
         image.url +'" alt="" /><h1>Click The Meme</h1><p>To open the Meme Generator</p></a></div></li>';

        hexGrid.innerHTML += strHtml;
    });
    if(!hexGrid.innerHTML){
        hexGrid.innerHTML = '<h4>Sorry but no images were found</h4>';
    }
}



function searchImageByKeyWord(){
    clearTimeout(gSearchRenderTimeout);
    var searchValue = document.querySelector('.image-search').value;
    console.log(searchValue);
    if(!searchValue){

        gSearchRenderTimeout = setTimeout(renderMemeImages,1000);
    }else{
        gSearchRenderTimeout= setTimeout(renderImagesByKeyword,1000,searchValue);
    }
    
}

function openMemeEditor(imageIndex){
    console.log(imageIndex);
}


window.onload = function(){
     renderMemeImages();
};


//how a hex img should look in html
/*<li class="hex">
        <div class="hexIn">
          <a class="hexLink" href="#">
            <img src="assets/img/too-funny-fixed.png" alt="" />
            <h1>Click The Meme</h1>
            <p>To open the Meme Generator</p>
          </a>
        </div>
 </li>*/