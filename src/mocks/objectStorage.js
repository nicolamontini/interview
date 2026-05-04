const fs = require("fs");

const storage = new Map();

async function upload({ key, path }) {
  console.log(`[ObjectStorage] Uploading ${path} as ${key}`);

  // read file from disk (uploaded via multer)
  const fileBuffer = await fs.promises.readFile(path);

  // store in memory
  storage.set(key, {
    data: fileBuffer,
    size: fileBuffer.length,
    uploadedAt: new Date().toISOString(),
  });

  return {
    key,
    size: fileBuffer.length,
  };
}

async function get(key) {
  const file = storage.get(key);

  if (!file) {
    throw new Error("File not found");
  }

  return file;
}

async function remove(key) {
  storage.delete(key);
  console.log(`[ObjectStorage] Deleted ${key}`);
}

module.exports = {
  upload,
  get,
  remove,
};