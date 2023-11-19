const User = require('../models/user');
const { errorsHandler } = require('../utils/utils');

// Получит список пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => errorsHandler(err, res));
};

// Поулчиь пользователя по id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => errorsHandler(err, res));
};

// Создание нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => errorsHandler(err, res));
};
// Обновить Профиль
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => errorsHandler(err, res));
};
// Обновление аватара пользователя
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => errorsHandler(err, res));
};
