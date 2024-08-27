const User = require("../models/user.model");

async function GetUserList(req, res) {
  try {
    const userList = await User.find();
    return res.json({ data: userList });
  } catch (error) {
    return res.json({ status: 400, message: "Users List not Found !" });
  }
}
module.exports = { GetUserList };
