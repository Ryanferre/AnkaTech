'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface contextProps {
  ModalofListuser: string;
  ModalConfirmDataUser: string,
  ModalVisiblemenu: string,
  MensageInfor: ReactNode, //armazena a mensagem que apresentando falha (ou sucesso de login) e tentativa de cadastro de usuario sem altenticação
  getVisibleMenu: (value: string) => void,
  Getmensage: (value: ReactNode) => void,
  getsHiddenorFlex: (value: string) => void;
  getsHiddenorFlexDataUser: (value: string) => void
}

const context= createContext<contextProps | undefined>(undefined)

export function HookState({ children }: { children: ReactNode }){
    const [ModalofListuser, getsHiddenorFlex] = useState('hidden');
    const [ModalConfirmDataUser, getsHiddenorFlexDataUser]= useState('hidden')
    const [ModalVisiblemenu, getVisibleMenu]= useState('-mt-70')
    const [MensageInfor, Getmensage]= useState<ReactNode>(null)
    return (
        <context.Provider value={{ ModalofListuser, getsHiddenorFlex, ModalConfirmDataUser, getsHiddenorFlexDataUser, ModalVisiblemenu, getVisibleMenu, MensageInfor, Getmensage }}>
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