"use client";

import { useState } from "react";
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
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Role,
  User,
  DealerApplications,
  ApplicationStatus,
} from "@prisma/client";
import { UserAvatar } from "./ui/userAvatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "@/hooks/use-toast";

async function handleViewUser(id: string) {
  console.log(`View user ${id}`);
}

interface DealershipApplicationsTableProps {
  applications: DealerApplications[];
  handleApplicationDecision: (
    id: number,
    decision: ApplicationStatus
  ) => Promise<DealerApplications[] | Error>;
}
export function DealershipApplicationsTable({
  applications: propApplications,
  handleApplicationDecision,
}: DealershipApplicationsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [applications, setApplications] =
    useState<DealerApplications[]>(propApplications);

  const columns: ColumnDef<DealerApplications>[] = [
    {
      accessorKey: "businessName",
      header: "Business Name",
      cell: ({ row }) => row.getValue("businessName"),
    },
    {
      accessorKey: "businessEmail",
      header: "Business Email",
      cell: ({ row }) => row.getValue("businessEmail"),
    },
    {
      accessorKey: "businessType",
      header: "Business Type",
      cell: ({ row }) => row.getValue("businessType"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={status === "approved" ? "default" : "destructive"}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const application = row.original;

        return (
          <div className="flex items-center">
            <Button
              variant="outline"
              onClick={async () =>
                await handleApplicationDecision(
                  application.id,
                  ApplicationStatus.approved
                ).then((response) => {
                  if (response instanceof Error) {
                    toast({
                      title: "Error",
                      description:
                        "An error occurred while toggling user status",
                      variant: "destructive",
                    });
                    console.error(response);
                  } else {
                    toast({
                      title: `Business ${application.businessName} has been ${application.status === "approved" ? "activated" : "deactivated"}`,
                      description: `User status is now ${application.status === "approved" ? "active" : "inactive"}.`,
                    });
                    setApplications(response);
                  }
                })
              }
            >
              Approve
            </Button>
            <Button
              variant="outline"
              onClick={async () =>
                await handleApplicationDecision(
                  application.id,
                  ApplicationStatus.rejected
                ).then((response) => {
                  if (response instanceof Error) {
                    toast({
                      title: "Error",
                      description:
                        "An error occurred while rejecting the application",
                      variant: "destructive",
                    });
                    console.error(response);
                  } else {
                    toast({
                      title: `Business ${application.businessName} has been denied`,
                      description: `Application status is now rejected.`,
                    });
                    setApplications(response);
                  }
                })
              }
            >
              Deny
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: applications,
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
          placeholder="Filter applications..."
          value={
            (table.getColumn("businessName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("businessName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
