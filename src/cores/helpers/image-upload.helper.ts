import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as sharp from 'sharp';
import { FileHelper } from './file.helper';

export interface DimensionDetail {
  width: number;
  fit: 'contain' | 'inside';
  prefix: string;
}

export interface FileDimension {
  dimensions: Array<DimensionDetail>;
}

export interface ResizeOption extends FileDimension {
  path: string; // digunakan sebagai prefix nama file
}

@Injectable()
export class ImageUploadHelper {
  constructor(private readonly fileHelper: FileHelper) {}

  public async resizeAndUpload(
    file: Express.Multer.File,
    option: ResizeOption,
  ): Promise<{ file_path: string; url: string }> {
    const hash = crypto
      .createHash('sha1')
      .update(new Date().toISOString())
      .digest('hex');

    // 🔹 resize images
    for (const dimension of option.dimensions) {
      const resizedBuffer = await sharp(file.buffer)
        .resize({ width: dimension.width, fit: dimension.fit })
        .webp()
        .toBuffer();

      await this.fileHelper.uploadFile(
        resizedBuffer,
        option.path,
        `${hash}-${dimension.prefix}`,
      );
    }

    // 🔹 original image (webp)
    const originalBuffer = await sharp(file.buffer).webp().toBuffer();

    const originalFile = await this.fileHelper.uploadFile(
      originalBuffer,
      option.path,
      hash,
    );

    return {
      file_path: originalFile.filename,
      url: originalFile.path,
    };
  }

  public async delete(originalFile: string, option: FileDimension) {
    const [baseName] = originalFile.split('.');

    for (const dimension of option.dimensions) {
      await this.fileHelper.deleteFile(`${baseName}-${dimension.prefix}.webp`);
    }

    await this.fileHelper.deleteFile(originalFile);
    return true;
  }
}
