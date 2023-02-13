//// @ts-nocheck
import { ChainId } from '@sushiswap/chain'
import { Type, USDC, USDT } from '@sushiswap/currency'
import { getBigNumber, MultiRoute } from '@sushiswap/tines'
import { BigNumber, ethers } from 'ethers'
import https from 'https'

import { DataFetcher } from '../DataFetcher'
import { LiquidityProviders } from '../liquidity-providers/LiquidityProvider'
import { Router } from '../Router'

const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms))

async function getAPIObject(url: string, data: Record<string, string | number | undefined>): Promise<object> {
  const params = Object.keys(data)
    .map((k) => (data[k] !== undefined ? `${k}=${data[k]}` : undefined))
    .filter((k) => k !== undefined)
    .join('&')
  const urlWithParams = url + '?' + params
  //console.log(urlWithParams)

  return new Promise((result, reject) => {
    https
      .get(urlWithParams, (res) => {
        let out = ''
        res.on('data', (chunk) => {
          out += chunk
        })
        res.on('end', () => {
          const r = JSON.parse(out)
          if (r.statusCode !== undefined && r.statusCode !== 200) reject(r)
          else result(r)
        })
      })
      .on('error', (err) => {
        reject(JSON.parse(err.message))
      })
  })
}

async function quote(
  chainId: ChainId,
  fromTokenAddress: string,
  toTokenAddress: string,
  amount: string,
  gasPrice: number,
  providers?: LiquidityProviders[]
): Promise<string> {
  const protocolWhiteList = providers ? getProtocols(providers, chainId) : undefined
  const resp = (await getAPIObject(`https://api.1inch.io/v5.0/${chainId}/quote`, {
    fromTokenAddress,
    toTokenAddress,
    amount,
    gasPrice,
    protocolWhiteList,
  })) as { toTokenAmount: string }
  return resp.toTokenAmount
}

async function quote2(
  chainId: ChainId,
  fromTokenAddress: string,
  toTokenAddress: string,
  amount: string,
  gasPrice: number,
  providers?: LiquidityProviders[]
): Promise<string> {
  const protocolWhiteList = providers ? getProtocols(providers, chainId) : undefined
  const resp = (await getAPIObject(`https://pathfinder.1inch.io/v1.4/chain/${chainId}/router/v5/quotes`, {
    fromTokenAddress,
    toTokenAddress,
    amount,
    gasPrice,
    protocolWhiteList,
    preset: 'maxReturnResult',
  })) as { bestResult: { toTokenAmount: string } }
  return resp.bestResult.toTokenAmount
}

interface Environment {
  chainId: ChainId
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any
  dataFetcher: DataFetcher
}

function getEnvironment(chainId: ChainId): Environment {
  let network
  switch (chainId) {
    case ChainId.ETHEREUM:
      network = 'mainnet'
      break
    case ChainId.POLYGON:
      network = 'matic'
      break
    default:
  }
  const provider = new ethers.providers.AlchemyProvider(network, process.env.ALCHEMY_API_KEY)
  const dataFetcher = new DataFetcher(provider, chainId)
  dataFetcher.startDataFetching()

  return {
    chainId,
    provider,
    dataFetcher,
  }
}

async function route(
  env: Environment,
  from: Type,
  to: Type,
  amount: string,
  gasPrice: number,
  providers?: LiquidityProviders[]
): Promise<MultiRoute> {
  env.dataFetcher.fetchPoolsForToken(from, to)
  const router = new Router(env.dataFetcher, from, BigNumber.from(amount), to, gasPrice, providers)
  return new Promise((res) => {
    router.startRouting((r) => {
      router.stopRouting()
      //console.log(router.getCurrentRouteHumanString())
      res(r)
    })
  })
}

function getProtocol(lp: LiquidityProviders, chainId: ChainId) {
  let prefix
  switch (chainId) {
    case ChainId.ETHEREUM:
      prefix = ''
      break
    case ChainId.POLYGON:
      prefix = 'POLYGON_'
      break
    default:
      throw new Error('Unsupported network: ' + chainId)
  }
  switch (lp) {
    case LiquidityProviders.SushiSwap:
      return prefix + 'SUSHISWAP'
    case LiquidityProviders.QuickSwap:
      return prefix + 'QUICKSWAP'
    case LiquidityProviders.Trident:
      return prefix + 'TRIDENT'
    case LiquidityProviders.UniswapV2:
      return prefix + 'UNISWAP_V2'
  }
}

function getProtocols(lp: LiquidityProviders[], chainId: ChainId): string {
  return lp.map((l) => getProtocol(l, chainId)).join(',')
}

async function test(
  env: Environment,
  from: Type,
  to: Type,
  amount: string,
  gasPrice: number,
  providers?: LiquidityProviders[]
) {
  const fromAddress = from.isNative ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : from.address
  const toAddress = to.isNative ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : to.address
  const res1 = await quote(env.chainId, fromAddress, toAddress, amount, gasPrice, providers)
  const res2 = await quote2(env.chainId, fromAddress, toAddress, amount, gasPrice, providers)
  const res3 = await route(env, from, to, amount, gasPrice, providers)
  return [parseInt(res1), parseInt(res2), res3.amountOut]
}

async function testTrident() {
  try {
    const chainId = ChainId.POLYGON
    const from = USDT[chainId]
    const divisor = Math.pow(10, from.decimals)
    const to = USDC[chainId]
    const gasPrice = 100e9
    const providers = [LiquidityProviders.Trident]
    const env = getEnvironment(chainId)
    env.dataFetcher.fetchPoolsForToken(from, to)
    await delay(3000)
    for (let i = 6; i < 15; ++i) {
      const amount = getBigNumber(Math.pow(10, i)).toString()
      const res = await test(env, from, to, amount, gasPrice, providers)
      console.log(
        Math.pow(10, i) / divisor,
        res.map((e) => e / divisor)
      )
    }
  } catch (e) {
    console.log('Error', e)
  }
}

testTrident()