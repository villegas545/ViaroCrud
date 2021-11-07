import React, { useEffect } from 'react'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function GradosAlumnos() {
  const pagina = "alumnogrado";
  const [alumnos, setAlumnos] = React.useState([]);
  const [grados, setGrados] = React.useState([]);
  const [datos, setDatos] = React.useState([])
  const [AlumnoId, setAlumnoId] = React.useState("");
  const [GradoId, setGradoId] = React.useState("");
  const [Seccion, setSeccion] = React.useState("");
  const [editar, setEditar] = React.useState(false)
  const [id, setId] = React.useState("")
  const [estadoValidacion, setEstadoValidacion] = React.useState(false);
  useEffect(() => {
    cargar()
    obtenerAlumnos()
    obtenerGrados()
  }, [])

  const validacion = () => {
    if (AlumnoId === "" || GradoId === "" || Seccion === "") {
      return false
    }
    return true
  }
  const cargar = async () => {
    let res = await axios.get(`http://localhost:3002/api/${pagina}`);
    setDatos(res.data);


  }
  const obtenerAlumnos = async () => {
    let res = await axios.get(`http://localhost:3002/api/alumno`);
    setAlumnos(res.data);
  }

  const obtenerGrados = async () => {
    let res = await axios.get(`http://localhost:3002/api/grado`);
    setGrados(res.data);
  }

  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3002/api/${pagina}/${id}`)
    cargar();
  }
  const agregar = async (e) => {
    e.preventDefault();
    if (await validacion()) {
      await axios.post(`http://localhost:3002/api/${pagina}`, { GradoId, Seccion, AlumnoId })
      setGradoId("")
      setSeccion("")
      setAlumnoId("")
      cargar();
      setEstadoValidacion(false);
    } else {
      setEstadoValidacion(true)
    }
  }
  const habilitarEditar = async (id) => {
    setEditar(true)
    let res = await axios.get(`http://localhost:3002/api/${pagina}/${id}`);
    setGradoId(res.data.GradoId)
    setSeccion(res.data.Seccion)
    setAlumnoId(res.data.AlumnoId)
    setEstadoValidacion(false);
    setId(id);
  }
  const funcionEditar = async (e) => {
    e.preventDefault();
    if (await validacion()) {
      await axios.put(`http://localhost:3002/api/${pagina}/${id}`, { GradoId, Seccion, AlumnoId })
      cargar();
      setGradoId("")
      setSeccion("")
      setAlumnoId("")
      setEditar(false)
      setEstadoValidacion(true)
    } else {
      setEstadoValidacion(true)
    }
  }
  const cancelarEdicion = async (e) => {
    e.preventDefault();
    setEditar(false)
    setGradoId("")
    setSeccion("")
    setAlumnoId("")
    setEstadoValidacion(false);
  }
  //Mensaje de confirmacion
  const confirmacion = (id) => {
    confirmAlert({
      title: 'Confirmación',
      message: '¿Deseas eliminar el registro?',
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
    <> <h1 className="text-center">Grados Alumnos</h1>
      <div className="row align-items-start">
        <div className="col-8">


          <table className="table table-dark mt-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Grado</th>
                <th>Alumno</th>
                <th>Seccion</th>
                <th>Modificar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                datos.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td> {item.Grado.Nombre}</td>
                    <td>{item.Alumno.Nombre}</td>
                    <td>{item.Seccion}</td>
                    <td><button className="btn btn-sm btn-warning" onClick={() => habilitarEditar(item.id)}>Modificar</button></td>
                    <td><button className="btn btn-sm btn-danger" onClick={() => confirmacion(item.id)}> Eliminar</button></td>
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
              <label for="Seccion" class="form-label">Sección</label>
              <input type="text" class="form-control" value={Seccion} onChange={(e) => setSeccion(e.target.value)} />
            </div>

            <div class="mb-3">
              <label for="Grado Id" class="form-label">Grado</label>
              <select className="form-control" onChange={(e) => setGradoId(e.target.value)} value={GradoId}>
                <option value="">Seleccione una opcion</option>
                {
                  grados.map(item => (
                    <option key={item.id} value={item.id}>{item.Nombre}</option>
                  ))
                }

              </select>
            </div>
            <div class="mb-3">
              <label for="Alumno Id" class="form-label">Alumno</label>
              <select className="form-control" onChange={(e) => setAlumnoId(e.target.value)} value={AlumnoId}>
                <option value="">Seleccione una opcion</option>
                {
                  alumnos.map(item => (
                    <option key={item.id} value={item.id}>{item.Nombre}</option>
                  ))
                }
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

export default GradosAlumnos
