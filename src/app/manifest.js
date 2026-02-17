export default function manifest() {
  return {
    name: 'Radical Thinking',
    short_name: 'Radical Thinking',
    description: 'Radical Thinking is an AI-native agency that brings bold ideas to life.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon-light.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}