let listaUsuarios = [];
var EliminaridUsuario = '';
var modal = '';
var modal4 = '';

const ObtenerUsuarios = async () => {
  listaUsuarios = [];

  try {
    const respuesta = await fetch(`https://localhost:7141/usuario/listar`);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      datos.usuario.forEach(usuario => {
        listaUsuarios.push(usuario);
        MostrarUsuarios()
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

}
ObtenerUsuarios();

function MostrarUsuarios() {
  let usuarios = `
  <tr id="fila-usuario">   
    <th scope="col">Nombre</th>
    <th scope="col">Apellido</th>
    <th scope="col">Email</th>
    <th scope="col">telefono</th>
    <th scope="col">#</th>
  </tr>`

  listaUsuarios.forEach(usuario => {
    usuarios += `
           <tr id='fila-${usuario.id}'>
             <td >${usuario.nombre}</td>
             <td>${usuario.apellido} </td>
             <td>${usuario.email} </td>
             <td>${usuario.telefono} </td> 
             <td>
                <button type="button" id="btnEditar" class="btn btn-primary btn-sm" onclick="funcionEditar(${usuario.id})">Editar</button>             
                <button type="button" class="btn btn-danger btn-sm" onclick="funcionEliminar(${usuario.id})">Eliminar</button>             
             </td>
            </tr>                      
           `
  })
  document.getElementById("tablaUsuarios").innerHTML = usuarios;
}
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
        <button type="button" class="btn btn-danger btn-sm" onclick="cancelarEdicion(${usuario.id})">Cancelar</button>
      </td>
    </tr>
  `;
  })
  // Reemplazar la fila original con la fila editable
  document.getElementById(`fila-${id}`).innerHTML = filaEditable;
}

function guardarEdicion(idUsuario) {
  let editarUsuario = '';
  let usuarioFiltrado = [];
  let bandera = false;
  let nombreModificado = document.getElementById('nombre').value;
  let apellidoModificado = document.getElementById('apellido').value;
  let emailModificado = document.getElementById('email').value;
  let telModificado = document.getElementById('telefono').value;


  usuarioFiltrado = listaUsuarios.filter(usuario => usuario.id == idUsuario)

  usuarioFiltrado.forEach(usuario => {
    if (usuario.nombre != nombreModificado) {
      bandera = true;

    } else if (usuario.apellido != apellidoModificado) {
      bandera = true;

    } else if (usuario.email != emailModificado) {
      bandera = true;
    } else if (usuario.telefono != telModificado) {
      bandera = true;
    }
  })

  if (bandera) {
    editarUsuario = {
      id: idUsuario,
      nombre: nombreModificado,
      apellido: apellidoModificado,
      email: emailModificado,
      telefono: telModificado
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
          const modalConfirmado = new bootstrap.Modal(document.getElementById('myModal3'));
          modalConfirmado.show();
          ObtenerUsuarios();
        }

      } catch (error) {
        console.log(error);
      }
    }
    modificarUsuario();
  } else {
    ObtenerUsuarios();
  }

}
let btnEliminar = document.getElementById('btnEliminar');
btnEliminar.addEventListener('click', () => {

  const eliminarUsuario = async () => {
    try {
      const response = await fetch(`https://localhost:7141/usuario/eliminar?idUsuario=${EliminaridUsuario}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        }
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        const { id } = jsonResponse;

        modal.hide();
        const modalConfirmado = new bootstrap.Modal(document.getElementById('myModal2'));
        modalConfirmado.show();
        ObtenerUsuarios();

      }
    }
    catch (error) {
      console.log(error);
    }
  }
  eliminarUsuario();
})
function funcionEliminar(idUsuario) {
  EliminaridUsuario = idUsuario;
  modal = new bootstrap.Modal(document.getElementById('myModal'));

  modal.show();
}

function cancelarEdicion(idUsuario) {
  let usuarioFiltrado = [];
  let bandera = false;
  let nombreModificado = document.getElementById('nombre').value;
  let apellidoModificado = document.getElementById('apellido').value;
  let emailModificado = document.getElementById('email').value;
  let telModificado = document.getElementById('telefono').value;


  usuarioFiltrado = listaUsuarios.filter(usuario => usuario.id == idUsuario)

  usuarioFiltrado.forEach(usuario => {
    if (usuario.nombre != nombreModificado) {
      bandera = true;

    } else if (usuario.apellido != apellidoModificado) {
      bandera = true;

    } else if (usuario.email != emailModificado) {
      bandera = true;
    } else if (usuario.telefono != telModificado) {
      bandera = true;
    }
  })

  if (bandera) {
    modal4 = new bootstrap.Modal(document.getElementById('myModal4'));
    modal4.show();    
  }
}
btnSi.addEventListener('click', () => {
ObtenerUsuarios();
modal4.hide();
})
