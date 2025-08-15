'use client'
import { Suspense } from "react"
import SelectAtivosComponent from "./Component/SelectComponent"

export default function selectAtivos(){
    
    return(
        <Suspense fallback={<div>Carregando...</div>}>
         <SelectAtivosComponent />
        </Suspense>
    )
}