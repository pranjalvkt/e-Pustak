import useTranslation from '@/hooks/useTranslation';
import React from 'react';


export default function UnderDevelopment() {
    const { localise } = useTranslation();
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-700">{localise('underDevTitle')}</h2>
        <p className="mt-4 text-gray-500">
          {localise('underDevDescription')}
        </p>
      </div>
    </div>
  );
}