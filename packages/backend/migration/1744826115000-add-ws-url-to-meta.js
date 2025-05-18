/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class AddWsUrlToMeta1744826115000 {
    name = 'AddWsUrlToMeta1744826115000'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "wsUrl" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "wsTargetDomains" character varying(1024) array NOT NULL DEFAULT '{}'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "wsTargetDomains"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "wsUrl"`);
    }
}