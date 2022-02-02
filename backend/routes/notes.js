const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    name: "wihnc",
    number: 24,
  };
  res.json(obj);
});

module.exports = router
