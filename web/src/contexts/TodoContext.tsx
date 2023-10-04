"use client"

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import * as z from "zod"
import api from "@/lib/axios"
import { CreateTodoFormSchema } from "@/app/(application)/home/components/create-todo-form"
import { useToast } from "@/components/ui/use-toast"
import { getErrors } from "@/lib/utils"
import { AxiosError } from "axios"

interface TodosContextType {
    todos: ITask[]
    fetchTodos: () => Promise<void>
    createTodo: (data: CreateTodoFormInputs) => Promise<void>
    removeTodo: (identifier: string) => Promise<void>
    toggleTodo: (identifier: string) => Promise<void>
}

interface TodosProviderProps {
    children: ReactNode
}

export const TodosContext = createContext({} as TodosContextType)

export function TodosProvider({ children }: TodosProviderProps) {
    const { toast } = useToast();
    const [ todos, setTodos ] = useState<ITask[]>([])

    const fetchTodos = useCallback(async () => {
        const { data } = await api.get("/todo")
        setTodos(data.data)
    }, [])

    const createTodo = useCallback(
        async (data: CreateTodoFormInputs) => {
            try {
                const { title } = data;
                const response = await api.post("/todo", {
                    "title": title,
                    "done": false
                })

                setTodos(state => [response.data.data, ...state])
            } catch (error) {
                const errs = getErrors(error as AxiosError)

                errs.forEach(err => {
                    toast({
                        variant: "destructive",
                        title: err,
                    })
                });
            }
        },
        [],
    )

    const removeTodo = useCallback(
        async (identifier: string) => {
            try {
                await api.delete(`/todo/${identifier}`)

                setTodos((state) => state.filter((task) => task.id !== identifier));

                toast({
                    title: "Tarefa removida com sucesso",
                })
            } catch (error) {
                const errs = getErrors(error as AxiosError)

                errs.forEach(err => {
                    toast({
                        variant: "destructive",
                        title: err,
                    })
                });
            }
        },
        [],
    )

    const toggleTodo = useCallback(
        async (identifier: string) => {
            try {
                await api.put(`/todo/${identifier}/toggle-finish`)

                setTodos((state) => state.map((task) => {
                    if(task.id === identifier) {
                        return {
                            ...task,
                            done: !task.done
                        }
                    }

                    return task
                }));

                toast({
                    title: "Tarefa atualizada com sucesso",
                })
            } catch (error) {
                const errs = getErrors(error as AxiosError)

                errs.forEach(err => {
                    toast({
                        variant: "destructive",
                        title: err,
                    })
                });
            }
        },
        [],
    )


    useEffect(() => {
        fetchTodos()
    }, [])


    return (
        <TodosContext.Provider
            value={{
                todos,
                fetchTodos,
                createTodo,
                removeTodo,
                toggleTodo
            }}
        >
            {children}
        </TodosContext.Provider>
    )
}


export type CreateTodoFormInputs = z.infer<typeof CreateTodoFormSchema>
