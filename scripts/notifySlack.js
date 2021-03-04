const fetch = require("node-fetch");

const notifyPass = async ({ username, numSuites, repoName, webhookUrl }) => {
  const msg = `Yay! ${username} passed all ${numSuites} tests in ${repoName}!`;
  console.log(msg);
  await postToSlack(webhookUrl, msg);
};

const notifyFail = async ({
  username,
  numSuites,
  passedSuites,
  failedSuites,
  repoName,
  webhookUrl,
}) => {
  const msg = `${username} passed ${passedSuites.length} / ${numSuites} tests for ${repoName}
    Failing tests:
  \t- ${failedSuites.join("\n\t- ")}
  `;
  console.log(msg);
  await postToSlack(webhookUrl, msg);
};

const postToSlack = async (webhookUrl, msg) => {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: msg,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  notifyPass,
  notifyFail,
};
