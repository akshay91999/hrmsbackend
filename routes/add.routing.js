const express = require('express');
const router = express.Router();
const basicRoutes = require('./basic.route');
const accademic = require('./academic.route');
const expRoutes = require('./exp.route');
const skillRoutes = require('./skill.route');
const jobRoutes = require('./job.route');
const requestRoutes = require('./leave_request.route');
const deptRoutes = require('./dep.route');
const leaveRoutes = require('./leavepackage.route');
const learningRoutes = require('./learning.route');
const visitorRoutes = require('./visitor.route');
const trainingRoutes = require('./training.route')
const vacancyRoute = require('./vacancy.route')
const EmpTrainingRoute = require('./emptraining.route')
const FeedbackRoute = require('./feedback.route')
const TaskRoute = require('./task.route')
const TokenRoutes = require('./canteen.route')
const blacklistRoutes=require('./blackList.route')
const candiRoutes=require('./candidate.route')
const travelRoutes=require('./travel.route')
const signinService=require('../services/signin.service')
const GrievanceRoute=require('./grievance.route.js')
const resetRoute=require('./resetpasswd.route')
const viewRoutes = require('./trainingview.route')
const shiftRoutes=require('./shift.route')
const overtimeRoutes = require('./overtime.route')
const attendanceRoutes = require('./attendance.route')
const myattendanceRoutes = require('./myattendance.route')
const showleaveRoute=require('./leaveShow.route')
const tripapprRoute=require('./travel.appr.route')
const analytics=require('../services/hranalytics.service')
const retireRoute=require('./retire.route')


router.use('/accademic', accademic);
router.use('/basics', basicRoutes);
router.use('/exp', expRoutes);
router.use('/skill', skillRoutes);
router.use('/job', jobRoutes)
router.use('/report', basicRoutes, expRoutes, skillRoutes, jobRoutes)
router.use('/depart', deptRoutes)
router.use('/addtraining', trainingRoutes)
router.use('/vacancy', vacancyRoute)
router.use('/emptraining',EmpTrainingRoute)
router.use('/feedback',FeedbackRoute)
router.use('/task',TaskRoute)
router.use('/token',TokenRoutes)
router.use('/request',requestRoutes)
router.use('/leavepackage',leaveRoutes)
router.use('/learning',learningRoutes)
router.use('/visitor',visitorRoutes)
router.use('/blacklist',blacklistRoutes)
router.use('/candidate',candiRoutes)
router.use('/travel',travelRoutes)
router.use('/grievance',GrievanceRoute)
router.use('/signin',router.post('/', signinService.signin));
router.use('/resetpassword',resetRoute);
router.use('/viewtraining',viewRoutes)
router.use('/shift',shiftRoutes)
router.use('/overtime',overtimeRoutes)
router.use('/attendance',attendanceRoutes)
router.use('/myattendance',myattendanceRoutes)
router.use('/showleave',showleaveRoute);
router.use('/approvedtrip',tripapprRoute);
router.use('/hranalytics/gender',router.get('/', analytics.gender));
router.use('/retirement',retireRoute);


module.exports = router;