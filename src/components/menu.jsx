import React from "react";
import { Link } from "react-router-dom";
import {  Button, Stack } from "@mui/material";

function menu() {
  
  return (
    <Stack>
      <Stack
        display={"flex"}
        direction="row"
        spacing={4}
        margin={2}
        marginTop={3}
        justifyContent={"space-evenly"}
        marginLeft={10}
      >
        <Link to="/Empresa"><Button variant="contained" size="large">Empresas</Button></Link>
        <Link to="/Contato"><Button variant="contained" size="large">Contatos</Button></Link>
         <Link to="/Oportunidade"><Button variant="contained" size="large">Oportunidades</Button></Link>
      </Stack>
    </Stack>
  );
}

export default menu;
