const objectId = require('./joi-objectId');

describe('Joi OjectId', () => {
  test('should return an error if the value is not an ObjectId', () => {
    const { error } = objectId.validate('invalid');
    expect(error.message).toBe('must be an ObjectId');
  });

  test('should not return an error if the value is an ObjectId', () => {
    const { error } = objectId.validate('507f1f77bcf86cd799439011');
    expect(error).toBeUndefined();
  });
});
