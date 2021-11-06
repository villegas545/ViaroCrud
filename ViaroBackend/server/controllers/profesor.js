import db from "../database/models/";

const addProfesor = async (req, res) => {
  try {
    await db.Profesor.create(req.body);
    res.send({ message: "Profesor creado" });
  } catch (error) {
    res.send({ error });
  }
};

const updateProfesor = async (req, res) => {
  try {
    await db.Profesor.update(req.body, { where: { id: req.params.id } });
    res.send({ message: "Profesor actualizado" });
  } catch (error) {
    res.send({ error });
  }
};

const deleteProfesor = async (req, res) => {
  try {
    await db.Profesor.destroy({ where: { id: req.params.id } });
    res.send({ message: "Profesor eliminado" });
  } catch (error) {
    res.send({ error });
  }
};

const getProfesores = async (req, res) => {
  try {
    const Profesors = await db.Profesor.findAll();
    res.send(Profesors);
  } catch (error) {
    res.send({ error });
  }
};

const getProfesorById = async (req, res) => {
  try {
    const Profesor = await db.Profesor.findOne({
      where: { id: req.params.id },
    });
    res.send(Profesor);
  } catch (error) {
    res.send({ error });
  }
};

export {
  addProfesor,
  updateProfesor,
  deleteProfesor,
  getProfesores,
  getProfesorById,
};
