import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/axios";
import { getErrors } from "@/lib/utils";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import { AxiosError } from "axios";
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";

interface ITaskProps {
    task: ITask
    removeTask: (id: string) => void
    toggleTask: (id: string) => void
}

export function Task({ task, removeTask, toggleTask}: ITaskProps){

    return (
        <div className={classNames(
            "flex items-start justify-between flex-1 rounded-md gap-3 p-4 bg-brand-gray-200/40 dark:bg-brand-gray-400", {
                "shadow": !task.done,
                "border bg-brand-gray-200/30 dark:bg-brand-gray-500": task.done
            }
        )}>
            <Toggle
                variant="outline"
                data-state={task.done && "on"}
                onPressedChange={() => toggleTask(task.id)}
            >
                {
                    task.done && <CheckIcon className="h-4 w-4 text-white" />
                }
            </Toggle>
            <div className="flex-1">
                <p className={classNames(
                    "",{
                        "text-brand-gray-500 dark:text-brand-gray-100": !task.done,
                        "text-brand-gray-300 dark:text-brand-gray-300 line-through": task.done
                    }
                )}>
                    {task.title}
                </p>
                {
                    task.scheduleAt && (
                        <time
                            title="11 de Mario às 08:08"
                            dateTime="2022-05-11 08:08"
                            className={classNames(
                                "text-xs text-brand-gray-500/60 dark:text-brand-gray-100/60", {
                                    "line-through": task.done
                                }
                            )}
                        >
                            10/10/2023 às 10:00
                        </time>
                    )
                }

            </div>
            <button>
                <TrashIcon className="text-brand-gray-300 scale-150 hover:text-[#E25858]" onClick={() => removeTask(task.id)} />
            </button>
        </div>
    )
}
