const Patient = require("../models/patient");

const getPatients = (req, res, next) => {
  // Patient.findAll()
  //   .then((patients) => {
  //     res.send(patients);
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });

  req.user
    .getPatients()
    .then((patients) => {
      res.send(patients);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getPatient = (req, res, next) => {
  Patient.findByPk(req.params.patientId)
    .then((patient) => {
      patient === null
        ? res.send(`Patient with id-${req.params.patientId} not found`)
        : res.send(patient);
    })
    .catch((err) => {
      res.send(err);
    });
};

const postPatient = (req, res, next) => {
  // Patient.create({
  //   name: req.body.name,
  //   userId: req.user.id,
  // })
  //   .then(() => {
  //     res.send("Patient has been added");
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });

  //The createPatient method automatically sets userId
  req.user
    .createPatient({
      name: req.body.name,
    })
    .then(() => {
      res.send("Patient has been added");
    })
    .catch((err) => {
      res.send(err);
    });
};

const updatePatient = (req, res, next) => {
  Patient.findByPk(req.params.patientId)
    .then((patient) => {
      patient.name = req.body.name;
      return patient.save();
    })
    .then(() => {
      res.send("Patient details has been updated");
    })

    .catch((err) => {
      res.send(err);
    });
};

const deletePatient = (req, res, next) => {
  Patient.findByPk(req.params.patientId)
    .then((patient) => {
      return patient.destroy();
    })
    .then(() => {
      res.send(`Patient with id-${req.params.patientId} has been deleted`);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  postPatient: postPatient,
  getPatients: getPatients,
  getPatient: getPatient,
  updatePatient: updatePatient,
  deletePatient: deletePatient,
};
