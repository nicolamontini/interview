const messageBroker = require("./messageBroker");

async function handleFileUploaded(message) {
  // TODO: implement business logic
  // simulate processing by simply converting the binary data to string and print the value
}

function startWorker() {
  messageBroker.subscribe("file.uploaded", async (msg) => {
    try {
      await handleFileUploaded(msg);
    } catch (err) {
      console.error("Worker error:", err);
    }
  });
}

module.exports = {
  startWorker,
};