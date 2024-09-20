const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .get(userController.getAll)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
