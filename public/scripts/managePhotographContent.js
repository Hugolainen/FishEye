const gallery = document.getElementById('mediaGallery');
const photographerName = document.getElementById('photographerName');
const photographerDesc = document.getElementById('photographerDesc');
const photographerTags = document.getElementById('photographerTags');
const photographerProfilePhoto = document.getElementById('photographerProfilePhoto');
const photographerLikes = document.getElementById('photographerLikes');
const photographerPrice = document.getElementById('photographerPrice');
const photographID = 930;

let requestURL = 'https://hugolainen.github.io/FishEye/public/data/FishEyeData.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    const myData = request.response;

    const fullMediaList = myData.media;
    const photographerMediaList = getPhotographerMediaList(fullMediaList);

    generateProfile(photographID);
    for(var i=0; i<photographerMediaList.length; i++){
        gallery.appendChild(generateMediaCard(photographerMediaList[i]));
        //alert(myData.photographers[i].name)
    }
    
    
    

    function getPhotographerMediaList(baseMediaList)
    {
        let mediaList = [];
        for(var i=0; i<baseMediaList.length;i++)
        {
            if(baseMediaList[i].photographerId == photographID)
            {
                mediaList.push(i);
            }
        }
        return mediaList;
    }

    function orderMediaList(orderType, photographerMediaList){
        let orderedList = photographerMediaList;
        let continueSort = true;
        let temp;
        if(orderType=="date")
        {
            
        }
        else if(orderType=="price")
        {
            while(continueSort)
            {
                continueSort = false;
                for(var i=0; i<orderedList.length-1; i++)
                {
                    if(mediaList[orderedList[i]].price > mediaList[orderedList[i+1]].price){
                        temp = orderedList[i];
                        orderedList[i] = orderedList[i+1];
                        orderedList[i+1] = temp;
                        continueSort = true;
                    }
                }
            }
        }
        else{
            while(continueSort)
            {
                continueSort = false;
                for(var i=0; i<orderedList.length-1; i++)
                {
                    if(mediaList[orderedList[i]].likes < mediaList[orderedList[i+1]].likes){
                        temp = orderedList[i];
                        orderedList[i] = orderedList[i+1];
                        orderedList[i+1] = temp;
                        continueSort = true;
                    }
                }
            }
        }
    }

    // Generate the photographer profil and footer numbers
    function generateProfile(ID){
        const photographerList = myData.photographers;
        let photographIndex;
        for(var i=0; i<photographerList.length; i++)
        {
            if(photographerList[i].id == ID)
            {
                photographIndex=i;
                break;
            }
        }
    
        const photographer = photographerList[photographIndex];
        const ammountOfLikes = 100;
    
        photographerName.innerText = photographer.name;
        photographerDesc.innerHTML = "<strong>" + photographer.city + ", " + photographer.country + "</strong> <br>" + photographer.tagline + "<br>";
        for(var i=0; i<photographer.tags.length; i++){
            const tag = document.createElement("li");
            tag.innerHTML = "#" + photographer.tags[i] + "</li>";
            photographerTags.appendChild(tag);
        }
        photographerProfilePhoto.innerHTML = "<img class=\"photographProfile__photo\" src=\"public/img/photographersIDphotos/" + photographer.portrait + "\" alt=\"" + photographer.name + "\" >";
        photographerLikes.innerHTML = ammountOfLikes + " <i class=\"fas fa-heart\"></i>";
        photographerPrice.innerHTML = photographer.price + "$ / day";
    }

    // Generate one photographer card
    function generateMediaCard(index){
        const mediaCard = document.createElement("div");
        const mediaMedia = document.createElement("div");
        const mediaDesc = document.createElement("div");
        const mediaName = document.createElement("p");
        const mediaPrice = document.createElement("p");
        const mediaLike = document.createElement("p");
    
        mediaCard.classList.add("mediaCard"); 
        mediaMedia.classList.add("mediaCard__image"); 
        mediaDesc.classList.add("mediaCard__desc"); 
        mediaName.classList.add("mediaCard__desc__name"); 
        mediaPrice.classList.add("mediaCard__desc__number"); 
        mediaLike.classList.add("mediaCard__desc__number"); 

        const newMedia = fullMediaList[index];
        if(newMedia.image == undefined)
        {
            mediaMedia.innerHTML = "<video class=\"modalMedia_open\" controls> <source src=\"public/img/media/" + newMedia.video + "\" type=\"video/mp4\">" + newMedia.alt + "</video>";
  
            /*
            <video class="modalMedia_open" controls> 
            <source src="public/img/media/Travel_Rock_Mountains.mp4" type="video/mp4"> 
            test
            </video>
            */
        }
        else{
            mediaMedia.innerHTML = "<img class=\"modalMedia_open\" src=\"public/img/media/" + newMedia.image + "\" alt=\""+ newMedia.alt + "\">";
        } 
        mediaName.innerHTML = newMedia.alt;
        mediaPrice.innerHTML = newMedia.price + " $";
        mediaLike.innerHTML = newMedia.likes + " <i class=\"fas fa-heart\"></i>";
    
        mediaDesc.appendChild(mediaName);
        mediaDesc.appendChild(mediaPrice);
        mediaDesc.appendChild(mediaLike);
        mediaCard.appendChild(mediaMedia);
        mediaCard.appendChild(mediaDesc);

        return mediaCard;
    }
}

/*
<div class="mediaCard">
    <div class="mediaCard__image">  
        <img id="modalMedia_open" src="public/img/photographersIDphotos/MimiKeel.jpg" alt="">
    </div>
    <div class="mediaCard__desc"> 
        <p class="mediaCard__desc__name"> Rainbow </p>
        <p class="mediaCard__desc__number"> 70 $ </p>
        <p class="mediaCard__desc__number"> 12 <i class="fas fa-heart"></i> </p>
    </div>
</div>
*/

