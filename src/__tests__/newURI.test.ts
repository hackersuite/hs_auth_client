process.env.AUTH_URL = '';

import * as authClient from '../';

let authApi: authClient.AuthApi;
beforeAll(() => {
	authApi = new authClient.AuthApi('hs_test');
});

test('newUri(): generates correct uri with path', () => {
	const result = authApi.newUri('Component:Test');
	expect(result).toEqual('hs:hs_test:Component:Test');
});

test('newUri(): generates correct uri with path and arguments', () => {
	const result = authApi.newUri('Component:Test', new Map(
		[
			['a', 'b'],
			['c', 'd']
		]
	));
	expect(result).toEqual('hs:hs_test:Component:Test?a=b&c=d');
});

test('newUri(): generates correct uri with path and some valid args', () => {
	const result = authApi.newUri('Component:Test', new Map(
		[
			['a', ''],
			['c', 'd']
		]
	));
	expect(result).toEqual('hs:hs_test:Component:Test?c=d');
});

test('newUri(): generates correct uri with path and no valid args', () => {
	const result = authApi.newUri('Component:Test', new Map(
		[
			['a', ''],
			['c', '']
		]
	));
	expect(result).toEqual('hs:hs_test:Component:Test');
});
