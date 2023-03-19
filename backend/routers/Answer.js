const express = require('express')
const router = express.Router()
const Answer = require('../Models/Answer')



router.post('/', async (req,res)=>{
    const answerData = new Answer({
        question_id:req.body.question_id,
        answer:req.body.answer,
        user:req.body.user
    })
    await answerData.save().then( (data)=>{
        res.status(200).send({
            status:true,
            data:data
        })
    }).catch((err)=>{
        res.status(400).send({
            status:false,
            message:"Error while adding answer"
        })
    })
})

router.get('/:id', async (req, res) => {
    try {
      const answer = await Answer.find({ question_id: req.params.id });
      if (!answer) {
        return res.status(404).json({ message: 'Answer not found' });
      }
      res.json(answer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router