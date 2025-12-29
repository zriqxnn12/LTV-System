import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import * as mime from 'mime-types';
import * as path from 'path';

@Injectable()
export class S3Helper {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File | Buffer,
    fileName: string,
    // acl: ObjectCannedACL = 'private',
    customName: string | null = null,
  ) {
    try {
      const date = new Date();
      let extension: string;
      let key: string;
      let body: Buffer;

      if (Buffer.isBuffer(file)) {
        extension = 'webp';
        key = `${fileName}-${date.toISOString().slice(0, 10)}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}.webp`;
        body = file;
      } else {
        extension = mime.extension(file.mimetype) || 'bin';
        key = `${fileName}-${date.toISOString().slice(0, 10)}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}.${extension}`;
        body = file.buffer;
      }

      if (customName !== null) {
        key = `${fileName}-${customName}.${extension}`;
      }

      const params = {
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
        Body: body,
        // ACL: acl,
        ContentType: mime.lookup(extension) || 'application/octet-stream',
      };

      const command = new PutObjectCommand(params);
      const result = await this.s3Client.send(command);

      Logger.log(`✅ File uploaded: ${key}`);
      return {
        key,
        location: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${key}`,
        result,
      };
    } catch (error) {
      Logger.error('❌ Upload failed:', error);
      throw error;
    }
  }

  async deleteFile(filePath: string) {
    try {
      const params = {
        Bucket: process.env.AWS_BUCKET!,
        Key: filePath,
      };

      const command = new DeleteObjectCommand(params);
      const result = await this.s3Client.send(command);

      Logger.log(`🗑️ File deleted: ${filePath}`);
      return result;
    } catch (error) {
      Logger.error('❌ Delete failed:', error);
      throw error;
    }
  }
}
