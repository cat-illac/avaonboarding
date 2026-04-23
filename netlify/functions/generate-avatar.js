// Netlify serverless function — proxies fal.run requests server-side
// so the API key never touches the browser.
//
// Set FAL_API_KEY in: Netlify dashboard → Site → Environment variables

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const key = process.env.FAL_API_KEY;
  if (!key) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'FAL_API_KEY environment variable is not set.' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body.' }) };
  }

  const falRes = await fetch('https://fal.run/fal-ai/flux/schnell', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const text = await falRes.text();

  return {
    statusCode: falRes.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: text,
  };
};
