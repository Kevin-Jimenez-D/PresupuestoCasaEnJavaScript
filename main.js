let myfrom=document.querySelector("form");       
let myTabla=document.querySelector("#myData");  //Va a apuntar a la primera tabla que se llena en el HTML

//BUSCARV
let searchForm = document.querySelector("#searchForm"); // selecciona el formulario de búsqueda donde se evidenciará los resultados al colocar el ID
let searchTableBody = document.querySelector("#search"); // selecciona el tbody de búsqueda donde se evidenciara en el HTML la ID buscada
//BUSCARV

let datosID=[];     //Esto es para guardar el ID de cada uno de los datos
let datosValor=[];  //Esto es para guardar los valores de dinero
let datosCaja=[];   //Esto es para guardar si es ingreso o egreso

addEventListener("DOMContentLoaded", async()=>{
    let res = await (await fetch("https://6509e7e7f6553137159c3ae5.mockapi.io/presupuestoCasa")).json();
    console.log(res);            //Aca guarda en un array lo que trae del HTML, como en forma de diccionario
    //extrae cada uno de los elementos con el for y los va agregando al HTML
    for(let i=0; i< res.length ; i++){
        myTabla.insertAdjacentHTML("beforeend", `
        <tr>
            <td>${res[i].id}</td>
            <td>${res[i].valor}</td>
            <td>${res[i].caja}</td>       
        </tr>
        `);

        datosID.push(res[i].id)    //Con esto agrego todos los id en este array
        //BUSCARV
        datosValor.push(res[i].valor);  //Los guardo en un array para luego utilizarlos, en este caso el dinero
        datosCaja.push(res[i].caja);    //LOs guardo en un array para luego utilizarlos, en este caso ingreso o egreso
        //BUSCARV
    }

    console.log(datosID)           //y acá los visualizo

})

myfrom.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.target));
    const {valor} =data;
    data.valor=(typeof valor === "string") ? Number(valor) : null;
    let config={
        method:"POST",
        headers : {"content-type" : "application/json"},
        body: JSON.stringify(data)
    };
    let res = await (await fetch("https://6509e7e7f6553137159c3ae5.mockapi.io/presupuestoCasa",config)).json();
    console.log(res);
})


//BUSCARV Hace la busqueda al colocar la ID, y darle en buscar ID, en caso de que no exista, dice que no existe y se ve en el HTML
//searchForm con el id #searchForm es la tabla donde se buscaran las IDs, si se le da submit, buscara el evento en ese formulario
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    //En este caso, está buscando un elemento <input> que tenga un atributo name igual a "ID", que esta en el HTML de la tabla para buscar
    //Ese dato, que es el que ingresa el usuario, es el que comparara con el array
    const idToSearch = document.querySelector("input[name='ID']").value;
    
    // Realiza la búsqueda de la ID en los datos (busca en el array datosID si esta la ID que coloco el usuario)
    const foundIndex = datosID.indexOf(idToSearch);
    
    if (foundIndex !== -1) {
        // La ID fue encontrada, muestra el resultado en la tabla de búsqueda
        //console.log(foundIndex);   
        //console.log(datosValor);
        //console.log(datosCaja);
        searchTableBody.innerHTML = `
            <tr>
                <td>${datosID[foundIndex]}</td>
                <td>${datosValor[foundIndex]}</td>
                <td>${datosCaja[foundIndex]}</td>
            </tr>
        `;
    } else {
        // La ID no fue encontrada, muestra un mensaje de error o haz lo que necesites
        searchTableBody.innerHTML = `<tr><td colspan="3">ID no encontrada</td></tr>`;
    }
});

//BUSCARV