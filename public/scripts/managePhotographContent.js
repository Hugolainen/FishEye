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

let selectedOrder;
let modalMediaIndex = 0;

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
    let orderPopularity = generateOrderList(photographerMediaList, 'popularity');
    const orderDate = generateOrderList(photographerMediaList, 'date');
    const orderName = generateOrderList(photographerMediaList, 'name');
    const gallerySize = photographerMediaList.length;
    selectedOrder = orderPopularity;

    generateProfile(photgrapherIndex, photographerList, photographerMediaList);
    generateGallery(photographerMediaList, selectedOrder);
    generateModalMediaClickEvents();

    // List select to modify the order
    selectOrder_roll.addEventListener('change', (event) => {
        if(event.target.value == "date")
        {
            selectedOrder = orderDate;
        }
        else if(event.target.value == 'title')
        {
            selectedOrder = orderName;
        }
        else{
            selectedOrder = orderPopularity;
        }
        generateGallery(photographerMediaList, selectedOrder);
        generateModalMediaClickEvents();
    });


    function getModalMedia(modalIndex){
        const index = selectedOrder[modalIndex].index;
        return photographerMediaList[index];
    }

    // Generation of modal media
    function generateFocusElement(modalIndex){
        const media = getModalMedia(modalIndex);
        if(media.image == undefined)
        {
        imgShow.innerHTML = "<video controls> <source src=\"public/img/media/" + media.video + "\" type=\"video/mp4\">" + media.alt + "</video>";
        }
        else{
        imgShow.innerHTML= "<img src=\"public/img/media/" + media.image + "\" alt=\""+ media.alt + "\">";
        } 
        
        imgName.innerHTML= media.alt;
    }

    // Event to move to next media
    nextImg.addEventListener('click', ($event) => {
        $event.preventDefault();
        goToNextImg();
    });

    function goToNextImg(){
        modalMediaIndex = makeItRoll(modalMediaIndex, gallerySize,"forward");
        generateFocusElement(modalMediaIndex);
    }

    // Event to move to previous media
    prevImg.addEventListener('click', ($event) => {
        $event.preventDefault();
        goToPrevImg();
    });

    function goToPrevImg(){
        modalMediaIndex = makeItRoll(modalMediaIndex, gallerySize,"backward");
        generateFocusElement(modalMediaIndex);
    }

     // Generate the click events on the media cards (open modalMedia + like)
    function generateModalMediaClickEvents(){
        var modalMedia_Opener = document.getElementsByClassName("modalMedia_open"); 
        var likeButton = document.getElementsByClassName('add_like_button');

        for(let i=0;i<modalMedia_Opener.length;i++){ 
            modalMedia_Opener[i].addEventListener("click", () => { 
                launchModalMedia();
                modalMediaIndex = i;
                generateFocusElement(modalMediaIndex);
            }); 

            likeButton[i].addEventListener("click", () => { 
                likeButton[i].innerHTML = (parseInt(likeButton[i].textContent, 10) +1) + " <i class=\"fas fa-heart\"></i>";
                photographerLikes.innerHTML = (parseInt(photographerLikes.textContent, 10) +1) + " <i class=\"fas fa-heart\"></i>";

                for(let j=0; j<photographerMediaList.length; j++){
                    if(orderPopularity[i].name == photographerMediaList[j].alt){
                        photographerMediaList[j].likes = parseInt(photographerMediaList[j].likes) +1;
                    }
                }

                if(i>0)
                {
                    if(photographerMediaList[orderPopularity[i].index].likes > photographerMediaList[orderPopularity[i-1].index].likes)
                    {
                        var temp = orderPopularity[i];
                        orderPopularity[i] = orderPopularity[i-1];
                        orderPopularity[i-1] = temp;
                        if(selectOrder_roll.value == "popularity"){
                            selectedOrder = orderPopularity;
                            generateGallery(photographerMediaList, selectedOrder);
                            generateModalMediaClickEvents();
                        }
                    }
                }
            }); 
        }
    }

    // Use of keyboard arrow keys to do the modalMedia rotation
    document.onkeydown = checkKey;
    function checkKey(e) {
        e = e || window.event;
        if(modalMedia.style.display == "block")
        {
            if (e.keyCode == '37') {
                goToPrevImg();
            }
            else if (e.keyCode == '39') {
                goToNextImg();
            }
        }
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
    photographerProfilePhoto.innerHTML = "<img tabindex=0 class=\"photographProfile__photo\" src=\"public/img/photographersIDphotos/" + photographer.portrait + "\" alt=\"" + photographer.name + "\" >";
    photographerLikes.innerHTML = ammountOfLikes + " <i class=\"fas fa-heart\"></i>";
    photographerPrice.innerHTML = photographer.price + "$ / day";

    modalForm_title.innerHTML = "Contact me <br>" + photographer.name;
    /*
    <h1 id="modalForm_title"> 
        Contact me <br>
        photographerName
    </h1>
    */
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
    mediaMedia.setAttribute("tabindex", "0");
    mediaDesc.classList.add("mediaCard__desc"); 
    mediaName.classList.add("mediaCard__desc__name"); 
    mediaName.setAttribute("tabindex", "0");
    mediaPrice.classList.add("mediaCard__desc__number"); 
    mediaPrice.setAttribute("tabindex", "0");
    mediaLike.classList.add("mediaCard__desc__number"); 
    mediaLike.setAttribute("tabindex", "0");
    mediaLike.classList.add("add_like_button"); 

    if(newMedia.image == undefined)
    {
        mediaMedia.innerHTML = "<video> <source src=\"public/img/media/" + newMedia.video + "\" type=\"video/mp4\">" + newMedia.alt + ", closeup view </video>";

        /*
        <video class="modalMedia_open" controls> 
        <source src="public/img/media/Travel_Rock_Mountains.mp4" type="video/mp4"> 
        test
        </video>
        */
    }
    else{
        mediaMedia.innerHTML = "<img src=\"public/img/media/" + newMedia.image + "\" alt=\""+ newMedia.alt + ", closeup view\">";
    } 
    mediaName.innerHTML = newMedia.alt;
    mediaPrice.innerHTML = newMedia.price + " $";
    mediaLike.innerHTML = newMedia.likes + " <i class=\"fas fa-heart\" aria-label=\"likes\"></i>";

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


