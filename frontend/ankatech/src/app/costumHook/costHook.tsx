'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface contextProps {
  ModalofListuser: string;
  ModalConfirmDataUser: string,
  ModalVisiblemenu: string,
  getVisibleMenu: (value: string) => void,
  getsHiddenorFlex: (value: string) => void;
  getsHiddenorFlexDataUser: (value: string) => void
}

const context= createContext<contextProps | undefined>(undefined)

export function HookState({ children }: { children: ReactNode }){
    const [ModalofListuser, getsHiddenorFlex] = useState('hidden');
    const [ModalConfirmDataUser, getsHiddenorFlexDataUser]= useState('hidden')
    const [ModalVisiblemenu, getVisibleMenu]= useState('-mt-40')
    return (
        <context.Provider value={{ ModalofListuser, getsHiddenorFlex, ModalConfirmDataUser, getsHiddenorFlexDataUser, ModalVisiblemenu, getVisibleMenu }}>
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