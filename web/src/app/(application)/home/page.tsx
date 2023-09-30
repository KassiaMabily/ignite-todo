import { useState } from "react";
import { CreateTodoForm } from "./components/create-todo-form";
import { Icons } from "@/components/icons";
import { Task } from "./components/task";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";

export default function Application() {

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
                            <Badge variant="tertiary">5</Badge>
                        </div>
                        <div className="flex gap-2 text-brand-purple font-bold">
                            Concluídas
                            <Badge variant="tertiary">2 de 5</Badge>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Task task={{ id: "1", title: "Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor.", done: false, createdAt: "2023-08-01" }} />
                        <Task task={{ id: "2", title: "Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor.", done: true, createdAt: "2023-08-01", scheduleAt: "2023-08-01 10:00" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
