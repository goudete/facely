import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { consts } from '../../../consts';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { phoneNumber } = req.body;
  if (phoneNumber === undefined || phoneNumber === null) {
    return res.status(400).json({ message: 'Enter a valid number' });
  }
  const S3_LOCATION = '';
  const NUM_SAMPLES = 20;
  const UPLOAD_HF = false;
  const UPLOAD_CKPT = false;
  const PROMPT = `{0}, Viking, intricate character portrait, beautiful, 8k resolution, dynamic lighting, hyperdetailed, quality 3D rendered, volumetric lighting, detailed background, artstation character portrait`

  try {
    await axios({
      method: 'POST',
      url: consts.GENERATION_URL,
      data: {
        s3_user_dir_prefix: S3_LOCATION,
        num_samples: NUM_SAMPLES,
        upload_ckpt: UPLOAD_CKPT,
        prompt: PROMPT,
        upload_hf: UPLOAD_HF
      }
    });
    return res.status(200).json({ message: 'Generation has started' });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in generate request:", error);
      return res.status(500).json({ message: error.message });
    } else {
      console.error("Error in generate request:", error);
      return res.status(500).json({ message: 'An error occurred in register' });
    }
  }
}

export default handler;