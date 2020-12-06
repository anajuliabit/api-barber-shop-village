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

    async upload(email, file): Promise<String> {
        let fileExt = file.mimetype.replace("image/", "");
        let filePath = `${email}/profilePicture.${fileExt}`;

        return await new Promise(function(resolve, reject) {
            s3.putObject(
                {
                    Key: filePath,
                    Bucket: "barberiaproject",
                    Body: file.buffer,
                    ACL: "public-read"
                },
                function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    console.log("Succesfully saved profile picture on S3.")
                    resolve(filePath);
                }
            )
        }).then(
            (val) => { return val },
            (err) => { return null }
        ).catch((err) => console.log(err));
    }
}