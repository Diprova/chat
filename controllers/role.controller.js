const Role = require("../models/roles.model");

async function createRoles(req, res) {
  try {
    const newRole = new Role({
      name: req.body.name,
      permissions: req.body.permissions,
    });

    const savedRole = await newRole.save();
    console.log("Role created:", savedRole);
    res.status(201).json(savedRole);
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Failed to create role" });
  }
}

module.exports = { createRoles };
