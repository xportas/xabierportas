import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export const PixelatedImage = forwardRef(
  (
    {
      id,
      className = '',
      src,
      blockSize = 20,
      width = 600,
      height = 600,
      level = '',
      style = {},
      onClick,
      ...rest
    },
    ref
  ) => {
    const canvasRef = useRef(null);
    useImperativeHandle(
      ref,
      () => canvasRef.current || document.createElement('canvas'),
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.imageSmoothingEnabled = false;

      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = src;

      img.onload = () => {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        tempCanvas.width = canvas.width * blockSize * 0.01;
        tempCanvas.height = canvas.height * blockSize * 0.01;

        tempCtx.imageSmoothingEnabled = false;
        tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);

        if (level && level !== '') {
          ctx.shadowColor = 'black';
          ctx.shadowOffsetX = 15;
          ctx.shadowOffsetY = 15;
          ctx.font = '200px chill';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#FFAD36';
          ctx.fillText(level, canvas.width / 3.8, canvas.height / 2);
        }
      };
    }, [src, blockSize]);

    return (
      <canvas
        ref={canvasRef}
        id={id}
        width={width}
        height={height}
        className={`${level ? 'border-2 border-solid border-[#FFAD36]' : ''} ${className}`}
        style={{ ...style, imageRendering: 'pixelated', pointerEvents: 'auto' }}
        onClick={onClick}
        {...rest}
      />
    );
  }
);

PixelatedImage.displayName = 'PixelatedImage';