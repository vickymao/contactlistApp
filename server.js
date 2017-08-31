var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('contactlist', ['contactlist']);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contactlist', function(req, res) {
    console.log("recu un requete GET");
    // person1 = {
    //     name: 'yuan',
    //     email: 'yuan355@gmail.com',
    //     telephone: '11265446'
    // };
    // person2 = {
    //     name: 'mao',
    //     email: 'maon355@gmail.com',
    //     telephone: '11288996'
    // };
    // person3 = {
    //     name: 'vicky',
    //     email: 'vicky355@gmail.com',
    //     telephone: '18814556'
    // };
    // var contactlist = [person1, person2, person3];
    db.contactlist.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
    //res.json(contactlist);
});
app.post('/contactlist', function(req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, docs) {
        res.json(docs);
    });
});
app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({ _id: mongojs.ObjectId(id) }, function(err, docs) {
        res.json(docs);
    });
});
app.get('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({ _id: mongojs.ObjectId(id) }, function(err, docs) {
        res.json(docs);
    });
});

app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name, email: req.body.email, telephone: req.body.telephone } },
        new: true
    }, function(err, docs) {
        res.json(docs);
    });
});
app.get('/todolist', function(req, res) {
    console.log("recu un requete GET");

    db.todolist.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});
app.post('/todolist', function(req, res) {
    console.log(req.body);
    db.todolist.insert(req.body, function(err, docs) {
        res.json(docs);
    });
});
app.delete('/todolist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.todolist.remove({ _id: mongojs.ObjectId(id) }, function(err, docs) {
        res.json(docs);
    });
});
app.listen(3000);
console.log("server running on port 3000");