import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusCircledIcon } from "@radix-ui/react-icons";

const CreateTodoFormSchema = z.object({
    title: z.string().email({message: "E-mail inválido!"}),
    scheduleAt: z.date().min(new Date(), { message: "Favor escolher uma data futura!"}).optional(),
})

type CreateTodoFormInputs = z.infer<typeof CreateTodoFormSchema>

export function CreateTodoForm(){

    return (
        <form className="w-full h-14 flex gap-2">
            <input
                type="text"
                name="newTask"
                placeholder="Adicione uma nova tarefa"
                required
                className="rounded-md flex-1 py-0 px-4 dark:bg-brand-gray-500"
            />
            <button type='submit' className="flex items-center justify-center text-white p-4 gap-2 bg-brand-blue-dark rounded-md">
                Criar
                <PlusCircledIcon className="h-4 w-4" />
            </button>
        </form>
    )
}
