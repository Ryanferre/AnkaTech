import { ValuesHook } from "@/app/costumHook/costHook"
import { useEffect, useState } from "react"

const Mensage= ()=>{
    const {MensageInfor, Getmensage}= ValuesHook()

    const [visibleMensage, getMensage]= useState('hidden')


    useEffect(()=>{
        if(MensageInfor != null){
            getMensage('flex')
            const timer = setTimeout(() => {
                getMensage('hidden');
                Getmensage(null)
            }, 5000);

            return () => clearTimeout(timer);
        }

    }, [MensageInfor])
    
    return(
        <div className={`${visibleMensage} absolute ml-[24%] mt-[17%] lg:ml-[40%] lg:mt-[2.3%] w-max flex-row bg-white py-3 px-2 gap-2 border rounded-[.5em] border-[#5d5d5d]`}>
           {MensageInfor}
        </div>
    )
}

export default Mensage