
export const LoadingDots = () => {
  return (
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
      <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};
