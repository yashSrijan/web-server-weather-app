console.log('Client-side js side is loaded..')

//fetch api
//fetch is not part of JS it is a browser based api

// fetch('http://puzzle.mead.io/puzzle')
// .then( res => {
//     res.json().then( data => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=new%20delhi')
// .then(res => {
//     res.json().then( data => {
//         console.log(data)
//         if(data.error) { 
//             //do the error handling
//         } else {
//             //do the success handling
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const inputEle = document.querySelector('input')
const messageOne = document.querySelector('#one')
const messageTwo = document.querySelector('#two')

weatherForm.addEventListener('submit', (event) => {

    event.preventDefault()
    let address = inputEle.value
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${address}`)
    .then( res => {
        res.json().then( data => {
            console.log(data) //data would be {error: "Unable to find location. Try another search."} if an error has occurred
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.summary
                messageTwo.textContent = data.location
                inputEle.value = ""
            }
        })
    })

})