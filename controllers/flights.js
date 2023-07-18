const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  index,
  show,
  new: newFlight,
  create,
  delete: deleteFlight,
};

async function index(req, res) {
  const flights = await Flight.find({});
  res.render('flights/index', { title: 'All Flights', flights });
}

async function show(req, res, next) {
  try {
    const flight = await Flight.findById(req.params.id).exec();
    if (!flight) {
      return res.redirect('/flights');
    }

    const tickets = await Ticket.find({ flight: flight._id }).exec();

    res.render('flights/show', { flight, tickets, title: 'Flight Details' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

function newFlight(req, res) {
  //create an in-memory flight document, This will give access to the default departure date logic.
  const newFlight = new Flight();
  const dt = newFlight.departs;
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  console.log(departsDate);

  res.render('flights/new', { title: 'Add Flight', errorMsg: '', departsDate: departsDate });
}


async function create(req, res) {
  req.body.nowShowing = !!req.body.nowShowing;

  if (req.body.cast) {
    req.body.cast = req.body.cast.trim().split(/\s*,\s*/);
  } else {
    req.body.cast = [];
  }

  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }

  try {
    await Flight.create(req.body);
    res.redirect('/flights');
  } catch (err) {
    console.error(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}

async function deleteFlight(req, res) {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    console.log(flight);
    res.redirect('/flights');
  } catch (err) {
    console.error(err);
    res.redirect('/flights');
  }
}