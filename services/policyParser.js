const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function execute(filePath) {
  try {
    let data = new FormData();
    data.append("file", fs.createReadStream(filePath));

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5055/api/v1/core/organisation/TEST/parsePolicyDocumentWithAI",
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9",
        "content-type": "application/json",
        origin: "https://app.plumhq.com",
        priority: "u=1, i",
        referer: "https://app.plumhq.com/",
        "sec-ch-ua":
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        ...data.getHeaders(),
      },
      data: data,
    };
    const response = await axios.request(config);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
}

module.exports = execute;