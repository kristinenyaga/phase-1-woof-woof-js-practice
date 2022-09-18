document.addEventListener("DOMContentLoaded",()=>{
  fetchDog()

})

function fetchDog(){
  fetch(" http://localhost:3000/pups")
  .then(response => response.json())
  .then(response => {

    response.forEach(dog =>returnedNames(dog.name))

 
  })
}

let returnedNames= function (name){
  let dogBar=document.querySelector("#dog-bar")
  let dog=document.createElement("span")
  dog.innerText=name
  dogBar.appendChild(dog)
  dog.addEventListener("click",getPup)

}

let getPup=(e)=>{
  let selectedPup=e.target.innerText
  fetch("http://localhost:3000/pups")
  .then(response => response.json())
  .then(dogs =>{
    createDog(dogs,selectedPup)
  })
}

let createDog=(dogs,selectedPup)=>{
  filteredDog=dogs.find(dog => dog.name === selectedPup)
  console.log(filteredDog)
  let status;
  filteredDog.isGoodDog === true?
  (status=`<button>Good Dog</button>`):
  (status=`<button>Bad Dog</button>`)
  let dogInfo=document.querySelector("#dog-info")
  dogInfo.innerHTML=''

  let dog=document.createElement("div")
  dog.setAttribute("id",`${filteredDog.id}`)
  dog.innerHTML=`
  <img src="${filteredDog.image}" />
  <h2>${filteredDog.name}</h2>
  ${status}

  `
  dogInfo.appendChild(dog)
  dog.querySelector("button").addEventListener("click",handleClick)
  console.log(dog)
}

let handleClick=(e)=>{
 let text=e.target.innerText
 console.log(text)
 if(text === "Bad Dog"){
  let changedText=e.target.innerText='Good Dog'
 let id=e.target.parentNode.id
  console.log(id)
  updateDb(id)
  // text.innerHTML='Good Dog'
 }
 else{
  e.target.innerText='Bad Dog'
 }


}
// in progress
let updateDb=(id)=>{
  fetch(`http://localhost:3000/pups/${id}`,{
    method:"PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      "isGoodDog":'false'
    })
    
  })
}