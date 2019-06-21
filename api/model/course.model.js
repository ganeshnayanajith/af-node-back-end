const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const CourseSchema = new Schema({

    _id: Schema.Types.ObjectId,
    code: { type: String, required: true },
    name: { type: String, required: true },
    instructors: [{
        instructor:{type: Schema.Types.ObjectId, required: true, ref: 'User' },
        status:{type: String }
    }],


    students: [{ type: Schema.Types.ObjectId, required: false, ref: 'User' }]

});

module.exports = Mongoose.model('Course', CourseSchema);