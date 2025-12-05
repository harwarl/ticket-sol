'use client'

import { useSolana } from '@/components/solana/use-solana'
import TicketRegistryNoAccount from './ui/ticketregistry-ui-noaccount'
import TicketRegistryUiEvents from './ui/ticketregistry-ui-events'

export default function TicketRegistryLoadEvents() {
  const { account } = useSolana()

  if (!account) {
    return <TicketRegistryNoAccount />
  }

  return (
    <div>
      <TicketRegistryUiEvents />
    </div>
  )
}
