
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-autowise-blue"></div>
    </div>
  );
};

export default LoadingState;
