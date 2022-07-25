const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patients");

router.get("/patients", patientController.getPatients);
router.post("/patients", patientController.postPatient);
router.get("/patients/:patientId", patientController.getPatient);
router.put("/patients/:patientId", patientController.updatePatient);
router.delete("/patients/:patientId", patientController.deletePatient);

module.exports = router;
