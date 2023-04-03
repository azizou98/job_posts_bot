/*
aziz={
    nom:"aitmoussa",
    ag:22
};
ana=new (require("./student")).info("aziz");
ana.sp="isil";
 console.log(ana.nom +"\n"+ana.sp+"\n"+ana.age("ait moussa"));
*/
var mysql = require('mysql');
var exp = require('express');
var router = exp();
var url = require('url');
var bodyParser = require('body-parser');
var publicDir = (__dirname + '/public/');
router.use(exp.static(publicDir));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "atelierweb"
});

router.all('/aziz/', function (req, res) {
    var q = url.parse(req.url, true).query;
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("SELECT * FROM user where password='" + q.p + "'", function (err, data, fil) {
            if (err) throw err;
            console.log(q.p);
            json = data;
            json[0].aziz = "wyyyyy mchat kho";
            console.log(json);
            res.send((json));
        })
    });
});
router.all("/az/", function (req, res) {
    var post_data = req.body;

    con.connect(function (err) {
        console.log("Connected!");
        Nom_user = post_data.Nom_user;
        Password = post_data.Password;
        con.query("insert into user values ('" + Nom_user + "','" + Password + "')", function (err, data, fil) {
            if (err) {
                res.send("erreur d'ajout !!!!!!");
            }

            json = data;
            console.log(json);
            res.send(json);
        })
    });
});
router.listen(8080);
