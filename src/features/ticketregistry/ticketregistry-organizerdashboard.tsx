'use client'
import React from 'react'
import TicketRegistryUiEventSummary from './ui/ticketregistry-ui-eventssummary'
import TicketRegistryUiOrganizerEvents from './ui/ticketregistry-ui-organizerevents'
import { useSolana } from '@/components/solana/use-solana'
import TicketRegistryNoAccount from './ui/ticketregistry-ui-noaccount'

export default function TicketRegistryOrganizerDashboard() {
  const account = useSolana()

  if (!account) {
    return <TicketRegistryNoAccount />
  }
  return (
    <div>
      <TicketRegistryUiEventSummary />
      <TicketRegistryUiOrganizerEvents />
    </div>
  )
}
