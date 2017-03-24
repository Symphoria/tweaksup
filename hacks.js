var mongoose = require('mongoose');

var HacksSchema = new mongoose.Schema({
    name: String,
    hacks: {
        title: String,
        body: String,
        upvotes: Number,
        downvotes: Number
    }
});

var Hacks = mongoose.model("Hacks", HacksSchema);
module.exports = mongoose.model('Hacks', HacksSchema);
