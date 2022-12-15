require("dotenv/config");
const { Kafka } = require("kafkajs");

async function produceMessage() {
  const kafka = new Kafka({
    clientId: "my-client-id",
    brokers: [String(process.env.KAFKA_HOST)],
    sasl: {
      mechanism: "scram-sha-256",
      username: String(process.env.KAFKA_USER),
      password: String(process.env.KAFKA_PASS),
    },
    ssl: true,
  });

  const producer = kafka.producer();

  const message = {
    recipientId: "c6a4971b-c708-4d28-b95e-58d3e42a4948",
    content: "content",
    category: "category",
  };

  await producer.connect();
  await producer.send({
    topic: "notifications.send-notification",
    messages: [{ key: "key1", value: JSON.stringify(message) }],
  });

  producer.disconnect();
}

produceMessage();
