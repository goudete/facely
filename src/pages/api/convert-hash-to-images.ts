import type { NextApiRequest, NextApiResponse } from 'next';
import { consts } from '../../../consts';
import { supabase } from '@/lib/supabase';
import { s3 } from '@/lib/s3'


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { generation: hash } = req.body;

  const { data, error } = await supabase
    .from('Generations')
    .select()
    .eq('generation_hash', hash);

  if (error) {
    return res.status(500).json({ message: 'Error while attempting to grab generation' });
  }

  let path;
  if (data) {
    path = data[0].path;
  }

  const params = {
    Bucket: consts.AWS_S3_BUCKET_NAME,
    Prefix: path
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const urls = data?.Contents?.map(item => (
      s3.getSignedUrl('getObject', {
        Bucket: params.Bucket,
        Key: item.Key,
        Expires: 604800,
      })
    ));

    res.status(200).json({ urls });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images' });
  }
};

export default handler;