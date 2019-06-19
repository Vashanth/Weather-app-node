console.log("JS client side loaded")

const loc = document.querySelector('input')
const weather = document.querySelector('form')

const weat = document.querySelector('.weat')
const locs = document.querySelector('.locs')

weather.addEventListener('submit',(e)=>{
    weat.textContent="LOADING..."
    locs.textContent="LOADING..."
    e.preventDefault();
    fetch('/weather?address='+loc.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            weat.textContent=data.error
            else
            {
                weat.textContent=data.forecast
                locs.textContent=data.location
            }
        })
    })

})
