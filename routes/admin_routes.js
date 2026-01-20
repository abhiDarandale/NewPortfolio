var express = require("express");
var router = express.Router();

function checkAdmin(req, res, next) {
    if (req.session.admin) {
        next();
    } else {
        res.redirect("/admin/login");
    }
}

// Login Routes
router.get("/login", function (req, res) {
    res.render("admin/login");
});

router.post("/login", function (req, res) {
    var db = req.db;
    var username = req.body.username;
    var password = req.body.password;

    // In production, use hashed passwords!
    var query = "SELECT * FROM admin WHERE username = ? AND password = ?";
    db.query(query, [username, password], function (err, result) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        if (result.length > 0) {
            req.session.admin = result[0];
            res.redirect("/admin/dashboard");
        } else {
            res.send("Invalid Credentials! <a href='/admin/login'>Try Again</a>");
        }
    });
});

router.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/admin/login");
});

// Dashboard
router.get("/dashboard", checkAdmin, function (req, res) {
    res.render("admin/dashboard");
});

// --- GENERIC CRUD HELPERS (To avoid repetition, but implemented explicitly for clarity/control) ---

// SKILLS
router.get("/skills", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("SELECT * FROM skills", function (err, result) {
        res.render("admin/manage_skills", { skills: result });
    });
});

router.post("/add_skill", checkAdmin, function (req, res) {
    var db = req.db;
    var d = req.body;
    db.query("INSERT INTO skills SET ?", d, function (err, result) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        res.redirect("/admin/skills");
    });
});

router.get("/delete_skill/:id", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("DELETE FROM skills WHERE id = ?", [req.params.id], function (err) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        res.redirect("/admin/skills");
    });
});

// CERTIFICATIONS
router.get("/certifications", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("SELECT * FROM certifications", function (err, result) {
        res.render("admin/manage_certifications", { certifications: result });
    });
});

router.post("/add_certification", checkAdmin, function (req, res) {
    var db = req.db;
    var title = req.body.title;
    var org = req.body.organization;
    var date = req.body.issue_date;

    if (req.files && req.files.image_path) {
        var file = req.files.image_path;
        var filename = new Date().getTime() + "_" + file.name;
        file.mv("./public/images/" + filename, function (err) {
            if (err) {
                console.error(err);
                return res.send("Database Error: " + err.message);
            }
            var sql = "INSERT INTO certifications (title, organization, issue_date, image_path) VALUES (?,?,?,?)";
            db.query(sql, [title, org, date, "/images/" + filename], function (err) {
                if (err) {
                    console.error(err);
                    return res.send("Database Error: " + err.message);
                }
                res.redirect("/admin/certifications");
            })
        });
    } else {
        var sql = "INSERT INTO certifications (title, organization, issue_date) VALUES (?,?,?)";
        db.query(sql, [title, org, date], function (err) {
            if (err) {
                console.error(err);
                return res.send("Database Error: " + err.message);
            }
            res.redirect("/admin/certifications");
        })
    }
});

router.get("/delete_certification/:id", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("DELETE FROM certifications WHERE id = ?", [req.params.id], function (err) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        res.redirect("/admin/certifications");
    });
});

// PROJECTS
router.get("/projects", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("SELECT * FROM projects", function (err, result) {
        res.render("admin/manage_projects", { projects: result });
    });
});

router.post("/add_project", checkAdmin, function (req, res) {
    var db = req.db;
    var d = req.body;
    if (req.files && req.files.image_path) {
        var file = req.files.image_path;
        var filename = new Date().getTime() + "_" + file.name;
        file.mv("./public/images/" + filename, function (err) {
            if (err) {
                console.error(err);
                return res.send("Database Error: " + err.message);
            }
            var sql = "INSERT INTO projects (title, description, full_description, link, image_path) VALUES (?,?,?,?,?)";
            db.query(sql, [d.title, d.description, d.full_description, d.link, "/images/" + filename], function (err) {
                if (err) {
                    console.error(err);
                    return res.send("Database Error: " + err.message);
                }
                res.redirect("/admin/projects");
            });
        });
    } else {
        // Handle case without image
        var sql = "INSERT INTO projects (title, description, full_description, link) VALUES (?,?,?,?)";
        db.query(sql, [d.title, d.description, d.full_description, d.link], function (err) {
            if (err) {
                console.error(err);
                return res.send("Database Error: " + err.message);
            }
            res.redirect("/admin/projects");
        });
    }
});

router.get("/delete_project/:id", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("DELETE FROM projects WHERE id = ?", [req.params.id], function (err) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        res.redirect("/admin/projects");
    });
});

// SERVICES
router.get("/services", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("SELECT * FROM services", function (err, result) {
        res.render("admin/manage_services", { services: result });
    });
});

router.post("/add_service", checkAdmin, function (req, res) {
    var db = req.db;
    var d = req.body;
    db.query("INSERT INTO services SET ?", d, function (err) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        res.redirect("/admin/services");
    });
});

