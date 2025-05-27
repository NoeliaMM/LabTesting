import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { Dialog } from '@mui/material';
import { TableComponent } from '../table/table.component';

describe('ConfirmationDialogComponent specs', () => {
  it('should render the component dialog when isOpen is true', () => {
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={vi.fn()}
        onClose={vi.fn()}
        title="Dialog title"
        labels={{ closeButton: 'Cancel', acceptButton: 'Confirm' }}
      >
        <div>Content Dialog</div>
      </ConfirmationDialogComponent>
    );

    expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();
  });

  it('should not render the component dialog when isOpen is false', () => {
    render(
      <ConfirmationDialogComponent
        isOpen={false}
        onAccept={vi.fn()}
        onClose={vi.fn()}
        title="Dialog title"
        labels={{ closeButton: 'Cancel', acceptButton: 'Confirm' }}
      >
        <div>Content Dialog</div>
      </ConfirmationDialogComponent>
    );

    expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
  });

  it('should render the title and buttons when is open ', () => {
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={vi.fn()}
        onClose={vi.fn()}
        title="This is the dialog title"
        labels={{ closeButton: 'Cancel', acceptButton: 'Confirm' }}
      >
        <div>Some content</div>
      </ConfirmationDialogComponent>
    );

    expect(
      screen.getByRole('heading', { name: 'This is the dialog title' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('should call onClose when clicking the close button', () => {
    const onCloseMock = vi.fn();

    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={vi.fn()}
        onClose={onCloseMock}
        title="Test"
        labels={{ closeButton: 'Close', acceptButton: 'Accept' }}
      >
        <p>Dialog content</p>
      </ConfirmationDialogComponent>
    );

    fireEvent.click(screen.getByText('Close'));
    expect(onCloseMock).toHaveBeenCalled();
  });
  it('should call onClose when clicking the close button', () => {
    const onCloseMock = vi.fn();

    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={vi.fn()}
        onClose={onCloseMock}
        title="Test"
        labels={{ closeButton: 'Close', acceptButton: 'Accept' }}
      >
        <p>Dialog content</p>
      </ConfirmationDialogComponent>
    );

    fireEvent.click(screen.getByText('Accept'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should show confirmation dialog when delete button is clicked', async () => {
    // const user = userEvent.setup();

    // Props mínimos usando Partial
    const props: Partial<React.ComponentProps<typeof TableComponent>> = {
      onDelete: vi.fn(),
      isOpenConfirmation: true,
      onCloseConfirmation: vi.fn(),
      itemToDeleteName: 'Project 1',
      labels: {
        deleteTitle: 'Delete?',
        closeButton: 'Cancel',
        acceptButton: 'Delete',
        deleteContent: ({ itemName }) => `Delete ${itemName}?`,
        searchPlaceholder: '',
        createButton: 'New',
      },
      tableProps: {
        getHeaderGroups: () => [],
        getRowModel: () => ({ rows: [] }),
      },
      rowRenderer: () => null,
      enableSearch: false,
      enablePagination: false,
      search: '',
      onSearch: () => {},
      pageIndex: 0,
      pageCount: 1,
      goToPage: () => {},
      className: '',
    };

    render(
      <TableComponent
        {...(props as React.ComponentProps<typeof TableComponent>)}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Delete?')).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await fireEvent.click(deleteButton);

    expect(props.onDelete).toHaveBeenCalled();
  });
});
