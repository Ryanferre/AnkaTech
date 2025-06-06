'use client'
import { FaUser } from 'react-icons/fa'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header (){
    const styleLi= 'text-[#5d5d5d]'
    const pathname = usePathname()
    const [visibleIconLogin, setstate]= useState('flex')//icone com "!"
    const [visibleUser, setStateUser]= useState('hidden')//icone sem "!"

    const userId = Cookies.get('userId')//resgata o id do cookie

    useEffect(()=>{
      console.log(userId)
      if(userId){//se o usuario logar, o icone com "!" desaparece
         setstate('hidden')
         setStateUser('flex')
      }else{//se nao logar, o icone com "!" permanece
         setstate('flex')
         setStateUser('hidden')
      }
    }, [pathname, userId])

    return(
        <section className="px-7 py-5 flex flex-row justify-between items-center">
            <Link href='/'>
               <img className="w-9 " src="https://i.postimg.cc/fb4wDq0W/grafico-de-crescimento-3.png" />
            </Link>

            <div className='flex flex-row items-center gap-5 py-0 px-2'>
               <ul className="flex flex-row py-3 px-2 gap-4 border rounded-2xl border-[#5d5d5d]">
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
            </div>
            <div>
               <Link className={`${visibleUser}`} href={"/userInfor"}><FaUser size={25} color='#5d5d5d'/></Link>
               <span className={`${visibleIconLogin} flex-row items-center`}>
                  <Link href={"/login"}><FaUser size={25} color='#5d5d5d'/></Link>
                  <p className='text-[#5d5d5d]'>!</p>
               </span>
            </div>
        </section>
    )
}