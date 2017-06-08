'use strict'


var gImages = [
    { id: 1, url: "assets/img/too-funny-fixed.png", keywords: ['funny', 'too', 'hilarious'] },
    { id: 2, url: "assets/img/busy-fixed.jpg", keywords: ['busy', 'bird', 'computer'] },
    { id: 3, url: "assets/img/haha-fixed.png", keywords: ['hilarious', 'haha', 'ha'] },
    { id: 4, url: "assets/img/hilarious-fixed.png", keywords: ['funny', 'too', 'hilarious'] },
    { id: 5, url: "assets/img/positive-fixed.jpg", keywords: ['positive', 'good', 'bird'] },
    { id: 6, url: "assets/img/shock-fixed.jpg", keywords: ['what', 'shock', 'surprise'] },
    { id: 7, url: "assets/img/suprise-fixed.jpg", keywords: ['surprise', 'amazed'] },
    { id: 8, url: "assets/img/troll-fixed.png", keywords: ['troll', 'face'] }
];

var gState = { 
    renderMode: 'hexagons' 
};

var elSearchByKeyword = document.querySelector('.image-search');
var elKeywords = document.querySelector('.keywords');
var gSearchRenderTimeout;

//rendering meme hexagons images when page loads or when returning from editor
function renderMemeImagesAsHexagons() {
    gState.renderMode = 'hexagons';
    var elImagesContainer = document.querySelector('.images-container');
    var strHtml = '';
    strHtml += '<ul id="hexGrid">';
    gImages.forEach(function (image, imageIndex) {

        strHtml += '<li class= "hex" onclick="openMemeEditor(' + (imageIndex+1) + ')"><div class="hexIn"><a class="hexLink" href="#"><img src="' + image.url + '" alt="" /><h1>Click</h1><p>To open Editor</p></a></div></li>';

    });
    strHtml += '</ul>';
    elImagesContainer.innerHTML = strHtml;
}


// rendering meme hexagons images when page loads or when returning from editor
function renderMemeImagesAsList() {
    gState.renderMode = 'list';
    var elImagesContainer = document.querySelector('.images-container');
    var strHtml = '<ul class="list-images">';
    gImages.forEach(function (image, imageIndex) {
        strHtml += '<li  class="list-image" onclick="openMemeEditor(' + (imageIndex+1)+ ')"><img style="width:30;height:35px;" src="' + image.url + '" alt="" /><span>Click on the image to open the meme editor</span></li>';
    });
    strHtml += '</ul>';
    elImagesContainer.innerHTML = strHtml;
}

//rendering meme hexagons images by keywords search
function renderImagesByKeyword(searchValue) {
    var elImagesContainer = document.querySelector('.images-container');
    var strHtml = '';
    if (gState.renderMode === 'hexagons') {
        strHtml += '<ul id="hexGrid">';
    } else if (gState.renderMode === 'list') {
        strHtml += '<ul class="list-images">';
    }
    var imagesWithKeyword = gImages.filter(function (image) {
        return image.keywords.some(function (keyword) {
            return keyword === searchValue;
        });
    });

    imagesWithKeyword.forEach(function (image, imageIndex) {

        if (gState.renderMode === 'hexagons') {
            strHtml += '<li class= "hex" onclick="openMemeEditor(' + image.id +
                ')"><div class="hexIn"><a class="hexLink" href="#"><img src="' +
                image.url + '" alt="" /><h1>Click</h1><p>To open Editor</p></a></div></li>';
        } else if (gState.renderMode === 'list') {
            strHtml += '<li  class="list-image" onclick="openMemeEditor(' + image.id + ')"><img style="width:30;height:35px;" src="' + image.url + '" alt="" /><span>Click on the image to open the meme editor</span></li>';
        }
    });

    if (imagesWithKeyword.length == 0) {
        elImagesContainer.innerHTML = '<h4>Sorry but no images were found</h4>';
    } else {
        strHtml +='</ul>';
        elImagesContainer.innerHTML = strHtml;
    }
}


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


function searchImageByKeyWord() {
    clearTimeout(gSearchRenderTimeout);
    var searchValue = document.querySelector('.image-search').value;
    console.log(searchValue);
    if (!searchValue) {

        gSearchRenderTimeout = setTimeout(renderMemeImagesAsHexagons, 1000);
    } else {
        gSearchRenderTimeout = setTimeout(renderImagesByKeyword, 1000, searchValue);
    }

}

function keyWordClicked(keyword) {
    console.log(keyword);
    var searchBox = document.querySelector('.image-search');
    searchBox.value = keyword;
    searchImageByKeyWord();
}




function renderKeywords() {
    elKeywords.innerHTML = '';
    var keywordByOccurence = {};
    gImages.forEach(function (image) {
        image.keywords.forEach(function (keyword) {
            if (!keywordByOccurence[keyword]) {
                keywordByOccurence[keyword] = 1;
            } else {
                keywordByOccurence[keyword] = keywordByOccurence[keyword] + 1;
            }
        });
    });
    for (var keyword in keywordByOccurence) {


        elKeywords.innerHTML += `<span onclick="keyWordClicked('${keyword}')"
                           style="font-size: ${(1 + (0.3 * keywordByOccurence[keyword]))}rem">${keyword}</span> `;
    }

}


function saveFormToLocalStorage(e) {

    if (!(localStorage.getItem('contactMessages'))) {
        localStorage.setItem('contactMessages', JSON.stringify([]));
    }

    var message = {};
    for (var i = 0; i < e.target.elements.length - 1; i++) {
        var currFormControl = e.target.elements[i];
        message[currFormControl.name] = currFormControl.value;
    }

    var savedMessages = JSON.parse(localStorage.getItem('contactMessages'));

    savedMessages.push(message);

    localStorage.setItem('contactMessages', JSON.stringify(savedMessages));
    e.preventDefault();
}


//function to open the meme editor on click on the hexagons or by url
function openMemeEditor(imageIndex) {
    document.querySelector('.meme-choice').classList.add('hidden');
    document.querySelector('.app-canvas').classList.remove('hidden');
    gState.selectedImgId = imageIndex;
    renderCanvas();
    console.log('2');
}


function editorBackButtonClicked(){

    document.querySelector('.app-canvas').classList.add('hidden');
    document.querySelector('.meme-choice').classList.remove('hidden');
    
    // if(gState.renderMode='hexagons'){
    //     renderMemeImagesAsHexagons();
    // }else if(gState.renderMode='list'){
    //     renderMemeImagesAsList();
    // }
}


window.onload = function () {
    renderMemeImagesAsHexagons();
    renderKeywords();
};


