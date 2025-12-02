import { WalletDropdown } from '@/components/wallet-dropdown'
import { Ticket } from 'lucide-react'
import React from 'react'

const TicketRegistryNoAccount = () => {
  return (
    <div className="max-w-xl sm:mt-4 mx-auto py-4 md:py-16 border rounded-3xl">
      <div className="hero">
        <div className="hero-content flex flex-col justify-center items-center text-center">
          <Ticket className="h-12 w-12" />
          <h2 className="text-2xl font-bold">Connect Wallet to Create Tickets</h2>
          <p className="md:py-6">You need to connect your Solana wallet to create event tickets on the blockchain.</p>
          <WalletDropdown />
        </div>
      </div>
    </div>
  )
}

export default TicketRegistryNoAccount
