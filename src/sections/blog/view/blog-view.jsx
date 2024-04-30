import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import LoginFormModal from 'src/layouts/dashboard/login-form-modal';
import SignupFormModal from 'src/layouts/dashboard/signup-form-modal';
import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';
import BotonModal from '../post-form-modal';

import { getUserInfo } from '../../../services/auth-service';
import { fetchPosts } from '../../../services/post-service';

export default function BlogView() {
  const [posts, setPosts] = useState([]);
  const [searchParam, setSearchParam] = useState('');
  const [helperSearchText, setHelperSearchText] = useState('');
  const [sortValue, setSortValue] = useState('*');
  const [refreshData, setRefreshData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts({
        title: searchParam ? `~${searchParam}` : '',
        topic: sortValue,
      });
      setPosts(data.results);
      setHelperSearchText(`Mostrando ${data.resultsInPage} de ${data.totalResults} resultados`);
    };
    fetchData().catch(console.error);
  }, [searchParam, sortValue, refreshData]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3">Catálogo de publicaciones</Typography>
        <BotonModal
          onSuccessfulSubmit={() => {
            setRefreshData(Math.random());
          }}
        />
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} onSearch={setSearchParam} helperText={helperSearchText} />
        <PostSort
          sortValue={sortValue}
          onSort={(e) => {
            setSortValue(e.target.value);
          }}
          options={[
            { value: '*', label: 'Categorias' },
            { value: 'automovilismo', label: 'Automovilismo' },
            { value: 'cine', label: 'Cine' },
            { value: 'politica', label: 'Politica' },
          ]}
        />
      </Stack>

      {getUserInfo() ? null : (
        <Alert severity="warning" sx={{ mb: 4 }}>
          Ahora mismo estás visualizando las publicaciones en modo Invitado, así que solo ves los
          títulos. Si deseas ver el contenido o agregar publicaciones, entonces únete a la comunidad
          ahora mismo.
          <LoginFormModal />
          <SignupFormModal />
        </Alert>
      )}

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            onRefresh={() => {
              setRefreshData(Math.random());
            }}
            index={index}
          />
        ))}
      </Grid>
    </Container>
  );
}
