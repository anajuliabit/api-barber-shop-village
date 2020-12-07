import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk'
import { ConfigService } from '@nestjs/config';


const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

@Injectable()
export class AwsService {

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async upload(email: string, file: any, fileName : string): Promise<string> {
        const fileExt = file.mimetype.replace("image/", "");
        fileName = fileName.replace(`.${fileExt}`, "");
        const filePath = `${email}/${fileName}.${fileExt}`;
        return await new Promise(function(resolve, reject) {
            s3.putObject(
                {
                    Key: filePath,
                    Bucket: "barberiaproject",
                    Body: file.buffer,
                    ACL: "public-read"
                },
                function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve(filePath);
                }
            )
        }).then(
            (val) => {
                console.log(`Succesfully saved file (${filePath}) in S3.`)
                return val },
            (err) => {
                console.log(err)
                console.log("Error saving in S3.")
                return null }
        ).catch((err) => console.log(err));
    }
}