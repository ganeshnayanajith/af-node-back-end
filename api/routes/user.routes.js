const Express = require("express");
const Router = Express.Router();
const Mongoose = require("mongoose");
const Bcrypt = require("bcrypt");

const User = require("../model/user.model");








Router.get("/instructors", (req, res, next) => {

  User.find().exec().then(docs => {

    //res.json(docs);

    const instructors = [];

    docs.forEach(user => {

      if (user.type == 'instructor') {
        instructors.push(user);
      }

    });

    res.status(200).json({
      instructors: instructors
    })

  }).catch(err => {

    res.status(500).json({
      error: err
    });

  });

});



//this route method is created for user signup.
/*first check passed email via request is already available in the database.
if available then return response with message.
also this has used the bcrypt for password hashing*/
Router.post("/signup", (req, res, next) => {

  User.find({ email: req.body.username }).exec().then(user => {

    if (user.length >= 1) {
      return res.status(409).json({
        message: "User exists"
      });

    } else {

      Bcrypt.hash(req.body.password, 10, (err, hash) => {

        if (err) {

          return res.status(500).json({
            error: err
          });

        } else {

          const user = new User({
            _id: new Mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            password: hash,
            type: req.body.type
          });

          user.save().then(result => {

            console.log(result);
            res.status(201).json({
              message: "User created",
              user: result
            });

          }).catch(err => {

            console.log(err);
            res.status(500).json({
              error: err
            });

          });

        }//else end


      });//bcrypt end


    }//else end mail exist

  });//user find

});

//this route method is created for user login.
Router.post("/login", (req, res, next) => {

  User.find({ username: req.body.username }).exec().then(user => {

    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }

    Bcrypt.compare(req.body.password, user[0].password, (err, result) => {

      if (err) {

        return res.status(401).json({
          message: "Auth failed"
        });

      }

      if (result) {


        // const token = jwt.sign(
        //   {
        //     email: user[0].email,
        //     userId: user[0]._id
        //   },
        //   process.env.JWT_KEY,
        //   {
        //       expiresIn: "1h"
        //   }
        // );

        const myResponse = {
          message: "Auth successful",
          user: user
        };

        return res.status(200).json(myResponse);
        // return res.status(200).json();
      }

      res.status(401).json({
        message: "Auth failed"
      });

    });

  }).catch(err => {

    console.log(err);
    res.status(500).json({
      error: err
    });

  });

});

//this route method is created for get a user by id.
// Router.get("/one/get/:userId", (req, res, next) => {
//   const userId = req.params.userId;
//   User.findById(userId, function (err, user) {
//     res.json(user);
//   });

// });

// Router.delete("/:userId", (req, res, next) => {
//   User.remove({ _id: req.params.userId })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "User deleted"
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });


// Router.get("/all", (req, res, next) => {

//   User.find((err, users) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(users);
//     }
//   });

// });

module.exports = Router;