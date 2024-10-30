'use client';

import { buttonVariants } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { CldUploadButton } from 'next-cloudinary';

export const BtnUpImageCld = () => {
  return (
    <div>
      <CldUploadButton
        options={{ sources: ['local'], autoMinimize: true }}
        signatureEndpoint="/api/sign-cloudinary-params"
      >
        <span
          className={buttonVariants({
            variant: 'outline',
          })}
        >
          <Upload className="mr-2 h-4 w-4" /> Subir
        </span>
      </CldUploadButton>
    </div>
  );
};
