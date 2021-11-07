import React, { useEffect } from 'react'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Grados() {
    const pagina = "grado";
    const [Profesor, setProfesor] = React.useState([]);
    const [datos, setDatos] = React.useState([])
    const [Nombre, setNombre] = React.useState("");
    const [ProfesorId, setProfesorId] = React.useState("");
    const [editar, setEditar] = React.useState(false)
    const [id, setId] = React.useState("")
    const [estadoValidacion, setEstadoValidacion] = React.useState(false);

    useEffect(() => {
        cargar()
        obtenerProfesores();
    }, [])

    const validacion = async () => {
        if (Nombre === "" || ProfesorId === "") {
            return false
        }
        return true
    }

    const obtenerProfesores = async () => {
        let res = await axios.get(`http://localhost:3002/api/profesor`)
        setProfesor(res.data)
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
            await axios.post(`http://localhost:3002/api/${pagina}`, { Nombre, ProfesorId })
            setNombre("");
            setProfesorId("");
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
        setProfesorId(res.data.ProfesorId);
        setId(id);
        setEstadoValidacion(false);
    }
    const funcionEditar = async (e) => {
        e.preventDefault();
        if (await validacion()) {
            await axios.put(`http://localhost:3002/api/${pagina}/${id}`, { Nombre, ProfesorId })
            cargar();
            setNombre("");
            setProfesorId("");
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
        setProfesorId("");
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
        <> <h1 className="text-center">Grados</h1>
            <div className="row align-items-start">
                <div className="col-8">


                    <table className="table table-dark mt-5">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Profesor</th>
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
                                        <td>{item.Profesor.Nombre} {item.Profesor.Apellidos}</td>
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
                        <div class="mb-3 form-group">
                            <label for="Nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" value={Nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>

                        <div class="mb-3 form-group">
                            <label for="Profesor Id" class="form-label">Profesor</label>
                            <select class="form-control" onChange={(e) => setProfesorId(e.target.value)} value={ProfesorId} required>
                                <option value="">Seleccione</option>
                                {
                                    Profesor.map(item => (
                                        <option key={item.id} value={item.id}>{item.Nombre} {item.Apellidos}</option>
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

export default Grados
