import mongoose from "mongoose";


const StatsSchema = new mongoose.Schema({
    users:{
        type: Number,
        default: 0,
    },
    subscription:{
        type: Number,
        default: 0,
    },
    views:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Number,
        default: Date.now,
    },
});

const StatsModel = mongoose.model("StatsModel", StatsSchema);
export default StatsModel;
