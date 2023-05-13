import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { consts } from '../../../consts';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { verificationCode, phoneNumber } = req.body;
  if (verificationCode === undefined || verificationCode === null) {
    return res.status(400).json({ message: 'Enter a valid verification code' });
  }
  if (phoneNumber === undefined || phoneNumber === null) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  try {
    const { data } = await axios({
      method: 'POST',
      url: `${consts.API_GATEWAY_URL}/verify`,
      data: {
        verificationCode,
        phoneNumber
      }
    });
    return res.status(200).json({ message: 'Verification code sent' });
  } catch (error) {
    console.log("🚀 ~ file: submit-number.ts:23 ~ error:", error)
  }
}

export default handler;