const Flight = require('../models/flight');

module.exports = {
  addDestination,
  deleteDestination,
};

async function addDestination(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    const { name, airport, arrival } = req.body;
    const destination = { name, airport, arrival };
    
    flight.destinations.push(destination);

	// Sort destinations by arrival date/time in ascending order
	flight.destinations.sort((a, b) => new Date(a.arrival) - new Date(b.arrival));

    await flight.save();

    res.redirect(`/flights/${flight._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

  async function deleteDestination(req, res, next) {
	try {
	  const flightId = req.params.flightId;
	  const destinationId = req.params.destinationId;
  
	  const flight = await Flight.findById(flightId);
  
	  if (!flight) {
		return res.redirect('/flights');
	  }
  
	  const destinationIndex = flight.destinations.findIndex((destination) => destination._id.equals(destinationId));
  
	  if (destinationIndex === -1) {
		return res.redirect(`/flights/${flightId}`);
	  }
  
	  const deletedDestination = flight.destinations.splice(destinationIndex, 1)[0];
	  await flight.save();
  
	  console.log(deletedDestination);
	  res.redirect(`/flights/${flightId}`);
	} catch (error) {
	  console.error(error);
	  res.redirect('/flights');
	}
  }