/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable, Inject } from '@nestjs/common';
import type Logger from '@/logger.js';
import { DriveService } from '@/core/DriveService.js';
import { bindThis } from '@/decorators.js';
import { QueueLoggerService } from '../QueueLoggerService.js';
import type * as Bull from 'bullmq';
import type { ObjectStorageFileJobData } from '../types.js';
import type { DriveFilesRepository } from "@/models/_.js";
import { UserEntityService } from "@/core/entities/UserEntityService.js";
import { DI } from '@/di-symbols.js';

@Injectable()
export class DeleteFileProcessorService {
	private logger: Logger;

	constructor(
		@Inject(DI.driveFilesRepository)
		private driveFilesRepository: DriveFilesRepository,

		private userEntityService: UserEntityService,
		private driveService: DriveService,
		private queueLoggerService: QueueLoggerService,
	) {
		this.logger = this.queueLoggerService.logger.createSubLogger('delete-file');
	}

	@bindThis
	public async process(job: Bull.Job<ObjectStorageFileJobData>): Promise<string> {
		const key: string = job.data.key;

		const file = await this.driveFilesRepository.createQueryBuilder('file')
			.where('file.accessKey = :accessKey', { accessKey: key })
			.orWhere('file.thumbnailAccessKey = :thumbnailAccessKey', { thumbnailAccessKey: key })
			.orWhere('file.webpublicAccessKey = :webpublicAccessKey', { webpublicAccessKey: key })
			.getOne();
		const isRemote = file?.user ? this.userEntityService.isRemoteUser(file.user) : false;

		await this.driveService.deleteObjectStorageFile(key, isRemote);

		return 'Success';
	}
}
