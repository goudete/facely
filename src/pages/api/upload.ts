import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { consts } from '../../../consts';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const formData = new FormData();
      req.body.forEach((file: any, index: number) => {
        formData.append(`file${index}`, file);
      });

      formData.append('phoneNumber', req.body.phoneNumber);
      console.log(formData)
      const response = await axios.post(
        consts.API_GATEWAY_URL, 
        formData
      );

      if (response.status !== 200) {
        console.log("🚀 ~ file: upload.ts:24 ~ response:", response)
        throw new Error(`Failed to upload image: status code ${response.status}`);
      }

      res.status(200).json({ message: 'Images uploaded successfully.' });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
