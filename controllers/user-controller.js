/**
 * Creates a new user
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 *
 */
async function create(req, res) {
  const db = req.app.get('db');
  const createdUser = await db.models.User.create(req.body);

  res.json(createdUser.toObject({ versionKey: false }));
}

module.exports = {
  create
};
