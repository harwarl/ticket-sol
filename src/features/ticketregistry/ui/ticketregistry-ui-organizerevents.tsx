'use client'

import React from 'react'
import { EventData, mockEvents } from './ticketregistry-ui-events'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

export default function TicketRegistryUiOrganizerEvents() {
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = React.useState<string | null>(null)
  const [events, setEvents] = React.useState<EventData[]>(mockEvents)
  const [withdrawAmount, setWithdrawAmount] = React.useState('')

  const handleAmountChange = (amount: string, revenue: number) => {
    if (Number(amount) > revenue) {
      toast({
        title: 'Insufficient Funds',
        description: 'Withdrawal amount exceeds available revenue.',
        variant: 'destructive',
      })
      setWithdrawAmount(amount)
      return
    }

    setWithdrawAmount(amount)
  }

  const handleWithdraw = (eventId: string) => {
    const event = events.find((e) => e.eventPda === eventId)
    if (!event) return

    const amount = parseFloat(withdrawAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid withdrawal amount.',
        variant: 'destructive',
      })
      return
    }

    // if (amount > event.revenue) {
    //   toast({
    //     title: 'Insufficient Funds',
    //     description: 'Withdrawal amount exceeds available revenue.',
    //     variant: 'destructive',
    //   })
    //   return
    // }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">Your Events</h3>

      {events.length === 0 ? (
        <>
          <Card>
            <CardContent className="py-12 text-center">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-4">You haven't created any events yet</p>

              <Button
                variant={'default'}
                size={'lg'}
                onClick={() => {
                  router.push('/create')
                }}
              >
                <Ticket className="h-4 w-4" />
                Create Your Event
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        events.map((event: EventData) => {
          const available = event.availableTicket
          const isSelected = selectedTicket === event.eventPda
          const revenue = event.availableTicket * event.ticketPrice

          return (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{event.eventName}</CardTitle>
                    <CardDescription>{new Date(event.startDate).toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge variant={available > 0 ? 'default' : 'secondary'}>
                    {available > 0 ? 'Active' : 'Sold Out'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-semibold">${event.ticketPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sold</p>
                    <p className="font-semibold">{event.availableTicket}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-semibold text-success">${revenue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="font-semibold">{available}</p>
                  </div>
                </div>

                {revenue > 0 && (
                  <div className="border-t border-border pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTicket(isSelected ? null : event.eventPda)}
                    >
                      {isSelected ? 'Cancel Withdrawal' : 'Withdraw Funds'}
                    </Button>

                    {isSelected && (
                      <div className="mt-4 space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor={`withdraw-${event.eventPda}`}>Amount to Withdraw (Max: ${revenue})</Label>
                          <Input
                            id={`withdraw-${event.eventPda}`}
                            type="number"
                            min="0"
                            max={revenue}
                            step="0.01"
                            placeholder="0.00"
                            value={withdrawAmount}
                            onChange={(e) => handleAmountChange(e.target.value, revenue)}
                          />
                        </div>

                        <Button onClick={() => handleWithdraw(event.eventPda)} className="w-full md:w-auto">
                          Confirm Withdrawal
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })
      )}
    </div>
  )
}
