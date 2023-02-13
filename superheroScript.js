// variable declarations
const heroCard=document.querySelector("#heroCard");

const heroId=JSON.parse(localStorage.getItem('heroId'));

const favButton = document.getElementById("addFav");

const modal=document.querySelector("#modal");

//event listener on add to favourites button
favButton.addEventListener("click", function(e) {
  e.stopPropagation();
  let fav = JSON.parse(localStorage.getItem("favourite")) || [];
  let ifExist=true;
  for(i=0;i<fav.length;i++){
    if(fav[i][0].id===heroId[0].id){
        ifExist=false;
    }
  }
  if(ifExist){
    fav.push(heroId);
    localStorage.setItem("favourite", JSON.stringify(fav));
    alert("Added to favourites");   
  }
  else{
    modal.style.display="block";
  }
})

//on click ok button modal display set to none
modal.addEventListener('click',function(){
  modal.style.display="none";
})

// if heroId present then append in the list and render
if(heroId){
    const div=document.createElement('div');
    div.innerHTML=
    `<h1 id="heroName">${heroId[0].name}</h1>
    <div id="heroDetails">
    <img src="${heroId[0].thumbnail.path+"/portrait_uncanny.jpg"}" id="heroImg" alt="">
    <div id="details">
    <div class="element">Comics:${heroId[0].comics.available}</div>
    <div class="element">Events:${heroId[0].events.available}</div>
    <div class="element">Series:${heroId[0].series.available}</div>
    <div class="element">Stories:${heroId[0].stories.available}</div>
    </div>
    </div>`;
    heroCard.append(div);
    div.setAttribute('id','heroContainer')
}

