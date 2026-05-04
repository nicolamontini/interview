const deviceRepository = require("../repositories/deviceRepository");

async function createDevice(data) {
  // TODO: implement business logic
}

async function getAllDevices() {
  return await deviceRepository.findAll();
}

module.exports = {
  createDevice,
  getAllDevices,
};