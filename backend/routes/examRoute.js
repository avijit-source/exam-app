const express = require('express');

const { getAllExams,createExam, updateExam, deleteExams, getExamDetails } = require('../controllers/examController');
const { isAuthUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();


router.route("/exam/new").post(isAuthUser,authorizeRoles,createExam);
router.route("/exams").get(isAuthUser,getAllExams);
router.route("/exam/:id").put(isAuthUser,authorizeRoles,updateExam).delete(isAuthUser,authorizeRoles,deleteExams).post(isAuthUser,getExamDetails);

module.exports = router 