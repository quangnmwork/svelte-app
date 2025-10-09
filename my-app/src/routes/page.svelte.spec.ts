import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render h1', async () => {
		render(Page);

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
	});

	it('can add a todo', async () => {
		render(Page);

		const input = page.getByPlaceholderText('Thêm việc cần làm...');
		await input.type('Việc mới');

		const addBtn = page.getByRole('button', { name: 'Thêm' });
		await addBtn.click();

		const item = page.getByText('Việc mới');
		await expect.element(item).toBeInTheDocument();
	});
});
