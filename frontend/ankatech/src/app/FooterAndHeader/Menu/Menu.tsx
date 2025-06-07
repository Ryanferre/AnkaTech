'use client'
import Link from 'next/link';
import { ValuesHook } from '@/app/costumHook/costHook';

export default function Menu(){
    const styleLi= 'text-[#5d5d5d] lg:text-1 sm:text-1'
    const {ModalVisiblemenu, getVisibleMenu}= ValuesHook()

    return(
        <nav className={`${ModalVisiblemenu} py-3 absolute transition-all duration-[3000ms] bg-black/50 w-full flex flex-row-reverse justify-between gap-5 py-0 px-2`}>
            <button onClick={()=> getVisibleMenu('-mt-90')} className="bg-white border border-none rounded-3xl text-black px-[.9em] py-2 h-max w-max">X</button>
            <ul className="flex w-30 flex-col bg-white py-3 px-2 gap-2 border rounded-[.5em] border-[#5d5d5d]">
                <li className={styleLi}>
                    Dashboard
                </li>
                <li className={styleLi}>
                    <Link href='/clientes'>Clientes</Link>
                </li>
                <li className={styleLi}>
                    <Link href="/ativos">Ativos</Link>
                </li>
                <li className={styleLi}>
                    Carteiras
                </li>
                    <li className={styleLi}>
                            Relatórios
                </li>
                <li className={styleLi}>
                    Configurações
                </li>
            </ul>
        </nav>
    )
}