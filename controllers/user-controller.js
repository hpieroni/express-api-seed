/**
 * Creates a new user
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 *
 */
async function create(req, res) {
  const db = req.app.get('db');
  const user = await db.models.User.create(req.body);

  res.json(user.toObject());
}

module.exports = {
  create
};
