const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
    EmployeeID: String,
    Name: String,
    Designation: String,
    Salary: Number,
    Department: String,
    Location: String
})
const employeeData = mongoose.model('employee',employeeSchema);
module.exports = employeeData;