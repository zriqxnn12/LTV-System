import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as sharp from 'sharp';
import { S3Helper } from './s3.helper';

export interface DimensionDetail {
  width: number;
  fit: 'contain' | 'inside';
  prefix: string;
}

export interface ResizeOption extends FileDimension {
  // Set file folder path
  path: string;
}

export interface FileDimension {
  // set image dimension
  dimensions: Array<DimensionDetail>;
}

@Injectable()
export class SharpHelper {
  public async resizeAndUpload(
    file: Express.Multer.File,
    option: ResizeOption,
  ): Promise<{ file_path: string; url: string }> {
    const currentDate = new Date();
    const dateStr = currentDate.toISOString();
    const md5Hash = crypto.createHash('sha1').update(dateStr).digest('hex');

    const s3Helper = new S3Helper();
    for (const dimension of option.dimensions) {
      const fileName = md5Hash + '-' + dimension.prefix;
      sharp(file.buffer)
        .webp()
        .resize({ ...dimension, fit: dimension.fit })
        .toBuffer()
        .then(async (value) => {
          await s3Helper.uploadFile(
            value,
            option.path,
            'public-read',
            fileName,
          );
        });
    }

    const convertOriginalToWebp = await sharp(file.buffer).webp().toBuffer();

    // save original file
    const originalFile = await s3Helper.uploadFile(
      convertOriginalToWebp,
      option.path,
      'public-read',
      md5Hash,
    );

    const imageUrl = new URL(originalFile.Location);
    return { file_path: imageUrl.pathname.substring(1), url: imageUrl.href };
  }

  public async delete(originalFile: string, option: FileDimension) {
    const splitOriginalFile = originalFile.split('.');
    const originalName = splitOriginalFile[0];
    const extension = splitOriginalFile[1];

    const s3Helper = new S3Helper();

    // delete all resized file
    for (const dimension of option.dimensions) {
      const fileName = originalName + '-' + dimension.prefix + '.' + extension;
      await s3Helper.deleteFile(fileName);
    }

    // delete original file
    await s3Helper.deleteFile(originalFile);

    return true;
  }
}
