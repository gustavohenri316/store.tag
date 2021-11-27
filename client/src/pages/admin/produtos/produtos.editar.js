import React,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';

import { useParams } from 'react-router-dom';
import { Description } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  title: {flexGrow: 1,},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(2),paddingBottom: theme.spacing(4),},
  paper: {padding: 35,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'},
  btnSuccess:{ backgroundColor:"green",color:"#fff","&:hover":{backgroundColor:"#12b912"}}
}));

export default function ProdutoEditar() {
  const classes = useStyles();

  const [nome , setNome] = useState('');
  const [descricao , setDescription] = useState('');
  const [qtd , setQtd] = useState('');
  const [preco , setPreco] = useState('');

  const { idProduto } = useParams();


  useEffect(() => {
    async function getUsuario(){
      var response = await api.get('/api/produtos.details/'+idProduto);
      
      setNome(response.data.nome_usuario);
      setDescricao(response.data.descricao_produto);
      setQtd(response.data.qtd_produto);
      setPreco(response.data.preco_produto);
    }

    getUsuario();
  },[])

  async function handleSubmit(){

    const data = {
      nome_produto:nome,
      descricao_produto:descricao,
      qtd_produto:qtd,
      preco_produto:preco,
    _id:idProduto}

      if(nome!==''&&descricao!==''&&qtd!==''&&preco!==''){
        const response = await api.put('/api/produtos/',data);

        if(response.status===200){
          window.location.href='/admin/produtos'
        }else{
          alert('Erro ao atualizar o usuário!');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }

     

  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'USUÁRIOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10,marginRight:5}} variant="contained" href={'/admin/usuarios'}><ArrowBackIcon /> Voltar</Button>
            <Button style={{marginBottom:10}} variant="contained" color="primary" href={'/admin/usuarios/cadastrar'}>
              <AddIcon />
              Cadastrar
            </Button>
              <Paper className={classes.paper}>
                <h2>Atualização de Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome completo"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="description"
                      name="description"
                      label="Descrição"
                      fullWidth
                      autoComplete="description"
                      value={descricao}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                
                  <Grid item xs={12} sm={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="labelTipo">Tipo</InputLabel>
                    <Select
                      labelId="Quantidade"
                      id="number"
                      value={qtd}
                      onChange={e => setTipo(e.target.value)}
                    >
                      <MenuItem value={1}>Administrador</MenuItem>
                      <MenuItem value={2}>Gerente</MenuItem>
                      <MenuItem value={3}>Funcionário</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      required
                      id="preco"
                      name="preco"
                      label="preco"
                      fullWidth
                      autoComplete="number"
                      value={preco}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button variant="contained"  onClick={handleSubmit} className={classes.btnSuccess}>
                    <SaveIcon /> Salvar
                  </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}