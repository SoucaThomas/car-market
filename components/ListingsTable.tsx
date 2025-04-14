'use client';

import { useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Listing, ListingStatus } from '@prisma/client';
import { redirect } from 'next/navigation';
import { ListingWithUser } from '@/app/shared/types';
import { toast } from '@/hooks/use-toast';

async function handleView(listing: Listing) {
  const listingDetails = listing;

  redirect(`/listing/${listingDetails.id}`);
}

interface ListingsTableProps {
  listings: ListingWithUser[];
  pending?: boolean;
  handleAction: (
    id: number,
    action: ListingStatus,
    pending?: boolean
  ) => Promise<ListingWithUser[] | Error>;
}

export function ListingsTable({
  listings: propListings,
  pending,
  handleAction,
}: ListingsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [listings, setListings] = useState<ListingWithUser[]>(propListings);

  const columns: ColumnDef<Listing>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'carBrand',
      header: 'Brand',
    },
    {
      accessorKey: 'carModel',
      header: 'Model',
    },
    {
      accessorKey: 'year',
      header: 'Year',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const price = Number.parseFloat(row.getValue('price'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
        }).format(price);
        return formatted;
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            variant={
              status === 'approved' ? 'outline' : status === 'rejected' ? 'destructive' : 'default'
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'user.name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Seller
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const listing = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async () =>
                  await handleAction(listing.id, ListingStatus.approved, pending).then(
                    (response) => {
                      if (response instanceof Error) {
                        toast({
                          title: 'Error',
                          description: 'An error occurred while approving the listing.',
                          variant: 'destructive',
                        });
                        console.error(response.message);
                      } else {
                        toast({
                          title: 'Listing approved',
                          description: 'The listing is now approved.',
                        });
                        setListings(response);
                      }
                    }
                  )
                }
                className="text-green-600"
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () =>
                  await handleAction(listing.id, ListingStatus.pending, pending).then(
                    (response) => {
                      if (response instanceof Error) {
                        toast({
                          title: 'Error',
                          description: 'An error occurred while moving the listing to pending.',
                          variant: 'destructive',
                        });
                        console.error(response.message);
                      } else {
                        toast({
                          title: 'Listing moved to pending',
                          description: 'The listing is now pending approval.',
                        });
                        setListings(response);
                      }
                    }
                  )
                }
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () =>
                  await handleAction(listing.id, ListingStatus.rejected, pending).then(
                    (response) => {
                      if (response instanceof Error) {
                        toast({
                          title: 'Error',
                          description: 'An error occurred while rejecting the listing.',
                          variant: 'destructive',
                        });
                        console.error(response.message);
                      } else {
                        toast({
                          title: 'Listing rejected',
                          description: 'The listing has been rejected.',
                        });
                        setListings(response);
                      }
                    }
                  )
                }
                className="text-red-600"
              >
                Reject
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleView(listing)}>View Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: listings || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter listings..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
