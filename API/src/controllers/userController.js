const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt'); //npm install bcrypt --save
const jwt = require('jsonwebtoken'); //npm install jsonwebtoken --save


exports.Users_POST_SignUp = (req,res,next) => {
    User.findOne({ email: req.body.email})
                .exec()
                .then(doc => {
                    if(doc){
                        res.status(409).json({
                            message : "Email is already used"
                        });
                    }
                    else{
                        bcrypt.hash(req.body.password , 10, (err,hash)=>{
                            if(err){
                                return res.status(500).json({
                                    error:err.message
                                });
                            }
                            else{
                                const user = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    name : req.body.name,
                                    dob : req.body.dob,
                                    gender: req.body.gender,
                                    profileImage : req.file.path,
                                    email:req.body.email,
                                    password:hash
                                });
                                user
                                .save()
                                .then(result =>{
                                    res.status(201).json({
                                        message : "User Created"
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({ error: err });
                                });
                            }
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
}

exports.Users_POST_Login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(doc => {
            if (doc) {
                bcrypt.compare(req.body.password, doc.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    else if (result) {
                        const token = jwt.sign({
                            email: doc.email,
                            userId: doc._id
                        },
                            'Secret',// this is the secret key
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: "Auth Successful",
                            content:{
                                _id:doc._id,
                                name:doc.name,
                                dob:doc.dob,
                                gender:doc.gender,
                                profileImage:doc.profileImage,
                                email:doc.email
                            },
                            token: token
                        });
                    }
                    else {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                });
            }
            else {
                return res.status(401).json({
                    message: "Mail not found. User doesn\'t found"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.Users_DELETE_Delete = (req, res, next) => {
    const id = req.params.userId;
    User.findByIdAndRemove(id) // can use User.remove({ _id: id }) instead(cannot return the deleted object.only returns a report)
        .exec()
        .then((doc) => {
            console.log(doc);
            res.status(200).json({
                message: "Successfully Deleted",
                content: doc
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.Users_GET_ReadById = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .select('_id name dob gender profileImage email') // select specific fields
        .exec()
        .then((doc) => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    message: "Successful",
                    content: doc
                });
            }
            else {
                res.status(404).json({ message: 'No valid entry found for provided id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

