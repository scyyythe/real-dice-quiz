interface DiceFaceProps {
  number: number;
  size?: 'sm' | 'md' | 'lg';
}

const DiceFace = ({ number, size = 'md' }: DiceFaceProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const dotSize = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  };

  const renderDots = () => {
    const dotClass = `${dotSize[size]} rounded-full bg-primary`;

    switch (number) {
      case 1:
        return (
          <div className="flex items-center justify-center">
            <div className={dotClass} />
          </div>
        );
      case 2:
        return (
          <div className="flex justify-between items-center h-full px-2">
            <div className={dotClass} />
            <div className={dotClass} />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col justify-between h-full p-2">
            <div className="flex justify-start">
              <div className={dotClass} />
            </div>
            <div className="flex justify-center">
              <div className={dotClass} />
            </div>
            <div className="flex justify-end">
              <div className={dotClass} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-5 p-3">
            <div className={dotClass} />
            <div className={dotClass} />
            <div className={dotClass} />
            <div className={dotClass} />
          </div>
        );
      case 5:
        return (
          <div className="relative h-full w-full p-3">
            <div className="grid grid-cols-2 gap-5 h-full">
              <div className={dotClass} />
              <div className={dotClass} />
              <div className={`${dotClass} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
              <div className={dotClass} />
              <div className={dotClass} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-2 gap-4 p-3">
            <div className={dotClass} />
            <div className={dotClass} />
            <div className={dotClass} />
            <div className={dotClass} />
            <div className={dotClass} />
            <div className={dotClass} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${sizeClasses[size]} rounded-xl bg-primary/20 flex items-center justify-center border-2 border-primary/30 transition-all hover:scale-110 hover:bg-primary/30`}>
      {renderDots()}
    </div>
  );
};

export default DiceFace;
