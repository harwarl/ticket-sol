'use client'
import { useGetProgramAccountQuery } from '@/features/ticketregistry/data-access/use-get-program-account-query'

import { AppAlert } from '@/components/app-alert'
import { useSolana } from '@/components/solana/use-solana'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { TicketRegistryUiCreate } from './ticketregistry-ui-create'

export function TicketregistryUiProgram() {
  const { account } = useSolana()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ticketPrice: '',
    availableTickets: '',
    startDate: '',
  })

  return (
    <div className="max-w-2xl sm:mt-4 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Event Title</CardTitle>
          <CardDescription>
            Fill in the details for your event. Buyers will be limited to one ticket each.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                required
                placeholder="Summer Music Festival 2024"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                }}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                placeholder="Describe your event"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value })
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="ticketPrice">Ticket Price</Label>
                <Input
                  id="ticketPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="50.00"
                  value={formData.ticketPrice}
                  onChange={(e) => {
                    setFormData({ ...formData, ticketPrice: e.target.value })
                  }}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="availableTickets">Available Tickets</Label>
                <Input
                  id="availableTickets"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="50"
                  value={formData.availableTickets}
                  onChange={(e) => {
                    setFormData({ ...formData, availableTickets: e.target.value })
                  }}
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => {
                  setFormData({ ...formData, startDate: e.target.value })
                }}
              />
            </div>
            {account ? (
              <TicketRegistryUiCreate
                account={account}
                name={formData.name}
                description={formData.description}
                ticketPrice={Number(formData.ticketPrice)}
                availableTicket={Number(formData.availableTickets)}
                startDate={Math.floor(new Date(formData.startDate).getTime() / 1000)}
              />
            ) : (
              <AppAlert>Failed to fetch event data.</AppAlert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
