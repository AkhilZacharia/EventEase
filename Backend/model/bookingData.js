const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tickets: { type: Number, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  eventId: { type: String, required: true }
});

const bookingData = mongoose.model('booking', bookingSchema);
module.exports = bookingData;
