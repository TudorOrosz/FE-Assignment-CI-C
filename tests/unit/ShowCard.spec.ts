import { createRouter, createWebHistory } from 'vue-router';
import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import ShowCard from '../../src/components/ShowCard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

const mockShow = {
  id: 1,
  name: 'Test Show',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama'],
  status: 'Running',
  rating: { average: 8.4 },
  summary: '<p>Description</p>',
  image: { medium: 'https://placehold.co/210x295', original: 'https://placehold.co/420x590' },
  premiered: '2021-06-01',
  officialSite: null,
  network: { name: 'Test Network' },
};

describe('ShowCard', () => {
  it('renders show name and genres', () => {
    const { getByText } = render(ShowCard, {
      props: { show: mockShow },
      global: { plugins: [router] },
    });

    expect(getByText('Test Show')).toBeTruthy();
    expect(getByText('Drama')).toBeTruthy();
    expect(getByText('★ 8.4')).toBeTruthy();
  });
});
