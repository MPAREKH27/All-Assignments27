import { AppIconItem, ImageOptimizationData, HeroPromptComparison, EngineDifference } from './types';

// Importing generated images using Vite asset imports
import scooterJpg from './assets/images/scooter_app_icon_1785925808648.jpg';
import scooterWebp from './assets/images/scooter_app_icon_1785925808648_optimized.webp';
import scooterPng from './assets/images/scooter_app_icon_1785925808648.png';

import cricketJpg from './assets/images/cricket_app_icon_1785925821717.jpg';
import cricketWebp from './assets/images/cricket_app_icon_1785925821717_optimized.webp';
import cricketPng from './assets/images/cricket_app_icon_1785925821717.png';

import ticketJpg from './assets/images/ticket_app_icon_1785925835092.jpg';
import ticketWebp from './assets/images/ticket_app_icon_1785925835092_optimized.webp';
import ticketPng from './assets/images/ticket_app_icon_1785925835092.png';

import foodBgJpg from './assets/images/food_app_bg_1785925852889.jpg';
import foodBgWebp from './assets/images/food_app_bg_1785925852889_optimized.webp';

import musicRealJpg from './assets/images/music_hero_real_1785925874383.jpg';
import musicRealWebp from './assets/images/music_hero_real_1785925874383_optimized.webp';

import musicCartoonJpg from './assets/images/music_hero_cartoon_1785925889948.jpg';
import musicCartoonWebp from './assets/images/music_hero_cartoon_1785925889948_optimized.webp';

import fintechJpg from './assets/images/fintech_hero_gen_1785925904511.jpg';
import fintechWebp from './assets/images/fintech_hero_gen_1785925904511_optimized.webp';

export const APP_ICONS: AppIconItem[] = [
  {
    id: 'scooter-icon',
    name: 'Food Delivery Scooter',
    category: 'Logistics & Quick Commerce',
    prompt: 'Minimalist modern 3D app icon of a sleek red food delivery scooter with a thermal delivery box, vibrant isometric view, smooth metallic finish, clean soft lighting, isolated on smooth white gradient background, app icon style, high detail',
    jpgUrl: scooterJpg,
    webpUrl: scooterWebp,
    pngUrl: scooterPng,
    jpgSize: '448.8 KB',
    webpSize: '30.7 KB',
    pngSize: '1.13 MB',
  },
  {
    id: 'cricket-icon',
    name: 'Cricket Bat & Ball',
    category: 'Sports & Fantasy Gaming',
    prompt: 'Minimalist modern 3D app icon of a premium wooden cricket bat crossing a red seam cricket ball, energetic stadium spotlighting, glossy finish, isolated on dark navy background, clean vector 3D render app icon style',
    jpgUrl: cricketJpg,
    webpUrl: cricketWebp,
    pngUrl: cricketPng,
    jpgSize: '484.1 KB',
    webpSize: '34.2 KB',
    pngSize: '1.22 MB',
  },
  {
    id: 'ticket-icon',
    name: 'Cinema Movie Ticket',
    category: 'Entertainment & Ticketing',
    prompt: 'Minimalist modern 3D app icon of a golden yellow retro cinema movie ticket with star perforations and film reel accent, warm glow, glossy acrylic texture, isolated on dark violet gradient background, app icon style',
    jpgUrl: ticketJpg,
    webpUrl: ticketWebp,
    pngUrl: ticketPng,
    jpgSize: '540.5 KB',
    webpSize: '35.3 KB',
    pngSize: '1.40 MB',
  },
];

export const FOOD_APP_DATA = {
  prompt: 'Vibrant and energetic background image for a modern food app homepage, deep warm red and orange tones, bustling modern cafe ambient lighting, fresh delicious gourmet dishes blurred softly in backdrop, stylish bokeh effect, high contrast, warm inviting dining vibe',
  bgJpgUrl: foodBgJpg,
  bgWebpUrl: foodBgWebp,
  jpgSize: '893.4 KB',
  webpSize: '106.0 KB',
  aspectRatio: '16:9',
  specs: {
    mood: 'Energetic, appetising, celebratory, modern urban cafe atmosphere',
    lighting: 'Warm ambient bokeh backlighting with golden spotlighting on culinary focus zones',
    colorPalette: 'Deep crimson (#E23744), saffron orange, warm dark amber (#1C1C1C overlay)',
  },
};

export const OPTIMIZATION_ITEMS: ImageOptimizationData[] = [
  {
    filename: 'food_app_bg.jpg',
    originalJpg: foodBgJpg,
    originalSize: '893.4 KB',
    optimizedWebp: foodBgWebp,
    optimizedSize: '106.0 KB',
    reductionPercentage: '88.1%',
    width: 1920,
    height: 1080,
  },
  {
    filename: 'scooter_app_icon.jpg',
    originalJpg: scooterJpg,
    originalSize: '448.8 KB',
    optimizedWebp: scooterWebp,
    optimizedSize: '30.7 KB',
    reductionPercentage: '93.1%',
    width: 1024,
    height: 1024,
  },
  {
    filename: 'music_hero_real.jpg',
    originalJpg: musicRealJpg,
    originalSize: '756.5 KB',
    optimizedWebp: musicRealWebp,
    optimizedSize: '76.8 KB',
    reductionPercentage: '89.8%',
    width: 1920,
    height: 1080,
  },
  {
    filename: 'fintech_hero_gen.jpg',
    originalJpg: fintechJpg,
    originalSize: '627.8 KB',
    optimizedWebp: fintechWebp,
    optimizedSize: '52.5 KB',
    reductionPercentage: '91.6%',
    width: 1920,
    height: 1080,
  },
];

