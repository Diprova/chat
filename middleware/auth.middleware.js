const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  try {
    // let Bearer_Token = req.headers.authorization.split(" ")[1];
    let Bearer_Token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjY4YTYzZWY2NmFkNDQ1NTgzZWJiMjgyIiwiaWF0IjoxNzIyNjU4MTg5LCJleHAiOjE3MjI2NjE3ODl9.boaOA-RCv0B8IFUUJDnB3r7jXDHGw_AfJcuNRQ4ifUo";
    let decoded_token = jwt.verify(Bearer_Token, process.env.JWT_ACCESS_SECRET);
    console.log(
      decoded_token.exp,
      new Date(decoded_token.exp * 1000),
      "------check exp----"
    );
    // req.userData = decoded_token;
    next();
  } catch (error) {
    console.log(res, "---check res----");
    // return res.json({ status: true, message: "You are not Authorized", data: error });
  }
}

module.exports = { verifyToken };
