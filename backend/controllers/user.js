const fs = require('fs');
const path = require('path');
const axios = require('axios');

// @desc    Get user data
// @route   GET /api/user
// @access  Private
exports.getUser = async (req, res, next) => {
  const userId = req.user.id;

  const { data: usersData } = await axios.get('/data/users/users.json');

  const { id, name, email, reviewList, reviewLikeList, ticketingList } =
    usersData.users.find((user) => user.id === userId);

  res.status(200).json({
    id,
    name,
    email,
    reviewList,
    reviewLikeList,
    ticketingList,
  });
};
