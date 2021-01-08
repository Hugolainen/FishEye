const gallery = document.getElementById('mediaGallery');
const photographerName = document.getElementById('photographerName');
const photographerDesc = document.getElementById('photographerDesc');
const photographerTags = document.getElementById('photographerTags');
const photographerProfilePhoto = document.getElementById('photographerProfilePhoto');
const photographerLikes = document.getElementById('photographerLikes');
const photographerPrice = document.getElementById('photographerPrice');
const selectOrder_roll = document.getElementById('selectedOrder');

const urlParams = new URLSearchParams(window.location.search);
const photographerID = urlParams.get('id');

async function getAsync() 
{
  let response = await fetch(`https://hugolainen.github.io/FishEye/public/data/FishEyeData.json`);
  let data = await response.json()
  return data;
}

getAsync().then((data) => 
{
    const mediaList = data.media;
    const photographerList = data.photographers;
    const photgrapherIndex = getPhotographer(photographerID, photographerList);
    const photographerMediaList = getPhotographerMediaList(photographerID, mediaList);
    const orderPopularity = generateOrderList(photographerMediaList, 'popularity');
    const orderDate = generateOrderList(photographerMediaList, 'date');
    const orderName = generateOrderList(photographerMediaList, 'name');

    generateProfile(photgrapherIndex, photographerList, photographerMediaList);
    generateGallery(photographerMediaList, orderPopularity);

    selectOrder_roll.addEventListener('change', (event) => {
        if(event.target.value == "date")
        {
            generateGallery(photographerMediaList, orderDate);
        }
        else if(event.target.value == 'title')
        {
            generateGallery(photographerMediaList, orderName);
        }
        else{
            generateGallery(photographerMediaList, orderPopularity);
        }
    });

    var modalMedia_Opener = document.getElementsByClassName("modalMedia_open"); 
    for(var i=0;i<modalMedia_Opener.length;i++){ 
        modalMedia_Opener[i].addEventListener("click", () => { 
            launchModalMedia();
        }); 
    }
}); 

// get the index of the photographer based on his ID number
function getPhotographer(ID, photographerList)
{
    let photographIndex;
    for(var i=0; i<photographerList.length; i++)
    {
        if(photographerList[i].id == ID)
        {
            photographIndex=i;
            return i;
        }
    }
}

// get the list of index of the photograph medias based on his ID number
function getPhotographerMediaList(ID, baseMediaList)
{
    let mediaList = [];
    for(var i=0; i<baseMediaList.length;i++)
    {
        if(baseMediaList[i].photographerId == ID)
        {
            mediaList.push(baseMediaList[i]);
        }
    }
    return mediaList;
}

// Generate the photographer profil and footer numbers
function generateProfile(index, photographerList, photographerMediaList){
    const photographer = photographerList[index];
    var ammountOfLikes =0;
    for(var i=0; i<photographerMediaList.length; i++)
    {
        ammountOfLikes += photographerMediaList[i].likes;
    }

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

// generate a new list of index re-arranged based on the order type
function generateOrderList(mediaList, type){
    let orderList = [];
    for(var i=0; i<mediaList.length;i++)
    {
        const mediaItem = {
            'index':i,
            'likes':mediaList[i].likes,
            'date':mediaList[i].date,
            'name':mediaList[i].alt,
        }
        orderList.push(mediaItem);
    }

    if(type == 'name')
    {
        return orderList.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
    }
    else if(type == 'date'){
        return orderList.sort(function(a,b){
            // Turn the strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
          });
    }
    else{
        return orderList.sort((a, b) => b.likes - a.likes);
    }
}

// Generate one photographer card
function generateMediaCard(newMedia){
    const mediaCard = document.createElement("div");
    const mediaMedia = document.createElement("div");
    const mediaDesc = document.createElement("div");
    const mediaName = document.createElement("p");
    const mediaPrice = document.createElement("p");
    const mediaLike = document.createElement("p");

    mediaCard.classList.add("mediaCard"); 
    mediaMedia.classList.add("mediaCard__image"); 
    mediaMedia.classList.add("modalMedia_open");
    mediaDesc.classList.add("mediaCard__desc"); 
    mediaName.classList.add("mediaCard__desc__name"); 
    mediaPrice.classList.add("mediaCard__desc__number"); 
    mediaLike.classList.add("mediaCard__desc__number"); 

    if(newMedia.image == undefined)
    {
        mediaMedia.innerHTML = "<video> <source src=\"public/img/media/" + newMedia.video + "\" type=\"video/mp4\">" + newMedia.alt + "</video>";

        /*
        <video class="modalMedia_open" controls> 
        <source src="public/img/media/Travel_Rock_Mountains.mp4" type="video/mp4"> 
        test
        </video>
        */
    }
    else{
        mediaMedia.innerHTML = "<img src=\"public/img/media/" + newMedia.image + "\" alt=\""+ newMedia.alt + "\">";
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

// Generate the gallery
function generateGallery(mediaList, orderList){
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    for(var i=0; i<mediaList.length; i++){
        gallery.appendChild(generateMediaCard(mediaList[orderList[i].index]));
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

/*
async function getData(){
    let requestURL = 'https://hugolainen.github.io/FishEye/public/data/FishEyeData.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        const data = request.response;
        return data;
    }
}

getData().then(()=>{
    mydata = getData();
    console.log(myData);
});
*/


