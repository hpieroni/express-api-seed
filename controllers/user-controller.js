/**
 * Creates a new user
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 *
 */
function create(req, res) {
  res.json({ _id: '1', ...req.body });
}

module.exports = {
  create
};