router.get("/delete_service/:id", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("DELETE FROM services WHERE id = ?", [req.params.id], function (err) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        res.redirect("/admin/services");
    });
});

// EDUCATION
router.get("/education", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("SELECT * FROM education", function (err, result) {
        res.render("admin/manage_education", { education: result });
    });
});

router.post("/add_education", checkAdmin, function (req, res) {
    var db = req.db;
    var d = req.body;
    db.query("INSERT INTO education SET ?", d, function (err) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        res.redirect("/admin/education");
    });
});

router.get("/delete_education/:id", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("DELETE FROM education WHERE id = ?", [req.params.id], function (err) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        res.redirect("/admin/education");
    });
});

// EXPERIENCE
router.get("/experience", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("SELECT * FROM experience", function (err, result) {
        res.render("admin/manage_experience", { experience: result });
    });
});

router.post("/add_experience", checkAdmin, function (req, res) {
    var db = req.db;
    var d = req.body;
    db.query("INSERT INTO experience SET ?", d, function (err) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        res.redirect("/admin/experience");
    });
});

router.get("/delete_experience/:id", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("DELETE FROM experience WHERE id = ?", [req.params.id], function (err) {
        if (err) {
            console.error(err);
            return res.send("Database Error: " + err.message);
        }
        res.redirect("/admin/experience");
    });
});

// HERO
router.get("/hero", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("SELECT * FROM hero WHERE id=1", function (err, result) {
        if (err) return res.send(err.message);
        res.render("admin/manage_hero", { hero: result[0] });
    });
});

router.post("/update_hero", checkAdmin, function (req, res) {
    var db = req.db;
    var title = req.body.title;
    var subtitle = req.body.subtitle;

    if (req.files && req.files.image_path) {
        var file = req.files.image_path;
        var filename = "hero_" + new Date().getTime() + "_" + file.name;
        file.mv("./public/images/" + filename, function (err) {
            if (err) return res.send(err.message);
            db.query("UPDATE hero SET title=?, subtitle=?, image_path=? WHERE id=1",
                [title, subtitle, "/images/" + filename], function (err) {
                    if (err) return res.send(err.message);
                    res.redirect("/admin/hero");
                });
        });
    } else {
        db.query("UPDATE hero SET title=?, subtitle=? WHERE id=1", [title, subtitle], function (err) {
            if (err) return res.send(err.message);
            res.redirect("/admin/hero");
        });
    }
});

// ABOUT
router.get("/about", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("SELECT * FROM about WHERE id=1", function (err, result) {
        if (err) return res.send(err.message);
        res.render("admin/manage_about", { about: result[0] });
    });
});

router.post("/update_about", checkAdmin, function (req, res) {
    var db = req.db;
    var d1 = req.body.description_1;
    var d2 = req.body.description_2;
    var d3 = req.body.description_3;

    // Check if new files uploaded
    var hasImg = req.files && req.files.image_path;
    var hasCV = req.files && req.files.cv_path;

    // Logic to handle partial updates is complex in pure SQL without helper, 
    // so we nest checks or build query string.
    // For simplicity, we'll fetch current first (or assume we update what we have).
    // Actually, simplest is to update non-files first, then update files if present.

    var query = "UPDATE about SET description_1=?, description_2=?, description_3=? WHERE id=1";
    db.query(query, [d1, d2, d3], function (err) {
        if (err) return res.send(err.message);

        // Handle Image
        if (hasImg) {
            var img = req.files.image_path;
            var imgName = "about_" + new Date().getTime() + "_" + img.name;
            img.mv("./public/images/" + imgName, function (err) {
                if (!err) db.query("UPDATE about SET image_path=? WHERE id=1", ["/images/" + imgName]);
            });
        }

        // Handle CV
        if (hasCV) {
            var cv = req.files.cv_path;
            var cvName = "resume_" + new Date().getTime() + "_" + cv.name; // Keep name simple or timestamped
            // Actually user might want it to be named 'resume.pdf' specifically, but timestamp avoids cache issues.
            cv.mv("./public/" + cvName, function (err) {
                if (!err) db.query("UPDATE about SET cv_path=? WHERE id=1", ["/" + cvName]);
            });
        }

        // Redirect after short delay to let files save (hacky but works for simple app)
        setTimeout(function () { res.redirect("/admin/about"); }, 500);
    });
});

// SITE SETTINGS
router.get("/settings", checkAdmin, function (req, res) {
    var db = req.db;
    db.query("SELECT * FROM site_settings WHERE id=1", function (err, result) {
        if (err) return res.send(err.message);
        res.render("admin/manage_settings", { settings: result[0] });
    });
});

router.post("/update_settings", checkAdmin, function (req, res) {
    var db = req.db;
    var brand = req.body.navbar_brand;
    var footer = req.body.footer_text;

    db.query("UPDATE site_settings SET navbar_brand=?, footer_text=? WHERE id=1", [brand, footer], function (err) {
        if (err) return res.send(err.message);
        res.redirect("/admin/settings");
    });
});

module.exports = router;
