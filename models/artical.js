const mongoose = require('mongoose');
const schema = mongoose.Schema;

const articalSchema = new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    content:{
        type:Object,
        required:true
    },
    postedOn:{
        type:String,
    },
    main:{
        type:Boolean,
        default:false
    },
    side:{
        type:Boolean,
        default:false
    },
    updatedon:{
        type:String
    }
});
const Artical = module.exports = mongoose.model('Artical',articalSchema);