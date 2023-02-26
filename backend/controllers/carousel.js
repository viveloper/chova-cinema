const axios = require('axios');

// @desc    Get carousel items
// @route   GET /api/carousel
// @access  Public
exports.getCarousel = async (req, res, next) => {
  const { data } = await axios.get('/data/home/carouseItems.json');

  res.status(200).json(
    data.map((item) => ({
      ...item,
      img: `${process.env.BASE_URL}${item.img}`,
      video: `${process.env.BASE_URL}${item.video}`,
    }))
  );
};
