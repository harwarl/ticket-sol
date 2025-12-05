'use client'

import { useSolana } from '@/components/solana/use-solana'
import TicketRegistryNoAccount from './ui/ticketregistry-ui-noaccount'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { assertIsAddress } from 'gill'
import TicketRegistryUiTicketDetails from './ui/ticketregistry-ui-ticketdetails'

export default function TicketRegistryEventDetails() {
  const { account } = useSolana()
  const params = useParams()
  const eventPda = useMemo(() => {
    if (!params.eventpda || typeof params.eventpda !== 'string') {
      return
    }

    assertIsAddress(params.eventpda)
    return params.eventpda
  }, [params])

  if (!account) {
    return <TicketRegistryNoAccount />
  }

  if (!eventPda) {
    return <div>Error loading event</div>
  }

  return <TicketRegistryUiTicketDetails address={eventPda} />
}
