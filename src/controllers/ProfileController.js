const ProfileModel = require("../models/ProfileModel");
var jwt = require('jsonwebtoken');


exports.CreateProfile = (req, res) => {
    let reqBody = req.body;
    ProfileModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            res.status(200).json({ status: 'success', data: data });
        }
    })
}


exports.UserLogin = (req, res) => {
    let userName = req.body['userName'];
    let password = req.body['password'];
    // res.status(200).json({ status: 'success',  userName, password });

    ProfileModel.find({ userName: userName, password: password }, (err, data) => {
        // res.status(200).json(data); 

        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            if (data.length > 0) {

                let payload={
                    exp: Math.floor(Date.now() / 1000) + (24* 60 * 60),
                    data: data[0]
                }
                var token = jwt.sign(payload,'Sk3456456');

                res.status(200).json({ status: 'success', token, data: data });
            }
            else {
                res.status(401).json({ status: 'Unauthorized ' });
            }
        }

    })
}

exports.SelectProfile = (req, res) => {
    let userName = req.headers['userName'];
    ProfileModel.find({ userName: userName }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            res.status(200).json({ status: 'success', data: data });
        }

    })
}


exports.UpdateProfile = (req, res) => {
    let userName = req.headers['userName'];
    let reqBody = req.body;

    ProfileModel.updateOne({ userName: userName }, {$set:reqBody},{upsert:true},(err,data)=>{
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        }
        else {
            res.status(200).json({ status: 'success', data: data });
        } 
    })
}

