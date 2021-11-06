import { Router } from "express";
import {
  addAlumno,
  getAlumnos,
  updateAlumno,
  deleteAlumno,
  getAlumnoById,
} from "../controllers/alumno";
import {
  addProfesor,
  getProfesores,
  updateProfesor,
  deleteProfesor,
  getProfesorById,
} from "../controllers/profesor";
import {
  addGrado,
  getGrados,
  updateGrado,
  deleteGrado,
  getGradoById,
} from "../controllers/grado";
import {
  addAlumnoGrado,
  getAlumnoGradoById,
  getAlumnoGrados,
  updateAlumnoGrado,
  deleteAlumnoGrado,
} from "../controllers/alumnoGrado";

const router = Router();

//ALUMNOS
router.route("/alumno").post(addAlumno).get(getAlumnos);
router
  .route("/alumno/:id")
  .get(getAlumnoById)
  .put(updateAlumno)
  .delete(deleteAlumno);

//PROFESOR
router.route("/profesor").post(addProfesor).get(getProfesores);
router
  .route("/profesor/:id")
  .get(getProfesorById)
  .put(updateProfesor)
  .delete(deleteProfesor);

//GRADO
router.route("/grado").post(addGrado).get(getGrados);
router
  .route("/grado/:id")
  .get(getGradoById)
  .put(updateGrado)
  .delete(deleteGrado);

//ALUMNOGRADO
router.route("/alumnogrado").post(addAlumnoGrado).get(getAlumnoGrados);
router
  .route("/alumnogrado/:id")
  .get(getAlumnoGradoById)
  .put(updateAlumnoGrado)
  .delete(deleteAlumnoGrado);

export default router;
