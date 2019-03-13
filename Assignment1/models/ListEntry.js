var mongooose = require('mongoose');
var Schema = mongooose.Schema;

var EntrySchema = new Schema({
    Like:{
        type:String,
        required:true
    },
    Why:{
        type:String,
        required:true
    },
    Creator:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.Now
    }
});

mongooose.model('Entries', EntrySchema);