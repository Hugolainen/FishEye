let requestURL = 'https://hugolainen.github.io/FishEye/public/data/FishEyeData.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    const myData = request.response;
    alert(myData.photographers[0].name)
}
