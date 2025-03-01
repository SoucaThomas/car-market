import { Upload } from "@prisma/client";
import Image from "next/image";

interface ListACarImageProps {
  fileUrl: string;
  fileName: string;
}

export function ListACarImage({ fileName, fileUrl }: ListACarImageProps) {
  return (
    <div className="m-2 rounded-lg border border-gray-200 p-4">
      <Image
        src={fileUrl}
        alt={fileName}
        width={800}
        height={800}
        className="object-contain"
      />
    </div>
  );
}
