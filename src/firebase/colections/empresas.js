import { db } from "../db";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  query,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { useState, useEffect } from "react";

async function criar(empresa) {
  await setDoc(doc(db, "empresas", empresa.cnpj), {
    ...empresa,
    id: empresa.cnpj,
  });
}

async function editar(empresaId, novosDados) {
  const empresaRef = doc(db, "empresas", empresaId);
  await updateDoc(empresaRef, novosDados);
}


async function excluir(empresaId) {
  await deleteDoc(doc(db, "empresas", empresaId));

  return;
}


// Hook personalizado para manipular e listar empresas do banco
export default function useEmpresas() {
  const [empresas, setEmpresas] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "empresas"));
    onSnapshot(q, (querySnapshot) => {
      const allDocs = [];
      querySnapshot.forEach((doc) => {
        allDocs.push(doc.data());
      });
    //   console.log("Todos os docs: ", allDocs);
      setEmpresas(allDocs);
    });
  }, []);

  return {
    criar,
    excluir,
    empresas,
    editar,
  };
}