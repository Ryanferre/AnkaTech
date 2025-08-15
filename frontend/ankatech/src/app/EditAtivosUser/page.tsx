'use client'
import EditativoComponent from './Component/EditComponent'
import { Suspense } from 'react'

export default function EditativoUser(){
    return(
    <Suspense fallback={<div>Carregando dados...</div>}>
      <EditativoComponent />
    </Suspense>
    )
}