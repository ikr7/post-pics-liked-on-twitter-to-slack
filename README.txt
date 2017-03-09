概要:
Twitter で Like した画像つきツイートを Slack に書き込みます.

設定:
以下の環境変数を設定してください.
CONSUMER_KEY: Twitter App の Consumer Key
CONSUMER_SECRET: Twitter App の Consumer Secret
ACCESS_TOKEN_KEY: 上の Twitter App で認証した Access Token
ACCESS_TOKEN_SECRET: 上の Twitter App で認証した Access Token Secret
SLACK_WEBHOOK_URL: Slack の Webhook URL

起動:
$ node app.js
