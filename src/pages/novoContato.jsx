import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import useContatos from "../firebase/colections/contatos";
import useEmpresas from "../firebase/colections/empresas";
import { styled } from "@mui/material/styles";
import MEnu from "../components/menu";

export default function NovoContato() {
    const navigate = useNavigate();
  const { criar } = useContatos();
  const [contatoData, setContatoData] = useState({
    nome: "",
    email: "",
    telefoneFixo: "",
    telefoneCelular: "",
    departamento: "",
    cargo: "",
    empresa: "",
    aniversario: "",
    linkedin: "",
  });

  const { empresas } = useEmpresas();

 const cadastrarNovoContato = async () => {
  // Certifique-se de que o campo "empresa" não esteja vazio antes de criar o contato
  if (contatoData.empresa) {
    await criar(contatoData); // Criar a função criar que deve retornar true em caso de sucesso

    setContatoData({
      nome: "",
      email: "",
      telefoneFixo: "",
      telefoneCelular: "",
      departamento: "",
      cargo: "",
      empresa: "",
      aniversario: "",
      linkedin: "",
      
     
    }); navigate("/Contato");
  } else {
    // Exiba uma mensagem de erro ou lógica apropriada se o campo "empresa" estiver vazio
    alert("Por favor, selecione uma empresa.");
  }
};

  const handleEmpresaChange = (event) => {
    // Atualize o estado de "empresa" com o valor selecionado no Select
    setContatoData((prevData) => ({
      ...prevData,
      empresa: event.target.value,
    }));
  };

  // Função para atualizar o estado local com os valores dos campos de texto
  const handleTextFieldChange = (event) => {
    const { id, value } = event.target;

    // Trate o campo "empresa" de forma especial
    if (id === "empresa") {
      setContatoData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else {
      setContatoData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));

  const maskDate = (value) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Adiciona as barras de formatação
    if (numericValue.length <= 2) {
      return numericValue;
    } else if (numericValue.length <= 4) {
      return `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
    } else {
      return `${numericValue.slice(0, 2)}/${numericValue.slice(
        2,
        4
      )}/${numericValue.slice(4, 8)}`;
    }
  };

  const handleDateChange = (event) => {
    const { id, value } = event.target;
    const formattedDate = maskDate(value);
    setContatoData((prevData) => ({
      ...prevData,
      [id]: formattedDate,
    }));
  };

  // Função para mascarar o telefone fixo
  const maskTelefoneFixo = (value) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Aplica a máscara
    return numericValue.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  };

  // Função para mascarar o telefone celular
  const maskTelefoneCelular = (value) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Aplica a máscara
    if (numericValue.length <= 10) {
      return numericValue.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else {
      return numericValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
  };

  // Atualize o manipulador de eventos para os campos de telefone fixo e telefone celular
  const handleTelefoneFixoChange = (event) => {
    const { id, value } = event.target;
    const formattedTelefoneFixo = maskTelefoneFixo(value);
    setContatoData((prevData) => ({
      ...prevData,
      [id]: formattedTelefoneFixo,
    }));
  };

  const handleTelefoneCelularChange = (event) => {
    const { id, value } = event.target;
    const formattedTelefoneCelular = maskTelefoneCelular(value);
    setContatoData((prevData) => ({
      ...prevData,
      [id]: formattedTelefoneCelular,
    }));
  };

  

  return (
    <>
    <header>
      <MEnu />
      </header>
      <Stack marginLeft={70} marginRight={70}>
        <Div>{"Cadastrar Contato"}</Div>
      </Stack>
      <Stack spacing={3}>
        <TextField
          id="nome"
          label="Nome"
          value={contatoData.nome}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="email"
          label="E-mail"
          value={contatoData.email}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="telefoneFixo"
          label="Telefone Fixo"
          value={contatoData.telefoneFixo}
          onChange={handleTelefoneFixoChange}
          variant="filled"
        />
        <TextField
          id="telefoneCelular"
          label="Telefone Celular"
          value={contatoData.telefoneCelular}
          onChange={handleTelefoneCelularChange}
          variant="filled"
        />
        <TextField
          id="departamento"
          label="Departamento"
          value={contatoData.departamento}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="cargo"
          label="Cargo"
          value={contatoData.cargo}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <FormControl variant="filled">
          <InputLabel id="empresa">Empresa</InputLabel>
          <Select
            labelId="empresa"
            id="empresa"
            value={contatoData.empresa}
            onChange={handleEmpresaChange} // Use um manipulador de eventos separado
          >
            <MenuItem value="">Selecione uma empresa</MenuItem>
            {empresas &&
              empresas.map((empresa) => (
                <MenuItem key={empresa.id} value={empresa.nomeEmpresa}>
                  {empresa.nomeEmpresa}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          id="aniversario"
          label="Aniversario"
          value={contatoData.aniversario}
          onChange={handleDateChange}
          variant="filled"
        />
        <TextField
          id="linkedin"
          label="Linkedin"
          value={contatoData.linkedin}
          onChange={handleTextFieldChange}
          variant="filled"
        />
      </Stack>
      <Stack margin={3} marginLeft={75} marginRight={75}>
        <Button onClick={() => { cadastrarNovoContato() }} variant="contained">
          Salvar
        </Button>
      </Stack>
    </>
  );
}