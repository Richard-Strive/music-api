const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = process.env;

const generateToekn = async (user, res) => {
  const accessToken = await jwt.sign(
    { id: user._id, username: user.username },
    TOKEN_SECRET,
    {
      expiresIn: "30m",
    }
  );

   const refreshToken = await jwt.sign(
     { id: user._id, username: user.username },
     REFRESH_TOKEN_SECRET,
     {
       expiresIn: "1d",
     }
   );
  user.refreshToken = refreshToken
  user.save()
  ///mettere il refreshtoken nel database dell'utente come refresh token
  //refreshToken{

  

  res.cookie("token", accessToken, {
    secure: false, // set to true if your using https
    httpOnly: true,
  });

  //solo scopo di andare a rigenerare l'access token queando questo scade
  res.cookie("refreshToken", refreshToken, {
    secure: false, // set to true if your using https
    httpOnly: true,
  });
  return { accessToken };
};

module.exports = generateToekn;
