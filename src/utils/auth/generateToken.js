const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = process.env;

const generateToekn = async (user, res) => {
  const accessToken = await jwt.sign(
    { id: user._id, username: user.username },
    TOKEN_SECRET
    // {
    //   expiresIn: "100",
    // }
  );

  res.cookie("token", accessToken, {
    secure: false, // set to true if your using https
    httpOnly: true,
  });
  return { accessToken };
};

module.exports = generateToekn;
