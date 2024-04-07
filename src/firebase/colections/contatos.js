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

async function criar(contato) {
  await setDoc(doc(db, "contatos", contato.email), {
    ...contato,
    id: contato.email,
  });
}

async function editar(contatoId, novosDados) {
  const contatoDocRef = doc(db, "contatos", contatoId);
  await updateDoc(contatoDocRef, novosDados);
}

async function excluir(contatoId) {
  await deleteDoc(doc(db, "contatos", contatoId));

  return;
}


// Hook personalizado para manipular e listar contatos do banco
export default function useContatos() {
  const [contatos, setContatos] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "contatos"));
    onSnapshot(q, (querySnapshot) => {
      const allDocs = [];
      querySnapshot.forEach((doc) => {
        allDocs.push(doc.data());
      });
    //   console.log("Todos os docs: ", allDocs);
      setContatos(allDocs);
    });
  }, []);

  return {
    criar,
    excluir,
    contatos,
    editar,
  };
}