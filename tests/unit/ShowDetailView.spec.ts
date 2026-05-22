import { render, screen } from '@testing-library/vue';
import { describe, expect, it, vi } from 'vitest';
import ShowDetailView from '../../src/views/ShowDetailView.vue';

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: '42' },
  }),
}));

vi.mock('../../src/composables/useTvMazeApi', async () => {
  const { ref } = await import('vue');

  return {
    useTvMazeApi: () => ({
      fetchShowDetails: vi.fn().mockResolvedValue({
        id: 42,
        name: 'Interview Show',
        type: 'Scripted',
        language: 'English',
        genres: ['Drama'],
        status: 'Running',
        premiered: '2020-01-15',
        officialSite: null,
        rating: { average: 8.9 },
        network: { name: 'Network' },
        image: { medium: 'https://placehold.co/210x295', original: 'https://placehold.co/420x590' },
        summary: '<p>A show made for tests.</p>',
      }),
      loading: ref(false),
      error: ref(null),
    }),
  };
});

describe('ShowDetailView', () => {
  it('renders title, rating, status and premiered fields', async () => {
    render(ShowDetailView);

    expect(await screen.findByText('Interview Show')).toBeTruthy();
    expect(screen.getByText('8.9')).toBeTruthy();
    expect(screen.getByText('Running')).toBeTruthy();
    expect(screen.getByText('2020-01-15')).toBeTruthy();
  });
});
