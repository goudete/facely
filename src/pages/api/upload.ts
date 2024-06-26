import type { NextApiRequest, NextApiResponse } from 'next';
import { consts } from '../../../consts';
import { s3 } from '@/lib/s3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fileName, fileType, folderName } = req.body;

    const params = {
      Bucket: consts.AWS_S3_BUCKET_NAME,
      Key: folderName + 'raw_images/' + fileName,
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
