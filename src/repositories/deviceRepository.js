const db = require("../mocks/db");

async function save(device) {
  db.devices.set(device.id, device);
  return device;
}

async function findById(id) {
  return db.devices.get(id);
}

async function findAll() {
  return Array.from(db.devices.values());
}

module.exports = {
  save,
  findById,
  findAll
};