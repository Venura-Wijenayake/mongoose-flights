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
      console.log(req.body)
      let ticket = await Ticket.create(req.body) ;
	    console.log(ticket)

    } catch (err) {
        console.log(err);
    }
		res.redirect(`/flights/${req.params.id}`);
};

  async function deleteTicket(req, res) {
    try {
      const ticketId = req.params.id;
      const ticket = await Ticket.findById(ticketId).populate('flight').exec();
      await Ticket.findByIdAndDelete(ticketId);
      console.log(`Deleting ticket: ${ticket}`);
      res.redirect(`/flights/${ticket.flight._id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }