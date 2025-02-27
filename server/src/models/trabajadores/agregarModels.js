const mongoose = require('mongoose');

const trabajadorSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true,
        maxlength: 200
    },
    cedula: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10
    },
    salario: {
        type: Number,
        required: true,
        min: 0
    },
    seguroSocial: {
        type: String,
        required: true,
        maxlength: 50
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Trabajador', trabajadorSchema);
