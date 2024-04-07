import { db } from "../db";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";

async function criar(oportunidade) {
  await setDoc(doc(db, "oportunidades", oportunidade.num), {
    ...oportunidade,
    id: oportunidade.num,
  });
}

async function editar(oportunidadeId, novosDados) {
  console.log("Editar client -> ", oportunidadeId);
  console.log("Data -> ", novosDados);
  // await setDoc(doc(db, "oportunidades", oportunidadeId), novosDados);
}

async function excluir(oportunidadeId) {
  await deleteDoc(doc(db, "oportunidades", oportunidadeId));

  return;
}


// Hook personalizado para manipular e listar oportunidades do banco
export default function useOportunidades() {
  const [oportunidades, setOportunidades] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "oportunidades"));
    onSnapshot(q, (querySnapshot) => {
      const allDocs = [];
      querySnapshot.forEach((doc) => {
        allDocs.push(doc.data());
      });
    //   console.log("Todos os docs: ", allDocs);
      setOportunidades(allDocs);
    });
  }, []);

  return {
    criar,
    excluir,
    oportunidades,
    editar,
  };
}