console.log("clients side javascript file is loaded");

// fetch('http://puzzle.mead.io/puzzle').then((response=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// }))



const weatherForm = document.querySelector("form");
const searchItem = document.querySelector('input')
const messageone= document.querySelector('#messsage1')
const messagetwo=document.querySelector('#message2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchItem.value
    
    messageone.textContent= 'loading...'
    messagetwo.textContent= ''
    fetch("http://localhost:3000/weather?address="+ location).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      //console.log(data.error);
      messageone.textContent = data.error
    } else {
    // console.log(data.location);
    messageone.textContent=data.location
    // console.log(data.forecast);
    messagetwo.textContent=data.forecast
    }
  });
});

    
})

