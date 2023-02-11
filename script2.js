const heroCard=document.querySelector("#heroCard");

const heroId=JSON.parse(localStorage.getItem('heroId'));

console.log(heroId);


const favButton = document.getElementById("addFav");

const modal=document.querySelector("#modal");

favButton.addEventListener("click", function(e) {
  e.stopPropagation();
  let fav = JSON.parse(localStorage.getItem("favourite")) || [];
  let ifExist=true;
  for(i=0;i<fav.length;i++){
    // console.log("fav id",fav[i][0].id);
    if(fav[i][0].id===heroId[0].id){
        ifExist=false;
    }
  }
  console.log(ifExist);
  if(ifExist){
    fav.push(heroId);
    localStorage.setItem("favourite", JSON.stringify(fav));
    alert("Added to favourites");   
  }
  else{
    // alert("Alredy added to favourites");
    modal.style.display="block";
  }
})
modal.addEventListener('click',function(){
  modal.style.display="none";
})

// async function fetchData(){

//     const response=  await fetch(url);
//     // console.log("response",response.data);
//     const data= await response.json();
//     // console.log("data",data)
//     return data.data.results;

// }

// async function arr(){
//     let data;
//     data=await fetchData();
//     console.log("data",data);
// }

// arr();



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

