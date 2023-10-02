import clipboardImage from '@/assets/Clipboard.png'
import Image from 'next/image'

export function Empty() {
    return (
        <div className="flex flex-col gap-3 items-center justify-center border-t border-brand-gray-400 rounded-md py-8">
            <Image src={clipboardImage} alt={"Icone de clipboard"} />
            <div className='text-muted-foreground'>
                <h1 className='font-bold'>Você ainda não tem tarefas cadastradas</h1>
                <h2>Crie tarefas e organize seus itens a fazer</h2>
            </div>
        </div>
    )
}
