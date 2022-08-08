
//Constructores - 173 Alvias Cristian sheshh

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.tipo = tipo;
    this.year = year;
}

Seguro.prototype.cotizarSeguro= function(){
    //base del costo del seguro
    let cantidad;
    const base = 2000;

    switch(this.marca){
        case "1":
        cantidad = base * 1.15;
            break;
        case "2":
            cantidad = base * 1.05;
            break;
        case "3":
            cantidad = base * 1.35;
            break
        default:
            break;
    }

    //leer el año - cada año que el costo es menor el costo se reduce 3%
    const diferencia = new Date().getFullYear() - parseInt(this.year);

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        Si el seguro es basico se multiplica por un 30% mas
        Si el seguro es basico se multiplica por un 50% mas
    */
        
    if (this.tipo === "basico") {
        cantidad *= 1.3;
    }else{
        cantidad *= 1.5; 
    }

    return cantidad;
}


function UI(){
}

//Llena las opciones de los años
UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector("#year");

    for (let i = max; i > min ; i--) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Muesta alertas en pantalla
UI.prototype.mostrarMensaje = function(mensaje, tipo){
    const div = document.createElement("div");

    if (tipo === "error") {
        div.classList.add("error");
    }else{
        div.classList.add("correcto");
    }

    div.classList.add("mensaje", "mt-10");
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div, document.querySelector("#resultado"));

    setTimeout(()=>{
        div.remove();
    },3000);
}

//Mostrar resultado
UI.prototype.mostrarResultado = function(total, seguro){
    //Descructuring de pro player
    const {marca, year, tipo} = seguro;
    let modeloMarca;
    switch(marca){
        case "1":
            modeloMarca = "Americano"
            break;
        case "2":
            modeloMarca = "Asiatico"
            break;
        case "3":
            modeloMarca = "Europeo"
            break;
        default:
            break;
    }
    //crear el resultado para el HTML
    const div = document.createElement("div");
    div.classList.add("mt-10");

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${modeloMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
    `;

    const resultado = document.querySelector("#resultado");
    
    //Mostrar Spinner
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";

    setTimeout(()=>{
        spinner.style.display="none";
        //Se borra el spinner y se muestra el resultado
        resultado.appendChild(div);
    },3000)
}

//Instanciar UI
const ui = new UI();
console.log(ui);

document.addEventListener("DOMContentLoaded", ()=>{
    ui.llenarOpciones(); //llena el select con los años
});

//Eventos
eventListeners();
function eventListeners(){
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit", cotizarSeguro);
}


function cotizarSeguro(evt){
    evt.preventDefault();
    //Leer la marca seleccionada
    const marca = document.querySelector("#marca").value;
    //Leer el año seleccionado
    const year = document.querySelector("#year").value;
    
    //Leer el tipo seleccionado - radio button
    const tipo = document.querySelector("input[name='tipo']:checked").value;
    
    if (marca === "" || year === "" || tipo === "") {
        ui.mostrarMensaje("Todos los campos son obligatorios", "error")
        return;
    }
    ui.mostrarMensaje("Cotizando...", "correcto")

    //ocultar las cotizaciones previas
    const resultados = document.querySelector("#resultado div");

    if (resultados != null) {
        resultados.remove();
    }

    // Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();


    // Utilizar el prototype que va a cotizar...
    ui.mostrarResultado(total, seguro);

}