const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      require: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      require: [true, "Please provide a position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy:{
          // type:String,
          // require:true,
          // default:uuidv4()
          type: mongoose.Schema.Types.ObjectId,
          ref:'user',
          require:true

    } 
      
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("job", jobSchema);
