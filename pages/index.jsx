import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';

const startData = async () => {
  const response = await fetch('http://localhost:3333/');
  const data = await response.json();
  console.log(data);
  return data;
};
const Home = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoLancamento, setAnoLancamento] = useState(null);
  const [editora, setEditora] = useState('');
  const [editId, setEditId] = useState('');

  useEffect(() => {
    startData().then((data) => setData(processResponseData(data)));
  }, []);

  const processResponseData = (data) => {
    return data.map((item) => {
      return {
        _id: item._id,
        titulo: item.titulo,
        autor: item.autor,
        anoLancamento: item.ano_lancamento,
        editora: item.editora,
      };
    });
  };

  const resetForm = () => {
    setTitulo('');
    setAutor('');
    setAnoLancamento(null);
    setEditora('');
    setEditId('');
  };

  const createBook = async () => {
    const response = await fetch('http://localhost:3333/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo,
        autor,
        ano_lancamento: anoLancamento,
        editora,
      }),
    });
    const resData = await response.json();
    console.log(resData);
    startData().then((data) => setData(processResponseData(data)));
    setOpenModal(false);
  };

  const editBook = async () => {
    const response = await fetch(`http://localhost:3333/${editId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo,
        autor,
        ano_lancamento: anoLancamento,
        editora,
      }),
    });
    const resData = await response.json();
    console.log(resData);
    startData().then((data) => setData(processResponseData(data)));
    setOpenModal(false);
  };

  const startCreate = () => {
    setModalMode('create');
    resetForm();
    setOpenModal(true);
  };

  const startEdit = (item) => {
    setModalMode('edit');
    setOpenModal(true);
    setTitulo(item.titulo);
    setAutor(item.autor);
    setAnoLancamento(parseInt(item.anoLancamento));
    setEditora(item.editora);
    setEditId(item._id);
  };

  const solveModal = () => {
    if (modalMode === 'edit') {
      editBook();
    } else {
      createBook();
    }
  };

  return (
    <div>
      <Container sx={{ paddingTop: 4 }}>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Título</TableCell>
                    <TableCell align='left'>Autor</TableCell>
                    <TableCell align='left'>Ano de lançamento</TableCell>
                    <TableCell align='left'>Editora</TableCell>
                    <TableCell align='right'>Editar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}>
                      <TableCell component='th' scope='row'>
                        {row.titulo}
                      </TableCell>
                      <TableCell align='left'>{row.autor}</TableCell>
                      <TableCell align='left'>{row.anoLancamento}</TableCell>
                      <TableCell align='left'>{row.editora}</TableCell>
                      <TableCell align='right'>
                        <IconButton
                          sx={{
                            borderColor: '#00000088',
                            borderWidth: 1,
                            borderStyle: 'solid',
                          }}
                          onClick={() => startEdit(row)}>
                          <CreateIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} sx={{ marginTop: 3 }}>
            <Button variant='contained' onClick={() => startCreate()}>
              Adicionar livro
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            maxWidth: '800px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {modalMode === 'edit' ? `Editar ${titulo}` : 'Adicionar novo livro'}
          </Typography>
          <Grid container rowSpacing={0} columnSpacing={1}>
            <Grid item xs={12} md={6}>
              <TextField
                id='titulo'
                label='Título'
                fullWidth
                margin='normal'
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id='autor'
                label='Autor'
                fullWidth
                margin='normal'
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id='lancamento'
                label='Ano de lançamento'
                fullWidth
                margin='normal'
                value={`${anoLancamento || ''}`}
                onChange={(e) => setAnoLancamento(parseInt(e.target.value))}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id='editora'
                label='Editora'
                fullWidth
                margin='normal'
                value={editora}
                onChange={(e) => setEditora(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant='contained' onClick={solveModal}>
            Salvar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
