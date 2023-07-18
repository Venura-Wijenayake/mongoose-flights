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
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  console.log(departsDate);

  // Respond with a form for entering a new flight
  res.render('flights/new', { title: 'Add Flight', errorMsg: '', departsDate: departsDate });
}


async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove any whitespace at start and end of cast
  req.body.cast = req.body.cast.trim();
  // split cast into an array if it's not an empty string - using a regular expression as a separator
  if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    await Flight.create(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the movies index after we implement it
    res.redirect('/flights');  // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
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