const RefreshToken = require("../../../models/RefreshToken");

module.exports = async (req, res, next) => {
  try {
    res.clearCookie("token");
    next();
  } catch (err) {
    const error = new Error("It was not possible to logout");
    error.code = 400;
    next(error);
  }
};
