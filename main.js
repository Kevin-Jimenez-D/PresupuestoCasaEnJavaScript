let myfrom=document.querySelector("form");       //Va a apuntar a todos los forms
let myTabla=document.querySelector("#myData");  //Va a apuntar a la primera tabla que se llena en el HTML

//BUSCARV
let searchForm = document.querySelector("#searchForm"); // selecciona el formulario de búsqueda donde se evidenciará los resultados al colocar el ID
let searchTableBody = document.querySelector("#search"); // selecciona el tbody de búsqueda donde se evidenciara en el HTML la ID buscada
//BUSCARV



//Saldo total
// Crear dos arrays para almacenar los valores de ingreso y egreso

let showTotal=document.querySelector("#saldoTotal");    //Apunta a una tabla en el HTML para evidenciar el saldo total
let valoresIngreso = [];
let valoresEgreso = [];

//Saldo total

//EDITAR
// Agregar un evento "submit" al formulario de edición
const editForm = document.querySelector("#edit");       //Para rastrear el evento cuando se vaya a editar algo
//EDITAR

//ELIMINAR
// Agregar un evento "submit" al formulario de eliminación
const deleteForm = document.querySelector("#delete");    //Para rastrear el evento cuando se vaya a eliminar algo
//ELIMINAR

//ACTUALIZAR
const actualizarForm=document.querySelector("#actualizar");  //Para rastrear el evento cuando se vaya a actualizar algo, como si se actualizara toda la pagina
//ACTUALIZAR

let datosID=[];     //Esto es para guardar el ID de cada uno de los datos
let datosValor=[];  //Esto es para guardar los valores de dinero
let datosCaja=[];   //Esto es para guardar si es ingreso o egreso

addEventListener("DOMContentLoaded", async()=>{
    let res = await (await fetch("https://6509e7e7f6553137159c3ae5.mockapi.io/presupuestoCasa")).json();
    //console.log(res);            //Aca guarda en un array lo que trae del HTML, como en forma de diccionario
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

    
    //Saldo total 
    
        //lo hace bien con el boton actualizar valores
        // Iterar a través de los datos y clasificarlos en los arrays correspondientes
        //Los valores de ingreso los guarda en el array ingreso, lo mismo con lo de los egresos
        for (let i = 0; i < datosCaja.length; i++) {
            if (datosCaja[i] === 'ingreso') {
                valoresIngreso.push(datosValor[i]);
            } else if (datosCaja[i] === 'egreso') {
                valoresEgreso.push(datosValor[i]);
            }
        }
        //.reduce() es un método de los arrays en JavaScript que se utiliza para reducir un array a un solo valor
        //En esta función, total representa el acumulador de la suma
        //valor representa el valor actual del elemento que está siendo procesado.
        //total + valor simplemente suma el valor actual (valor) al acumulador (total) en cada iteración.
        //es el valor inicial del acumulador, que en este caso es 0. Esto significa que la suma comenzará desde cero.

        // Sumar todos los valores de ingreso
        let sumaValoresIngreso = valoresIngreso.reduce((total, valor) => total + valor, 0);

        // Sumar todos los valores de egreso
        let sumaValoresEgreso = valoresEgreso.reduce((total, valor) => total + valor, 0);

        // Ahora, tienes dos arrays: valoresIngreso y valoresEgreso, que contienen los valores según su tipo de caja
        //console.log('Valores de Ingreso:', valoresIngreso);
        //console.log('Valores de Egreso:', valoresEgreso);

        // Imprimir las sumas
        //console.log('Suma de Valores de Ingreso:', sumaValoresIngreso);
        //console.log('Suma de Valores de Egreso:', sumaValoresEgreso);

    //Saldo total


    //Saldo total
    showTotal.innerHTML = `
    <tr>
        <td>${sumaValoresIngreso}</td>
        <td>${sumaValoresEgreso}</td>
        <td>${sumaValoresIngreso-sumaValoresEgreso}</td>
    </tr>
    `;
    
    //Saldo total
    

    //console.log(datosID)           //y acá los visualizo

})

