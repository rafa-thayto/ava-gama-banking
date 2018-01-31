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
        },
        password:{
            type: String,
            required: true
        }
    }, {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

schema.virtual('accounts', { ref: 'Account', localField: '_id', foreignField: 'client' });

schema.index({ name: 1 });
schema.index({ document: 1 }, { unique: true });

module.exports = schema;
