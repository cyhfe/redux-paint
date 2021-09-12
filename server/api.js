const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");
const DATA_FILE = path.join(__dirname, "db.json");

// id: string
// name: string
// strokes: Stroke[]
// image: string


router.get("/projects", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const projects = JSON.parse(data);
    res.json(projects);
  });
});

router.get("/projects/:id", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const projects = JSON.parse(data);
    const id = req.params.id;
    const project = projects.find(p => p.id === id)
    if(project ){
      res.json(project);
    } else {
      res.statusCode = 404
      res.json({
        success: false,
        message: 'NOT FOUND'
      })
    }
  });
});

router.post("/projects", (req, res) => {
  const { name, strokes, image } = req.body;
  const valid = name && strokes && image;
  if (!valid) {
    res.json({ success: false });
  } else {
    fs.readFile(DATA_FILE, (err, data) => {
      const projects = JSON.parse(data);
      const newProject = {
        id: nanoid(),
        name,
        strokes,
        image,
      };
      projects.push(newProject);
      fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), () => {
        res.json({ success: true });
      });
    });
  }
});
module.exports = router;
