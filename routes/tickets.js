const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

router.get('/flights/:id/tickets/new', ticketsCtrl.new);
router.post('/flights/:id/tickets', ticketsCtrl.createTicket);
// Make sure the route is correctly defined with ":flightId" and ":ticketId" placeholders
router.delete('/flights/:flightId/tickets/:ticketId', ticketsCtrl.delete);

module.exports = router;