'use client'
import Link from 'next/link';
import { ValuesHook } from '@/app/costumHook/costHook';

export default function Menu(){
    const styleLi= 'text-[#5d5d5d] lg:text-1 sm:text-1'
    const {ModalVisiblemenu, getVisibleMenu}= ValuesHook()

    return(
        <nav className={`${ModalVisiblemenu} py-3 absolute transition-all duration-[3000ms] w-full flex flex-col justify-between gap-7 px-5`}>
            <button onClick={()=> getVisibleMenu('-mt-60')} className="bg-white border border-[#5d5d5d] mt-[.7rem] text-black rounded-[.6rem] px-8 py-[.2em] h-max w-max" style={{marginLeft: '70%'}}>X</button>
            <ul className="grid grid-cols-2 w-80 mx-auto bg-white py-3 items-center px-5 gap-2 border rounded-[.5em] border-[#5d5d5d]">
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