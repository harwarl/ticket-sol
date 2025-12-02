import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useCreateEventMutation } from '../data-access/use-create-event-mutation'

export function TicketRegistryUiCreate({
  account,
  name,
  description,
  ticketPrice,
  availableTicket,
  startDate,
}: {
  account: UiWalletAccount
  name: string
  description: string
  ticketPrice: number
  availableTicket: number
  startDate: number
}) {
  const createEventMutation = useCreateEventMutation({
    account,
    name,
    description,
    ticketPrice,
    availableTicket,
    startDate,
  })

  const handleSubmit = async () => {
    // Validate the values and return toast
    await createEventMutation.mutateAsync()
  }

  return (
    <Button onClick={() => handleSubmit} disabled={createEventMutation.isPending}>
      Create Event{createEventMutation.isPending && '...'}
    </Button>
  )
}
