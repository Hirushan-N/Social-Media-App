const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    caption: { type: String, required: false },
    datetime: { type: String, required: true },
    likes: { type: Number, default: 0 },
    postImage: {type:String , required:true}
});

module.exports = mongoose.model('Post', postSchema);