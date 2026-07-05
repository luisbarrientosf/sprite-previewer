import React, { useCallback, useRef } from 'react';
import './DragNDropFileUploader.css';

type Props = {
  onFile: (file: File) => void;
  children?: React.ReactNode;
  accept?: string;
  className?: string;
  'data-testid'?: string;
};

export default function DragNDropFileUploader({ onFile, children, accept = 'image/*', className, ['data-testid']: testId }: Props) {
  const ref = useRef<HTMLLabelElement | null>(null);

  const handleDrop: React.DragEventHandler = useCallback((e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  }, [onFile]);

  const handleDragOver: React.DragEventHandler = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  }, [onFile]);

  return (
    <div className="drop-zone">
      <label ref={ref} className={className} onDrop={handleDrop} onDragOver={handleDragOver} data-testid={testId}>
        {children ?? (
          <>
            <p>Drag & drop an image here, or</p>
            <span className="upload-label">
              <input type="file" accept={accept} onChange={handleChange} />
              Choose file
            </span>
          </>
        )}
      </label>
    </div>
  );
}
