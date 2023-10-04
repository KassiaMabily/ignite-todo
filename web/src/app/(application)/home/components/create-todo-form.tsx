"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { CreateTodoFormInputs, TodosContext } from "@/contexts/TodoContext";
import { useContextSelector } from "use-context-selector";

export const CreateTodoFormSchema = z.object({
    title: z.string(),
    scheduleAt: z.date().min(new Date(), { message: "Favor escolher uma data futura!"}).optional(),
})

export function CreateTodoForm(){

    const createTodo = useContextSelector(
        TodosContext,
        (context) => {
            return context.createTodo
        },
    )

    const {
        handleSubmit,
        register,
        reset,
        formState: { isSubmitting: isLoading, errors },
    } = useForm<CreateTodoFormInputs>({
        resolver: zodResolver(CreateTodoFormSchema)
    });

    async function handleCreateTodoFormSubmit(data: CreateTodoFormInputs) {
        const { title } = data
        createTodo({
            title
        })
        reset()
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
            <button type='submit' disabled={isLoading} className="flex items-center justify-center text-white p-4 gap-2 bg-brand-blue-dark rounded-md disabled:bg-brand-blue disabled:cursor-not-allowed">
                Criar
                <PlusCircledIcon className="h-4 w-4" />
            </button>
        </form>
    )
}
