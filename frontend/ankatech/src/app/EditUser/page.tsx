import { Suspense } from "react";
import EditUser from "./Compo/EditUser";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando usuário...</div>}>
      <EditUser />
    </Suspense>
  );
}