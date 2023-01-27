const mongoose = require('mongoose');
const Post = require('../models/Post');


exports.Posts_GET_ReadAll = (req, res, next) => {
    Post.find()
        .sort({datetime:-1,likes:-1})
        .populate('user','_id name') 
        .exec()
        .then((docs) => {
            console.log(docs);
            if (docs) {
                const responseContent = {
                    count:docs.length,
                    Posts : docs.map(doc => {
                        return {
                            user : doc.user,
                            caption : doc.caption,
                            datetime : doc.datetime,
                            likes : doc.likes,
                            postImage : doc.postImage,
                            _id : doc._id,
                            reference : {
                                method : "GET",
                                url : "http://localhost:5000/Posts/" + doc._id
                            }
                        }
                    })
                }
                res.status(200).json({
                    message: "Successful",
                    content: responseContent
                });
            }
            else {
                res.status(404).json({ message: 'No valid entry found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.Posts_POST_Create = (req, res, next) => {
    console.log(req.body);
    const post = new Post({
        _id: new mongoose.Types.ObjectId,
        user:req.body.user,
        caption : req.body.caption,
        datetime : req.body.datetime,
        likes: req.body.likes,
        postImage : req.file.path
    });
    post 
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Successfully Created",
            content: {
                user : result.user,
                caption : result.caption,
                datetime : result.datetime,
                likes:result.likes,
                postImage : result.postImage,
                _id:result._id,
                reference : {
                    method : "GET",
                    url : "http://localhost:5000/Posts/" + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

exports.Posts_GET_ReadById = (req, res, next) => {
    const id = req.params.postId;
    Post.findById(id)
        .select('_id user caption datetime time likes postImage') // select specific fields
        .populate('user','_id name') 
        .exec()
        .then((doc) => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    message: "Successful",
                    content: {
                        user : doc.user,
                        caption : doc.caption,
                        datetime : doc.datetime,
                        likes : doc.likes,
                        postImage : doc.postImage,
                        _id : doc._id
                    }
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

exports.Posts_PATCH_Update = (req, res, next) => {
    const id = req.params.postId;
    Post.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then((result) => {
            //console.log(result);
            res.status(200).json({
                message: "Successfully Updated",
                content: {
                    user : result.user,
                    caption : result.caption,
                    datetime : result.datetime,
                    likes: result.likes,
                    _id:result._id,
                    reference : {
                        method : "GET",
                        url : "http://localhost:5000/Posts/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            //console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.Posts_DELETE_Delete = (req, res, next) => {
    const id = req.params.postId;
    Post.findByIdAndRemove(id) // can use Post.remove({ _id: id }) instead(cannot return the deleted object.only returns a report)
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "Successfully Deleted",
                content: {
                    user : result.user,
                    caption : result.caption,
                    datetime : result.datetime,
                    likes : result.likes,
                    postImage : result.postImage,
                    _id : result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}