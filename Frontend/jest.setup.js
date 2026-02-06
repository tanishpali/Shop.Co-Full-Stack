// jest.setup.js
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for React Router (TextEncoder/Decoder)
if (typeof global.TextEncoder === 'undefined') global.TextEncoder = TextEncoder;
if (typeof global.TextDecoder === 'undefined') global.TextDecoder = TextDecoder;

// Mock import.meta.env (Vite style)
global.importMeta = { env: { VITE_BASE_URL: "http://localhost:3000" } };
global.import = { meta: global.importMeta };

// Testing Library matchers
import '@testing-library/jest-dom';
