CREATE DATABASE IF NOT EXISTS dynamic_portfolio;
USE dynamic_portfolio;

-- DROP TABLES IF THEY EXIST (To ensure new schema is applied)
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS certifications;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS experience;
DROP TABLE IF EXISTS hero;
DROP TABLE IF EXISTS about;
DROP TABLE IF EXISTS site_settings;

-- ADMIN TABLE
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);
INSERT INTO admin (username, password) VALUES ('admin', 'admin123');

-- SITE SETTINGS TABLE (Single Row)
CREATE TABLE site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    navbar_brand VARCHAR(255),
    footer_text TEXT
);
INSERT INTO site_settings (navbar_brand, footer_text) VALUES 
('Abhishek Darandale', '&copy; 2026 Abhishek Darandale. All Rights Reserved.');

-- HERO TABLE (Single Row)
CREATE TABLE hero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    subtitle TEXT,
    image_path VARCHAR(255)
);
INSERT INTO hero (title, subtitle, image_path) VALUES 
('Abhishek Darandale', 'BBA(CA) Pursuing || Full Stack Developer || Intern at A2Z IT Hub PVT.LTD.', '/images/Abhi.jpeg');

-- ABOUT TABLE (Single Row)
CREATE TABLE about (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description_1 TEXT, -- Hello! I'm...
    description_2 TEXT, -- I have recently...
    description_3 TEXT, -- Currently, I am...
    image_path VARCHAR(255),
    cv_path VARCHAR(255)
);
INSERT INTO about (description_1, description_2, description_3, image_path, cv_path) VALUES 
('Hello! I\'m Abhishek Darandale...', 
'I have recently Pursuing Bachelor Business Administration (BBA-CA) from New Arts, Commerce and Science College, Ahilyanagar. Along with that, I have also completed a Full Stack Development course from A2Z IT Hub, Ahilyanagar.', 
'Currently, I am working as an Intern at A2Z IT Hub as a Full Stack Developer. I have good knowledge of HTML, CSS, Bootstrap, JavaScript,jQuery,Node.js,Mysql and I am also learning backend technologies like Node.js,Express.js, and database management with MySQL.', 
'/images/Abhi.jpeg', 
'/resume.pdf');

-- SKILLS TABLE
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_class VARCHAR(100) DEFAULT 'bi bi-code-slash'
);
INSERT INTO skills (name, icon_class) VALUES 
('HTML5', 'bi bi-code-slash'),
('CSS3', 'bi bi-palette'),
('JavaScript', 'bi bi-filetype-js'),
('Bootstrap 5', 'bi bi-bootstrap'),
('Node.js', 'bi bi-node-plus-fill'),
('MySQL', 'bi bi-database'),
('jQuery', 'bi bi-journal-code'),
('Git & GitHub', 'bi bi-git');

-- CERTIFICATIONS TABLE
CREATE TABLE certifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    issue_date VARCHAR(50),
    image_path VARCHAR(255)
);
INSERT INTO certifications (title, organization, issue_date, image_path) VALUES 
('HTML5 Certification', 'A2Z It Hub', 'January 2025', '/images/html.jpg'),
('CSS3 Certification', 'A2Z It Hub', 'Feb 2025', '/images/css.jpg'),
('Bootstrap Certification', 'A2Z It Hub', 'March 2025', '/images/bootstrap.jpg'),
('JavaScript Certification', 'A2Z It Hub', 'April 2025', '/images/js.jpg'),
('jQuery Certification', 'A2Z It Hub', 'May 2025', '/images/jquery.jpg'),
('Node.js Certification', 'A2Z It Hub', 'October 2025', '/images/node.jpg');

-- SERVICES TABLE
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon_class VARCHAR(100) DEFAULT 'fas fa-code'
);
INSERT INTO services (title, description, icon_class) VALUES 
('Web Development', 'Creating responsive and dynamic websites using modern technologies and frameworks to deliver exceptional user experiences.', 'fas fa-code'),
('Static Websites', 'Designing intuitive and visually appealing interfaces that enhance user satisfaction and improve usability.', 'fas fa-paint-brush'),
('Responsive Design', 'Building websites that work seamlessly across all devices from desktops to mobile phones.', 'fas fa-mobile-alt');

-- PROJECTS TABLE
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    full_description TEXT,
    image_path VARCHAR(255),
    link VARCHAR(255)
);
INSERT INTO projects (title, description, full_description, image_path) VALUES 
('E-commerce Website', 'A fully responsive e-commerce platform with product filtering and cart functionality.', 'A comprehensive e-commerce platform featuring user authentication, product catalog with filtering, shopping cart integration, and secure checkout process. Built with responsive design principles to ensure seamless shopping experience across devices.', '/images/e_comm.jpg'),
('Hospital Management System', 'A hospital management system that helps manage patient records, appointments, and billing.', 'A digital solution for healthcare facilities to streamline patient registration, appointment scheduling, doctor availability management, and billing records. Focuses on efficiency and reducing manual paperwork.', '/images/hosptial.jpg'),
('Cristiano Ronaldo - Static Website', 'A responsive portfolio website dedicated to Cristiano Ronaldo, featuring his career statistics, achievements, and gallery.', 'An immersive tribute website showcasing the legendary career of Cristiano Ronaldo. Features a photo gallery, career statistics breakdown, awards timeline, and biography, all presented with a modern, high-energy design.', '/images/cristino.png');

-- EDUCATION TABLE
CREATE TABLE education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    degree VARCHAR(255) NOT NULL,
    institute VARCHAR(255) NOT NULL,
    year_range VARCHAR(50),
    cgpa VARCHAR(50)
);
INSERT INTO education (degree, institute, year_range, cgpa) VALUES 
('Bachelor of Bussiness Administration in Computer Application', 'New Art\'s Commerce & Science College Ahmednagar', '2023 - 2026', '8.36');

-- EXPERIENCE TABLE
CREATE TABLE experience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    duration VARCHAR(50),
    description TEXT
);
INSERT INTO experience (role, company, duration, description) VALUES 
('Full Stack Developer Intern', 'A2Z IT Hub Pvt. Ltd.', 'January 2026 - Present', 'Assisted in developing live client projects using technologies like Node.js, MySQL, JavaScript, and Bootstrap. Worked on full project life cycles including planning, development, testing, and debugging.');
