const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    createTicket,
    delete: deleteTicket,
    newTicketForm,
};

async function newTicket(req, res) {
  const flight = await Flight.findById(req.params.id);
  res.render('tickets/new', { title: "Add Ticket", flight });
}

async function createTicket(req, res) {
  req.body.flight = req.params.id;
  try {
      let ticket = await Ticket.create(req.body);
      console.log(ticket);
  } catch (err) {
      console.log(err);
  }
  res.redirect(`/flights/${req.params.id}`);
}

async function deleteTicket(req, res) {
  const flightId = req.params.flightId;
  const ticketId = req.params.ticketId;

  try {
      const result = await Ticket.deleteOne({ _id: ticketId, flight: flightId });

      if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Ticket not found.' });
      }

      return res.redirect(`/flights/${flightId}`);
  } catch (error) {
      return res.status(500).json({ error: 'An error occurred while deleting the ticket.' });
  }
}

function newTicketForm(req, res) {
  const flightId = req.params.id;
  res.render('tickets/new', { title: 'Add New Ticket', flightId });
}