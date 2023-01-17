const { celebrate, Joi } = require('celebrate');
const { linkRegex } = require('./constants');

const emailPasswordValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
    }),
});

const userDataValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),

      email: Joi.string()
        .email()
        .required(),

      password: Joi.string()
        .required(),
    }),
});

const userNameEmailValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),

      email: Joi.string()
        .email()
        .required(),
    }),
});

const cardInfoValidator = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string()
        .required(),

      director: Joi.string()
        .required(),

      duration: Joi.number()
        .required(),

      year: Joi.string()
        .required(),

      description: Joi.string()
        .required(),

      image: Joi.string()
        .pattern(linkRegex)
        .required(),

      trailerLink: Joi.string()
        .pattern(linkRegex)
        .required(),

      thumbnail: Joi.string()
        .pattern(linkRegex)
        .required(),

      movieId: Joi.string()
        .required(),

      nameRU: Joi.string()
        .required(),

      nameEN: Joi.string()
        .required(),
    }),
});

// const userAvatarValidator = celebrate({
//   body: Joi.object()
//     .keys({
//       avatar: Joi.string()
//         .pattern(linkRegex)
//         .required(),
//     }),
// });
//
// const cardIdValidator = celebrate({
//   params: Joi.object()
//     .keys({
//       cardId: Joi.string()
//         .hex()
//         .length(24)
//         .required(),
//     }),
// });
//
// const cardNameLinkValidator = celebrate({
//   body: Joi.object()
//     .keys({
//       name: Joi.string()
//         .min(2)
//         .max(30)
//         .required(),
//       link: Joi.string()
//         .pattern(linkRegex)
//         .required(),
//     }),
// });

module.exports = {
  emailPasswordValidator,
  userDataValidator,
  userNameEmailValidator,
  cardInfoValidator,
};
