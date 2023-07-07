const API_KEYS = {
  user1: "api_key_1",
  user2: "api_key_2",
  // Add more users and API keys as needed
};

function authenticate(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || !Object.values(API_KEYS).includes(apiKey)) {
    res.status(401).json({ message: "Unauthorized: Invalid API key" });
    return;
  }
  next();
}

module.exports = authenticate;
