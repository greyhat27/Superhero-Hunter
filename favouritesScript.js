//variable declarations
const listItem=document.querySelector("#list");

let favourite;

const item=document.querySelector(".listItem");

//function to append list item(superhero) to favourites list
function addListItem(item){
    const li=document.createElement('li');
    li.innerHTML=
    `<div id="listItem" data-id="${item.id}">
    <img id="heroImg" data-id="${item.id}" src="${item.thumbnail.path+"/portrait_incredible.jpg"}" alt="">
    <h3>${item.name}</h3>
    <button id="removeBtn" data-id="${item.id}">Remove from favourites</button>
    </div>`;
    listItem.append(li);
}

//function to get list it is calling addListItem function
function getList(){
    listItem.innerHTML='';
    favourite=JSON.parse(localStorage.getItem('favourite'));
    for(let i=0;i<favourite.length;i++){
        addListItem(favourite[i][0]);
}
}
getList();// function  call to get favourite list

//callback function of event listener to handle click event
function handleClick(e){
    const target=e.target;
    if(target.id=='removeBtn'){
        const removeId=target.dataset.id
        favourite=JSON.parse(localStorage.getItem('favourite'));
        listItem.innerHTML='';
        for(let i=0;i<favourite.length;i++){
            if(favourite[i][0].id==removeId){
                favourite.splice(i,1);
                i--;
            }
            else{
                addListItem(favourite[i][0]);
            }
        }
        localStorage.setItem('favourite', JSON.stringify(favourite));
    }
    else if(target.id=='heroImg'){
        favourite=JSON.parse(localStorage.getItem('favourite'));
        for(var i=0;i<favourite.length;i++){
            if(favourite[i][0].id==target.dataset.id){
                localStorage.setItem('heroId',JSON.stringify(favourite[i]));
                break;
            }
        }
        window.location.href="./superHero.html";
    }
}

// eventListener
document.addEventListener('click', handleClick);



