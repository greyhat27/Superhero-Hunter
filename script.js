//varialbles
const searchInput=document.querySelector("#search-bar");

const hero=document.querySelector(".redirect");

const publicKey = '11fdeac12c7c55621d7121737fadfa75'; //public key
 
const privateKey = 'b5c0842c43d41b4cc4d06a1c66bd625b59ae9117'; //private key

const ts = Date.now(); //timestamp

const hash = md5(ts + privateKey + publicKey); //crating hash

const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=`; //url for api call

const favourite=document.querySelector(".fav");

const heartIcons = document.querySelectorAll(".fa-solid.fa-heart");

const listItem=document.querySelector("#list");

const modal=document.querySelector("#modal");

const okBtn=document.querySelector("#ok");

let updatedUrl ="";

let favouriteArray=[];

let superheroData=[];

//created localStorage for heroId and favourite
if(localStorage.getItem('heroId')===null){
    localStorage.setItem('heroId', JSON.stringify([]));
}
if(localStorage.getItem('favourite')===null){
    localStorage.setItem('favourite', JSON.stringify([]));
}

//function to updated url
function update(key){
    updatedUrl=url+key;
    getDataArray();
}

//API call 
async function fetchData(){
    const response=  await fetch(updatedUrl);
    const data= await response.json();
    return data.data.results;
}

//fetching data into array in json
async function getDataArray() {
    superheroData=[];
    document.getElementById("loader").style.display = "block";
    let data=[];
    data = await fetchData();
    document.getElementById("loader").style.display = "none";
    superheroData=data;
    if(superheroData.length===0){
        document.getElementById("notExist").style.display="block";
    }else{
        document.getElementById("notExist").style.display="none";
    }
    getList(superheroData); //calling function to append listitems(superheros)
  }

  //function to add superhero into favourites
function addtoFav(parentId){
    const newObj=superheroData.filter(val => val.id==parentId);
    favouriteArray=JSON.parse(localStorage.getItem('favourite'));
    let ifExist=true;
    for(let i=0; i<favouriteArray.length;i++){
        if(favouriteArray[i][0].id==newObj[0].id){
            ifExist=false;
            modal.style.display="block";
        }
    }
    if(ifExist){
    favouriteArray.push(newObj);
    localStorage.setItem('favourite',JSON.stringify(favouriteArray));
    alert("Added to favourite");
    }

}

//appeding superhero into the list
function getList(superheroData){
    listItem.innerHTML='';
    for(i=0;i<superheroData.length;i++){
        if(superheroData[i].thumbnail.path+""=== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            continue;
        }
        const li=document.createElement('li');
        li.innerHTML=
        `<div id="${superheroData[i].id}" class="imgContainer"><img id="${superheroData[i].id}" class="superHeroImg" src="${superheroData[i].thumbnail.path+"/portrait_medium.jpg"}" alt=""></div>
        <div id="${superheroData[i].id}" class="superHeroName">${superheroData[i].name}</div>
        <div id="${superheroData[i].id}" class="icon"><i id="heart-icon" class="fa-solid fa-heart"></i></div>`;
        listItem.append(li);
    }
}

//callback function to handle keyup event
function handlekeyup(e){
    const target=e.target;
    if(target.value===''){
        listItem.innerHTML='';
        return;
    }
    update(target.value);
}

//callback function to handle click event
function handleclick(e){
    const target=e.target;
    if(target.className=='superHeroImg' || target.className=='imgContainer' || target.className=='superHeroName'){
        const newObj= superheroData.filter(val => val.id==target.id)
        localStorage.setItem('heroId', JSON.stringify(newObj));
        window.location.href="./superHero.html";
    }
    else if(target.id=='heart-icon'){
        const parentId=target.parentNode.id;
        addtoFav(parentId);
        target.style.color="red";
    }
    else if(target.id=='favourite'){
        window.location.href="./favorites.html";
    }


}

//EvenListeners
searchInput.addEventListener('keyup', handlekeyup);

document.addEventListener('click', handleclick);

okBtn.addEventListener('click', function(){
    modal.style.display="none";
})