//stringify para pasarlo por una web en forma de cadena
//en el id del mockapi el presupuestoCasa es el nombre de la API que aparece enla aplicacion al abrirla
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
    //console.log(res);
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
        //Se evidencia en el HTML
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

//EDITAR
/*
editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener los valores de ID y el nuevo valor del formulario de edición
    const idToEdit = document.querySelector("input[name='EditarID']").value;                  //Aca debo dejarlo en string para que me analice con datosID
    const newValue = parseFloat(document.querySelector("input[name='EditarValor']").value);

    // Buscar el índice de la ID en el array datosID
    const foundIndex = datosID.indexOf(idToEdit);                                             //Aca mira si el dato ingresado en el HTML esta en el array

    console.log(idToEdit);    //numerico y es el valor que coloco en el HTML en el ID   
    console.log(newValue);    //numerico y es el valor que coloco en el HTML en el Valor   

    // Verificar si la ID existe en los datos
    if (foundIndex !== -1) {
        // Actualizar el valor en el array datosValor
        datosValor[foundIndex] = newValue;

        // Actualizar el valor en la tabla HTML
        const rowToUpdate = myTabla.querySelector(`tr:nth-child(${foundIndex + 1})`);
        rowToUpdate.querySelector("td:nth-child(2)").textContent = newValue;

        // Limpiar los campos de edición
        document.querySelector("input[name='EditarID']").value = "";
        document.querySelector("input[name='EditarValor']").value = "";
    } else {
        // Si la ID no se encuentra, muestra un mensaje de error
        alert("ID no encontrada");
    }
});
*/

editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const idToEdit = document.querySelector("input[name='EditarID']").value;
    const newValue = parseFloat(document.querySelector("input[name='EditarValor']").value);
    const foundIndex = datosID.indexOf(idToEdit);

    if (foundIndex !== -1) {
        datosValor[foundIndex] = newValue;

        //En este caso, se está utilizando una plantilla de cadena (template literal) para crear una cadena de consulta dinámica. ${foundIndex + 1} se utiliza para seleccionar la fila específica que corresponde al elemento que se está editando
        //selector CSS que busca una fila (<tr>) en la tabla. ${foundIndex + 1} se utiliza para calcular dinámicamente el número de fila que se debe seleccionar. 
        //como las filas de la tabla comienzan en 1 (en lugar de 0), se le suma 1 para ajustar el índice.
        const rowToUpdate = myTabla.querySelector(`tr:nth-child(${foundIndex + 1})`);


        //se utiliza para seleccionar la segunda celda (<td>) dentro de la fila. En una tabla HTML, las celdas se numeran desde 1, por lo que nth-child(2) selecciona la segunda celda.
        //nth-child(2) selecciona la segunda celda.
        //.textContent se utiliza para modificar el contenido de texto dentro de la celda seleccionada.
        rowToUpdate.querySelector("td:nth-child(2)").textContent = parseFloat(newValue);
        //console.log(newValue);

        document.querySelector("input[name='EditarID']").value = "";
        document.querySelector("input[name='EditarValor']").value = "";

        // Actualizar los datos en el servidor
        const updateData = {
            valor: newValue
        };
        //Metodo PUT para editar en mockapi
        let config = {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updateData)
        };
        
        //Se trabaja dinamicamente desde la URL para saber la ID a editar y agregarlo en la URL
        const apiUrl = `https://6509e7e7f6553137159c3ae5.mockapi.io/presupuestoCasa/${idToEdit}`;
        await fetch(apiUrl, config);

    } else {
        alert("ID no encontrada");
    }
});
//EDITAR

