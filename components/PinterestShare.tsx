'use client';

interface PinterestShareProps {
  imageUrl?: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PinterestShare({ 
  imageUrl, 
  description, 
  className = '',
  children 
}: PinterestShareProps) {
  const handlePin = () => {
    const url = encodeURIComponent(window.location.href);
    const media = imageUrl ? encodeURIComponent(imageUrl) : '';
    const desc = encodeURIComponent(description);
    
    const pinUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${desc}`;
    window.open(pinUrl, '_blank', 'width=750,height=650');
  };

  return (
    <button
      onClick={handlePin}
      className={`pinterest-share-btn ${className}`}
      aria-label="Save to Pinterest"
    >
      {children || (
        <>
          <span className="pinterest-icon">📌</span>
          <span>Save</span>
        </>
      )}
    </button>
  );
}