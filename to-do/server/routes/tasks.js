import express from 'express';
import Tasks from '../model/Tasks.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isJson } from '../middlewares/auth.js';
import { isLength } from '../middlewares/auth.js';

const router = express.Router();

// Get All Tasks

router.get('/', isJson, verifyToken, async (req, res) => {
  try {
    // find all Tasks in the db
    const allTasks = await Tasks.find();
    res.status(200).send(allTasks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Get single Tasks
router.get('/find/:id', isJson, verifyToken, async (req, res) => {
  try {
    // find a Tasks by id in the db
    const singleTask = await Tasks.find({ userId: req.params.id });

    res.status(200).send(singleTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create/Add new Tasks

router.post('/', isJson, isLength, verifyToken, async (req, res) => {
  const newTasks = new Tasks(req.body);

  try {
    const savedTasks = await newTasks.save();
    res.status(200).send(savedTasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a Tasks

router.put('/:id', isJson, verifyToken, async (req, res) => {
  try {
    // find the Tasks in the db and update the value(s)
    const updatedTasks = await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).send(updatedTasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Task

router.delete('/:id', isJson, verifyToken, async (req, res) => {
  try {
    await Tasks.findByIdAndDelete(req.params.id);
    res.status(200).send('Tasks deleted!');
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
