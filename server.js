const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const PORT = 2005;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Multer middleware for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Specify upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with timestamp
  },
});
const upload = multer({ storage: storage });

// Set the view engine to ejs
app.set("view engine", "ejs");

// Initialize an empty array for projects
let projects = [];

// Route to home page (using optional parameter for home route)
app.get("/:id(home)?", (req, res) => {
  res.render("home"); // Render home.ejs
});

// Route to projects page, passing the projects array
app.get("/projects", (req, res) => {
  res.render("projects", { projects }); // Render projects.ejs with projects array
});

// Route to contactUs page
app.get("/contactUs", (req, res) => {
  res.render("contactUs"); // Render contactUs.ejs
});

// Route to uploadProject page, passing the projects array
app.get("/uploadProject", (req, res) => {
  res.render("uploadProject", { projects }); // Render uploadProject.ejs with projects array
});

// Handle form submission to /submit endpoint
app.post("/submit", upload.single("image"), (req, res) => {
  const projectDetails = {
    name: req.body.name,
    description: req.body.description,
    time: req.body.time,
    date: req.body.date,
    image: req.file ? `/uploads/${req.file.filename}` : null, // Save uploaded file path
  };

  // Push the new project details into the projects array
  projects.push(projectDetails);

  // Redirect to /newProject to display the updated projects list
  res.redirect("/newProject");
});

// Route to newProject page, passing the projects array
app.get("/newProject", (req, res) => {
  res.render("newProject", { projects }); // Render newProject.ejs with projects array
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
