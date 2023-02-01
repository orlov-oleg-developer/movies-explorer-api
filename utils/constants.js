const regexes = {
  linkRegex: new RegExp('https?\\:\\/\\/w?w?w?\\.?[\\s\\S]*'),
  mailRegex: new RegExp('.+@.+\\..+'),
};

const messages = {
  notFoundMessage: 'Нет пользователя с таким id',
  incorrectData: 'Переданы некорректные данные при создании пользователя',
  incorrectPasswordOrLoginMessage: 'Неправильные почта или пароль',
  incorrectMovieIdMessage: 'Фильм с указанным _id не найден',
  noAccessMessage: 'У вас нет доступа к удалению этой карточки',
  authorizationRequiredMessage: 'Необходима авторизация',
  serverErrorMessage: 'На сервере произошла ошибка',
  pageNotFoundMessage: 'Страница не найдена',
};

module.exports = {
  regexes,
  messages,
};
