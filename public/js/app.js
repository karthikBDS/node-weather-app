console.log('a script included')


const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const errorDiv = document.querySelector('#errorDiv')
const messageDiv = document.querySelector('#messageDiv')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorDiv.textContent = ''
    messageDiv.textContent = 'Fetching result for '+address.value
    fetch('/weather?address='+address.value).then((response) => {
        response.json().then((data) => {
            if(data.error){    
                errorDiv.textContent = data.error
                messageDiv.textContent = '' 
            }else{
                console.log(data)
                errorDiv.textContent = ''
                messageDiv.textContent = 'It is currently '+ data.temprature+' degrees out. It feels like '+ data.feelslike+' degrees out at '+data.location
            }
        })
    })
    
})