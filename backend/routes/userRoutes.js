const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(userController.getAll)
  .post(userController.createNewUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.get("/get-all-user", userController.searchUsers);
router.put("/change-password", userController.changePassword);
router.post("/check-phone-existed", userController.checkPhoneExisted);

module.exports = router;
