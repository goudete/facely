import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { consts } from '../../../consts';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { phoneNumber, folderName, theme, gender, pricingSelection } = req.body;
    if (phoneNumber === undefined || phoneNumber === null) {
      return res.status(400).json({ message: 'Enter a valid number' });
    }
    if (folderName === undefined || folderName === null) {
      return res.status(400).json({ message: 'Enter a valid path' });
    }
    if (theme === undefined || theme === null) {
      return res.status(400).json({ message: 'Enter a valid theme' });
    }
    if (pricingSelection === undefined || pricingSelection === null ) {
      return res.status(400).json({ message: 'Enter a valid pricing selection' });
    }

    const SAMPLE_QUANTITY = {
      'small': 20,
      'medium': 30,
      'large': 60,
    } as { [pricingSelection: string]: number };
    const UPLOAD_HF = false;
    const UPLOAD_CKPT = false;

    try {
      await axios({
        method: 'POST',
        url: consts.GENERATION_URL,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          s3_user_dir_prefix: folderName,
          num_samples: SAMPLE_QUANTITY[pricingSelection],
          upload_ckpt: UPLOAD_CKPT,
          upload_hf: UPLOAD_HF,
          theme,
          gender,
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