'use client'

import { AppPageHeader } from '@/components/app-page-header'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Coins, TrendingUp, Users } from 'lucide-react'
import TicketRegistryUiOrganizerEvents from './ticketregistry-ui-organizerevents'

export default function TicketRegistryUiEventSummary() {
  return (
    <div className="container mx-auto">
      <AppPageHeader title="Organizer Dashboard" subtitle="Manage your events and track revenue" />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Coins className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(2.5).toFixed(2)} SOL</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ticket Sold</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{43}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{32}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
