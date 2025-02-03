/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const fs = require('fs');
const packageJsonPath = __dirname + '/../package.json';

function build() {
	try {
		const commit = require('child_process')
			.execSync('git rev-parse --short=7 HEAD', {
				encoding: 'utf-8',
				stdio: ['ignore', 'pipe', 'ignore']
			})
			.trim();

		const json = fs.readFileSync(packageJsonPath, 'utf-8');
		const meta = JSON.parse(json);
		let version = meta.version;

		if (meta.prefix) {
			version += '+' + meta.prefix;
		}

		if (commit !== 'unknown') {
			version += meta.prefix ? '-' + commit : '+' + commit;
		}

		fs.mkdirSync(__dirname + '/../built', { recursive: true });
		fs.writeFileSync(__dirname + '/../built/meta.json', JSON.stringify({ version: version }), 'utf-8');
	} catch (e) {
		console.error(e);
	}
}

build();

if (process.argv.includes('--watch')) {
	fs.watch(packageJsonPath, (event, filename) => {
		console.log(`update ${filename} ...`);
		build();
	});
}
