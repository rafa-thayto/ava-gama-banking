const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: 'Client',
            required: true
        },
        ag: {
            type: Number,
            default: 1
        },
        account_number: {
            type: Number, //TODO: auto increment
            required: true
        },
        balance: {
            type: Number,
            required: true,
            default: 0
        },
        password: {
            type: String,
            required: true
        }
    }, {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

schema.index({ client: 1 });
schema.index({ ag: 1, account_number: 1 }, { unique: true });

module.exports = schema;
