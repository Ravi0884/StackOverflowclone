const express=require('express')
const router = express.Router()
const Question = require('../Models/Question')

router.post('/', async (req, res) => {
    const questionData = new Question({
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        user: req.body.user
    })
    await questionData.save().then((data)=>{
        res.status(200).send({
            status:true,
            data:data
        })
    }).catch((err)=>{
        res.status(400).send({
            status:false,
            message:"Error adding data"
        })
    })
})

router.get('/', async (req, res) => {
    try {
      const questions = await Question.find();
      res.json(questions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.get('/:id', async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.put('/questionViews/:id', async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      question.views = question.views +1;
      const updatedQuestion = await question.save();
      res.json(updatedQuestion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  router.put('/answerViews/:id', async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      question.answers = question.answers +1;
      const updatedQuestion = await question.save();
      res.json(updatedQuestion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
    

module.exports=router;