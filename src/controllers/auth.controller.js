const register = async (req, res) => {
  try {
    res.json({ message: "Auth router is working" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { register };
