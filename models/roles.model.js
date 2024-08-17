const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    read: {
      type: Boolean,
      default: false,
    },
    write: {
      type: Boolean,
      default: false,
    },
    view: {
      type: Boolean,
      default: false,
    },
    editContent: {
      type: Boolean,
      default: false,
    },
    deleteContent: {
      type: Boolean,
      default: false,
    },
    deleteUser: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("Role", RoleSchema);
