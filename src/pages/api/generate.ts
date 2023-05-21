import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { consts } from '../../../consts';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { phoneNumber, folderName, theme } = req.body;
    if (phoneNumber === undefined || phoneNumber === null) {
      return res.status(400).json({ message: 'Enter a valid number' });
    }
    if (folderName === undefined || folderName === null) {
      return res.status(400).json({ message: 'Enter a valid path' });
    }
    if (theme === undefined || theme === null) {
      return res.status(400).json({ message: 'Enter a valid theme' });
    }
    const NUM_SAMPLES = 15;
    const UPLOAD_HF = false;
    const UPLOAD_CKPT = false;
    const PROMPT = `{0}, Viking, intricate character portrait, beautiful, 8k resolution, dynamic lighting, hyperdetailed, quality 3D rendered, volumetric lighting, detailed background, artstation character portrait`

    try {
      await axios({
        method: 'POST',
        url: consts.GENERATION_URL,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          s3_user_dir_prefix: folderName,
          num_samples: NUM_SAMPLES,
          upload_ckpt: UPLOAD_CKPT,
          prompt: PROMPT,
          upload_hf: UPLOAD_HF,
          theme
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
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

export default handler;