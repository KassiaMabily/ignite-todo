"use client"

import * as React from "react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn, getErrors } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import api from "@/lib/axios"
import { useToast } from "@/components/ui/use-toast"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

type SignInFormInputs = z.infer<typeof SignInFormSchema>

export function SignInForm({ className, ...props }: SignInFormProps) {
    const { toast } = useToast()
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting: isLoading },
        reset,
    } = useForm<SignInFormInputs>({
        resolver: zodResolver(SignInFormSchema),
    })

    async function handleSignIn(data: SignInFormInputs) {
        const { email, password } = data
        console.log(email, password)

        try {
            const response = await api.post("account/sign-in", { email: email, password: password })
            console.log(response)
            localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN as string, response.data.data)
            reset()
            router.push("/home")
        } catch (error) {
            const errs = getErrors(error as AxiosError)
            errs.forEach(err => {
                toast({
                    variant: "destructive",
                    title: err,
                })
            });
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="nome@exemplo.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email")}
                        />
                        <Input
                            id="password"
                            placeholder="Digite a sua senha..."
                            type="password"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("password", )}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Entrar com e-mail
                    </Button>
                </div>
            </form>
        </div>
    )
}
