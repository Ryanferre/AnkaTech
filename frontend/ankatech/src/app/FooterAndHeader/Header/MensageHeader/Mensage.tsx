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
        <div className={`${visibleMensage} absolute w-max flex-row bg-white py-3 px-2 gap-2 border rounded-[.5em] border-[#5d5d5d]`} style={{marginLeft: '24%', marginTop: '17%'}}>
           {MensageInfor}
        </div>
    )
}

export default Mensage