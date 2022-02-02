var redis = require('redis');

async function test() {
  var client = redis.createClient(6379, "127.0.0.1");
  client.on("error", function(err) {
    console.log("Error" + err);
  });

  await client.connect();

  var value = await client.get('NAME');
  console.log("get:" + value);

  await client.disconnect;
}

test();