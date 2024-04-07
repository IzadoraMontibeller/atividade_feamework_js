import MEnu from "../components/menu";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Menu,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import useEmpresas from "../firebase/colections/empresas";
import { styled } from "@mui/material/styles";
import * as XLSX from "xlsx";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { db } from "../firebase/db";
import { deleteDoc, doc } from "firebase/firestore";

function Empresas() {
  const navigate = useNavigate();
  const { empresas } = useEmpresas();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState("Todas"); // Adicione essa variável
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null); // Adicione esta linha

  const handleSearch = useCallback(() => {
    const filteredEmpresas = empresas.filter((empresa) => {
      const tipo = empresa.tipo.toLowerCase();
      return (
        (selectedTipo === "Todas" || tipo === selectedTipo.toLowerCase()) &&
        empresa.nomeEmpresa.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredEmpresas(filteredEmpresas);
  }, [empresas, selectedTipo, searchQuery]);

  useEffect(() => {
    if (empresas) {
      handleSearch();
    }
  }, [empresas, selectedTipo, handleSearch]);

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  const handleFilter = (tipo) => {
    setSelectedTipo(tipo); // Defina o tipo selecionado
    handleFilterMenuClose(); // Feche o menu
    handleSearch(); // Aplique o filtro
  };

  const resetFilter = () => {
    setSelectedTipo("Todas");
    handleSearch(); // Atualize as oportunidades com base no status selecionado
    handleFilterMenuClose(); // Feche o menu
  };

  const onClickNovo = () => {
    navigate("/novaEmpresa");
  };

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));

  function exportToExcel(data) {
    if (data && data.length > 0) {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Empresas");

      XLSX.writeFile(wb, "empresas.xlsx");
    } else {
      console.error("Os dados não estão no formato correto");
    }
  }

  const handleExcluirEmpresa = async (id) => {
    try {
      await deleteDoc(doc(db, "empresas", id));
      // Remove a empresa da lista de empresas filtradas
      setFilteredEmpresas(
        filteredEmpresas.filter((empresa) => empresa.id !== id)
      );
      console.log("Empresa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir empresa:", error);
    }
  };

  return (
    <div>
      <header>
        <MEnu />
      </header>
      <>
        <Stack
          display={"flex"}
          direction={"row"}
          justifyContent={"space-between"}
          margin={2}
        >
          <Stack display={"flex"} direction={"row"}>
            <IconButton aria-label="filter" onClick={handleFilterMenuOpen}>
              <FilterListIcon color="primary" fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={filterMenuAnchor}
              open={Boolean(filterMenuAnchor)}
              onClose={handleFilterMenuClose}
            >
              <MenuItem onClick={() => handleFilter("Cliente")}>
                Filtar por Cliente
              </MenuItem>
              <MenuItem onClick={() => handleFilter("Fornecedor")}>
                Filtar por Fornecedor
              </MenuItem>
              <MenuItem onClick={() => handleFilter("Canal de Venda")}>
                Filtar por Canal de Venda
              </MenuItem>
              <MenuItem onClick={resetFilter}>Limpar Filtros</MenuItem>
            </Menu>

            <FormControl
              size="small"
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Buscar
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-Buscar"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </FormControl>
          </Stack>
          <Div>{"Empresas Cadastradas"}</Div>
          <Stack display={"flex"} flexDirection={"row"}>
            <Button onClick={onClickNovo} variant="contained">
              Adicionar Empresa
            </Button>
            <Button
              sx={{ marginLeft: 3 }}
              variant="contained"
              onClick={() => exportToExcel(empresas)}
            >
              Excel
            </Button>
          </Stack>
        </Stack>
        {filteredEmpresas && filteredEmpresas.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome da Empresa</TableCell>
                  <TableCell>CNPJ</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Seguimento</TableCell>
                  <TableCell>Data de Cadastro</TableCell>
                  <TableCell>Solicitante</TableCell>
                  <TableCell>Cidade</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Edição</TableCell>
                  <TableCell>Exclusão</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmpresas &&
                  filteredEmpresas.map((empresa) => (
                    <React.Fragment key={empresa.id}>
                      <TableRow>
                        <TableCell>{empresa.nomeEmpresa}</TableCell>
                        <TableCell>{empresa.cnpj}</TableCell>
                        <TableCell>{empresa.tipo}</TableCell>
                        <TableCell>{empresa.seguimento}</TableCell>
                        <TableCell>{empresa.dataCadastro}</TableCell>
                        <TableCell>{empresa.solicitante}</TableCell>
                        <TableCell>{empresa.cidade}</TableCell>
                        <TableCell>{empresa.estado}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={() => {
                              navigate(`/empresas/${empresa.id}`);
                            }}
                          >
                            editar
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={() => handleExcluirEmpresa(empresa.id)}
                          >
                            Excluir
                          </Button>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>Nenhum contato encontrado.</Typography>
        )}
      </>
    </div>
  );
}

export default Empresas;
