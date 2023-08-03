let listaUsuarios = [];
let usuarios = `<tr id="fila-usuario">   
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Email</th>
<th scope="col">telefono</th>
<th scope="col">#</th>
</tr>`

const mostrarUsuarios = async () => {

  try {
    const respuesta = await fetch(`https://localhost:7141/usuario/listar`);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      datos.usuario.forEach(usuario => {
        listaUsuarios.push(usuario);
        usuarios += `
           <tr id='fila-${usuario.id}'>
             <td >${usuario.nombre}</td>
             <td>${usuario.apellido} </td>
             <td>${usuario.email} </td>
             <td>${usuario.telefono} </td> 
             <td>
             <button type="button" id="btnEditar" class="btn btn-primary btn-sm" onclick="funcionEditar(${usuario.id})">Editar</button>
             <a href="#myModal" class="" data-toggle="modal" id="abreModal">
             <button type="button" class="btn btn-danger btn-sm" onclick="funcionEliminar(${usuario.id})">Eliminar</button>
             </a>
             </td>
           </tr>                      
           `
      })
    } else if (respuesta === 401) {
      console.log('llave incorrecta');

    } else if (respuesta === 404) {
      console.log('usuario no existe');

    } else {
      console.log('hubo un error y no sabemos que paso');
    }

  } catch (error) {
    console.log(error);
  }

  document.getElementById("tablaUsuarios").innerHTML = usuarios;

}
mostrarUsuarios()
let usuarioSeleccionado = [];

function funcionEditar(id) {
  usuarioSeleccionado = listaUsuarios.filter(usuario => usuario.id == id);

  let filaEditable = '';
  // Crear una fila con los campos editables para el registro seleccionado 
  usuarioSeleccionado.forEach(usuario => {
    filaEditable = `
    <tr>
      <td>
      <input type="text" name="comentarios" id="nombre" value="${usuario.nombre}">
      </td>
      <td>
        <input type="text" name="comentarios" id="apellido" value="${usuario.apellido}">
      </td>
      <td> 
      <input type="text" name="comentarios" id="email" value="${usuario.email}">
      </td>
      <td><input type="text" name="comentarios" id="telefono" value="${usuario.telefono}"></td> 
      <td>
        <button type="button" id="btnGuardar" class="btn btn-success btn-sm" onclick="guardarEdicion(${usuario.id})">Guardar</button>
        <button type="button" class="btn btn-danger btn-sm" onclick="cancelarEdicion()">Cancelar</button>
      </td>
    </tr>
  `;
  })
  // Reemplazar la fila original con la fila editable
  document.getElementById(`fila-${id}`).innerHTML = filaEditable;
}

function guardarEdicion(idUsuario) {
  const EditarFila = document.querySelector(`#fila-${idUsuario}`);
  const btn = document.querySelector('#btnGuardar')
  let editarUsuario = '';

  editarUsuario = {
    id: idUsuario,
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    email: document.getElementById('email').value,
    telefono: document.getElementById('telefono').value
  }
  const modificarUsuario = async () => {
    const usuario = editarUsuario;
    let filaEditada = '';
    try {
      const response = await fetch(`https://localhost:7141/usuario/modificar`, {
        method: 'PUT',
        body: JSON.stringify(usuario),
        headers: {
          'Content-type': 'application/json',
        }
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const { nombre, apellido, telefono, email } = jsonResponse;

        filaEditada += `
           <tr id='fila-${usuario.id}'>
             <td>${usuario.nombre}</td>
             <td>${usuario.apellido} </td>
             <td>${usuario.email} </td>
             <td>${usuario.telefono} </td> 
             <td>
             <button type="button" id="btnEditar" class="btn btn-primary btn-sm" onclick="funcionEditar(${usuario.id})">Editar</button>
             <a href="#myModal" class="" data-toggle="modal" id="abreModal">
             <button type="button" class="btn btn-danger btn-sm" onclick="funcionEliminar(${usuario.id})">Eliminar</button>
             </a>
             </td>
           </tr>                      
           `
      }
      document.getElementById(`fila-${idUsuario}`).innerHTML = filaEditada;
    } catch (error) {
      console.log(error);
    }
  }
  modificarUsuario();
}

function funcionEliminar(idUsuario) {
  let usuarioAeliminar = listaUsuarios.filter(usuario => usuario.id = idUsuario);
  let btnEliminar = document.getElementById("btnEliminar");
  let usuario = '';

usuarioAeliminar.forEach(usuario =>{
  usuario = usuario.id;
})

  btnEliminar.addEventListener('click',() =>{
    const eliminarUsuario = async () => {
      try {
        const response = await fetch(`https://localhost:7141/usuario/eliminar`, {
          method: 'DELETE',
          body: JSON.stringify(usuario),
          headers: {
            'Content-type': 'application/json',
          }
        });
        if(response.ok){
          const jsonResponse = await response.json();
          $('#myModal').modal({ show:false });
          $('#myModal2').modal({ show:true });
          
        }
      }
      catch (error) {
        console.log(error);
      }
    }
eliminarUsuario();
  })

  
}
