const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const TagData = await Tag.findAll({
      include: [{ model: Product },],
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find all tags
  // be sure to include its associated Product data

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // Add Book as a second model to JOIN with
      include: [{ model: Product }, ],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
  
  
  // find a single tag by its `id`
  // be sure to include its associated Product data


  router.post('/', async (req, res) => {
    try {
      const tagData = await Tag.create(req.body);
      res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
    // creates a new tag
  });

  router.put('/:id', function(req, res) { 
    Tag.update(req.body,{
      where:{
        id: req.params.id,
      },
    })
      .then(result => res.status(200).send(result))
      .catch(err => res.status(500).send(err));
  });











router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  //delete tags by its id value
});

module.exports = router;
