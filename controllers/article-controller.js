const { BadRequest } = require('http-errors');

/**
 * Creates a new article
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 *
 */
async function create(req, res) {
  const db = req.app.get('db');
  const { Article, User } = db.models;
  const { body } = req;

  if (!(await User.exists({ _id: body.userId }))) {
    throw new BadRequest(`Not found user with id: ${body.userId}`);
  }

  const article = await Article.create(body);

  res.json(article.toObject());
}

module.exports = {
  create
};
