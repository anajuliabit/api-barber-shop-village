import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk'

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

@Injectable()
export class AwsService {
    constructor() { }

    async upload() {
        s3.putObject(
            {
                Key: "",
                Bucket: "barberiaproject",

            },
            function (err, data ) {

            }
        )
    }

    getS3() {
        return
    }
}
