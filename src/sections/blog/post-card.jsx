import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

const getCoverPost = (post) => {
  let cover = `/assets/images/post/hide.png`;
  if (post.content_value) {
    switch (post.content_type) {
      case 'image':
        cover = post.content_value;
        break;
      case 'video':
        cover = `/assets/images/post/video.png`;
        break;
      case 'website':
        cover = `/assets/images/post/web.png`;
        break;
      case 'document':
        cover = `/assets/images/post/doc.png`;
        break;
      default:
        cover = `/assets/images/post/unknown.png`;
        break;
    }
  }
  return cover;
};

export default function PostCard({ post, index }) {
  const { title, author } = post;
  const cover = getCoverPost(post);
  const createdAt = new Date();
  const latestPostLarge = false;

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="none"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {title}
    </Link>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 0,
        color: 'text.disabled',
      }}
    >
      {[{ value: author.username, icon: 'eva:at-fill' }].map((info, _index) => (
        <Stack key={_index} direction="row">
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{info.value}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        padding: '10px',
        background: '#f7f7f7',
        objectFit: 'scale-down',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={2}
      justifyContent="space-between"
      sx={{
        mt: 0,
        color: 'text.disabled',
      }}
    >
      <Typography
        variant="caption"
        component="div"
        sx={{
          mb: 0,
          color: 'text.disabled',
        }}
      >
        {fDate(createdAt)}
      </Typography>
      <Typography
        variant="caption"
        component="div"
        sx={{
          mb: 0,
          color: 'text.disabled',
        }}
      >
        {`@${author.username}`}
      </Typography>
    </Stack>
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <CardActionArea
        onClick={() => {
          if (post.content_value) {
            window.open(post.content_value, '_blank');
          }
        }}
      >
        <Card>
          <Box
            sx={{
              position: 'relative',
              pt: 'calc(100% * 2 / 4)',
              border: 'dashed #e7e7e7 2px',
            }}
          >
            {renderCover}
          </Box>

          <Box
            borderTop={1}
            bgcolor="#e9e9e9"
            sx={{
              p: (theme) => theme.spacing(1, 2, 1, 2),
              backgroundColor: '#4a4a4a',
              color: 'white',
            }}
          >
            {renderDate}

            {renderTitle}

            {false && renderInfo}
          </Box>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};
