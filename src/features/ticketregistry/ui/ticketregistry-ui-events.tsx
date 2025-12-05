import { AppHero } from '@/components/app-hero'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Calendar, Ticket } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AppPageHeader } from '@/components/app-page-header'

export interface EventData {
  eventPda: string
  eventName: string
  description: string
  ticketPrice: number
  availableTicket: number
  startDate: number
}

export const mockEvents: EventData[] = [
  {
    eventPda: '8h1fAn67wKhmatHS52HQBeYhM5JHEJap43U6YC4AT95x',
    eventName: 'Ayele Show',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium veritatis modi cumque labore, accusamus soluta ad veniam iusto architecto perspiciatis eligendi dolor, quae fuga similique. Facere reiciendis quos possimus quaerat. Perferendis, maiores odio necessitatibus laborum saepe ratione quos nisi, eos rerum labore error aliquid. Vitae cumque, quas aspernatur dolore voluptatem, odio accusamus reprehenderit officia excepturi expedita sapiente eveniet sed porro, quam eos? Totam eaque commodi, illo sint quia fuga distinctio molestias rem rerum. Saepe, ut at. Dolor iure aliquid aspernatur aut nihil distinctio nisi suscipit! Soluta ipsa quo incidunt libero laborum labore tenetur, tempora ducimus nemo dolorum voluptas laudantium nulla.',
    ticketPrice: 0.4,
    availableTicket: 100,
    startDate: Date.now(),
  },
  {
    eventPda: '8h1fAn67wKhmatHS52HQBeYhM5JHEJap43U6YC4AT95y',
    eventName: 'Ayefele Show',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ex est quis tempore ipsam accusantium cum quasi? Officiis consequuntur esse laudantium blanditiis cum quisquam optio autem possimus, aut dolore nam deserunt sunt voluptate incidunt commodi deleniti itaque illum recusandae iure aperiam explicabo provident distinctio. Maiores praesentium suscipit provident fuga temporibus.',
    ticketPrice: 0.4,
    availableTicket: 100,
    startDate: Date.now(),
  },
  {
    eventPda: '8h1fAn67wKhmatHS52HQBeYhM5JHEJap43U6YC4AT95w',
    eventName: 'mockEvent',
    description: 'mockdescription',
    ticketPrice: 0.4,
    availableTicket: 100,
    startDate: Date.now(),
  },
  {
    eventPda: '8h1fAn67wKhmatHS52HQBeYhM5JHEJap43U6YC4AT95s',
    eventName: 'Ayele Oh Ibosi Oh',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat pariatur architecto accusantium ullam rem! Qui fugit natus voluptatem placeat explicabo quisquam excepturi ea saepe, magni quod aut nemo deserunt eius est omnis beatae dolores repudiandae ratione aperiam facere. Rerum error perferendis inventore beatae dicta qui optio amet quis? Error, voluptatum!',
    ticketPrice: 0.4,
    availableTicket: 100,
    startDate: Date.now(),
  },
]

export default function TicketRegistryUiEvents() {
  const router = useRouter()
  const [events, setEvents] = useState<EventData[]>(mockEvents)
  useEffect(() => {}, [])

  const availableEvents = events.filter((event) => event.availableTicket > 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <AppPageHeader title={'Browse Events'} subtitle={'Find and purchase tickets for upcoming events'} />

      {availableEvents.length === 0 ? (
        <Card>
          <CardContent>
            <div className="mb-4">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No Tickets available at the moment</p>
            </div>

            <Button
              variant={'default'}
              size={'lg'}
              onClick={() => {
                router.push('/create')
              }}
            >
              Start Creating Events
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {availableEvents.map((event: EventData) => {
            return (
              <Card key={event.eventPda}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{event.eventName}</CardTitle>
                    <Badge variant={'secondary'}>${event.ticketPrice}</Badge>
                  </div>

                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.startDate).toLocaleDateString()}</span>
                    </div>

                    <div className="pt-2">
                      <p className="text-muted-foreground">
                        {event.availableTicket} ticket{event.availableTicket !== 1 ? 's' : ''} available
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={'default'}
                    size={'lg'}
                    onClick={() => {
                      router.push(`/events/${event.eventPda}`)
                    }}
                  >
                    View Ticket
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
