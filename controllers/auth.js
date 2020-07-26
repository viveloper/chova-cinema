const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getRandomInt } = require('../utils');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const jsonData = fs.readFileSync(
    path.resolve(__dirname, '../data/users/users.json')
  );
  const usersData = JSON.parse(jsonData);
  if (usersData.users.find((user) => user.email === email)) {
    res
      .status(400)
      .json({ success: false, message: '이미 가입된 이메일입니다.' });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const id = getRandomInt(100000000, 1000000000).toString();
    usersData.users.push({
      id,
      name,
      email,
      password: hash,
    });
    fs.writeFileSync(
      path.resolve(__dirname, '../data/users/users.json'),
      JSON.stringify(usersData)
    );
    const token = getToken({ id, name, email });
    res.status(200).json({
      success: true,
      token,
      user: {
        name,
        email,
        reviewList: [],
        reviewLikeList: [],
        ticketingList: [],
      },
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const jsonData = fs.readFileSync(
    path.resolve(__dirname, '../data/users/users.json')
  );
  const usersData = JSON.parse(jsonData);
  const user = usersData.users.find((user) => user.email === email);

  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: '이메일과 비밀번호를 입력하세요.',
    });
  if (!user)
    return res.status(401).json({
      success: false,
      message: '존재하지 않는 이메일입니다.',
    });
  if (!(await matchPassword(password, user.password)))
    return res.status(401).json({
      success: false,
      message: '잘못된 비밀번호입니다.',
    });

  const token = getToken({ id: user.id, name: user.name, email: user.email });
  res.status(200).json({
    success: true,
    token,
    user: {
      name: user.name,
      email: user.email,
      reviewList: user.reviewList,
      reviewLikeList: user.reviewLikeList,
      ticketingList: user.ticketingList,
    },
  });
};

function getToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
}

async function matchPassword(enteredPassword, hashedPassword) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
}
