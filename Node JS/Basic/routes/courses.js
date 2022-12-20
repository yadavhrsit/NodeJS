const express = require("express");
const router = express.Router();

const courses = [
  {
    Name: "HTML",
    Price: 500,
    duration: "6",
  },
  {
    Name: "CSS",
    Price: 1000,
    duration: "8",
  },
  {
    Name: "Javascript",
    Price: 2000,
    duration: "14",
  },
];
router.get("/", (req, res) => {
  res.send(courses);
});
router.get("/:name", (req, res) => {
  const cName = req.params.name;
  const result = courses.find((course) => course.Name == cName);
  res.send(result);
});
router.get("/:price/:duration", (req, res) => {
  const cPrice = parseInt(req.params.price);
  const cDuration = parseInt(req.params.duration);
  const result = [];
  courses.forEach((course) => {
    if (course.Price <= cPrice && course.duration <= cDuration)
      result.push(course);
  });
  res.send(result);
});

// http://localhost:3000/api/courses/1000/6?sortBy=Name
// router.get("/api/courses", (req, res) => {
//   reqQuery = req.query;
//   res.send(reqQuery);
// });

// router.post("/api/courses", (req, res) => {
//   const course = {
//     name: req.body.name,
//     Price: req.body.price,
//     duration: req.body.duration,
//   };
//   courses.push(course);
//   res.send("This: " + course + " is Added");
// });

router.post("/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
});

module.exports = router;
