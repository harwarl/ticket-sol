import { toastTx } from '@/components/toast-tx'
import { getInitializeInstructionAsync } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toast } from 'sonner'

export function useCreateEventMutation({
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
  const txSigner = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async () => {
      const ix = await getInitializeInstructionAsync({
        eventOrganizer: txSigner,
        name,
        description,
        ticketPrice: BigInt(ticketPrice),
        startDate: BigInt(startDate),
        availableTicket: BigInt(availableTicket),
      })

      let res: any
      try {
        res = await signAndSend(ix, txSigner)
      } catch (error) {
        console.log({ error })
      }

      return res
    },
    onSuccess: (signature: string) => {
      toastTx(signature)
    },
    onError: () => toast.error('Failed to run program'),
  })
}
