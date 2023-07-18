const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    createTicket,
    delete: deleteTicket
};

async function newTicket(req, res) {
  const flight= await Flight.findById(req.params.id)
  res.render('tickets/new', { title: "add ticket", flight });
}
 
async function createTicket(req, res) {
	req.body.flight = req.params.id ;
   try{
      let ticket = await Ticket.create(req.body) ;
    } catch (err) {
        console.log(err);
    }
		res.redirect(`/flights/${req.params.id}`);
};

async function deleteTicket(req, res) {
  const flightId = req.params.flightId;
  const ticketId = req.params.ticketId;

  try {
    // Assuming you have a Ticket model with the 'deleteOne' method
    const result = await Ticket.deleteOne({ _id: ticketId, flight: flightId });

    if (result.deletedCount === 0) {
      // Ticket with the provided ID not found
      return res.status(404).json({ error: 'Ticket not found.' });
    }

    // Redirect to the show view page after deletion
    return res.redirect(`/flights/${flightId}`);
  } catch (error) {
    // Handle the error, e.g., return an error response
    return res.status(500).json({ error: 'An error occurred while deleting the ticket.' });
  }
}