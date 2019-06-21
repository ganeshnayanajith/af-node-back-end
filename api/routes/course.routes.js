const Express = require("express");
const Router = Express.Router();
const Mongoose = require("mongoose");

const Course = require("../model/course.model");



Router.get("/student/current/:studentid", (req, res, next) => {

    Course.find().exec().then(docs => {

        const courses = [];

        docs.forEach(course => {
            course.students.forEach(ins => {
                if (ins == req.params.studentid) {                   
                        courses.push(course);               
                }
            });
        });

        res.status(200).json({
            courses: courses
        })

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});



Router.post("/student/join/:courseid/:studentid", (req, res, next) => {

    Course.findById(req.params.courseid, function (err, course) {
        if (!course)
            res.status(404).send('Course is not found');
        else {

            course.code = req.body.code;
            course.name = req.body.name;
            course.instructors = req.body.instructors;
            course.students = req.body.students;

            course.save().then(course => {
                res.json('Course updated');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

Router.get("/student/new/:studentid", (req, res, next) => {

    Course.find().exec().then(docs => {

        const courses = [];
        
        docs.forEach(course => {
            var val=false;
            course.instructors.forEach(ins2 => {
                if(ins2.status==='accepted'){
                    course.students.forEach(ins => {
               
                        if (ins == req.params.studentid) {
                           val=true
                        }
                    });
                    if(val===false){
                        courses.push(course);
                    }
                }
            });

            
        });

        res.status(200).json({
            courses: courses
        });

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

Router.post("/instructor/accept/:courseid/:instructorid", (req, res, next) => {

    Course.findById(req.params.courseid, function (err, course) {
        if (!course)
            res.status(404).send('Course is not found');
        else {

            course.code = req.body.code;
            course.name = req.body.name;
            course.instructors = req.body.instructors;
            course.students = req.body.students;

            course.save().then(course => {
                res.json('Course updated');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

Router.get("/instructor/current/:instructorid", (req, res, next) => {

    Course.find().exec().then(docs => {

        const courses = [];

        docs.forEach(course => {
            course.instructors.forEach(ins => {
                if (ins.instructor == req.params.instructorid) {
                    if (ins.status == 'accepted') {
                        courses.push(course);
                    }
                }
            });
        });

        res.status(200).json({
            courses: courses
        })

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

Router.get("/instructor/new/:instructorid", (req, res, next) => {

    Course.find().exec().then(docs => {

        const courses = [];

        docs.forEach(course => {
            course.instructors.forEach(ins => {
                if (ins.instructor == req.params.instructorid) {
                    if (ins.status == 'notaccepted') {
                        courses.push(course);
                    }
                }
            });
        });

        res.status(200).json({
            courses: courses
        })

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

Router.post("/add", (req, res, next) => {

    const course = new Course({
        _id: new Mongoose.Types.ObjectId(),
        code: req.body.code,
        name: req.body.name,
        instructors: req.body.instructors,
        students: req.body.students
    });

    course.save().then(course => {
        res.status(200).json({ 'course': 'course added successfully' });
    }).catch(err => {
        res.status(400).send('adding new course failed');
    });
});

module.exports = Router;