const ToDoListModel = require("../models/ToDoListModel");

exports.CreateToDo = (req, res) => {
    let reqBody = req.body;

    let userName = req.headers['userName'];
    let toDoSubject = reqBody['toDoSubject'];
    let toDoDescription = reqBody['toDoDescription'];
    let toDoStatus = 'New'
    let toDoCreateDate = Date.now();
    let toDoUpdateDate = Date.now();

    let PostBody={
        userName: userName,
        toDoSubject: toDoSubject,
        toDoDescription: toDoDescription,
        toDoStatus: toDoStatus,
        toDoCreateDate: toDoCreateDate,
        toDoUpdateDate: toDoUpdateDate
    }


    ToDoListModel.create(PostBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            res.status(200).json({ status: 'success', data: data });
        }
    })
}


exports.SelectToDo = (req, res) => {
    let userName = req.headers['userName'];
    ToDoListModel.find({ userName: userName }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            res.status(200).json({ status: 'success', data: data });
        }

    })
}


exports.UpdateToDo = (req, res) => {
    let toDoSubject = req.body['toDoSubject'];
    let toDoDescription = req.body['toDoDescription'];
    let _id = req.body['_id'];
    let toDoUpdateDate = Date.now();

    let PostBody={
        toDoSubject: toDoSubject,
        toDoDescription: toDoDescription,
        toDoUpdateDate: toDoUpdateDate
    }

    ToDoListModel.updateOne({ _id: _id }, { $set: PostBody }, { upsert: true }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            res.status(200).json({ status: 'success', data: data });
        }
    })
}


exports.UpdateStatusToDo = (req, res) => {
    let toDoStatus = req.body['toDoStatus'];
    let _id = req.body['_id'];
    let toDoUpdateDate = Date.now();

    let PostBody={
        toDoStatus: toDoStatus,
        toDoUpdateDate: toDoUpdateDate
    }

    ToDoListModel.updateOne({ _id: _id }, { $set: PostBody }, { upsert: true }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            res.status(200).json({ status: 'success', data: data });
        }
    })
}


exports.removeToDo = (req, res) => {
    let _id = req.body['_id'];

    ToDoListModel.remove({ _id: _id }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            res.status(200).json({ status: 'success', data: data });
        }
    })
}


exports.selectToDoByStatus = (req, res) => {
    let userName = req.headers['userName'];
    let toDoStatus = req.body['toDoStatus'];

    ToDoListModel.find({ userName: userName , toDoStatus: toDoStatus }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            res.status(200).json({ status: 'success', data: data });
        }

    })
}


exports.selectToDoByCreateDate = (req, res) => {
    let userName = req.headers['userName'];
    let formDate = req.body['formDate'];
    let toDate = req.body['toDate'];

    ToDoListModel.find({ userName: userName, toDoCreateDate:{$gte: new Date(formDate), $lte:new Date(toDate)} }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            res.status(200).json({ status: 'success', data: data });
        }

    })
}
