const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        document: { // cpf/cnpj
            type: Number,
            required: true
        }
    }, {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

schema.index({ name: 1 });
schema.index({ document: 1 }, { unique: true });

module.exports = schema;
