'use client'

import React, { createContext, FC, ReactNode, useCallback, useContext, useMemo, useState } from 'react'

type CheckerContext = {
  state: Record<string, boolean>
  setApproved: (tag: string, approved: boolean) => void
}

const CheckerContext = createContext<CheckerContext | undefined>(undefined)

export interface ProviderProps {
  children: ReactNode
}

export const CheckerProvider: FC<ProviderProps> = ({ children }) => {
  const [state, setState] = useState({})

  const setApproved = useCallback((tag: string, approved: boolean) => {
    setState((prevState) => ({
      ...prevState,
      [tag]: approved,
    }))
  }, [])

  return (
    <CheckerContext.Provider value={useMemo(() => ({ setApproved, state }), [setApproved, state])}>
      {children}
    </CheckerContext.Provider>
  )
}

export const useApproved = (tag: string) => {
  const context = useContext(CheckerContext)
  if (!context) {
    throw new Error('Hook can only be used inside Checker Context')
  }

  return useMemo(
    () => ({
      approved: context.state[tag] ? context.state[tag] : false,
      setApproved: (approved: boolean) => context.setApproved(tag, approved),
    }),
    [context, tag]
  )
}
