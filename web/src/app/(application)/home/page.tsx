"use client"

import { CreateTodoForm } from "./components/create-todo-form";
import { Icons } from "@/components/icons";
import { Task } from "./components/task";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Empty } from "./components/empty";
import { useContextSelector } from "use-context-selector";
import { TodosContext } from "@/contexts/TodoContext";

export default function Application() {
    const todos = useContextSelector(TodosContext, (context) => {
        return context.todos
    })

    const countTodos = todos.length
    const countFinishedTodos = todos.filter(t => t.done).length

    return (
        <div className="bg-brand-gray-100 min-h-screen dark:bg-brand-gray-600">
            <header className="h-52 flex justify-center items-center z-10 bg-brand-gray-700">
                <div className="flex leading-[32px] text-[32px] font-black">
                    <Icons.logo />
                    <div><span className="text-brand-blue">to</span><span className="text-brand-purple-dark">do</span></div>
                </div>

                <div className="absolute top-5 right-5 text-brand-gray-100">
                    <ModeToggle />
                </div>
            </header>

            <div className="container max-w-5xl -mt-5 z-50">
                <CreateTodoForm />

                <div className="flex flex-col gap-6 mt-10 md:mt-16">
                    <div className="flex justify-between">
                        <div className="flex gap-2 text-brand-blue font-bold">
                            Tarefas criadas
                            <Badge variant="tertiary">{countTodos}</Badge>
                        </div>
                        <div className="flex gap-2 text-brand-purple font-bold">
                            Concluídas
                            <Badge variant="tertiary">{countFinishedTodos} de {countTodos}</Badge>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {
                            todos.length > 0 ? (
                                todos.map(todo => <Task key={todo.id} task={todo} />  )
                            ) : (
                                <Empty />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
