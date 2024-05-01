import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, it } from 'vitest';

import PostCard from 'src/sections/blog/post-card';

describe('PostCard test:', () => {
  afterEach(cleanup);

  const post = {
    title: 'Mi publicación de ejemplo',
    author: { username: 'toro1bravo' },
  };

  it('should render a card with title and author', () => {
    render(<PostCard post={post} />);
    screen.getByText(post.title);
    screen.getByText(`@${post.author.username}`);
  });
});
