var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    var db = req.db;
    var data = {};

    db.query("SELECT * FROM skills", function (err, skills) {
        if (err) {
            console.error(err);
            return res.status(500).send("Database Error: " + err.message + ". Please ensure MySQL is running.");
        }
        data.skills = skills;

        db.query("SELECT * FROM certifications", function (err, certs) {
            if (err) {
                console.error(err);
                return res.status(500).send("Database Error: " + err.message);
            }
            data.certifications = certs;

            db.query("SELECT * FROM projects", function (err, projects) {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Database Error: " + err.message);
                }
                data.projects = projects;

                db.query("SELECT * FROM services", function (err, services) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Database Error: " + err.message);
                    }
                    data.services = services;

                    db.query("SELECT * FROM education", function (err, edu) {
                        if (err) {
                            console.error(err);
                            return res.status(500).send("Database Error: " + err.message);
                        }
                        data.education = edu;

                        db.query("SELECT * FROM experience", function (err, exp) {
                            if (err) {
                                console.error(err);
                                return res.status(500).send("Database Error: " + err.message);
                            }
                            data.experience = exp;

                            db.query("SELECT * FROM hero WHERE id=1", function (err, hero) {
                                if (err) console.error(err); // Don't crash on missing table, but log it
                                data.hero = hero[0] || {};

                                db.query("SELECT * FROM about WHERE id=1", function (err, about) {
                                    if (err) console.error(err);
                                    data.about = about[0] || {};

                                    db.query("SELECT * FROM site_settings WHERE id=1", function (err, settings) {
                                        if (err) console.error(err);
                                        data.settings = settings[0] || {};

                                        res.render("user/home.ejs", data);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;
