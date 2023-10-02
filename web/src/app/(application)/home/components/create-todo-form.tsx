"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { AxiosError } from "axios";
import { getErrors } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/axios";
import { Dispatch, SetStateAction } from "react";

const CreateTodoFormSchema = z.object({
    title: z.string(),
    scheduleAt: z.date().min(new Date(), { message: "Favor escolher uma data futura!"}).optional(),
})

type CreateTodoFormInputs = z.infer<typeof CreateTodoFormSchema>

export function CreateTodoForm({ addTask }: ICreateTodoFormProps){
    const { toast } = useToast();

    const {
        handleSubmit,
        register,
        reset,
        formState: { isSubmitting: isLoading, errors },
    } = useForm<CreateTodoFormInputs>({
        resolver: zodResolver(CreateTodoFormSchema)
    });

    async function handleCreateTodoFormSubmit(data: CreateTodoFormInputs) {
        const { title } = data;

        try {
            const { data } = await api.post("/todo", {
                "title": title,
                "done": false
            })

            addTask(state => [data.data, ...state])

            reset();
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
        <form className="w-full h-14 flex gap-2" onSubmit={handleSubmit(handleCreateTodoFormSubmit)}>
            <input
                type="text"
                placeholder="Adicione uma nova tarefa"
                required
                className="rounded-md flex-1 py-0 px-4 dark:bg-brand-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple"
                {...register("title")}
            />
            <button type='submit' className="flex items-center justify-center text-white p-4 gap-2 bg-brand-blue-dark rounded-md">
                Criar
                <PlusCircledIcon className="h-4 w-4" />
            </button>
        </form>
    )
}

interface ICreateTodoFormProps {
    addTask: Dispatch<SetStateAction<ITask[]>>
}