export const MUSIC_PROMPT_COMPARISONS: HeroPromptComparison[] = [
  {
    id: 'real-style',
    styleName: 'Realistic Cinematic Style',
    prompt: 'Photorealistic cinematic hero image for a music streaming app landing page, glossy high-end wireless headphones resting on a dark brushed studio audio mixing desk, vibrant neon violet and cyan backlight, warm golden spotlighting, shallow depth of field, 8k render',
    imageUrl: musicRealJpg,
    webpUrl: musicRealWebp,
    fileSize: '76.8 KB (WebP)',
    strengths: [
      'High-end audiophile fidelity & hardware realism',
      'Atmospheric studio neon lighting creates premium perception',
      'Tactile depth of field draws focus to hardware acoustics',
      'Ideal for pro-audio subscriptions & loss-less streaming features',
    ],
    bestUseCases: [
      'Premium Hi-Res Lossless Audio Subscriptions',
      'Desktop & Smart Home Sound System integrations',
      'Pro-podcaster & DJ equipment gear showcases',
    ],
  },
  {
    id: 'cartoon-style',
    styleName: '2D Flat Cartoon Vector Style',
    prompt: 'Vibrant flat 2D cartoon illustration hero image for a music streaming app landing page, cheerful animated character with big colorful headphones grooving to rhythm, floating glowing musical notes and dynamic soundwaves, pastel gradients, clean vector outline style',
    imageUrl: musicCartoonJpg,
    webpUrl: musicCartoonWebp,
    fileSize: '67.8 KB (WebP)',
    strengths: [
      'Playful emotional resonance and accessible youth appeal',
      'Lively dynamic movement via floating musical note particles',
      'Faster visual scan time with crisp vector outlines',
      'Highly adaptable to mobile responsive web layouts and dark/light modes',
    ],
    bestUseCases: [
      'Gen-Z and Youth-targeted social music sharing apps',
      'Gamified playlists, Spotify-Wrapped style year-in-review features',
      'Casual mood-based music discovery apps',
    ],
  },
];

export const MUSIC_COMPARISON_SUMMARY = {
  winner: '2D Flat Cartoon Vector Style (For Mass Audience Consumer App)',
  verdict: 'While the Realistic Cinematic style creates a sense of luxury for audiophiles, the 2D Cartoon Vector style excels for a general consumer music streaming landing page because it communicates joy, vibrant movement, and relatable user emotion without feeling overly commercial or hardware-focused.',
  keyReasons: [
    {
      title: 'Emotional Connection vs. Object Focus',
      description: 'The cartoon style highlights a human character enjoying music, making visitors immediately envision themselves listening. The realistic render focuses on static hardware gear on a desk.',
    },
    {
      title: 'Brand Friendliness & Scalability',
      description: 'Vector-style cartoon art integrates seamlessly with UI elements (buttons, badges, floating cards) without background clashing or harsh photographic shadows.',
    },
    {
      title: 'Asset Weight & Compression Parity',
      description: 'Vector-based cartoon images compress to lower file sizes (67.8 KB vs 76.8 KB) while maintaining razor-sharp rendering on high-DPI retina displays.',
    },
  ],
};

export const FINTECH_PROMPT = 'Futuristic 3D financial technology app hero landing image, floating translucent holographic credit card emitting glowing digital currency nodes and growth charts, sleek gradient background in deep navy blue and emerald cyan, glassmorphism texture, high tech finance aesthetic';

export const FINTECH_HERO_IMAGE = {
  jpg: fintechJpg,
  webp: fintechWebp,
  size: '52.5 KB (WebP)',
};

export const FINTECH_ENGINE_DIFFERENCES: EngineDifference[] = [
  {
    feature: 'Specular Lighting & Ambient Glow',
    midjourneyObserved: 'Hyper-dramatic rim lighting with exaggerated lens flares, volumetric neon beam scattering, and deep moody contrast.',
    fireflyObserved: 'Clean, physically balanced studio lighting with controlled soft highlights, preserving UI readability and color accuracy.',
    impactOnUi: 'Firefly images allow live white/light UI copy to remain legible without heavy dark background gradient scrims.',
  },
  {
    feature: 'Geometric & Glassmorphism Precision',
    midjourneyObserved: 'Artistic interpretative geometry; curves have slight organic warp and stylized depth-of-field blur on edges.',
    fireflyObserved: 'Pin-sharp straight vector edges, mathematically precise card borders, transparent glass reflection layers with true refraction.',
    impactOnUi: 'Firefly matches modern corporate design systems (Figma component guidelines) with sharp, non-distorted UI mockups.',
  },
  {
    feature: 'Color Grading & Corporate Palette Fidelity',
    midjourneyObserved: 'Stylized cinematic color grading with heavy blue/cyan split-toning and dark shadow crushed blacks.',
    fireflyObserved: 'Neutral gradient transitions adhering to exact RGB color prompts (Emerald Cyan & Navy) without color casting.',
    impactOnUi: 'Firefly ensures brand identity guidelines are preserved without unpredictable color shifts.',
  },
];
