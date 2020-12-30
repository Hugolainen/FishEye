const gallery = document.getElementById('photographerGallery');
const tagSelectList_element = document.getElementById('navTagList');
const tagSelectList = tagSelectList_element.children;

let requestURL = 'https://hugolainen.github.io/FishEye/public/data/FishEyeData.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    const myData = request.response;

    const photographerList = myData.photographers;
    for(var i=0; i<photographerList.length; i++){
        gallery.appendChild(generateCard(i));
        //alert(myData.photographers[i].name)
    }
    
    // Generate one photographer card
    function generateCard(index){
        const photographerCard = document.createElement("div");
        const photographerName = document.createElement("h2");
        const photographerDesk = document.createElement("p");
        const photographerTags = document.createElement("ul");
    
        photographerCard.classList.add("photographerCard"); 
        photographerName.classList.add("photographerCard__name"); 
        photographerDesk.classList.add("photographerCard__desc"); 
        photographerTags.classList.add("tagList"); 
    
        const newPhotographer = photographerList[index];
        photographerName.innerHTML = "<a href=\"photographPage.html?id=" + newPhotographer.id + "\">  <img class=\"header__logo\" src=\"public/img/photographersIDphotos/" +newPhotographer.portrait + "\" alt=\"" + newPhotographer.name + "\" > <br>" + newPhotographer.name + "</a>";
        photographerDesk.innerHTML = "<strong>" + newPhotographer.city + ", " + newPhotographer.country + "</strong> <br>" + newPhotographer.tagline + "<br> <em> $" + newPhotographer.price + "/day </em>";
        for(var i=0; i<newPhotographer.tags.length; i++){
            const tag = document.createElement("li");
            tag.innerHTML = "<a> #" + newPhotographer.tags[i] + "</a></li>";
            photographerTags.appendChild(tag);
        }
    
        photographerCard.appendChild(photographerName);
        photographerCard.appendChild(photographerDesk);
        photographerCard.appendChild(photographerTags);
    
        return photographerCard;
    }

    // Lunch tagSelection event with the appropriate Tag and take care of nav display
    tagSelectList[0].addEventListener('click', ($event) => {
        tagSelectList[0].classList.add("--tagActive");
        for(var i=1; i<tagSelectList.length; i++)
        {
                tagSelectList[i].classList.remove("--tagActive");
        }
        tagSelection("portrait");
    });

    tagSelectList[1].addEventListener('click', ($event) => {
        tagSelectList[1].classList.add("--tagActive");
        for(var i=0; i<tagSelectList.length; i++)
        {
            if(i != 1){
                tagSelectList[i].classList.remove("--tagActive");
            }
        }
        tagSelection("art");
    });

    tagSelectList[2].addEventListener('click', ($event) => {
        tagSelectList[2].classList.add("--tagActive");
        for(var i=0; i<tagSelectList.length; i++)
        {
            if(i != 2){
                tagSelectList[i].classList.remove("--tagActive");
            }
        }
        tagSelection("fashion");
    });

    tagSelectList[3].addEventListener('click', ($event) => {
        tagSelectList[3].classList.add("--tagActive");
        for(var i=0; i<tagSelectList.length; i++)
        {
            if(i != 3){
                tagSelectList[i].classList.remove("--tagActive");
            }
        }
        tagSelection("architecture");
    });

    tagSelectList[4].addEventListener('click', ($event) => {
        tagSelectList[4].classList.add("--tagActive");
        for(var i=0; i<tagSelectList.length; i++)
        {
            if(i != 4){
                tagSelectList[i].classList.remove("--tagActive");
            }
        }
        tagSelection("travel");
    });

    tagSelectList[5].addEventListener('click', ($event) => {
        tagSelectList[5].classList.add("--tagActive");
        for(var i=0; i<tagSelectList.length; i++)
        {
            if(i != 5){
                tagSelectList[i].classList.remove("--tagActive");
            }
        }
        tagSelection("sport");
    });

    tagSelectList[6].addEventListener('click', ($event) => {
        tagSelectList[6].classList.add("--tagActive");
        for(var i=0; i<tagSelectList.length; i++)
        {
            if(i != 6){
                tagSelectList[i].classList.remove("--tagActive");
            }
        }
        tagSelection("animals");
    });

    tagSelectList[7].addEventListener('click', ($event) => {
        tagSelectList[7].classList.add("--tagActive");
        for(var i=0; i<tagSelectList.length-1; i++)
        {
                tagSelectList[i].classList.remove("--tagActive");
        }
        tagSelection("events");
    });


    // Display only photographers with selected tag 
    function tagSelection(tagSelected) {
        const photographerCardList = gallery.children;
    
        for(var i=0; i<photographerList.length; i++){
            let displayPhotographer = false;
            for(var j=0; j<photographerList[i].tags.length; j++){
                if(photographerList[i].tags[j] == tagSelected)
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

