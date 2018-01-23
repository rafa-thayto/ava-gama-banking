const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        from: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: () => new Date()
        },
        value: {
            type: Number
        },
        status: {
            type: String,
            enum: ["pendente", "completado", "abortado"] //TODO: status melhores
        },
        msg: {
            type: String,
            default: undefined
        }
    }, {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

schema.index({ from: 1 });
schema.index({ to: 1 });
schema.index({ from: 1, to: 1 });
schema.index({ from: 1, to: 1, date: 1 });
schema.index({ from: 1, to: 1, date: 1, value: 1 });
schema.index({ status: 1 });

module.exports = schema;
