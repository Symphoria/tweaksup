var mongoose = require('mongoose');

var Hacks = new mongoose.schema({
    name: String,
    hacks: [{
        title: String,
        body: String,
        upvotes: Number,
        downvotes: Number
    }]
});

var Hacks = mongoose.model("Hacks", HacksSchema);
module.exports = mongoose.model('Hacks', HacksSchema);
