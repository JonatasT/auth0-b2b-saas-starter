import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function WelcomeBackCard() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo(a) de volta!</h1>
        <p className="text-sm text-muted-foreground">
          Atualmente você está logado no Checksync.
        </p>
      </div>
      <div className="flex justify-center">
        <Button asChild>
          <Link href="/dashboard">
            Ir para o Dashboard <ArrowRightIcon className="ml-1.5 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
