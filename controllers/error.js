const getErrorPage = (req, res, next) => {
  res.status(404).send("Invalid Request");
};

module.exports = {
  getErrorPage: getErrorPage,
};
