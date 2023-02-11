// var MD5 = require("crypto-js/md5"); 
// console.log(MD5("text to hash").toString());

// const md5 = require("crypto-js/md5");
// import md5 from 'blueimp-md5';



const searchInput=document.querySelector("#search-bar");

const hero=document.querySelector(".redirect");

let superheroData=[];

const publicKey = '11fdeac12c7c55621d7121737fadfa75';

const privateKey = 'b5c0842c43d41b4cc4d06a1c66bd625b59ae9117';

const ts = Date.now();

const hash = md5(ts + privateKey + publicKey);

const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=`;

const favourite=document.querySelector(".fav");

const heartIcons = document.querySelectorAll(".fa-solid.fa-heart");

let updatedUrl ="";

let favouriteArray=[];

const modal=document.querySelector("#modal");

const okBtn=document.querySelector("#ok");

okBtn.addEventListener('click', function(){
    modal.style.display="none";
})

if(localStorage.getItem('heroId')===null){
    localStorage.setItem('heroId', JSON.stringify([]));
}
if(localStorage.getItem('favourite')===null){
    localStorage.setItem('favourite', JSON.stringify([]));
}

function update(key){
    updatedUrl=url+key;
    console.log("updated", updatedUrl);
    getDataArray();
}

const listItem=document.querySelector("#list");

async function fetchData(){
    const response=  await fetch(updatedUrl);
    // console.log("response",response.data);
    const data= await response.json();
    // console.log("data",data)
    return data.data.results;
}


async function getDataArray() {
    superheroData=[];
    document.getElementById("loader").style.display = "block";
    let data=[];
    data = await fetchData();
    document.getElementById("loader").style.display = "none";
    superheroData=data;
    console.log("SuperHero",superheroData);
    getList(superheroData);
  }

function addtoFav(parentId){
    const newObj=superheroData.filter(val => val.id==parentId);
    favouriteArray=JSON.parse(localStorage.getItem('favourite'));
    let ifExist=true;
    for(let i=0; i<favouriteArray.length;i++){
        if(favouriteArray[i][0].id==newObj[0].id){
            ifExist=false;
            // alert("Already Added to favourites");
            modal.style.display="block";
        }
    }
    if(ifExist){
    favouriteArray.push(newObj);
    localStorage.setItem('favourite',JSON.stringify(favouriteArray));
    alert("Added to favourite");
    }

}

function getList(superheroData){
    listItem.innerHTML='';
    for(i=0;i<superheroData.length;i++){
        if(superheroData[i].thumbnail.path+""=== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            continue;
        }
        // console.log("id",superheroData[i].id)
        const li=document.createElement('li');
        li.innerHTML=
        `<div id="${superheroData[i].id}" class="imgContainer"><img id="${superheroData[i].id}" class="superHeroImg" src="${superheroData[i].thumbnail.path+"/portrait_medium.jpg"}" alt=""></div>
        <div id="${superheroData[i].id}" class="superHeroName">${superheroData[i].name}</div>
        <div id="${superheroData[i].id}" class="icon"><i id="heart-icon" class="fa-solid fa-heart"></i></div>`;
        listItem.append(li);
    }
}

function handlekeyup(e){
    const target=e.target;
    if(target.value===''){
        listItem.innerHTML='';
        return;
    }
    update(target.value);
}

function handleclick(e){
    const target=e.target;
    if(target.className=='superHeroImg' || target.className=='imgContainer' || target.className=='superHeroName'){
        console.log(superheroData);
        const newObj= superheroData.filter(val => val.id==target.id)
        localStorage.setItem('heroId', JSON.stringify(newObj));
        console.log("id",JSON.parse(localStorage.getItem('heroId')));
        window.location.href="./superHero.html";
    }
    else if(target.id=='heart-icon'){
        const parentId=target.parentNode.id;
        addtoFav(parentId);
        target.style.color="red";
    }


}

searchInput.addEventListener('keyup', handlekeyup);

document.addEventListener('click', handleclick);
  