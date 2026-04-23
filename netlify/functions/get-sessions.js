// Returns all saved sessions. Protected by ADMIN_KEY environment variable.
// Usage: GET /.netlify/functions/get-sessions?key=YOUR_ADMIN_KEY

const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const adminKey = (process.env.ADMIN_KEY || '').trim();
  const { key = '' } = event.queryStringParameters || {};
  const trimmedKey = key.trim();

  if (!adminKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'ADMIN_KEY environment variable is not set on the server.' }) };
  }

  if (trimmedKey !== adminKey) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const store = getStore('sessions');
    const { blobs } = await store.list();

    const sessions = await Promise.all(
      blobs.map(({ key: blobKey }) => store.get(blobKey, { type: 'json' }))
    );

    const valid = sessions
      .filter(Boolean)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return { statusCode: 200, headers, body: JSON.stringify(valid) };
  } catch (err) {
    console.error('Blobs error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to read sessions', detail: err.message }),
    };
  }
};
