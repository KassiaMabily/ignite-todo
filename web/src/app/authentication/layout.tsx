import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function AuthenticationLayout({
    children,
  }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="container relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/examples/authentication"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "absolute right-4 top-4 md:right-8 md:top-8"
                        )}
                    >
                    Entrar
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex flex-col space-y-2 items-center justify-center h-full leading-[40px] text-[40px] font-black">
                        <Icons.logo className="scale-150" />
                        <div><span className="text-brand-blue">to</span><span className="text-brand-purple-dark">do</span></div>
                    </div>
                </div>
                <div className="w-full lg:p-8">
                    {children}
                </div>
            </div>
        </>
    )
}
