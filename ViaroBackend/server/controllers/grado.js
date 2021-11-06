import db from "../database/models/";

const addGrado = async (req, res) => {
  try {
    await db.Grado.create(req.body);
    res.send({ message: "Grado creado" });
  } catch (error) {
    res.send({ error });
  }
};

const updateGrado = async (req, res) => {
  try {
    await db.Grado.update(req.body, { where: { id: req.params.id } });
    res.send({ message: "Grado actualizado" });
  } catch (error) {
    res.send({ error });
  }
};

const deleteGrado = async (req, res) => {
  try {
    await db.Grado.destroy({ where: { id: req.params.id } });
    res.send({ message: "Grado eliminado" });
  } catch (error) {
    res.send({ error });
  }
};

const getGrados = async (req, res) => {
  try {
    const Grados = await db.Grado.findAll({
      include: [
        {
          model: db.Profesor,
        },
      ],
    });
    res.send(Grados);
  } catch (error) {
    res.send({ error });
  }
};

const getGradoById = async (req, res) => {
  try {
    console.log(req.params.id);
    const Grado = await db.Grado.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Profesor,
        },
      ],
    });
    res.send(Grado);
  } catch (error) {
    res.send({ error });
  }
};

export { addGrado, updateGrado, deleteGrado, getGrados, getGradoById };
