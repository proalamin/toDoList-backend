const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    userName: { type: String },
    toDoSubject: { type: String },
    toDoDescription: { type: String },
    toDoStatus: { type: String},
    toDoCreateDate: { type: Date},
    toDoUpdateDate: { type: Date}

}, { versionKey: false });

const ToDoListModel = mongoose.model('toDoLists', DataSchema);
module.exports = ToDoListModel;