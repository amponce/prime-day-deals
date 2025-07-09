'use client';

import React, { useRef, useState, useEffect } from 'react';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export default function SwipeableCard({ 
  children, 
  onSwipeLeft, 
  onSwipeRight,
  threshold = 50 
}: SwipeableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [transform, setTransform] = useState('translateX(0px)');
  const [opacity, setOpacity] = useState(1);

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setCurrentX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    setCurrentX(clientX);
    const diffX = clientX - startX;
    const absDiff = Math.abs(diffX);
    
    // Calculate transform and opacity
    const newTransform = `translateX(${diffX}px) rotate(${diffX * 0.1}deg)`;
    const newOpacity = Math.max(0, 1 - absDiff / 200);
    
    setTransform(newTransform);
    setOpacity(newOpacity);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const diffX = currentX - startX;
    const absDiff = Math.abs(diffX);
    
    if (absDiff > threshold) {
      // Swipe animation
      const direction = diffX > 0 ? 1 : -1;
      setTransform(`translateX(${direction * window.innerWidth}px) rotate(${direction * 30}deg)`);
      setOpacity(0);
      
      // Call callback after animation
      setTimeout(() => {
        if (diffX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (diffX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
        
        // Reset card position
        setTransform('translateX(0px)');
        setOpacity(1);
      }, 300);
    } else {
      // Snap back
      setTransform('translateX(0px)');
      setOpacity(1);
    }
    
    setIsDragging(false);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      ref={cardRef}
      className="relative touch-pan-y"
      style={{
        transform,
        opacity,
        transition: isDragging ? 'none' : 'all 0.3s ease-out',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {children}
      
    </div>
  );
}