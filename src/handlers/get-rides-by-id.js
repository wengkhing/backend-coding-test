const db = require('../db');

module.exports = async (req, res) => {
  try {
    const params = [req.params.id];
    const { rows } = await db.query('SELECT * FROM Rides WHERE rideID = ?', params);

    if (rows.length === 0) {
      return res.status(404).send({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides'
      });
    }

    res.send(rows);
  } catch (err) {
    return res.status(500).send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error'
    });
  }
};