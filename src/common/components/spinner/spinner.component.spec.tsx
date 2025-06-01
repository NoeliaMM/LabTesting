import React from 'react';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import { vi, Mock } from 'vitest';
import { usePromiseTracker } from 'react-promise-tracker';

vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

describe('SpinnerComponent', () => {
  it('should render modal when promiseInProgress is true', () => {
    (usePromiseTracker as Mock).mockReturnValue({ promiseInProgress: true });

    render(<SpinnerComponent />);

    expect(screen.getByRole('presentation')).toBeVisible();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('should not render modal when promiseInProgress is false', () => {
    (usePromiseTracker as Mock).mockReturnValue({ promiseInProgress: false });

    render(<SpinnerComponent />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('should render multiple spinners correctly', () => {
    (usePromiseTracker as Mock).mockReturnValue({ promiseInProgress: true });

    const { rerender } = render(<SpinnerComponent />);
    expect(screen.getByRole('presentation')).toBeInTheDocument();

    (usePromiseTracker as Mock).mockReturnValue({ promiseInProgress: false });
    rerender(<SpinnerComponent />);
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
