// Saves a completed onboarding session to Netlify Blobs.
// Called from the browser after the avatar is generated.

const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  let session;
  try {
    session = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const sessionId = session.sessionId || crypto.randomUUID();
  const record = {
    ...session,
    sessionId,
    timestamp: session.timestamp || new Date().toISOString(),
  };

  try {
    const store = getStore('sessions');
    await store.setJSON(sessionId, record);
    return { statusCode: 200, headers, body: JSON.stringify({ sessionId }) };
  } catch (err) {
    console.error('Blobs error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to save session' }) };
  }
};
