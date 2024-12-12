import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // In a real implementation, you would communicate with Arduino Cloud Agent here
      const devices = [
        { port: 'COM3', boardName: 'Arduino Uno' },
        { port: 'COM4', boardName: 'Arduino Mega' },
      ];
      res.status(200).json(devices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch devices' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

