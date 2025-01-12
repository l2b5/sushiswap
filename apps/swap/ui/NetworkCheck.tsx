import { FC, useEffect, useState } from 'react'
import { useSwapState } from './trade/TradeProvider'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { useIsMounted } from '@sushiswap/hooks'
import { Button } from '@sushiswap/ui/future/components/button'
import { Chain, chainName } from '@sushiswap/chain'

export const NetworkCheck: FC = () => {
  const [open, setOpen] = useState(false)
  const isMounted = useIsMounted()
  const { network0 } = useSwapState()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  // Delay couple seconds
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined = undefined
    if (Boolean(isMounted && chain && network0 !== chain.id)) {
      timeout = setTimeout(() => setOpen(true), 1500)
    } else {
      setOpen(false)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [chain, isMounted, network0])

  if (!open) return <></>

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center bg-gray-200 border-gray-300 dark:bg-slate-800 text-gray-900 dark:text-slate-400 w-full py-3 font-medium border-b dark:border-slate-200/10">
      <p className="px-4">
        App network ({chainName?.[network0]}) {"doesn't"} match network selected in wallet (
        {chain?.id ? chainName[chain.id] : ''}).
      </p>
      <div className="block flex justify-end px-3 w-full sm:w-[unset]">
        <Button
          fullWidth
          onClick={() => switchNetwork?.(network0)}
          variant="filled"
          color="blue"
          size="sm"
          className="whitespace-nowrap"
        >
          Switch to {Chain.fromChainId(network0).name}
        </Button>
      </div>
    </div>
  )
}
