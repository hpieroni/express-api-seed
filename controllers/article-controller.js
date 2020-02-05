const { NotFound } = require('http-errors');

/**
 * Creates a new article
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 *
 */
async function create(req, res) {
  const { app, body } = req;
  const { Article } = app.get('db').models;
  const createdArticle = await Article.create(body);

  res.status(201).json(createdArticle.toObject());
}

/**
 * Updates an existing article
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 *
 */
async function update(req, res) {
  const { app, body, params } = req;
  const { Article } = app.get('db').models;
  const updatedArticle = await Article.findByIdAndUpdate(params.id, body, { new: true });

  if (!updatedArticle) {
    throw new NotFound();
  }

  res.json(updatedArticle.toObject());
}

/**
 * Removes an existing article
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 *
 */
async function remove(req, res) {
  const { app, params } = req;
  const { Article } = app.get('db').models;
  const removedArticle = await Article.findByIdAndDelete(params.id);

  if (!removedArticle) {
    throw new NotFound();
  }

  res.status(204).send();
}

module.exports = {
  create,
  update,
  remove
};
