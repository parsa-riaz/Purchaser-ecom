export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.status(400).json({ message: "access denied" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
