const express = require('express');
const {newresult, getSingleResult, results, deleteresult} = require("../controllers/resultController");
const router = express.Router();

const {isAuthUser, authorizeRoles} = require("../middleware/auth");

router.route("/result/new").post(isAuthUser,newresult);
router.route("/result/get").post(isAuthUser,authorizeRoles,getSingleResult);
router.route("/results").post(isAuthUser,authorizeRoles,results);
router.route("/result/delete").post(isAuthUser,authorizeRoles,deleteresult);




module.exports = router;