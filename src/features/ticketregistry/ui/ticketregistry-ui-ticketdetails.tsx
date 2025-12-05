import { Address } from 'gill'
import { EventData, mockEvents } from './ticketregistry-ui-events'
import { Calendar, DollarSign, Ticket } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSolana } from '@/components/solana/use-solana'
import TicketRegistryNoAccount from './ticketregistry-ui-noaccount'

export default function TicketRegistryUiTicketDetails({ address }: { address: Address }) {
  const event = mockEvents.find((e: EventData) => e.eventPda === address)

  if (!event) return <div>Event Not found</div>

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold text-muted-foreground">{event.eventName}</h1>
          <p className="text-muted-foreground mb-6">{event.description}</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Event Date</p>
                <p className="font-medium">{new Date(event.startDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium">{event.ticketPrice} SOL</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Ticket className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Availability</p>
                <p className="font-medium">
                  {event.availableTicket === 0 ? 'Sold Out' : `${event.availableTicket} tickets remaining`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Purchase Ticket</CardTitle>
              <CardDescription>One ticket per buyer.</CardDescription>
            </CardHeader>
            <CardContent>
              {event.availableTicket === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">This event is sold out</p>
                  <Button variant="outline">Browse Other Events</Button>
                </div>
              ) : (
                <form>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Total</span>
                      <span className="text-2xl font-bold">{event.ticketPrice} SOL</span>
                    </div>
                    <Button type="submit" className="w-full" disabled={false}>
                      {false ? 'Processing...' : 'Complete Purchase'}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
