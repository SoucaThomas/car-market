'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DealerApplications } from '@prisma/client';
import { DealershipApplicationModal } from '../DealershipApplicationModal';

interface ViewApplicationButtonProps {
  application: DealerApplications;
}

export function ViewApplicationButton({ application }: ViewApplicationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
        View
      </Button>

      <DealershipApplicationModal
        application={application}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
