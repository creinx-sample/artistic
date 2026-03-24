export interface Work {
  id: string;
  title: string;
  description: string;
  filename: string; // The real filename from the second screenshot
  language: 'Hindi' | 'English' | 'Tamil' | 'Malayalam';
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
    description: 'Hindi dubbing for the iconic Batman animated series.',
    filename: 'Hindi dub.mp3',
    language: 'Hindi',
    audio: '/audio/Hindi/Hindi dub.mp3',
    year: '2023',
    featured: true,
  },
  {
    id: 'h2',
    title: 'Kahani Sunao',
    description: 'Award-winning podcast series exploring untold stories from the heart of India.',
    filename: 'podcast.hindi.mp3',
    language: 'Hindi',
    audio: '/audio/Hindi/podcast.hindi.mp3',
    year: '2023',
  },
  {
    id: 'h3',
    title: 'Dragon Ball Super',
    description: 'Official Hindi voice for lead characters in the popular anime series.',
    filename: 'movie dub_hindi.mp3',
    language: 'Hindi',
    audio: '/audio/Hindi/movie dub_hindi.mp3',
    year: '2022',
  },

  // English Works
  {
    id: 'e1',
    title: 'Nature Documentary Series',
    description: 'Professional narration for a 10-part wildlife series.',
    filename: 'Audiobbok.eng.mp3',
    language: 'English',
    audio: '/audio/English/Audiobbok.eng.mp3',
    year: '2023',
    featured: true,
  },
  {
    id: 'e2',
    title: 'The Voice Within',
    description: 'A weekly English podcast discussing mental health and personal growth.',
    filename: 'Podcast.eng.mp3',
    language: 'English',
    audio: '/audio/English/Podcast.eng.mp3',
    year: '2022-Present',
  },
  {
    id: 'e3',
    title: 'Corporate Training Modules',
    description: 'Instructional voice-over for Fortune 500 companies.',
    filename: 'coprporate.add.eng.mp3',
    language: 'English',
    audio: '/audio/English/coprporate.add.eng.mp3',
    year: '2023',
  },
  {
    id: 'e4',
    title: 'Emirates Voice Ad',
    description: 'Premium brand commercial for international broadcast.',
    filename: 'Emirates. Corporate add.mp3',
    language: 'English',
    audio: '/audio/English/Emirates. Corporate add.mp3',
    year: '2022',
  },
  {
    id: 'e5',
    title: 'News Broadcast',
    description: 'Formal English news delivery for international audiences.',
    filename: 'news.mp3',
    language: 'English',
    audio: '/audio/English/news.mp3',
    year: '2023',
  },

  // Tamil Works
  {
    id: 't1',
    title: 'Tamil Movie Dubbing (B)',
    description: 'Re-dubbing select classic Tamil films for global platforms.',
    filename: 'movie dub.tamil.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/movie dub.tamil.mp3',
    year: '2023',
    featured: true,
  },
  {
    id: 't2',
    title: 'Chelsea Chronicles Ad',
    description: 'Cultural voice ad exploring the heritage of Chennai.',
    filename: 'corporate add tamil.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/corporate add tamil.mp3',
    year: '2023',
  },
  {
    id: 't3',
    title: 'Tamil Movie Dubbing (A)',
    description: 'Main lead voice performances for high-budget Tamil cinematic releases.',
    filename: 'movie dub_tamil.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/movie dub_tamil.mp3',
    year: '2023',
  },
  {
    id: 't4',
    title: 'Kids Story Tamil',
    description: 'Engaging narration for children\'s educational content.',
    filename: 'kids story tamil.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/kids story tamil.mp3',
    year: '2021-Present',
  },

  // Malayalam Works
  {
    id: 'm1',
    title: 'Malayalam Film Dubbing',
    description: 'Expert voice-over for Malayalam feature films.',
    filename: 'movie dub_malayalam.mp3',
    language: 'Malayalam',
    audio: '/audio/Malayalam/movie dub_malayalam.mp3',
    year: '2023',
    featured: true,
  },
  {
    id: 'm2',
    title: 'Malayalam Serial',
    description: 'Consistent character voice work for leading Malayalam television soaps.',
    filename: 'Malayalam serial.mp3',
    language: 'Malayalam',
    audio: '/audio/Malayalam/Malayalam serial.mp3',
    year: '2023',
  },
];

export const getWorksByLanguage = (language: Work['language']) => 
  works.filter(work => work.language === language);

export const getFeaturedWorks = () => 
  works.filter(work => work.featured);
