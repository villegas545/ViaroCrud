import db from "../database/models/";

const addAlumno = async (req, res) => {
  try {
    console.log(req.body);
    await db.Alumno.create(req.body);
    res.send({ message: "Alumno creado" });
  } catch (error) {
    res.send({ error });
  }
};

const updateAlumno = async (req, res) => {
  try {
    await db.Alumno.update(req.body, { where: { id: req.params.id } });
    res.send({ message: "Alumno actualizado" });
  } catch (error) {
    res.send({ error });
  }
};

const deleteAlumno = async (req, res) => {
  try {
    await db.Alumno.destroy({ where: { id: req.params.id } });
    res.send({ message: "Alumno eliminado" });
  } catch (error) {
    res.send({ error });
  }
};

const getAlumnos = async (req, res) => {
  try {
    const alumnos = await db.Alumno.findAll();
     res.status(200).send(alumnos);
  } catch (error) {
    res.send({ error });
  }
};

const getAlumnoById = async (req, res) => {
  try {
    const alumno = await db.Alumno.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(alumno);
  } catch (error) {
    res.send({ error });
  }
};

export { addAlumno, updateAlumno, deleteAlumno, getAlumnos, getAlumnoById };
