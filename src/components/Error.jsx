import React from 'react'
import { StickyNoteOff } from 'lucide-react';

const Error = () => {
  return (
    <div className="flex align-center justify-center w-full mt-50">
      <div className=" flex gap-2 p-30 m-3 border-green-800 border-dashed border-4 rounded-2xl text-gray-600 font-extrabold text-2xl bg-green-300">
        <StickyNoteOff size={40} />
        <p>404 Page Not Found</p>
      </div>
    </div>
  );
}

export default Error