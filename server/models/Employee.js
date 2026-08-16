const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Employee',
  },
  supervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supervisor',
    required: true,
  },
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  qualifications: { type: String },
  institutions: { type: String },
  passingYear: { type: String },
  skillType: { type: String, enum: ['Skilled', 'Unskilled'] },
  skills: { type: [String] },
  experienceYears: { type: Number },
  previousRoles: { type: String },
  previousSalary: { type: Number },
  aadhaarUrl: { type: String },
  panUrl: { type: String },
  profilePhotoUrl: { type: String },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

// Hash password before saving
employeeSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
employeeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
employeeSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
