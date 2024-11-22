import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  
  compilerOptions: {
    // Optionally enable compatibility with the Svelte 4 API
    compatibility: {
      componentApi: 4, // This enables support for the old 'new' syntax (Svelte 4)
    },
  },
};
