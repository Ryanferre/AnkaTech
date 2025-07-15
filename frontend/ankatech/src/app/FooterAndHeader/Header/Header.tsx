'use client'
import { FaUser } from 'react-icons/fa'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Menu from '../Menu/Menu';
import { ValuesHook } from '@/app/costumHook/costHook';

export default function Header (){
    const styleLi= 'text-[#5d5d5d] lg:text-1 sm:text-1'
    const pathname = usePathname()
    const [visibleIconLogin, setstate]= useState('flex')//icone com "!"
    const [visibleUser, setStateUser]= useState('hidden')//icone sem "!"

    const userId = Cookies.get('userId')//resgata o id do cookie

    useEffect(()=>{
      if(userId){//se o usuario logar, o icone com "!" desaparece
         setstate('hidden')
         setStateUser('flex')
      }else{//se nao logar, o icone com "!" permanece
         setstate('flex')
         setStateUser('hidden')
      }
    }, [pathname, userId])
   
    //verificar tamanho de tela
        const [width, setWidth] = useState(window.innerWidth)
        const {getVisibleMenu}= ValuesHook()
    
        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth)
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }, [])

    return(
      <>
       <Menu />
        <section className="px-5 lg:px-7 py-5 flex flex-row justify-between items-center">
            <Link href='/'>
               <img className="w-9 " src="https://i.postimg.cc/fb4wDq0W/grafico-de-crescimento-3.png" />
            </Link>

            <nav className="lg:flex md:hidden flex-row items-center gap-5 py-0 px-2" style={{display: width < 768 ? 'none' : 'flex'}}>
               <ul className="flex flex-row py-3 px-2 lg:gap-4 sm:gap-2 border rounded-2xl border-[#5d5d5d]">
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
            <div>
               <Link className={`${visibleUser}`} href={"/userInfor"}><FaUser size={25} color='#5d5d5d'/></Link>
               <span className={`${visibleIconLogin} flex-row items-center gap-2`}>
                  <button onClick={()=> getVisibleMenu('mt-0')} className="bg-black border border-none rounded-[.6rem] px-4 py-[.2em]" style={{display: width < 768 ? 'flex' : 'none'}}>Menu</button>
                  <div className='flex flex-row'>
                     <Link href={"/login"}><FaUser size={24} color='#5d5d5d'/></Link>
                     <p className='text-[#5d5d5d]'>!</p>
                  </div>
               </span>
            </div> 
        </section>
        </>
    )
}