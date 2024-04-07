import MEnu from "../components/menu";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TextField,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import useEmpresas from "../firebase/colections/empresas";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function NovaEmpresa() {
  const navigate = useNavigate();
  const { criar } = useEmpresas();
  const [empresaData, setEmpresaData] = useState({
    nomeEmpresa: "",
    cnpj: "",
    cidade: "",
    estado: "",
    tipo: "",
    seguimento: "",
    solicitante: "",
    dataCadastro: "",
  });

  const [dataCadastro, setDataCadastro] = useState("");
  const [isOutroSelecionado, setIsOutroSelecionado] = useState(false);
  const [outroSeguimento, setOutroSeguimento] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    setDataCadastro(formattedDate);
  }, []);

  const cadastrarNovaEmpresa = async () => {
    empresaData.dataCadastro = dataCadastro;

    if (isOutroSelecionado && outroSeguimento.trim() !== "") {
      empresaData.seguimento = outroSeguimento;
    }

    await criar(empresaData);
    setEmpresaData({
      nomeEmpresa: "",
      cnpj: "",
      cidade: "",
      estado: "",
      tipo: "",
      seguimento: "",
      solicitante: "",
      dataCadastro: "",
    });
    setIsOutroSelecionado(false);
    setOutroSeguimento("");
  };

  // Função para atualizar o estado local com os valores dos campos de texto
  const handleTextFieldChange = (event) => {
    const { id, value } = event.target;
    setEmpresaData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleSeguimentoChange = (event) => {
    const value = event.target.value;
    setEmpresaData((prevData) => ({
      ...prevData,
      seguimento: value,
    }));

    // Verificar se "Outro" foi selecionado
    if (value === "Outro") {
      setIsOutroSelecionado(true);
    } else {
      setIsOutroSelecionado(false);
      // Limpar o valor de outroSeguimento se não for "Outro"
      setOutroSeguimento("");
    }
  };

  const handleTipoChange = (event) => {
    setEmpresaData((prevData) => ({
      ...prevData,
      tipo: event.target.value,
    }));
  };
  const handleCnpjChange = (event) => {
    const cnpjValue = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    let formattedCnpj = "";

    if (cnpjValue.length <= 14) {
      const cnpjParts = [];
      cnpjParts.push(cnpjValue.slice(0, 2));
      if (cnpjValue.length >= 3) cnpjParts.push(cnpjValue.slice(2, 5));
      if (cnpjValue.length >= 6) cnpjParts.push(cnpjValue.slice(5, 8));
      if (cnpjValue.length >= 9) cnpjParts.push(cnpjValue.slice(8, 12));
      if (cnpjValue.length >= 13) cnpjParts.push(cnpjValue.slice(12, 14));

      formattedCnpj = cnpjParts.join(".");

      if (cnpjValue.length > 14) {
        // Caso o usuário digite mais do que 14 dígitos, você pode considerar um limite.
        formattedCnpj = formattedCnpj.substr(0, 16);
      }
    }

    setEmpresaData({ ...empresaData, cnpj: formattedCnpj });
  };

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));

  const onClickNovo = async () => {
    navigate("/Empresa");
  };


  return (
    <>
      <MEnu />
      <Stack marginLeft={70} marginRight={70}>
        <Div>{"Cadastrar Empresa"}</Div>
      </Stack>
      <Stack spacing={3}>
        <TextField
          id="nomeEmpresa"
          label="Nome da Empresa"
          value={empresaData.nomeEmpresa}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="cnpj"
          label="CNPJ"
          value={empresaData.cnpj}
          onChange={handleCnpjChange}
          variant="filled"
        />
        <TextField
          id="cidade"
          label="Cidade"
          value={empresaData.cidade}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="estado"
          label="Estado"
          value={empresaData.estado}
          onChange={handleTextFieldChange}
          variant="filled"
        />

        <FormControl variant="filled">
          <InputLabel id="tipo">Tipo</InputLabel>
          <Select
            label="Tipo"
            id="tipo"
            value={empresaData.tipo}
            onChange={handleTipoChange}
          >
            <MenuItem value={"Cliente"}>Cliente</MenuItem>
            <MenuItem value={"Fornecedor"}>Fornecedor</MenuItem>
            <MenuItem value={"Canal de Venda"}>Canal de Venda</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled">
          <InputLabel id="seguimento">Seguimento</InputLabel>
          <Select
            id="seguimento"
            label="Seguimento"
            value={empresaData.seguimento}
            onChange={handleSeguimentoChange}
          >
            <MenuItem value={"Industria"}>Industria</MenuItem>
            <MenuItem value={"Varejo"}>Varejo</MenuItem>
            <MenuItem value={"Logística"}>Logística</MenuItem>
            <MenuItem value={"Saúde"}>Saúde</MenuItem>
            <MenuItem value={"Pequeno Comercio"}>Pequeno Comercio</MenuItem>
            <MenuItem value={"Pequena Industria"}>Pequena Industria</MenuItem>
            <MenuItem value={"Serviços"}>Serviços</MenuItem>
            <MenuItem value={"Fornecedor"}>Entretenimento e parques</MenuItem>
            <MenuItem value={"Entretenimento e parques"}>Alimentação</MenuItem>
            <MenuItem value={"Serviço Publico"}>Serviço Publico</MenuItem>
            <MenuItem value={"Revenda"}>Revenda</MenuItem>
            <MenuItem value={"Distribuidor"}>Distribuidor</MenuItem>
            <MenuItem value={"Outro"}>Outro</MenuItem>
          </Select>
        </FormControl>
{/* Campo de texto para "Outro" */
isOutroSelecionado && (
  <TextField
    id="outroSeguimento"
    label="Outro Seguimento"
    value={outroSeguimento}
    onChange={(e) => setOutroSeguimento(e.target.value)}
    variant="filled"
  />
)}

        <TextField
          id="solicitante"
          label="Solicitante"
          value={empresaData.solicitante}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <Box className="textAreaStyle">
          <Typography color={"grey"}>
            Data de Cadastro: {dataCadastro}
          </Typography>
        </Box>
      </Stack>
      <Stack margin={3} marginLeft={75} marginRight={75}>
        <Button
          onClick={() => {
            cadastrarNovaEmpresa();
            onClickNovo();
          }}
          variant="contained"
        >
          Salvar
        </Button>
      </Stack>
    </>
  );
}