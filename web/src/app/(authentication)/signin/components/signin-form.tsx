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
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { setCookie } from "nookies"
import Link from "next/link"

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignInFormSchema = z.object({
    email: z.string().email({message: "E-mail inválido!"}),
    password: z.string(),
})

type SignInFormInputs = z.infer<typeof SignInFormSchema>

export function SignInForm({ className, ...props }: SignInFormProps) {
    const { toast } = useToast()
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting: isLoading, errors },
        reset,
    } = useForm<SignInFormInputs>({
        resolver: zodResolver(SignInFormSchema),
    })

    async function handleSignIn(data: SignInFormInputs) {
        const { email, password } = data

        try {
            const response = await api.post("account/sign-in", { email: email, password: password })

            setCookie(null, process.env.NEXT_PUBLIC_TOKEN as string, response.data.data, {
                maxAge: 60 * 60 * 8, // 8 hours
                path: '/',
            })

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
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit(handleSignIn)}>
                {errors.email && (
                    <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>Erro</AlertTitle>
                        <AlertDescription>
                            {errors.email.message}
                        </AlertDescription>
                    </Alert>
                )}
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
            <div className="text-sm text-muted-foreground">
                Ainda não possui conta? <span className="underline"><Link href="/signup">Cadastre-se aqui</Link></span>
            </div>
        </div>
    )
}
