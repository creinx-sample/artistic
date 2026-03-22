export interface Work {
  id: string;
  title: string;
  description: string;
  type: 'dubbing' | 'podcast';
  language: 'Hindi' | 'English' | 'Tamil' | 'Malayalam';
  image: string;
  audio: string;
  duration?: string;
  year?: string;
  featured?: boolean;
}

export const works: Work[] = [
  // Hindi Works
  {
    id: 'h1',
    title: 'The Dark Knight Returns',
    description: 'Hindi dubbing for the iconic Batman animated series, bringing the caped crusader to life for Indian audiences.',
    type: 'dubbing',
    language: 'Hindi',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80', // Vintage Library
    audio: '/audio/Hindi/Hindi dub.mp3',
    duration: '2h 15m',
    year: '2023',
    featured: true,
  },
  {
    id: 'h2',
    title: 'Kahani Sunao',
    description: 'Award-winning Hindi podcast exploring untold stories from Indian history and mythology.',
    type: 'podcast',
    language: 'Hindi',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80', // Ink Pen
    audio: '/audio/Hindi/podcast.hindi.mp3',
    duration: '45 episodes',
    year: '2023',
  },
  {
    id: 'h3',
    title: 'Dragon Ball Super',
    description: 'Voice acting for multiple characters in the Hindi dubbed version of the popular anime series.',
    type: 'dubbing',
    language: 'Hindi',
    image: 'https://images.unsplash.com/photo-1544816153-09730bbf94f9?auto=format&fit=crop&q=80', // Botanical / Old Journal
    audio: '/audio/Hindi/movie dub_hindi.mp3',
    duration: '131 episodes',
    year: '2022',
  },

  // English Works
  {
    id: 'e1',
    title: 'Nature Documentary Series',
    description: 'Narration for a 10-part nature documentary series exploring wildlife across continents.',
    type: 'dubbing',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1512485600744-832303049015?auto=format&fit=crop&q=80', // Typewriter / Letters
    audio: '/audio/English/Audiobbok.eng.mp3',
    duration: '10 episodes',
    year: '2023',
    featured: true,
  },
  {
    id: 'e2',
    title: 'The Voice Within',
    description: 'English podcast featuring interviews with voice artists from around the world.',
    type: 'podcast',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80', // Vintage Library
    audio: '/audio/English/Podcast.eng.mp3',
    duration: '85 episodes',
    year: '2022-Present',
  },
  {
    id: 'e3',
    title: 'Corporate Training Modules',
    description: 'Professional voice-over for Fortune 500 company training and onboarding materials.',
    type: 'dubbing',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80', // Ink Pen
    audio: '/audio/English/coprporate.add.eng.mp3',
    duration: '50+ modules',
    year: '2023',
  },
  {
    id: 'e4',
    title: 'Emirates Voice Ad',
    description: 'Commercial voice performance for premium travel experiences.',
    type: 'dubbing',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1544816153-09730bbf94f9?auto=format&fit=crop&q=80', // Botanical / Old Journal
    audio: '/audio/English/Emirates. Corporate add.mp3',
    duration: '30s',
    year: '2022',
  },

  // Tamil Works
  {
    id: 't1',
    title: 'Kollywood Classics',
    description: 'Re-dubbing classic Tamil films with enhanced audio quality for streaming platforms.',
    type: 'dubbing',
    language: 'Tamil',
    image: 'https://images.unsplash.com/photo-1512485600744-832303049015?auto=format&fit=crop&q=80', // Typewriter / Letters
    audio: '/audio/Tamil/movie dub.tamil.mp3',
    duration: '25 films',
    year: '2023',
    featured: true,
  },
  {
    id: 't2',
    title: 'Chennai Chronicles',
    description: 'Tamil podcast exploring the rich history and culture of Chennai through storytelling.',
    type: 'podcast',
    language: 'Tamil',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80', // Vintage Library
    audio: '/audio/Tamil/corporate add tamil.mp3',
    duration: '60 episodes',
    year: '2023',
  },
  {
    id: 't3',
    title: 'Tamil Movie Dubbing',
    description: 'Voice acting for popular anime series dubbed in Tamil for regional audiences.',
    type: 'dubbing',
    language: 'Tamil',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80', // Ink Pen
    audio: '/audio/Tamil/movie dub_tamil.mp3',
    duration: '200+ episodes',
    year: '2022',
  },
  {
    id: 't4',
    title: 'Kids Story Tamil',
    description: 'Engaging narration for children stories in Tamil.',
    type: 'podcast',
    language: 'Tamil',
    image: 'https://images.unsplash.com/photo-1544816153-09730bbf94f9?auto=format&fit=crop&q=80', // Botanical / Old Journal
    audio: '/audio/Tamil/kids story tamil.mp3',
    duration: 'Stories',
    year: '2021-Present',
  },

  // Malayalam Works
  {
    id: 'm1',
    title: 'Malayalam Film Dubbing',
    description: 'Voice dubbing for international films released in Malayalam across Kerala.',
    type: 'dubbing',
    language: 'Malayalam',
    image: 'https://images.unsplash.com/photo-1512485600744-832303049015?auto=format&fit=crop&q=80', // Typewriter / Letters
    audio: '/audio/Malayalam/movie dub_malayalam.mp3',
    duration: '30 films',
    year: '2023',
    featured: true,
  },
  {
    id: 'm2',
    title: 'Malayalam Serial',
    description: 'Voice performance for popular television series in Malayalam.',
    type: 'dubbing',
    language: 'Malayalam',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80', // Vintage Library
    audio: '/audio/Malayalam/Malayalam serial.mp3',
    duration: 'Serial',
    year: '2023',
  },
];

export const getWorksByLanguage = (language: Work['language']) => 
  works.filter(work => work.language === language);

export const getFeaturedWorks = () => 
  works.filter(work => work.featured);

export const getWorksByType = (type: Work['type']) => 
  works.filter(work => work.type === type);
