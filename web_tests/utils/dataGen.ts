// web_tests/utils/dataGen.ts
/**
 * Deterministic test-data generator for Playwright tests.
 *
 * Usage:
 *   import { DataGen } from "utils/dataGen";
 *   const dg = new DataGen("signup1");
 *   const email = dg.email();
 */

function hashSeed(seed: string): number {
  // Stable 32-bit hash for a string seed
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Mulberry32 PRNG (small, deterministic)
function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export class DataGen {
  private rnd: () => number;

  constructor(seed: string = "default") {
    this.rnd = mulberry32(hashSeed(seed));
  }

  letters(n = 8): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let s = "";
    for (let i = 0; i < n; i++) {
      const idx = Math.floor(this.rnd() * alphabet.length);
      s += alphabet[idx];
    }
    return s;
  }

  digits(n = 6): string {
    const d = "0123456789";
    let s = "";
    for (let i = 0; i < n; i++) {
      const idx = Math.floor(this.rnd() * d.length);
      s += d[idx];
    }
    return s;
  }

  username(prefix = "user", n = 6): string {
    return `${prefix}_${this.letters(n)}`;
  }

  email(domain = "example.com", localLen = 8): string {
    return `${this.letters(localLen)}@${domain}`;
  }

  intRange(lo: number, hi: number): number {
    const v = this.rnd();
    return Math.floor(v * (hi - lo + 1)) + lo;
  }
}
