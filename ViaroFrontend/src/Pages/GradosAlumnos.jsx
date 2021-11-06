import React, { useEffect } from 'react'
import axios from 'axios'

function GradosAlumnos() {
  const pagina = "alumnogrado";
  const [datos, setDatos] = React.useState([])
  const [AlumnoId, setAlumnoId] = React.useState("");
  const [GradoId, setGradoId] = React.useState("");
  const [Seccion, setSeccion] = React.useState("");
  const [editar, setEditar] = React.useState(false)
  const [id, setId] = React.useState("")
  useEffect(() => {
    cargar()
  }, [])

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
    await axios.post(`http://localhost:3002/api/${pagina}`, { GradoId, Seccion, AlumnoId })
    setGradoId("")
    setSeccion("")
    setAlumnoId("")
    cargar();
  }
  const habilitarEditar = async (id) => {
    setEditar(true)
    let res = await axios.get(`http://localhost:3002/api/${pagina}/${id}`);
    setGradoId(res.data.GradoId)
    setSeccion(res.data.Seccion)
    setAlumnoId(res.data.AlumnoId)

    setId(id);
  }
  const funcionEditar = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3002/api/${pagina}/${id}`, { GradoId, Seccion, AlumnoId })
    cargar();
    setGradoId("")
    setSeccion("")
    setAlumnoId("")
    setEditar(false)
  }
  const cancelarEdicion = async (e) => {
    e.preventDefault();
    setEditar(false)
    setGradoId("")
    setSeccion("")
    setAlumnoId("")
  }
  return (
    <> <h1 className="text-center">Alumnos</h1>
      <div className="row align-items-start">
        <div className="col-8">


          <table className="table table-dark mt-5">
            <thead>
              <tr>
                <th>Grado ID</th>
                <th>Alumno Id</th>
                <th>Seccion</th>
                <th>Modificar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                datos.map(item => (
                  <tr key={item.id}>
                    <td> {item.GradoId}</td>
                    <td>{item.AlumnoId}</td>
                    <td>{item.Seccion}</td>
                    <td><button className="btn btn-sm btn-warning" onClick={() => habilitarEditar(item.id)}>Modificar</button></td>
                    <td><button className="btn btn-sm btn-danger" onClick={() => eliminar(item.id)}>Eliminar</button></td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
        <div className="col-4">
          <h1 className="text-center">Formulario</h1>
          <form>
            <div class="mb-3">
              <label for="Grado Id" class="form-label">Grado Id</label>
              <input type="number" class="form-control" value={GradoId} onChange={(e) => setGradoId(e.target.value)} />
            </div>
            <div class="mb-3">
              <label for="Alumno Id" class="form-label">Aplledios</label>
              <input type="number" class="form-control" value={AlumnoId} onChange={(e) => setAlumnoId(e.target.value)} />
            </div>
            <div class="mb-3">
              <label for="Seccion" class="form-label">Genero</label>
              <input type="text" class="form-control" value={Seccion} onChange={(e) => setSeccion(e.target.value)} />
            </div>


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
          </form>

        </div>
      </div>
    </>
  )
}

export default GradosAlumnos
