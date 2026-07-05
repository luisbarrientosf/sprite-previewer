import React, { useCallback, useRef, useState } from 'react';
import JSZip from 'jszip';
import './SpritesheetsPage.css';
import TextInput from '../components/TextInput/TextInput';
import DragNDropFileUploader from '../components/DragNDropFileUploader/DragNDropFileUploader';

export function SpritesheetsPage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [tileWidth, setTileWidth] = useState<number>(32);
  const [tileHeight, setTileHeight] = useState<number>(32);
  const [spacingX, setSpacingX] = useState<number>(0);
  const [spacingY, setSpacingY] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);

  const onFile = useCallback((file: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  }, []);

  const drawGrid = () => {
    const img = imgRef.current;
    const canvas = overlayRef.current;
    if (!img || !canvas) return;
    const rectW = img.clientWidth;
    const rectH = img.clientHeight;
    canvas.width = rectW;
    canvas.height = rectH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, rectW, rectH);
    ctx.strokeStyle = 'rgba(0,255,0,0.6)';
    ctx.lineWidth = 1;

    const scaleX = img.naturalWidth / img.clientWidth;
    const scaleY = img.naturalHeight / img.clientHeight;

    const w = tileWidth / scaleX;
    const h = tileHeight / scaleY;
    const sx = spacingX / scaleX;
    const sy = spacingY / scaleY;
    const mg = margin / scaleX; // use scaleX for simplicity

    for (let y = mg; y + h <= rectH + 0.5; y += h + sy) {
      for (let x = mg; x + w <= rectW + 0.5; x += w + sx) {
        ctx.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, Math.round(w), Math.round(h));
      }
    }
    // draw draggable handle for first cell (right and bottom)
    const handleSize = 10;
    ctx.fillStyle = 'rgba(255,0,0,0.8)';
    ctx.fillRect(Math.round(mg + w - handleSize/2), Math.round(mg + h - handleSize/2), handleSize, handleSize);
  };

  const onImageLoad = () => {
    drawGrid();
  };

  const onParamsChange = (fn: () => void) => {
    fn();
    // redraw after state change in next tick
    setTimeout(() => drawGrid(), 0);
  };

  // Drag logic for overlay handles
  const dragState = useRef<{ dragging: 'none' | 'right' | 'bottom' } | null>(null);

  const onCanvasMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    const canvas = overlayRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = img.naturalWidth / img.clientWidth;
    const w = tileWidth / scaleX;
    const h = tileHeight / scaleX;
    const mg = margin / scaleX;
    const handleSize = 10;
    const rx = mg + w;
    const by = mg + h;
    if (Math.abs(x - rx) < handleSize && Math.abs(y - mg) < handleSize) {
      dragState.current = { dragging: 'right' };
    } else if (Math.abs(x - mg) < handleSize && Math.abs(y - by) < handleSize) {
      dragState.current = { dragging: 'bottom' };
    } else if (Math.abs(x - rx) < handleSize && Math.abs(y - by) < handleSize) {
      dragState.current = { dragging: 'right' };
    } else {
      dragState.current = { dragging: 'none' };
    }
  };

  const onCanvasMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    const state = dragState.current;
    if (!state || state.dragging === 'none') return;
    const canvas = overlayRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = img.naturalWidth / img.clientWidth;
    const scaleY = img.naturalHeight / img.clientHeight;
    const mg = margin / scaleX;
    if (state.dragging === 'right') {
      const newW = Math.max(1, Math.round((x - mg) * scaleX));
      setTileWidth(newW);
    } else if (state.dragging === 'bottom') {
      const newH = Math.max(1, Math.round((y - mg) * scaleY));
      setTileHeight(newH);
    }
    drawGrid();
  };

  const onCanvasMouseUp: React.MouseEventHandler<HTMLCanvasElement> = () => {
    if (dragState.current) dragState.current.dragging = 'none';
  };

  const cropAndDownload = async () => {
    const img = imgRef.current;
    if (!img) return;
    const zip = new JSZip();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;

    const cols = Math.floor((naturalW + spacingX) / (tileWidth + spacingX));
    const rows = Math.floor((naturalH + spacingY) / (tileHeight + spacingY));

    let count = 0;
    for (let ry = 0; ry < rows; ry++) {
      for (let rx = 0; rx < cols; rx++) {
        const sx = rx * (tileWidth + spacingX);
        const sy = ry * (tileHeight + spacingY);
        if (sx + tileWidth > naturalW || sy + tileHeight > naturalH) continue;
        canvas.width = tileWidth;
        canvas.height = tileHeight;
        ctx.clearRect(0, 0, tileWidth, tileHeight);
        ctx.drawImage(img, sx, sy, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
        const blob = await new Promise<Blob | null>((res) => canvas.toBlob((b) => res(b), 'image/png'));
        if (blob) {
          zip.file(`sprite_${ry}_${rx}.png`, blob);
          count++;
        }
      }
    }

    if (count === 0) return;
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sprites.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="spritesheets-page">
      <h2>Spritesheets</h2>

      <DragNDropFileUploader
        onFile={onFile}
        data-testid="drop-zone"
      />
      
      <div className="preview-controls">
        <TextInput
          type="number"
          label="Tile Width"
          value={tileWidth}
          onChange={(e) => onParamsChange(() => setTileWidth(Number(e.target.value) || 0))}
        />
        <TextInput
          type="number"
          label="Tile Height"
          value={tileHeight}
        onChange={(e) => onParamsChange(() => setTileHeight(Number(e.target.value) || 0))}
        />
        <TextInput
          type="number"
          label="Spacing X"
          value={spacingX}
          onChange={(e) => onParamsChange(() => setSpacingX(Number(e.target.value) || 0))}
        />
        <TextInput
          type="number"
          label="Spacing Y"
          value={spacingY}
          onChange={(e) => onParamsChange(() => setSpacingY(Number(e.target.value) || 0))}
        />
        <button onClick={cropAndDownload}>Crop &amp; Download ZIP</button>
      </div>

      {fileUrl && (
        <div className="preview">
          <h3>Preview</h3>
          
            <div className="preview-image-wrap" style={{ position: 'relative', display: 'inline-block' }}>
            <img ref={imgRef} src={fileUrl} alt="spritesheet preview" onLoad={onImageLoad} style={{ display: 'block', maxWidth: '100%' }} />
            <canvas ref={overlayRef} style={{ position: 'absolute', left: 0, top: 0 }} 
              onMouseDown={onCanvasMouseDown} onMouseMove={onCanvasMouseMove} onMouseUp={onCanvasMouseUp} onMouseLeave={onCanvasMouseUp} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SpritesheetsPage;
