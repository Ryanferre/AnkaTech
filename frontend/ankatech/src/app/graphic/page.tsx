'use client'
import { Suspense } from "react";
import GraphicComponent from "./Component/GraficComponent";

const GraphicCripto= ()=>{
    
    return(
        <Suspense fallback={<div>Carregando dados...</div>}>
          <GraphicComponent />
         </Suspense>
    )
}

export default GraphicCripto