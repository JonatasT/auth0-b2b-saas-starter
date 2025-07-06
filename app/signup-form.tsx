import Link from "next/link"
import { redirect } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/submit-button"

export function SignUpForm() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Experimente o Checksync Gratuitamente
        </h1>
        <p className="text-sm text-muted-foreground">
          Digite seu e-mail para se inscrever e criar uma nova organização para você e seus colaboradores.
        </p>
      </div>
      <form
        action={async (formData: FormData) => {
          "use server"

          const email = formData.get("email")
          if (!email || typeof email !== "string") return

          const searchParams = new URLSearchParams({
            login_hint: email,
          })

          redirect(`/onboarding/signup?${searchParams.toString()}`)
        }}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="nome@exemplo.com"
              required
            />
          </div>
          <SubmitButton>Começar</SubmitButton>
        </div>
      </form>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Ao continuar, você concorda com nossos{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Termos de Serviço
        </Link>{" "}
        e{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Política de Privacidade
        </Link>
        .
      </p>
    </div>
  )
}