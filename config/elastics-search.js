const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://localhost:9200', // Elasticsearch endpoint
});

module.exports = client;