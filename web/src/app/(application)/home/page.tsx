"use client"

import { useEffect, useState } from "react";
import { CreateTodoForm } from "./components/create-todo-form";
import { Icons } from "@/components/icons";
import { Task } from "./components/task";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Empty } from "./components/empty";
import api from "@/lib/axios";
import { getErrors } from "@/lib/utils";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function Application() {
    const { toast } = useToast();
    const [ tasks, setTasks ] = useState<ITask[]>([]);

    async function fetchTasks() {
        const { data } = await api.get("/todo")
        setTasks(data.data)
    }

    async function handleDeleteTask(taskIdToDelete: string) {
        try {
            await api.delete(`/todo/${taskIdToDelete}`)

            const tasksWithoutDeletedOne = tasks.filter(task => {
                return task.id !== taskIdToDelete
              })

            setTasks(tasksWithoutDeletedOne);

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
    }

    async function handleToggleTask(taskId: string) {
        try {
            const { data } = await api.put(`/todo/${taskId}/toggle-finish`)

            console.log(data)

            const indexTaskToUpdate = tasks.findIndex(task => {
                return task.id === taskId;
            });


            let newTasks = [...tasks];
            newTasks[indexTaskToUpdate] = {
                ...data.data
            }

            setTasks(newTasks);

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
    }

    useEffect(() => {
        fetchTasks()
    }, [])

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
                <CreateTodoForm addTask={setTasks} />

                <div className="flex flex-col gap-6 mt-10 md:mt-16">
                    <div className="flex justify-between">
                        <div className="flex gap-2 text-brand-blue font-bold">
                            Tarefas criadas
                            <Badge variant="tertiary">5</Badge>
                        </div>
                        <div className="flex gap-2 text-brand-purple font-bold">
                            Concluídas
                            <Badge variant="tertiary">2 de 5</Badge>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {
                            tasks.length > 0 ? (
                                tasks.map(task => <Task key={task.id} task={task} removeTask={handleDeleteTask} toggleTask={handleToggleTask}/>  )
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
