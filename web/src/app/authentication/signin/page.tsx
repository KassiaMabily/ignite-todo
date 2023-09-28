import { Icons } from "@/components/icons"
import { SignInForm } from "./components/signin-form"

export default function SignInPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex relative z-20 md:hidden space-x-2 items-center justify-center h-full leading-[32px] text-[32px] font-black">
          <Icons.logo />
          <div><span className="text-brand-blue">to</span><span className="text-brand-purple-dark">do</span></div>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Entrar
        </h1>
        <p className="text-sm text-muted-foreground">
          Insira suas credenciais
        </p>
      </div>
      <SignInForm />
    </div>
  )
}
