const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();

const PORT = 4000;
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://adetayotumi4:<PASSWORD>@cluster0.ttfzz.mongodb.net/Test"
);

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json({ result }))
    .catch((err) => res.json({ err }));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json({ result }))
    .catch((err) => res.json({ err }));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json({ result }))
    .catch((err) => {
      res.json({ err });
    });
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task })
    .then((result) => {
      res.json({ result });
      console.log(result);
    })
    .catch((err) => res.json({ error: err }));
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
