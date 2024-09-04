window.addEventListener('load', ()=>{
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescription = document.getElementById('temperatura-description')
    
    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-animado')

    let vientoVelocidad = document.getElementById('viento-velocidad')

    let floodProbability = document.getElementById('flood-probability');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion => {
            console.log(posicion.coords.latitude)
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
        
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4082a2eb16996af8327b4b65825327ea&units=metric&lang=es`

            //console.log(url)
            fetch(url)
             .then( response => {return response.json() })
             .then( data => {
                console.log(data)
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} °C`

                let desc = data.weather[0].description
                temperaturaDescription.textContent = `${desc}`

                ubicacion.textContent = data.name

                if (data.rain) {
                  floodProbability.textContent = `${data.rain['1h'] * 10}%`;
                } else {
                  floodProbability.textContent = '0%';
                }

                vientoVelocidad.textContent = `${data.wind.speed} m/s`

                 switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                }

             })
             .catch( error => {
                console.log(error)
             })
        })
    };
});