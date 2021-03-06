import React, { useEffect } from 'react'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Profesores() {
  const pagina = "profesor";
  const [datos, setDatos] = React.useState([])
  const [Nombre, setNombre] = React.useState("");
  const [Apellidos, setApellidos] = React.useState("");
  const [Genero, setGenero] = React.useState("Masculino");
  const [editar, setEditar] = React.useState(false)
  const [id, setId] = React.useState("")
  const [estadoValidacion, setEstadoValidacion] = React.useState(false);
  useEffect(() => {
    cargar()
  }, [])

  const validacion = () => {
    if (Nombre === "" || Apellidos === "" || Genero === "") {
      return false
    }
    return true
  }
  const cargar = async () => {
    let res = await axios.get(`http://localhost:3002/api/${pagina}`);
    setDatos(res.data);
  }

  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3002/api/${pagina}/${id}`)
    cargar();
  }
  const agregar = async (e) => {
    e.preventDefault();
    if (await validacion()) {
      await axios.post(`http://localhost:3002/api/${pagina}`, { Nombre, Apellidos, Genero })
      setNombre("");
      setApellidos("");
      setGenero("Masculino");
      cargar();
      setEstadoValidacion(false);
    } else {
      setEstadoValidacion(true)
    }
  }
  const habilitarEditar = async (id) => {
    setEditar(true)
    let res = await axios.get(`http://localhost:3002/api/${pagina}/${id}`);
    setNombre(res.data.Nombre);
    setApellidos(res.data.Apellidos);
    setGenero(res.data.Genero);
    setId(id);
    setEstadoValidacion(false);
  }
  const funcionEditar = async (e) => {
    e.preventDefault();
    if (await validacion()) {
      await axios.put(`http://localhost:3002/api/${pagina}/${id}`, { Nombre, Apellidos, Genero })
      cargar();
      setNombre("");
      setApellidos("");
      setGenero("Masculino");
      setEditar(false)
      setEstadoValidacion(true)
    } else {
      setEstadoValidacion(true)
    }
  }
  const cancelarEdicion = async (e) => {
    e.preventDefault();
    setEditar(false)
    setNombre("");
    setApellidos("");
    setGenero("Masculino");
    setEstadoValidacion(false);
  }
  //Mensaje de confirmacion
  const confirmacion = (id) => {
    confirmAlert({
      title: 'Confirmaci??n',
      message: '??Deseas eliminar el registro?',
      buttons: [
        {
          label: 'Si',
          onClick: () => eliminar(id)
        },
        {
          label: 'No'
        }
      ]
    });
  };
  return (
    <> <h1 className="text-center">Profesores</h1>
      <div className="row align-items-start">
        <div className="col-8">


          <table className="table table-dark mt-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Genero</th>
                <th>Modificar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                datos.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td> {item.Nombre}</td>
                    <td>{item.Apellidos}</td>
                    <td>{item.Genero}</td>
                    <td><button className="btn btn-sm btn-warning" onClick={() => habilitarEditar(item.id)}>Modificar</button></td>
                    <td><button className="btn btn-sm btn-danger" onClick={() => confirmacion(item.id)}>Eliminar</button></td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
        <div className="col-4">
          <h1 className="text-center">Formulario</h1>
          <form className="border p-4 rounded bg-light">
            <div class="mb-3">
              <label for="Nombre" class="form-label">Nombre</label>
              <input type="text" class="form-control" value={Nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div class="mb-3">
              <label for="Apellidos" class="form-label">Aplledios</label>
              <input type="text" class="form-control" value={Apellidos} onChange={(e) => setApellidos(e.target.value)} />
            </div>
            <div class="mb-3">
              <label for="Genero" class="form-label">Genero</label>
              <select className="form-control" onChange={(e) => setGenero(e.target.value)} value={Genero}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div className="text-center">
              {editar ? (
                <>
                  <button className="btn btn-warning my-3" onClick={(e) => funcionEditar(e)}>Modificar</button>
                  <button className="btn btn-danger mx-5" onClick={(e) => cancelarEdicion(e)}>Cancelar</button>
                </>
              )
                :
                (
                  <button className="btn btn-success mt-3" onClick={(e) => agregar(e)}>Agregar</button>
                )}
            </div>
            {estadoValidacion ? <h6 className="text-danger">Los campos deben estar llenos!!</h6> : null}
          </form>

        </div>
      </div>
    </>
  )
}

export default Profesores
