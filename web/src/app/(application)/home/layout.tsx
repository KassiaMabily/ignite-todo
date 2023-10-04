import { TodosProvider } from "@/contexts/TodoContext";


export default function LayoutHome({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <TodosProvider>
      { children }
    </TodosProvider>
  )
}
