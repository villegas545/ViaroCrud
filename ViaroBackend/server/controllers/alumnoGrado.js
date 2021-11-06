import db from "../database/models/";

const addAlumnoGrado = async (req, res) => {
  try {
    await db.Alumnogrado.create(req.body);
    res.send({ message: "AlumnoGrado creado" });
  } catch (error) {
    res.send({ error });
  }
};

const updateAlumnoGrado = async (req, res) => {
  try {
    await db.Alumnogrado.update(req.body, { where: { id: req.params.id } });
    res.send({ message: "AlumnoGrado actualizado" });
  } catch (error) {
    res.send({ error });
  }
};

const deleteAlumnoGrado = async (req, res) => {
  try {
    await db.Alumnogrado.destroy({ where: { id: req.params.id } });
    res.send({ message: "AlumnoGrado eliminado" });
  } catch (error) {
    res.send({ error });
  }
};

const getAlumnoGrados = async (req, res) => {
  try {
    const AlumnoGrados = await db.Alumnogrado.findAll(
      {
      include: [
        {
          model: db.Alumno,
          model:db.Grado
        },
      ],
    }
    );
    res.send(AlumnoGrados);
  } catch (error) {
    res.send({ error });
  }
};

const getAlumnoGradoById = async (req, res) => {
  try {
    const AlumnoGrado = await db.Alumnogrado.findOne({
      where: { id: req.params.id },
    });
    res.send(AlumnoGrado);
  } catch (error) {
    res.send({ error });
  }
};

export {
  addAlumnoGrado,
  updateAlumnoGrado,
  deleteAlumnoGrado,
  getAlumnoGrados,
  getAlumnoGradoById,
};
