import jwt from "jsonwebtoken";

export const isLogin = async (req, res, next) => {
  try {
    console.log(req.header.authorization);
    let auth = req.header("authorization" || "Authorization");

    if (auth == null) {
      return res.status(400).json({ message: "User not login" });
    }
    let token = auth.split(" ")[1];
    if (token == null) {
      return res.status(400).json({ message: "token is not provided" });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      console.log(user);
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
