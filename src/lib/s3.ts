import { consts } from "../../consts";
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: consts.AWS_ACCESS_KEY_ID,
  secretAccessKey: consts.AWS_SECRET_ACCESS_KEY,
  region: consts.AWS_REGION
});

export const s3 = new AWS.S3();