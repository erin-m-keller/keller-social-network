// initialize variables and import required module
const mongoose = require('mongoose'),
      { Schema, Types } = mongoose;

// create a new Mongoose schema
const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId, // type is an object id
      default: () => new mongoose.Types.ObjectId() // generates new object id
    },
    reactionBody: {
      type: String, // type is a string
      required: true, // reactionBody is required
      maxlength: 280 // maximum length is 280 characters
    },
    username: {
      type: String, // type is a string
      required: true // username is required
    },
    createdAt: {
      type: Date, // type is a date
      default: Date.now, // default value is the current date
      get: timestamp => new Date(timestamp).toISOString() // formats the timestamp into an ISO string when queried
    }
  }
);

// create a new Mongoose schema
const thoughtSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId, // type is an object id
      default: () => new mongoose.Types.ObjectId(), // generates new object id
    },
    thoughtText: {
      type: String, // type is a string
      required: true, // thought text is required
      minlength: 1, // minimum length is 1 character
      maxlength: 280 // maximum length is 280 characters
    },
    createdAt: {
      type: Date, // type is a date
      default: Date.now, // default value is the current date
      get: timestamp => new Date(timestamp).toISOString() // formats the timestamp into an ISO string when queried
    },
    username: {
      type: String, // type is a string
      required: true // userId is required
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reactions: [reactionSchema] // reactions field, an array of nested documents using reactionSchema
  },
  {
    toJSON: {
      virtuals: true, // include virtual properties when converting the document to JSON
      getters: true // apply getters, including virtual getters, when converting the document to JSON
    },
    id: false  // exclude the default "_id" field from the document
  }
);

thoughtSchema.virtual('reactionCount', {
  ref: 'Reaction', // refer to the name of the reaction model
  localField: '_id', // field from the current model (Thought)
  foreignField: 'thoughtId', // field from the referenced model (Reaction)
  count: true // set the `count` option to true to calculate the count
});

// create the Thought model using the thoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;