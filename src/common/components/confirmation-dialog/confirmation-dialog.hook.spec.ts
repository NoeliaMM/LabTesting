import { renderHook } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup } from '#common/models';
import { ac } from 'vitest/dist/chunks/reporters.d.DG9VKi4m';
import { act } from 'react';

describe('useConfirmationDialog specs', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should open the dialog and set the itemToDelete', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const item = { id: '1', name: 'Item 1' };

    act(() => {
      result.current.onOpenDialog(item);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should close the dialog and reset itemToDelete', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const item = { id: '1', name: 'Item 1' };

    act(() => {
      result.current.onOpenDialog(item);
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should reset itemToDelete when accept', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const item = { id: '1', name: 'Item 1' };

    act(() => {
      result.current.onOpenDialog(item);
      result.current.onAccept();
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
