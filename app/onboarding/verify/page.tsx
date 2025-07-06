"use client"

import { EnvelopeClosedIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SubmitButton } from "@/components/submit-button"

import { resendVerificationEmail } from "./actions"

export default function Verify() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="grid gap-2">
          <EnvelopeClosedIcon className="size-5" />
          <span>Verifique o seu e-mail</span>
        </CardTitle>
        <CardDescription>
          Verifique sua caixa de entrada para obter um link de 
          verificação para continuar criando sua conta.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <form
          action={async () => {
            const { error } = await resendVerificationEmail()

            if (error) {
              toast.error(error)
              return
            }

            toast.success(
              "O e-mail de verificação foi enviado com sucesso. Verifique sua caixa de entrada."
            )
          }}
        >
          <SubmitButton>Reenviar Verificação</SubmitButton>
        </form>
      </CardFooter>
    </Card>
  )
}
