const subscribers = new Map();

async function publish(topic, message) {
  console.log(`[Broker] Publishing to ${topic}`, message);

  const handlers = subscribers.get(topic) || [];

  // simulate async delivery
  for (const handler of handlers) {
    setTimeout(() => {
      try {
        handler(message);
      } catch (err) {
        console.error("[Broker] Handler error:", err);
      }
    }, 0);
  }
}

function subscribe(topic, handler) {
  if (!subscribers.has(topic)) {
    subscribers.set(topic, []);
  }

  subscribers.get(topic).push(handler);

  console.log(`[Broker] Subscribed to ${topic}`);
}

module.exports = {
  publish,
  subscribe,
};