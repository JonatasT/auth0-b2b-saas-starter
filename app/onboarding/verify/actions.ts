"use server"

import { redirect } from "next/navigation"

import { managementClient, onboardingClient } from "@/lib/auth0"

export async function resendVerificationEmail() {
  const session = await onboardingClient.getSession()

  if (!session) {
    return redirect("/onboarding/signup")
  }

  try {
    await managementClient.jobs.verifyEmail({
      user_id: session.user.sub,
    })

    return {}
  } catch (error) {
    console.error("falha ao reenviar e-mail de verificação", error)
    return {
      error: "Falha ao reenviar o e-mail de verificação.",
    }
  }
}
