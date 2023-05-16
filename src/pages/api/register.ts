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

  try {
    const { data } = await axios({
      method: 'POST',
      url: `${consts.API_GATEWAY_URL}/register`,
      data: {
        phoneNumber
      }
    });
    if (data.message === 'User already exists') {
      return res.status(200).json({ message: 'User already exists' });
    } else {
      return res.status(200).json({ message: 'Verification code sent' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in /register request:", error);
      return res.status(500).json({ message: error.message });
    } else {
      console.error("Error in /register request:", error);
      return res.status(500).json({ message: 'An error occurred in register' });
    }
  }
}

export default handler;