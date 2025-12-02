'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe2, PersonStanding, Ticket, Wallet2 } from 'lucide-react'
import React from 'react'
import { AppHero } from '@/components/app-hero'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const primary: {
  icon: React.ReactNode
  label: string
  description: string
}[] = [
  {
    icon: <Ticket className="h-6 w-6" />,
    label: 'Create Tickets',
    description: 'Set up your event tickets in minutes with custom pricing and availability',
  },
  {
    icon: <PersonStanding className="h-6 w-6" />,
    label: 'One Per Buyer',
    description: 'Fair distribution system ensures each buyer can purchase only one ticket',
  },
  {
    icon: <Wallet2 className="h-6 w-6" />,
    label: 'Flexible Withdrawals',
    description: 'Withdraw your earnings partially or in full whenever you need',
  },
]

export default function DashboardFeature() {
  const router = useRouter()

  return (
    <div>
      <AppHero
        title="Simple Event Ticketing For Everyone"
        subtitle="Create, sell, and manage event tickets with ease. One ticket per buyer, transparent withdrawals, and straightforward event management."
      >
        <div className="flex gap-2 items-center justify-center mt-4">
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
          <Button
            variant={'outline'}
            size={'lg'}
            onClick={() => {
              router.push('/events')
            }}
          >
            <Globe2 className="h-4 w-4" />
            Browse Events
          </Button>
        </div>
      </AppHero>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {primary.map((link) => (
            <Card
              key={link.label}
              className="h-full flex flex-col transition-all duration-200 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1"
            >
              <CardHeader className="flex-row items-center gap-2">
                {link.icon}
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">{link.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grow">
                <p className="text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-row justify-center py-4 md:py-16">
          <div className="text-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold">Ready to get Started?</h2>
              <p className="pt-2 md:py-6">
                Whether you're organizing events or looking for tickets, we've got your covered
              </p>
              <Button variant={'default'} size={'lg'}>
                Start Creating Events
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
