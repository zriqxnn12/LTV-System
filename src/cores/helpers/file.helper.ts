import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';

@Injectable()
export class FileHelper {
  private uploadPath = path.join(process.cwd(), 'uploads', 'images');

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(
    file: Express.Multer.File | Buffer,
    subPath: string,
    fileName: string,
  ) {
    try {
      const date = new Date();

      let extension: string;
      let body: Uint8Array;

      if (file instanceof Buffer) {
        extension = 'webp';
        body = new Uint8Array(file);
      } else {
        extension = mime.extension(file.mimetype) || 'bin';
        body = new Uint8Array(file.buffer);
      }

      // ✅ folder lengkap
      const targetDir = path.join(this.uploadPath, subPath);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const finalName = `${fileName}.${extension}`;
      const fullPath = path.join(targetDir, finalName);

      fs.writeFileSync(fullPath, body);

      return {
        filename: `${subPath}-${finalName}`,
        path: `/uploads/images/${subPath}/${finalName}`,
        fullPath,
      };
    } catch (error) {
      Logger.error('❌ Upload failed', error);
      throw error;
    }
  }

  async deleteFile(filename: string) {
    const filePath = path.join(this.uploadPath, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      Logger.log(`🗑️ File deleted: ${filename}`);
    }

    return true;
  }
}
