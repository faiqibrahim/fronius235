const client = require('redis').createClient(process.env.REDIS_URL);

client.on("error", (error) => {
    console.error("Could not connect with Redis", error);
    process.exit(-1);
});

client.on("connect", () => {
    console.error("Successfully connected with Redis.");
});

module.exports = class Redis {

    static set = (key, val) => {
        return new Promise(((resolve, reject) => {
            client.set(key, val, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        }));
    }

    static get = (key) => {
        return new Promise(((resolve, reject) => {
            client.get(key, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        }));
    }
}

