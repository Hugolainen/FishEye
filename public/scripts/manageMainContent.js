const photographerGallery = document.getElementById('photographerGallery');
const tagSelectList_element = document.getElementById('navTagList');
const skipToContentElement = document.querySelector('.skipToContent');
const tagSelectList = tagSelectList_element.children;

let requestURL = 'https://hugolainen.github.io/FishEye/public/data/FishEyeData.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    const myData = request.response;
    const photographerList = myData.photographers;

    var localPhotographerList = new Array(photographerList.length);
    for(var i=0; i<localPhotographerList.length; i++)
    {
        localPhotographerList[i] = new Photographer(photographerList[i]);
        photographerGallery.appendChild(localPhotographerList[i].generateCard());
    }

    // Add the event on nav TagList elements and fire the tagSelection function
    for(let i=0; i<tagSelectList.length; i++)
    {
        tagSelectList[i].addEventListener('click', ($event) => {
            tagSelectList[i].classList.add("--tagActive");
            for(var j=0; j<tagSelectList.length; j++)
            {
                if(j != i)
                {
                    tagSelectList[j].classList.remove("--tagActive");
                }
            }
            const tagSelected = (tagSelectList[i].textContent).slice(3).slice(0,-2).toLowerCase();
            tagSelection(tagSelected);
        });
    }

    // Display only photographers with selected tag 
    function tagSelection(tagSelected) {
        const photographerCardList = photographerGallery.children;
    
        for(var i=0; i<localPhotographerList.length; i++){
            let displayPhotographer = false;
            for(var j=0; j<localPhotographerList[i].tags.length; j++){
                if(localPhotographerList[i].tags[j] == tagSelected)
                {
                    displayPhotographer = true;
                }
            }
            if(displayPhotographer)
            {
                photographerCardList[i].style.display = "block";
            }
            else{
                photographerCardList[i].style.display = "none";
            }
        }
    }
}

// Photographer data object
function Photographer(data) {
    this.id = data.id;
    this.portrait = data.portrait;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.tags = data.tags;

    this.generateCard = function() {
        const photographerCard = document.createElement("div");
        const photographerName = document.createElement("h2");
        const photographerDesk = document.createElement("p");
        const photographerTags = document.createElement("ul");
    
        photographerCard.classList.add("photographerCard"); 
        photographerName.classList.add("photographerCard__name"); 
        photographerDesk.classList.add("photographerCard__desc"); 
        photographerDesk.setAttribute("tabindex", "0");
        photographerTags.classList.add("tagList"); 
        photographerTags.setAttribute("tabindex", "0");
    
        photographerName.innerHTML = "<a href=\"photographPage.html?id=" + this.id + "\">  <img class=\"header__logo\" src=\"public/img/photographersIDphotos/" + this.portrait + "\" > <br>" + this.name + "</a>";
        photographerDesk.innerHTML = "<strong>" + this.city + ", " + this.country + "</strong> <br>" + this.tagline + "<br> <em> $" + this.price + "/day </em>";
        for(var i=0; i<this.tags.length; i++){
            const tag = document.createElement("li");
            tag.innerHTML = "<a> #" + this.tags[i] + "</a></li>";
            photographerTags.appendChild(tag);
        }
    
        photographerCard.appendChild(photographerName);
        photographerCard.appendChild(photographerDesk);
        photographerCard.appendChild(photographerTags);
    
        return photographerCard;
    };
}

// Use of keyboard arrow keys to do the modalMedia rotation
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;

    if(e.keyCode == '9')
    {
        skipToContentElement.style.display = "block";
    }
}



/////////// Exemple HTML code for a photographer card
/*
<h2 class="photographerCard__name"> 
    <a href='photographPage.html'> 
    <img class="header__logo" src="public/img/photographersIDphotos/MimiKeel.jpg" alt="Mimi Keel">
    Mimi Keel
    </a>
</h2>

<p class="photographerCard__desc">
    <strong> London, UK </strong> <br>
    Finding beauty in everyday things <br>
    <em> $400/day </em>
</p>

<ul class="tagList">
    <li> <a> #Portrait </a></li>
    <li> <a> #Events </a></li>
    <li> <a> #Travel </a></li>
    <li> <a> #Animals </a></li>
</ul>
*/

