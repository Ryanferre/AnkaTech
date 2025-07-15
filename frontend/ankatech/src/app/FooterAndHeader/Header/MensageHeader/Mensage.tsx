import { ValuesHook } from "@/app/costumHook/costHook"
import { useEffect, useState } from "react"

const Mensage= ()=>{
    const {MensageInfor, Getmensage}= ValuesHook()

    const [visibleMensage, getMensage]= useState('hidden')


    useEffect(()=>{
        if(MensageInfor != ''){
            getMensage('flex')
            const timer = setTimeout(() => {
                getMensage('hidden');
                Getmensage('')
            }, 5000);

            return () => clearTimeout(timer);
        }

    }, [MensageInfor])
    
    return(
        <div className={`${visibleMensage} absolute mx-42 mt-5 w-max flex-row bg-white py-3 px-2 gap-2 border rounded-[.5em] border-[#5d5d5d]`}>
            <p className="text-black">{MensageInfor}</p>
        </div>
    )
}

export default Mensage