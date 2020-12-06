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

    async upload(email, file) {
        let fileExt = file.mimetype.replace("image/", "");
        let fileName = await s3.putObject(
            {
                Key: `${email}/profilePicture.${fileExt}`,
                Bucket: "barberiaproject",
                Body: file.buffer,
                ACL: "public-read"
            },
            function (err, data) {
                if(err) {
                    console.log(err)
                    return null
                }
                return `${email}/profilePicture.${fileExt}`
            }
        )

        return fileName;
    }

    getS3() {
        return
    }
}
