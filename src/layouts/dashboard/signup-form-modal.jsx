/* eslint-disable no-useless-escape */

import React, { useState } from 'react';
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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useTheme } from '@mui/material/styles';

import { signup } from 'src/services/auth-service';
import Iconify from '../../components/iconify';

const SignupFormModal = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    role: { value: 'creator', isValid: true },
    email: { value: '', isValid: null },
    username: { value: '', isValid: null },
    password: { value: '', isValid: null },
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
    setErrorMessage('');
    setButtonDisabled(true);

    const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value.value;
      return acc;
    }, {});

    const signupUser = async () => {
      const response = await signup(data);
      setErrorMessage(response.message);
    };
    signupUser();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderErrorMesssage = errorMessage ? (
    <Alert severity="error" sx={{ marginTop: 1 }}>
      <AlertTitle>Oops!</AlertTitle>
      {errorMessage}
    </Alert>
  ) : null;

  return (
    <>
      <Button onClick={handleOpen} disableRipple>
        Registrarme
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
            width: isSmallScreen ? '90%' : '40%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            pt: 4,
            pb: 4,
            pl: 12,
            pr: 12,
          }}
        >
          <Iconify
            icon="eva:close-circle-outline"
            width={52}
            color="#4e6176"
            sx={{ float: 'right', cursor: 'pointer' }}
            onClick={handleClose}
          />
          <Typography variant="h4">Registro de usuario ✨</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
            Únete a la comunidad, al registrarte como <i>Lector</i> podras ver el contenido de las
            publicaciones, si eliges ser <i>Creador</i> tambien podras publicar.
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo de usuario</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tipo de usuario"
                name="role"
                inputProps={{
                  pattern: '.+',
                }}
                value={formData.role.value}
                onChange={handleInputChange}
              >
                <MenuItem value="creator">Creador</MenuItem>
                <MenuItem value="reader">Lector</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="signup-email"
              label="Correo electronico"
              name="email"
              inputProps={{
                pattern: `^\\S+@\\S+\\.\\S+$`,
              }}
              error={formData.email.isValid === false}
              helperText={
                formData.email.isValid === false &&
                'Ingresa un email válido, ej. susanita@gmail.com'
              }
              sx={{ mt: 2 }}
              fullWidth
              onChange={handleInputChange}
            />
            <TextField
              id="signup-username"
              label="Alias de usuario"
              name="username"
              inputProps={{
                pattern: '^[a-zA-Z0-9]{4,}$',
              }}
              error={formData.username.isValid === false}
              helperText={
                formData.username.isValid === false &&
                'Puede contener solo letras (mayúsculas y minúsculas) y números, minimo 4 caracteres.'
              }
              sx={{ mt: 2 }}
              fullWidth
              onChange={handleInputChange}
            />
            <TextField
              id="signup-password"
              label="Contraseña"
              type="password"
              name="password"
              inputProps={{
                pattern: '^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{6,}$',
              }}
              error={formData.password.isValid === false}
              helperText={
                formData.password.isValid === false &&
                'Debe contener al menos una letra mayúscula y puedes usar letras y números, minimo 6 caracteres.'
              }
              sx={{ mt: 2 }}
              fullWidth
              onChange={handleInputChange}
            />
            
            {renderErrorMesssage}

            <Button
              type="submit"
              variant="contained"
              color="inherit"
              size="large"
              sx={{ mt: 2 }}
              disabled={buttonDisabled}
              fullWidth
            >
              Guardar
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SignupFormModal;
