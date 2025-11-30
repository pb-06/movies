/** GET /.netlify/functions/tmdb-metadata */
module.exports.handler = async () => {
    const apiKey = process?.env?.VITE_TMDB_API_KEY;

    // respond with {apiKey, error}
    return {
        statusCode: 200,
        body: JSON.stringify({ apiKey: apiKey, error: null })
    };
}