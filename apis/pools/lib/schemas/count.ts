import type { PoolType, PoolVersion } from '@sushiswap/database'
import { z } from 'zod'

export const PoolCountApiSchema = z.object({
  chainIds: z
    .string()
    .transform((val) => val.split(',').map((v) => parseInt(v)))
    .optional(),
  isIncentivized: z.coerce
    .string()
    .transform((val) => {
      if (val === 'true') {
        return true
      } else if (val === 'false') {
        return false
      } else {
        throw new Error('isIncentivized must true or false')
      }
    })
    .optional(),
  isWhitelisted: z.coerce
    .string()
    .transform((val) => {
      if (val === 'true') {
        return true
      } else if (val === 'false') {
        return false
      } else {
        throw new Error('isWhitelisted must true or false')
      }
    })
    .optional(),
  tokenSymbols: z
    .string()
    .transform((tokenSymbols) => tokenSymbols?.split(','))
    .refine((tokenSymbols) => tokenSymbols.length <= 3, { message: 'Can only use up to 3 tokenSymbols.' })
    .optional(),
  poolTypes: z
    .string()
    .optional()
    .transform((poolTypes) => poolTypes?.split(',') as PoolType[]),
  poolVersions: z
    .string()
    .transform((poolVersions) => poolVersions?.split(',') as PoolVersion[])
    .optional(),
})
