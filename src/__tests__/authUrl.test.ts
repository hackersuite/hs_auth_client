import { getAuthUrl } from '../networking';

test('Blank AUTH_URL environment variable defaults to empty string', () => {
	delete process.env.AUTH_URL;
	expect(getAuthUrl()).toStrictEqual('/api/v1');
});

test('Environment AUTH_URL respected', () => {
	for (const url of ['http://localhost:8080', 'http://127.0.0.1', 'https://auth.hackathon.com']) {
		process.env.AUTH_URL = url;
		expect(getAuthUrl()).toStrictEqual(`${url}/api/v1`);
	}
});
