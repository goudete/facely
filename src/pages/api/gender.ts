import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { number, gender } = req.body;
  if (number === undefined || number === null) {
    return res.status(400).json({ message: 'Enter a valid number' });
  }
  if (gender === undefined || gender === null) {
    return res.status(400).json({ message: 'Enter a valid number' });
  }
  const { error } = await supabase
    .from('Users')
    .update({ gender })
    .eq('phone_number', number);

  if (error) {
    console.log('Error: ', error)
    return res.status(500).json({ message: 'Error while attempting to record gender' });
  }

  return res.status(200).json({ message: 'Successfully recorded gender' });
}

export default handler;