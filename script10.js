const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')

if(bar){
    bar.addEventListener('click', ()=>{
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click', ()=>{
        nav.classList.remove('active');
    })
}

// L'ancienne méthode pour appeler une API (utiliser les promises)

// fetch("https://www.breakingbadapi.com/api/").then(function(response){
//     return response.json();
// }).then(function(data){
//     console.log(data)
// })

// // La nouvelle méthode est d'utiliser async await

// async function get(){
//     const response = await fetch("https://www.breakingbadapi.com/api/");
//     const data = await response.json();
// }
// get()
