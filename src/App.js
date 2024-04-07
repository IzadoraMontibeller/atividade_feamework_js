// routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contato from "./pages/Contatos.jsx";
import Oportunidade from "./pages/Oportunidade.jsx";
import Empresa from "./pages/Empresas.jsx";
import NovaEmpresa from "./pages/novaEmpresa.jsx";
import NovaOportunidade from "./pages/novaOportunidade.jsx";
import NovoContato from "./pages/novoContato.jsx";
import EditarOportunidade from "./pages/oportunidade/[id].jsx";
import EditarEmpresa from "./pages/empresas/[id].jsx";
import EditarContato from "./pages/contato/[id].jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Empresa />} />
        <Route path="/Empresa" element={<Empresa />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/Oportunidade" element={<Oportunidade />} />
        <Route path="/novaEmpresa" element={<NovaEmpresa />} />
        <Route path="/novaOportunidade" element={<NovaOportunidade />} />
        <Route path="/novoContato" element={<NovoContato />} />
        <Route path="/oportunidade/:id" element={<EditarOportunidade />} />
        <Route path="/empresas/:id" element={<EditarEmpresa />} />
        <Route path="/contato/:id" element={<EditarContato />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
