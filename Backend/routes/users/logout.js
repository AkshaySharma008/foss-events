const { registerJwtToBlocklist } = require("../../services/cacheService");

const router = require("express").Router();

router.post("/", async (req, res) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
      registerJwtToBlocklist(token);
      return res.json({ success: true, message: "You have been logged out" });
    }
  }
  return res.status(401).json({
    success: true,
    message: "Logout could be be completed due to bad input",
  });
});

module.exports = router;
