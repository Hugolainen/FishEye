const gallery = document.getElementById('photographerGallery');


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
        photographerName.innerHTML = "<img class=\"header__logo\" src=\"public/img/photographersIDphotos/" +newPhotographer.portrait + "\" alt=\"" + newPhotographer.name + "\" > <br>" + newPhotographer.name;
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
}

/*
<h2 class="photographerCard__name"> <a href='photographPage.html'> 
    <img class="header__logo" src="public/img/photographersIDphotos/MimiKeel.jpg" alt="Mimi Keel">
    Mimi Keel
</a> </h2>

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

