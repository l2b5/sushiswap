'use client'

import Switch from '@sushiswap/ui/future/components/Switch'
import React, { FC } from 'react'
import { NetworkIcon } from '@sushiswap/ui/future/components/icons'
import { ChainId } from '@sushiswap/chain'
import { useLocalStorage } from '@sushiswap/hooks'

export const CarbonOffset: FC = () => {
  const [carbonOffset, setCarbonOffset] = useLocalStorage('carbonOffset', false)

  return (
    <div className="p-4 rounded-lg bg-white dark:bg-slate-800">
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-slate-50">Carbon Offset</h1>
          <span className="text-xs text-gray-600 dark:text-slate-500">
            Make transactions climate positive by offsetting them with Klima Infinity. The average cost to offset a
            transaction on Polygon is less than $0.01.
          </span>
        </div>
        <Switch checked={carbonOffset} onChange={(checked) => setCarbonOffset(checked)} />
      </div>
      <span className="mt-3 text-xs text-gray-500 dark:text-slate-400 items-center flex font-medium gap-0.5">
        Only available on <NetworkIcon type="naked" chainId={ChainId.POLYGON} width={16} height={16} /> Polygon
      </span>
    </div>
  )
}
