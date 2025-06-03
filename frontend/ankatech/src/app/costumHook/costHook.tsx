'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface contextProps {
  iconuser: boolean;
  getstateuser: (value: boolean) => void;
}

const context= createContext<contextProps | undefined>(undefined)

export function HookState({ children }: { children: ReactNode }){
    const [iconuser, getstateuser] = useState(false);
    return (
        <context.Provider value={{ iconuser, getstateuser }}>
          {children}
        </context.Provider>
    );
}

export const ValuesHook= (): contextProps=>{
    const contextimportincomponent= useContext(context)
    if (contextimportincomponent === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }else{
    return contextimportincomponent
  }
}