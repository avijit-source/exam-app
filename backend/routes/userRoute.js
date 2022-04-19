const express = require('express');

const {register,loginUser, logout, allUsers,
      getuserdetails, updatePassword, getSingleUser,
      updateRole, updateUser, deleteUser} = require('../controllers/userController');
const { isAuthUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/register").post(isAuthUser,authorizeRoles,register);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/users").post(isAuthUser,authorizeRoles,allUsers);
router.route("/me").get(isAuthUser,getuserdetails);
router.route("/password/update").put(isAuthUser,updatePassword);
router.route("/user/:id").get(isAuthUser,authorizeRoles, getSingleUser).put(isAuthUser,authorizeRoles,updateRole);
router.route("/updateuser/:id").put(isAuthUser,updateUser);
router.route("/deleteuser/:id").delete(isAuthUser,authorizeRoles,deleteUser)


module.exports = router;