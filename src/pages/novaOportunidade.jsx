import {
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useOportunidades from "../firebase/colections/oportunidades";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import useEmpresas from "../firebase/colections/empresas"; // Importe o hook para empresas
import { styled } from "@mui/material/styles";
import MEnu from "../components/menu";

export default function NovaOportunidade() {
  const navigate = useNavigate();
  const { criar, oportunidades } = useOportunidades();
  const [oportunidadeData, setOportunidadeData] = useState({
    empresa: "",
    oportun: "",
    tipo: "",
    status: "",
    motivo: "",
    dataCadastro: "",
  });

  const { empresas } = useEmpresas();

  const proximoNumeroOportunidade = useCallback(() => {
    if (oportunidades) {
      const numerosOportunidades = oportunidades.map((oportunidade) =>
        parseInt(oportunidade.num, 10)
      );
      const maxNumeroOportunidade = Math.max(...numerosOportunidades, 0);
      return (maxNumeroOportunidade + 1).toString().padStart(3, "0");
    } else {
      return "001";
    }
  }, [oportunidades]);

  useEffect(() => {
    setOportunidadeData((prevData) => ({
      ...prevData,
      num: proximoNumeroOportunidade(),
    }));
    
    
  }, [proximoNumeroOportunidade, oportunidades]);

  const [dataCadastro, setDataCadastro] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    setDataCadastro(formattedDate);
  }, []);

  const cadastrarNovaOportunidade = async () => {
    if (oportunidadeData.empresa) {
      // Adicione o campo dataCadastro ao objeto oportunidadeData
      oportunidadeData.dataCadastro = dataCadastro;

      // Chame a função criar apenas uma vez com os dados completos
      await criar(oportunidadeData);

      setOportunidadeData({
        num: proximoNumeroOportunidade(),
        empresa: "",
        oportun: "",
        tipo: "",
        status: "",
        motivo: "",
        dataCadastro: "",
      });
      navigate("/Oportunidade");
    } else {
      alert("Por favor, selecione uma empresa.");
    }
  };

  const handleEmpresaChange = (event) => {
    // Atualize o estado de "empresa" com o valor selecionado no Select
    setOportunidadeData((prevData) => ({
      ...prevData,
      empresa: event.target.value,
    }));
  };

  // Função para atualizar o estado local com os valores dos campos de texto
  const handleTextFieldChange = (event) => {
    const { id, value } = event.target;

    // Trate o campo "empresa" de forma especial
    if (id === "empresa") {
      setOportunidadeData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else {
      setOportunidadeData((prevData) => ({
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

  const handleTipoChange = (event) => {
    setOportunidadeData((prevData) => ({
      ...prevData,
      tipo: event.target.value,
    }));
  };

  const handleStatusChange = (event) => {
    setOportunidadeData((prevData) => ({
      ...prevData,
      status: event.target.value,
    }));
  };

  const handleMotivoChange = (event) => {
    setOportunidadeData((prevData) => ({
      ...prevData,
      motivo: event.target.value,
    }));
  };

  return (
    <>
      <MEnu />
      <Stack marginLeft={65} marginRight={65}>
        <Div>{"Cadastrar Oportunidade"}</Div>
      </Stack>
      <Stack spacing={3}>
        <FormControl variant="filled">
          <InputLabel id="empresa">Empresa</InputLabel>
          <Select
            labelId="empresa"
            id="empresa"
            value={oportunidadeData.empresa}
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
  

        <FormControl variant="filled">
          <InputLabel id="tipo">Tipo de oportunidade</InputLabel>
          <Select
            label="Tipo de oportunidade"
            id="tipo"
            value={oportunidadeData.tipo}
            onChange={handleTipoChange}
          >
            <MenuItem value={"Hardware"}>Hardware</MenuItem>
            <MenuItem value={"Solução"}>Solução</MenuItem>
            <MenuItem value={"Serviço"}>Serviço</MenuItem>
            <MenuItem value={"Consultoria"}>Consultoria</MenuItem>
            <MenuItem value={"Revenda"}>Revenda</MenuItem>
            <MenuItem value={"Indicação"}>Indicação</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel id="status">Status</InputLabel>
          <Select
            label="Status"
            id="status"
            value={oportunidadeData.status}
            onChange={handleStatusChange}
          >
            <MenuItem value={"Abertura"}>Abertura</MenuItem>
            <MenuItem value={"Andamento"}>Andamento</MenuItem>
            <MenuItem value={"Futuro"}>Futuro</MenuItem>
            <MenuItem value={"Finalizada"}>Finalizada</MenuItem>
            <MenuItem value={"Cancelada"}>Cancelada</MenuItem>
            <MenuItem value={"Pausa"}>Pausa</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel id="motivo">Motivo</InputLabel>
          <Select
            label="Motivo"
            id="motivo"
            value={oportunidadeData.motivo}
            onChange={handleMotivoChange}
          >
            <MenuItem value={"Oportunidade mapeada"}>
              Oportunidade mapeada
            </MenuItem>
            <MenuItem value={"Oportunidade Real"}>Oportunidade Real</MenuItem>
            <MenuItem value={"Solicitação empresa"}>
              Solicitação empresa
            </MenuItem>
            <MenuItem value={"Venda"}>Venda</MenuItem>
            <MenuItem value={"Escopo não aprovado"}>
              Escopo não aprovado
            </MenuItem>
            <MenuItem value={"Falta de interação"}>Falta de interação</MenuItem>
            <MenuItem value={"Outras prioridades"}>Outras prioridades</MenuItem>
            <MenuItem value={"Reprogramado"}>Reprogramado</MenuItem>
          </Select>
        </FormControl>
        <TextareaAutosize
          id="oportun"
          placeholder="Oportunidade"
          value={oportunidadeData.oportun}
          onChange={handleTextFieldChange}
          className="textAreaStyle"
          minRows={3}
        />
        <Box  className="textAreaStyle" >
          <Typography color={"grey"}>Data de Cadastro: {dataCadastro}</Typography>
        </Box>
      </Stack>
      <Stack margin={3} marginLeft={75} marginRight={75}>
        <Button
          onClick={() => {
            cadastrarNovaOportunidade();
            
          }}
          variant="contained"
        >
          Salvar
        </Button>
      </Stack>
    </>
  );
}