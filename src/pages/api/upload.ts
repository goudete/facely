import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import { consts } from '../../../consts';

AWS.config.update({
  region: consts.AWS_REGION,
  accessKeyId: consts.AWS_ACCESS_KEY_ID,
  secretAccessKey: consts.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fileName, fileType, folderName } = req.body;

    const params = {
      Bucket: consts.AWS_S3_BUCKET_NAME,
      Key: folderName + fileName,
      Expires: 60,
      ContentType: fileType,
    };

    try {
      const url = await s3.getSignedUrlPromise('putObject', params);
      return res.status(200).json({ url });
    } catch (err) {
      return res.status(500).json({ error: 'Error generating URL' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
