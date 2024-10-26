import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
    constructor(private configService: ConfigService){
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    }

    async uploadImage(fileBuffer: Buffer): Promise<any> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader
            .upload_stream({  }, (error, result) => {
              if (error) return reject(error);
              resolve(result);
            })
            .end(fileBuffer);
        });
    }
}
