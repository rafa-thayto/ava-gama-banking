const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        key: {
            type: String,
            required: true
        },
        level: {
            type: String,
            enum: ['info', 'warn', 'error']
        },
        token: {
            type: String
        },
        sourceIp: {
            type: String
        },
        date: {
            type: Date,
            required: true,
            default: () => new Date()
        },
        data: Schema.Types.Mixed
    }, {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

schema.index({ key: 1 });
schema.index({ date: 1 });
schema.index({ sourceIp: 1 });

module.exports = schema;
