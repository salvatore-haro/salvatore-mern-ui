/* eslint-disable no-useless-escape */

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useTheme } from '@mui/material/styles';

import { authUser } from 'src/services/auth-service';
import Iconify from '../../components/iconify';

const LoginFormModal = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
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

    const loginUser = async () => {
      const response = await authUser(data);
      setErrorMessage(response.message);
    };
    loginUser();
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
        Acceder
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
          <Typography variant="h4">Iniciar sesión 🔑</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
            Hola de nuevo, ingresa tus credenciales para acceder al contenido.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="login-user"
              label="Alias de usuario"
              name="username"
              inputProps={{
                pattern: '.+',
              }}
              error={formData.username.isValid === false}
              helperText={
                formData.username.isValid === false &&
                'Ingresa tu usuario registrado, ej. black-hero94'
              }
              sx={{ mt: 2 }}
              fullWidth
              onChange={handleInputChange}
            />
            <TextField
              id="login-pass"
              label="Contraseña"
              type="password"
              name="password"
              inputProps={{
                pattern: '.+',
              }}
              error={formData.password.isValid === false}
              helperText={formData.password.isValid === false && 'Ingresa tu contraseña registrada'}
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
              Acceder
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default LoginFormModal;
