const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations');

// POST /flights/:id/destinations
router.post('/flights/:id/destinations', destinationsCtrl.addDestination);
// DELETE /flights/:flightId/destinations/:destinationId
router.delete('/flights/:flightId/destinations/:destinationId', destinationsCtrl.deleteDestination);


module.exports = router;