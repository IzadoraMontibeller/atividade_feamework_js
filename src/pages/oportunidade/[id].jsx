import React, { useState, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/db";
import { useNavigate , useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import MEnu from "../../components/menu";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  fontSize: "16px",
}));

function EditarOportunidade() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [oportun, setOportun] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    if (id) {
      // Carregar os dados da oportunidade com base no ID
      const carregarDadosDaOportunidade = async () => {
        const oportunidadeRef = doc(db, "oportunidades", id);

        try {
          const docSnapshot = await getDoc(oportunidadeRef);
          if (docSnapshot.exists()) {
            const oportunidadeData = docSnapshot.data();

            setOportun(oportunidadeData.oportun || "");
            setTipo(oportunidadeData.tipo || "");
            setStatus(oportunidadeData.status || "");
            setMotivo(oportunidadeData.motivo || "");
          } else {
            console.error("Oportunidade não encontrada");
          }
        } catch (error) {
          console.error("Erro ao carregar dados da oportunidade:", error);
        }
      };

      carregarDadosDaOportunidade();
    }
  }, [id]);

  const salvarEdicao = async () => {
    try {
      const oportunidadeRef = doc(db, "oportunidades", id);

      await updateDoc(oportunidadeRef, {
        oportun,
        tipo,
        status,
        motivo,
      });

      console.log("Oportunidade atualizada com sucesso!");
      navigate("/Oportunidade");
    } catch (error) {
      console.error("Erro ao atualizar a oportunidade:", error);
    }
  };

  return (
    <>
      <MEnu />
      <Stack marginLeft={65} marginRight={65}>
        <Div>{"Editar Oportunidade"} {id}</Div>
      </Stack>
      <Stack spacing={3}>
        <TextareaAutosize
          id="oportun"
          placeholder="Oportunidade"
          value={oportun}
          onChange={(e) => setOportun(e.target.value)}
          className="textAreaStyle"
          minRows={3}
        />
        <FormControl variant="filled">
          <InputLabel id="tipo">Tipo de oportunidade</InputLabel>
          <Select
            label="Tipo de oportunidade"
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
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
        <Stack margin={3}>
          <Button
            variant="contained"
            onClick={salvarEdicao}
            sx={{ marginLeft: 75, marginRight: 75 }}
          >
            Salvar
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default EditarOportunidade;
