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
import { Role, User } from "@prisma/client";
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
  // Implement your view logic here
  console.log(`View user ${id}`);
}

interface UsersTableProps {
  users: User[];
  handleUserChangeRole: (
    id: string,
    action: Role,
    pending?: boolean
  ) => Promise<User[] | Error>;
  handleToggleUserStatus: (id: string) => Promise<User[] | Error>;
}

export function UsersTable({
  users: propUsers,
  handleUserChangeRole,
  handleToggleUserStatus,
}: UsersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [users, setUsers] = useState<User[]>(propUsers);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "image",
      header: "Avatar",
      cell: ({ row }) => {
        return (
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <UserAvatar user={row.original} size={10} />
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const id = row.getValue("id") as string;
        return `${id.slice(0, 8)}...`;
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return (
          <Badge
            variant={
              role === "admin"
                ? "default"
                : role === "dealer"
                  ? "secondary"
                  : "outline"
            }
          >
            {role}
          </Badge>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <Badge variant={isActive ? "default" : "destructive"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }) => {
        return new Date(row.getValue("createdAt")).toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

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
                onClick={() =>
                  handleToggleUserStatus(user.id).then((response) => {
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
                        title: `User ${user.isActive ? "deactivated" : "activated"}`,
                        description: `User ${user.name} has been ${
                          user.isActive ? "deactivated" : "activated"
                        }`,
                      });
                      setUsers(response);
                    }
                  })
                }
              >
                {user.isActive ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Dialog>
                  <DialogTrigger onClick={(e) => e.stopPropagation()}>
                    Change Role
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Role for {user.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleUserChangeRole(user.id, Role.admin).then(
                            (response) => {
                              if (response instanceof Error) {
                                toast({
                                  title: "Error",
                                  description:
                                    "An error occurred while changing user role",
                                  variant: "destructive",
                                });
                                console.error(response);
                              } else {
                                toast({
                                  title: `User role changed to admin`,
                                  description: `User ${user.name} has been changed to admin`,
                                });
                                setUsers(response);
                              }
                            }
                          );
                        }}
                      >
                        Make Admin
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleUserChangeRole(user.id, Role.dealer).then(
                            (response) => {
                              if (response instanceof Error) {
                                toast({
                                  title: "Error",
                                  description:
                                    "An error occurred while changing user role",
                                  variant: "destructive",
                                });
                                console.error(response);
                              } else {
                                toast({
                                  title: `User role changed to dealer`,
                                  description: `User ${user.name} has been changed to dealer`,
                                });
                                setUsers(response);
                              }
                            }
                          );
                        }}
                      >
                        Make Dealer
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleUserChangeRole(user.id, Role.user).then(
                            (response) => {
                              if (response instanceof Error) {
                                console.error(response);
                              } else setUsers(response);
                            }
                          );
                        }}
                      >
                        Make User
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleViewUser(user.id)}>
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
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
          placeholder="Filter users..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
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
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
