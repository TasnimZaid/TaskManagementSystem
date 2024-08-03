module.exports = function(req, res, next) {
  const { email, name, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      console.log("Missing credentials:", { email, name, password });
      return res.status(400).json({ error: "Missing Credentials" });
    } else if (!validEmail(email)) {
      console.log("Invalid email:", email);
      return res.status(400).json({ error: "Invalid Email" });
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      console.log("Missing credentials:", { email, password });
      return res.status(400).json({ error: "Missing Credentials" });
    } else if (!validEmail(email)) {
      console.log("Invalid email:", email);
      return res.status(400).json({ error: "Invalid Email" });
    }
  }

  next();
};
