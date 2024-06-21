const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    foundationalLiteracy: Number,
    foundationalNumeracy: Number,
    socialEmotionalLiteracy: Number,
    
});

const report = mongoose.model('Report', reportSchema);

module.exports = report;