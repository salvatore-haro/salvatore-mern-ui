/* eslint-disable no-useless-escape */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { getUserInfo } from 'src/services/auth-service';
import { createPost } from 'src/services/post-service';
import Iconify from '../../components/iconify';

const BotonModal = ({ onSuccessfulSubmit }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: { value: '', isValid: null },
    topic: { value: 'automovilismo', isValid: true },
    content_type: { value: 'website', isValid: true },
    content_value: { value: '', isValid: null },
  });

  const handleInputChange = (event) => {
    const { name, value, pattern } = event.target;
    const isValid = new RegExp(pattern).test(value);
    setFormData({
      ...formData,
      [name]: { value, isValid },
    });
    const isValidForm = Object.values(formData).every((item) => item.isValid === true);
    setButtonDisabled(!isValidForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setButtonDisabled(true);

    const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value.value;
      return acc;
    }, {});

    const send = async () => {
      const response = await createPost(data);
      setButtonDisabled(false);
      if (response.status === 201) {
        onSuccessfulSubmit();
        handleClose();
      }
    };
    send();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return getUserInfo() && (
    <div>
      <Button variant="contained" onClick={handleOpen} color="inherit" size="large">
        Agregar Publicación
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isSmallScreen ? '90%' : '50%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Iconify
            icon="eva:close-circle-outline"
            width={52}
            color="#4e6176"
            sx={{float:'right', cursor: 'pointer'}}
            onClick={handleClose}
          />
          <Typography variant="h4">Agrega una publicación ✍️</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
            Comparte a la comunidad cualquier nota de interés.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="standard-basic"
              label="Titulo"
              name="title"
              inputProps={{
                pattern: '(\\b\\w+\\b\\s*){4,}',
              }}
              error={formData.title.isValid === false}
              helperText={
                formData.title.isValid === false &&
                'Ingresa un titulo descriptivo de al menos 4 palabras'
              }
              sx={{ mt: 2 }}
              fullWidth
              onChange={handleInputChange}
            />
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Categoria"
                name="topic"
                inputProps={{
                  pattern: '.+',
                }}
                value={formData.topic.value}
                onChange={handleInputChange}
              >
                <MenuItem value="automovilismo">Automovilismo</MenuItem>
                <MenuItem value="cine">Cine</MenuItem>
                <MenuItem value="politica">Politica</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo de contenido</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tipo de contenido"
                name="content_type"
                inputProps={{
                  pattern: '.+',
                }}
                value={formData.content_type.value}
                onChange={handleInputChange}
              >
                <MenuItem value="image">Imagen</MenuItem>
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="website">Pagina web</MenuItem>
                <MenuItem value="document">Documento</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="URL"
              name="content_value"
              inputProps={{
                pattern: '^(http|https)://[^ "]+$',
              }}
              error={formData.content_value.isValid === false}
              helperText={
                formData.content_value.isValid === false &&
                'Ingresa una dirección de internet, ej. https://google.com'
              }
              sx={{ mt: 2 }}
              fullWidth
              onChange={handleInputChange}
              onKeyUpCapture={handleInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              sx={{ mt: 2 }}
              disabled={buttonDisabled}
              fullWidth
            >
              Guardar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

BotonModal.propTypes = {
  onSuccessfulSubmit: PropTypes.func.isRequired,
};

export default BotonModal;
