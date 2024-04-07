import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/db";
import { useNavigate , useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import useEmpresas from "../../firebase/colections/empresas"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import MEnu from "../../components/menu";

function EditarContato() {
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [telefoneFixo, setTelefoneFixo] = useState("");
  const [telefoneCelular, setTelefoneCelular] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [cargo, setCargo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [observacao, setObservacao] = useState("");

  const { empresas } = useEmpresas();

  useEffect(() => {
    if (id) {
      // Carregar os dados do contato com base no ID
      const carregarDadosDoContato = async () => {
        const contatoRef = doc(db, "contatos", id);

        try {
          const docSnapshot = await getDoc(contatoRef);
          if (docSnapshot.exists()) {
            const contatoData = docSnapshot.data();

            // Defina os valores iniciais dos campos "Link Comercial" e "Link Atendimento"
            setTelefoneFixo(contatoData.telefoneFixo || "");
            setTelefoneCelular(contatoData.telefoneCelular || "");
            setDepartamento(contatoData.departamento || "");
            setCargo(contatoData.cargo || "");
            setEmpresa(contatoData.empresa || "");
            setLinkedin(contatoData.linkedin || "");
            setObservacao(contatoData.observacao || "");
          } else {
            console.error("Oportunidade não encontrada");
          }
        } catch (error) {
          console.error("Erro ao carregar dados da oportunidade:", error);
        }
      };

      carregarDadosDoContato();
    }
  }, [id]);

  const salvarEdicao = async () => {
    try {
      const contatoRef = doc(db, "contatos", id);

      await updateDoc(contatoRef, {
        telefoneFixo,
        telefoneCelular,
        departamento,
        cargo,
        empresa,
        linkedin,
        observacao,
      });

      console.log("Contato atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a oportunidade:", error);
    }
  };

  const onClickNovo = async () => {
    navigate("/Contato");
  };

  return (
    <>
    <header>
    <MEnu/>
    </header>
      <Stack marginLeft={50} marginRight={50}>
        <Div>{"Editar Contato"} {id}</Div>
      </Stack>
      <Stack spacing={3}>
        <TextField
          id="telefoneFixo"
          label="Telefone Fixo"
          value={telefoneFixo}
          onChange={(e) => setTelefoneFixo(e.target.value)}
          variant="filled"
        />
        <TextField
          id="telefoneCelular"
          label="Telefone Celular"
          value={telefoneCelular}
          onChange={(e) => setTelefoneCelular(e.target.value)}
          variant="filled"
        />
        <TextField
          id="departamento"
          label="Departamento"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
          variant="filled"
        />
        <TextField
          id="cargo"
          label="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          variant="filled"
        />
        <FormControl variant="filled">
          <InputLabel id="empresa">Empresa</InputLabel>
          <Select
            labelId="empresa"
            id="empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
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
          id="linkedin"
          label="Linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          variant="filled"
        />
        <TextareaAutosize
          id="observacao"
          placeholder="Observação"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          className="textAreaStyle"
          minRows={3}
        />
        <Stack margin={3}>
          <Button variant="contained" onClick={() => {
            salvarEdicao();
            onClickNovo();
          }} sx={{ marginLeft: 75, marginRight: 75 }}>
            Salvar
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default EditarContato;