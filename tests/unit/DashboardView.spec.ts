import { createRouter, createMemoryHistory } from 'vue-router';
import { render, within } from '@testing-library/vue';
import { describe, expect, it, vi } from 'vitest';
import DashboardView from '../../src/views/DashboardView.vue';

vi.mock('../../src/composables/useTvMazeApi', async () => {
  const { ref } = await import('vue');

  const makeShow = (id: number, name: string, genres: string[]) => ({
    id,
    name,
    type: 'Scripted',
    language: 'English',
    genres,
    status: 'Running',
    premiered: '2021-01-01',
    officialSite: null,
    rating: { average: 8.1 },
    network: { name: 'Network' },
    image: { medium: 'https://placehold.co/210x295', original: 'https://placehold.co/420x590' },
    summary: '<p>Summary</p>',
  });

  const popularShows = ref([
    makeShow(1, 'Drama One', ['Drama']),
    makeShow(2, 'Drama Two', ['Drama']),
    makeShow(3, 'Drama Three', ['Drama']),
    makeShow(4, 'Drama Four', ['Drama']),
    makeShow(5, 'Drama Five', ['Drama']),
    makeShow(6, 'Drama Six', ['Drama']),
    makeShow(7, 'Drama Seven', ['Drama']),
    makeShow(8, 'Drama Eight', ['Drama']),
    makeShow(9, 'Comedy One', ['Comedy']),
    makeShow(10, 'Comedy Two', ['Comedy']),
    makeShow(11, 'Comedy Three', ['Comedy']),
    makeShow(12, 'Comedy Four', ['Comedy']),
    makeShow(13, 'Comedy Five', ['Comedy']),
    makeShow(14, 'Comedy Six', ['Comedy']),
    makeShow(15, 'Comedy Seven', ['Comedy']),
  ]);

  return {
    useTvMazeApi: () => ({
      popularShows,
      loading: ref(false),
      error: ref(null),
      fetchPopularShows: vi.fn(),
    }),
  };
});

describe('DashboardView', () => {
  async function renderDashboard() {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: DashboardView }],
    });

    await router.push('/');
    await router.isReady();

    return render(DashboardView, {
      global: { plugins: [router] },
    });
  }

  it('shows Drama and Comedy genre headings', async () => {
    const { findByRole } = await renderDashboard();

    expect(await findByRole('heading', { name: 'Drama', level: 2 })).toBeTruthy();
    expect(await findByRole('heading', { name: 'Comedy', level: 2 })).toBeTruthy();
  });

  it('shows exactly 5 Drama cards and 5 Comedy cards from mocked data', async () => {
    const { findByRole } = await renderDashboard();

    const dramaHeading = await findByRole('heading', { name: 'Drama', level: 2 });
    const comedyHeading = await findByRole('heading', { name: 'Comedy', level: 2 });

    const dramaSection = dramaHeading.closest('section');
    const comedySection = comedyHeading.closest('section');

    const dramaCards = within(dramaSection as HTMLElement).getAllByRole('button');
    const comedyCards = within(comedySection as HTMLElement).getAllByRole('button');

    expect(dramaCards).toHaveLength(5);
    expect(comedyCards).toHaveLength(5);
  });
});