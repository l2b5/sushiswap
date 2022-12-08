import type { VercelRequest, VercelResponse } from '@vercel/node'

import { getTokens } from '../../lib/api'

export default async (request: VercelRequest, response: VercelResponse) => {
  const chainId = request.query.chainId as string
  const tokens = await getTokens(chainId)
  return response.status(200).json(tokens)
}