//ELIMINAR
/*
deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener la ID que se va a eliminar desde el formulario
    const idToDelete = document.querySelector("input[name='deleteID']").value;

    // Buscar el índice de la ID en el array datosID
    const foundIndex = datosID.indexOf(idToDelete);

    // Verificar si la ID existe en los datos
    if (foundIndex !== -1) {
        // Eliminar la ID y su valor correspondiente de los arrays
        datosID.splice(foundIndex, 1);
        datosValor.splice(foundIndex, 1);
        datosCaja.splice(foundIndex, 1);

        // Eliminar la fila de la tabla HTML
        const rowToDelete = myTabla.querySelector(`tr:nth-child(${foundIndex + 1})`);
        rowToDelete.remove();

        // Limpiar el campo de eliminación
        document.querySelector("input[name='deleteID']").value = "";
    } else {
        // Si la ID no se encuentra, muestra un mensaje de error
        alert("ID no encontrada");
    }
});
*/

deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    //En este caso, está buscando un elemento <input> que tenga un atributo name igual a "deleteID", que esta en el HTML de la tabla para eliminar
    //Ese dato, que es el que ingresa el usuario, es el que comparara con el array
    const idToDelete = document.querySelector("input[name='deleteID']").value;
    const foundIndex = datosID.indexOf(idToDelete);

    if (foundIndex !== -1) {
        // Eliminar la ID y su valor correspondiente de los arrays
        //El método splice se utiliza para modificar un array al agregar, eliminar o reemplazar elementos. Toma dos argumentos principales:
        //1: Este segundo argumento especifica cuántos elementos deben eliminarse a partir del índice dado
        datosID.splice(foundIndex, 1);
        datosValor.splice(foundIndex, 1);
        datosCaja.splice(foundIndex, 1);

        // Eliminar la fila de la tabla HTML
        //selector CSS que busca una fila (<tr>) en la tabla. ${foundIndex + 1} se utiliza para calcular dinámicamente el número de fila que se debe seleccionar. 
        const rowToDelete = myTabla.querySelector(`tr:nth-child(${foundIndex + 1})`);
        rowToDelete.remove();

        document.querySelector("input[name='deleteID']").value = "";

        // Eliminar los datos en el servidor
        const apiUrl = `https://6509e7e7f6553137159c3ae5.mockapi.io/presupuestoCasa/${idToDelete}`;
        await fetch(apiUrl, { method: "DELETE" });
    } else {
        alert("ID no encontrada");
    }
});

//ELIMINAR

//ACTUALIZAR
actualizarForm.addEventListener("submit", async (e) => {
    //Saldo total 
    
        //lo hace bien pero solo cuando oprimo el boton Buscar ID
        // Iterar a través de los datos y clasificarlos en los arrays correspondientes
        for (let i = 0; i < datosCaja.length; i++) {
            if (datosCaja[i] === 'ingreso') {
                valoresIngreso.push(datosValor[i]);
            } else if (datosCaja[i] === 'egreso') {
                valoresEgreso.push(datosValor[i]);
            }
        }

        // Sumar todos los valores de ingreso
        let sumaValoresIngreso = valoresIngreso.reduce((total, valor) => total + valor, 0);

        // Sumar todos los valores de egreso
        let sumaValoresEgreso = valoresEgreso.reduce((total, valor) => total + valor, 0);

        // Ahora, tienes dos arrays: valoresIngreso y valoresEgreso, que contienen los valores según su tipo de caja
        //console.log('Valores de Ingreso:', valoresIngreso);
        console.log('Valores de Egreso:', valoresEgreso);

        // Imprimir las sumas
        //console.log('Suma de Valores de Ingreso:', sumaValoresIngreso);
        console.log('Suma de Valores de Egreso:', sumaValoresEgreso);

    //Saldo total


    //Saldo total
    showTotal.innerHTML = `
    <tr>
        <td>${sumaValoresIngreso}</td>
        <td>${sumaValoresEgreso}</td>
        <td>${sumaValoresIngreso-sumaValoresEgreso}</td>
    </tr>
    `;
    
    //Saldo total
});
//ACTUALIZAR