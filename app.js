const formulario = document.querySelector('#formContacto');
const btn = document.querySelector('#btnContacto')


const getData = () => {
  const datos = new FormData(formulario);
  const datosProcesados = Object.fromEntries(datos.entries());
  formulario.reset();
  return datosProcesados;

  /*  var usuario2 = {
       nombre: document.getElementById('txtnom')
 
   } */
}

const postData = async () => {
  const usuario = getData();
  try {
    const response = await fetch('https://localhost:7141/usuario/agregar', {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        'Content-type': 'application/json',
      }
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      const { nombre, apellido, telefono, email } = jsonResponse;
      alert(`Se agrego con exito el usuario ${nombre} ${apellido}`);
      console.log(` ${nombre} ${apellido}`);
    }

  } catch (error) {
    console.log(error);
  }
}

btn.addEventListener('click', (event) => {
  event.preventDefault();
  postData();
})


























/* 
fetch(url, {
    method: POST,
    body: JSON.stringify(datosCompletos),
    headers: {
        "Content-type": "application/json",
    },
})
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
 */
/*  const procesaTodo = (event) =>{
    event.preventDefault();
    const datos = new FormData(event.target);

    const datosCompletos = Object.fromEntries(datos.entries());
    console.log(datosCompletos);
    
 
} 
formulario.addEventListener('submit', procesaTodo); */

/* const procesaDatos = (event)=>{
    event.preventDefault();
    const datos = new FormData(event.target);
    const nombre = datos.get('nombre');
    console.log({nombre});
} */