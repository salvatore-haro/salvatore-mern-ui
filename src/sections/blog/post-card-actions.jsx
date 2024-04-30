import PropTypes from 'prop-types';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import Iconify from 'src/components/iconify/iconify';

import { deletePost } from 'src/services/post-service';

export default function PostCardActions({ anchorEl, onClose, onRefresh, userInfo, post }) {
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'simple-popover' : undefined;

  const actions = [];
  if (post.content_value) {
    actions.push({
      icon: 'eva:external-link-fill',
      title: 'Abrir nueva pestaña',
      onClick: () => {
        window.open(post.content_value, '_blank');
        onClose();
      },
    });
  }
  if (userInfo && post.author.id === userInfo.userId) {
    actions.push({
      icon: 'eva:trash-fill',
      title: 'Eliminar publicación',
      onClick: async () => {
        const response = await deletePost(post.id);
        if (response.status === 204) {
            onRefresh();
        }
      }
    });
  }
  if (actions.length) {
    actions.push({ icon: 'eva:close-fill', title: 'Cancelar', onClick: onClose });
  }

  const actionItems = actions.map((option, idx) => (
    <ListItemButton key={idx} onClick={option.onClick}>
      <ListItemIcon>
        <Iconify width={16} icon={option.icon} sx={{ mr: 0.5 }} />
      </ListItemIcon>
      <ListItemText primary={option.title} />
    </ListItemButton>
  ));

  return (
    actionItems.length && (
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Acciones
            </ListSubheader>
          }
        >
          {actionItems}
        </List>
      </Popover>
    )
  );
}

PostCardActions.propTypes = {
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
  onRefresh: PropTypes.func,
  userInfo: PropTypes.object,
  post: PropTypes.object,
};
