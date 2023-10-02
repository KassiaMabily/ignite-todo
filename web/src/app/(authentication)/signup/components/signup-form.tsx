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
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { setCookie } from "nookies"
import { AxiosError } from "axios"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link"

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignUpFormSchema = z.object({
    email: z.string().email({message: "E-mail inválido!"}),
})

type SignUpFormInputs = z.infer<typeof SignUpFormSchema>

export function SignUpForm({ className, ...props }: SignUpFormProps) {
    const { toast } = useToast()
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting: isLoading, errors },
        reset,
    } = useForm<SignUpFormInputs>({
        resolver: zodResolver(SignUpFormSchema),
    })

    async function handleSignUp(data: SignUpFormInputs) {
        const { email } = data

        try {
            const response = await api.post("account/sign-up", { email: email, name: email })

            setCookie(null, process.env.NEXT_PUBLIC_TOKEN as string, response.data.data.token, {
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
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit(handleSignUp)}>
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
                            type="text"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email")}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Registrar com e-mail
                    </Button>
                </div>
            </form>

            <div className="text-sm text-muted-foreground">
                Já possui conta? <span className="underline"><Link href="/signin">Entrar</Link></span>
            </div>
        </div>
    )
}
