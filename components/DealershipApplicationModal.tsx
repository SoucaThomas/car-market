"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealerApplications } from "@prisma/client";
import {
  CalendarIcon,
  Building2,
  Mail,
  Globe,
  MapPin,
  FileText,
  Clock,
} from "lucide-react";

interface DealershipApplicationModalProps {
  application: DealerApplications | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DealershipApplicationModal({
  application,
  isOpen,
  onClose,
}: DealershipApplicationModalProps) {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Application APP-{application.id}</span>
            <Badge
              variant={
                application.status === "approved"
                  ? "success"
                  : application.status === "pending"
                    ? "outline"
                    : "destructive"
              }
            >
              {application.status.charAt(0).toUpperCase() +
                application.status.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Submitted on {application.createdAt.toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="business">Business Information</TabsTrigger>
            <TabsTrigger value="details">Additional Details</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  Business Name
                </div>
                <div className="font-medium">{application.businessName}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  Business Email
                </div>
                <div>{application.businessEmail}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Business Type
                </div>
                <div>{application.businessType}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Tax ID
                </div>
                <div>{application.taxId}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  Year Established
                </div>
                <div>
                  {application.yearEstablished
                    ? application.yearEstablished.getFullYear()
                    : "N/A"}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  Website
                </div>
                <div>{application.website || "N/A"}</div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Address
              </h3>
              <div>
                <p>{application.streetAddress}</p>
                <p>
                  {application.city}, {application.state} {application.zipCode}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Inventory Size
                </div>
                <div>{application.inventorySize} vehicles</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Specialties
                </div>
                <div>{application.specialties || "None specified"}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Terms Agreed
                </div>
                <div>{application.termsAgreed ? "Yes" : "No"}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Application Date
                </div>
                <div>{application.createdAt.toLocaleDateString()}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">
                Application Status
              </div>
              <div>
                <Badge
                  variant={
                    application.status === "approved"
                      ? "success"
                      : application.status === "pending"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)}
                </Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button asChild>
            <a href={`/dealerships/apply`}>Apply Again</a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
