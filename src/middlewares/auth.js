const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    console.log("tokenmnnn ", req.cookies);
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Token not found");
    }
    console.log("token  nnn ", token);
    const { id } = await jwt.verify(token, "abc");
    req.user = id;
    console.log("User ", req.user);
  } catch (error) {
    res.status(404).send("Invalid User");
    return;
    // throw new Error("Invalid user");
  }
  next();
};

const validateEditProfile = (req, res, next) => {
  try {
    const editPayload = req.body;
    const allowedEditables = [
      "firstName",
      "lastName",
      "password",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skill",
    ];

    const updateValid =  Object.keys(editPayload).every((item) =>
      allowedEditables.includes(item)
    );

    if(!updateValid)
      return res.status(404).send('Update is invalid');
    next();
  } catch (error) {
    throw error;
  }
};

module.exports = { userAuth, validateEditProfile };
