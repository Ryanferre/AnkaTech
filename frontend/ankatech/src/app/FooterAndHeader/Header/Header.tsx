import { FaUser } from 'react-icons/fa'
import Link from 'next/link';

export default function Header (){
    const styleLi= 'text-[#5d5d5d]'
    return(
        <section className="px-7 py-5 flex flex-row justify-between items-center">
            <img className="w-9 " src="https://i.postimg.cc/fb4wDq0W/grafico-de-crescimento-3.png" />

            <div className='flex flex-row items-center gap-5 py-0 px-2'>
               <ul className="flex flex-row py-3 px-2 gap-4 border rounded-2xl border-[#5d5d5d]">
                 <li className={styleLi}>
                   Dashboard
                 </li>
                 <li className={styleLi}>
                    Clientes
                 </li>
                 <li className={styleLi}>
                    Ativos
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
            </div>
            <Link href={"/login"}><FaUser size={25} color='#5d5d5d'/></Link>
        </section>
    )
}