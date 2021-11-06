import React, { useEffect } from 'react'
import axios from 'axios'

function Grados() {
    const pagina = "grado";
    const [datos, setDatos] = React.useState([])
    const [Nombre, setNombre] = React.useState("");
    const [ProfesorId, setProfesorId] = React.useState("");
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
        await axios.post(`http://localhost:3002/api/${pagina}`, { Nombre, ProfesorId })
        setNombre("");
        setProfesorId("");

        cargar();
    }
    const habilitarEditar = async (id) => {
        setEditar(true)
        let res = await axios.get(`http://localhost:3002/api/${pagina}/${id}`);
        setNombre(res.data.Nombre);
        setProfesorId(res.data.ProfesorId);
        setId(id);
    }
    const funcionEditar = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3002/api/${pagina}/${id}`, { Nombre, ProfesorId })
        cargar();
        setNombre("");
        setProfesorId("");
        setEditar(false)

    }
    const cancelarEdicion = async (e) => {
        e.preventDefault();
        setEditar(false)
        setNombre("");
        setProfesorId("");
    }
    return (
        <> <h1 className="text-center">Alumnos</h1>
            <div className="row align-items-start">
                <div className="col-8">


                    <table className="table table-dark mt-5">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Profesor Id</th>
                                <th>Modificar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datos.map(item => (
                                    <tr key={item.id}>
                                        <td> {item.Nombre}</td>
                                        <td>{item.ProfesorId}</td>
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
                            <label for="Nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" value={Nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="Profesor Id" class="form-label">Profesorid</label>
                            <input type="number" class="form-control" value={ProfesorId} onChange={(e) => setProfesorId(e.target.value)} />
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

export default Grados
