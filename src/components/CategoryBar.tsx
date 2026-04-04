import React from 'react';
import { type Category } from '../data/works';

interface CategoryBarProps {
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

const CATEGORIES: (Category | 'all')[] = [
  'all',
  'Tamil Storytelling',
  'Malayalam Podcasts',
  'Voice Acting',
  'Audiobooks',
  'OTT Content',
  'E-Learning',
  'Hindi Dubbing',
  'English Narration'
];

export default function CategoryBar({ activeCategory, onCategoryChange }: CategoryBarProps) {
  return (
    <div className="category-bar-wrapper reveal">
      <div className="category-scroll-container" style={{ 
        overflowX: 'auto', 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div className="category-bar" style={{ flexWrap: 'nowrap', width: 'max-content' }}>
          {CATEGORIES.map((cat, idx) => (
            <React.Fragment key={cat}>
              <button 
                className={`category-item ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => onCategoryChange(cat)}
                style={{ whiteSpace: 'nowrap' }}
              >
                {cat === 'all' ? 'All Works' : cat}
              </button>
              {idx < CATEGORIES.length - 1 && <span className="category-diamond">♦</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
