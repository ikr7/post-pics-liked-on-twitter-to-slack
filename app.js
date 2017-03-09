'use strict';

const Twitter = require('twitter');
const request = require('request');

const check = (
	process.env.CONSUMER_KEY &&
	process.env.CONSUMER_SECRET &&
	process.env.ACCESS_TOKEN_KEY &&
	process.env.ACCESS_TOKEN_SECRET &&
	process.env.SLACK_WEBHOOK_URL
);

if (!check) {
	throw new Error('!!!!必要な環境変数がセットされてないよ!!!!');
}

const client = new Twitter({
	consumer_key:        process.env.CONSUMER_KEY,
	consumer_secret:     process.env.CONSUMER_SECRET,
	access_token_key:    process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const stream = client.stream('user');

stream.on('event', (data) => {
	if (data.event === 'favorite' && data.source.screen_name === 'rfc4627' && data.target_object.extended_entities) {
		const text =
			`<https://twitter.com/xxxxxx/status/${data.target_object.id_str}>` + '\n' +
			data.target_object.text + '\n' +
			data.target_object.extended_entities.media.map((media) => `<${media.media_url}>`).join(' ');
		request({
			uri: process.env.SLACK_WEBHOOK_URL,
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			form: JSON.stringify({
				text: text
			})
		}, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				console.log('!!Slackに書き込みました!!')
			} else {
				console.error('Slack に書き込めませんでした:');
				console.error('\t ステータスコード:', response.statusCode);
			}
		});
	}
});
