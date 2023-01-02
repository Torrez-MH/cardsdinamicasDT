let contenido = document.getElementById("contenidoTotal");
let contenidoUpComing = document.getElementById("contenidoUpComing")
let contenidoPast = document.getElementById("contenidoPast")
let dataStats;
let datos;

fetch("https://amazing-events.onrender.com/api/events")
.then((res) => res.json())
.then( data => {
    let datos = data
    let dataStats = data.events
    let mayor = porcentajeMayor(dataStats)
    let menor = porcentajeMenor(dataStats)
    let nicho = capacidadMayor(dataStats)
    tablaHTML(mayor.nombre, menor.nombre, nicho.nombre, contenido)
    
    
    eventosUp(dataStats, contenidoUpComing)
    function eventosUp(eventos, contenedor){
        contenedor.innerHTML = ''
        let listaEventosUp = ''
        let filtradoEventosUp = eventos.filter(events => events.date > datos.currentDate)
        filtradoEventosUp.forEach((elemento) => {
            listaEventosUp += `
            <tr class="text-center">
                <td class="text-start">${elemento.name}</td>
                <td>${(elemento.price * elemento.estimate).toLocaleString()}</td>
                <td>${(elemento.estimate*100 / elemento.capacity).toFixed(2)}%</td>
            </tr>
            `
        })
        contenedor.innerHTML = listaEventosUp
    }
    
    eventosPast(dataStats, contenidoPast)
    function eventosPast(eventos, contenedor){
        contenedor.innerHTML = ''
        let listaEventosPast = ''
        let filtradoEventosPast = eventos.filter(events => events.date < datos.currentDate)
        filtradoEventosPast.forEach((elemento) => {
            listaEventosPast += `
            <tr class="text-center">
                <td class="text-start">${elemento.name}</td>
                <td>${(elemento.price * elemento.assistance).toLocaleString()}</td>
                <td>${(elemento.assistance * 100 / elemento.capacity).toFixed(2)}%</td>
            </tr>
            `
        })
        contenedor.innerHTML = listaEventosPast
    }
    
    
    
    console.log(datos)
})
.catch((err) => console.log(err))



//funciones para el manejo del fetch

function tablaHTML(eventoMayor, eventoMenor, eventoCapacidad, contenedor){ //funcion muestra data en html
    let tabla = ` 
    <tr class="text-center">
    <td>${eventoMayor}</td>
    <td>${eventoMenor}</td>
    <td>${eventoCapacidad}</td>
    </tr>
    `// variable para reunir datos en la tabla
    contenedor.innerHTML += tabla //envia los datos al html
}


function porcentajeMayor (eventos){
    let asistenciaEventos = eventos.filter (element => element.assistance)
    let porcentajeEventos = asistenciaEventos.map(element => {
        let coop = {
            nombre: element.name,
            porcentaje: element.assistance / element.capacity * 100 
        }
        return coop
    })
    let porcentajeMayorOrdenado = porcentajeEventos.sort( (a, b) => a.porcentaje - b.porcentaje)
    return porcentajeMayorOrdenado.slice(-1)[0]
}

function porcentajeMenor (eventos){
    let asistenciaEventos = eventos.filter (element => element.assistance)
    let porcentajeEventos = asistenciaEventos.map(element => {
        let coop = {
            nombre: element.name,
            porcentaje: element.assistance / element.capacity * 100 
        }
        return coop
    })
    let porcentajeMenorOrdenado = porcentajeEventos.sort( (a, b) => a.porcentaje - b.porcentaje)
    return porcentajeMenorOrdenado.slice(0,1)[0]
}

function capacidadMayor (eventos){
    let capacidadEventos = eventos.map(element =>{
        let coop = {
            nombre: element.name,
            capacidad: element.capacity
        }
        return coop
    })
    let capacidadMayorOrdenado = capacidadEventos.sort ((a,b) => a.capacidad - b.capacidad)
    return capacidadMayorOrdenado.slice(-1)[0]
}



