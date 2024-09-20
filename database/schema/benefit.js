//generate a mongoDB schema for benefits
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const benefitSchema = new Schema({
    customer: { type: String, required: true },
    industry: { type: String, required: true },
    employeeSize: { type: Number, required: true },
    city: { type: String, required: true },
    hasGradedSumInsured: { type: Boolean},
    copay: { type: Number, default:0 },
    corporateFloater: { type: Number },
    inceptionPremium: { type: Number, required: true },
    familyDefinition: { type: String, required: true },
    sumInsured: { type: Number, required: true },
    roomRentNormal: { type: Schema.Types.Mixed , required: true },// type can be a number or a string
    roomRentICU: { type: Schema.Types.Mixed, required: true },
    maternityNormal: { type: Number, required: true },
    maternityCSection: { type: Number, required: true },
    lasik: { type: Number, required: true },
    isForBenchmarking: { type: Boolean, default: false, required:true },
    allowedKidsCount: { type: Number, required: false },
    allowedParentsCount : { type: Number, required: false },
    allowedSpouseCount : { type: Number, required: false },
    specialConditionCount: { type: Number, required: false },
    score: { type: Number, default:0, required: false },
    policyNumber: { type: String, unique:true, required: true },
    component: {type: Object,  required: false},
    percentile: {type: Object,  required: false}
});

module.exports = mongoose.model('Benefit', benefitSchema);
