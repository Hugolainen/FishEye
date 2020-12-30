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
    generateProfile(photgrapherIndex, photographerList);
    generateMediaList(mediaList, photographerMediaList, photographerMediaList);

    selectOrder_roll.addEventListener('change', (event) => {
        if(event.target.value == "date")
        {
            generateMediaList(mediaList, photographerMediaList, generateDateOrderList(mediaList, photographerMediaList));
        }
        else if(event.target.value == 'title')
        {
            generateMediaList(mediaList, photographerMediaList, generateTitleOrderList(mediaList, photographerMediaList));
        }
        else{
            generateMediaList(mediaList, photographerMediaList, generatePopularityOrderList(mediaList, photographerMediaList));
        }
    });
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
            mediaList.push(i);
        }
    }
    return mediaList;
}

// Generate the photographer profil and footer numbers
function generateProfile(index, photographerList){
    const photographer = photographerList[index];
    const ammountOfLikes = 100; // TO DO

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
function generatePopularityOrderList(mediaList, photographerMediaList){
    var resultOrder = photographerMediaList;
    var continueSort = true;
    var temp;

    while(continueSort)
    {
        continueSort = false;
        for(var i=0; i<resultOrder.length-1; i++)
        {
            if(mediaList[resultOrder[i]].likes < mediaList[resultOrder[i+1]].likes)
            {
                temp = resultOrder[i];
                resultOrder[i] = resultOrder[i+1];
                resultOrder[i+1] = temp;
                continueSort = true;
            }
        }
    }

    return resultOrder;
}

function generateDateOrderList(mediaList, photographerMediaList){
    var resultOrder = photographerMediaList;

    for(var i=0; i<resultOrder.length-1; i++)
    {
        resultOrder[i] = resultOrder[0];
    }

    return resultOrder;
}

function generateTitleOrderList(mediaList, photographerMediaList){
    var resultOrder = photographerMediaList;

    for(var i=0; i<resultOrder.length-1; i++)
    {
        resultOrder[i] = resultOrder[2];
    }

    return resultOrder;
}



// Generate one photographer card
function generateMediaCard(index, mediaList){
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

    const newMedia = mediaList[index];
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

// Generate the gallery
function generateMediaList(mediaList, photographerMediaList, orderedIndexList){
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    for(var i=0; i<photographerMediaList.length; i++){
        gallery.appendChild(generateMediaCard(orderedIndexList[i], mediaList));
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