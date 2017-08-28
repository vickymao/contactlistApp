var express = require('express');
var app = express();
app.use(express.static(__dirname + "/public"));
app.get('/contactlist', function(req, res) {
    console.log("recu un requete GET");
    person1 = {
        name: 'yuan',
        email: 'yuan355@gmail.com',
        telephone: '11265446'
    };
    person2 = {
        name: 'mao',
        email: 'maon355@gmail.com',
        telephone: '11288996'
    };
    person3 = {
        name: 'vicky',
        email: 'vicky355@gmail.com',
        telephone: '18814556'
    };
    var contactlist = [person1, person2, person3];
    res.json(contactlist);
})
app.listen(3000);
console.log("server running on port 3000");