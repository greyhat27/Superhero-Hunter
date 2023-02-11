const listItem=document.querySelector("#list");

let favourite;

const item=document.querySelector(".listItem");

// console.log("fav", favourite)

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

function getList(){
    listItem.innerHTML='';
    favourite=JSON.parse(localStorage.getItem('favourite'));
    for(let i=0;i<favourite.length;i++){
        addListItem(favourite[i][0]);
        // console.log("favourite",favourite[i][0]);
}
}
getList();

function handleClick(e){
    const target=e.target;
    // e.stopPropagation();
    if(target.id=='removeBtn'){
        // e.stopPropagation();
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
        // e.stopPropagation()
        console.log("inside if");
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

document.addEventListener('click', handleClick);



