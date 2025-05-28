const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea')

// const ideas = [
//   {
//     id: 1,
//     text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
//     tag: 'Technology',
//     username: 'TonyStark',
//     date: '2022-01-02',
//   },
//   {
//     id: 2,
//     text: 'Milk cartons that turn a different color the older that your milk is getting',
//     tag: 'Inventions',
//     username: 'SteveRogers',
//     date: '2022-01-02',
//   },
//   {
//     id: 3,
//     text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
//     tag: 'Software',
//     username: 'BruceBanner',
//     date: '2022-01-02',
//   },
// ];

// Get All Ideas
router.get('/', async (req,res)=>{
  try {
    const ideas = await Idea.find();
    res.json({success: true, data: ideas})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error: "Something went Wrong"})
  }
});

//Get single idea
router.get('/:id', async (req,res)=>{
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({success: true, data: idea})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error: 'Resourse not found'})
  }
});

router.post('/', async (req, res)=> {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const saveIdea = await idea.save();
    res.json({success: true, data: saveIdea})
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, error: "somthing went wrong"})
  }

});

router.put('/:id', async (req,res)=>{
  try {
  const idea = await Idea.findById(req.params.id)
    //match the usernames
    if(idea.username === req.body.username){
      const updateIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          }
        },
          { new: true}
        )
      return res.json({success: true, data: updateIdea});
      }
        //username do not match
      res.status(403).json({
        success: false,
        error: "You are not authorized to update this resource"
      });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error: 'Something went wrong'})
  }

  });

  //delete idea
router.delete('/:id', async (req,res) => {
  try {
    const idea = await Idea.findById(req.params.id)

    //match the usernames
    if(idea.username === req.body.username){
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({success: true, data: {}});

    }
      //username do not match
      res.status(403).json({
        success: false,
        error: "You are not authorized to delete this resource"
      });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error: 'Something went wrong'})
  }
  
});

module.exports = router;