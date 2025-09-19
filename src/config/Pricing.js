// src/config/pricing.js
export const PRICES = { mini: 3.5, classique: 6.9, grand: 9.9 };

export const OPTS = { music: 1.5, sfx: 1.5, voice: 3.9, intro: 1.5, express: 4.0 };

export const OPTIONS_BY_PLAN = {
  mini: ["voice", "intro", "express"],           // Mini : voix, intro/fin, express
  classique: ["music", "sfx", "voice", "intro"], // Classique : pas d'express
  grand: ["music", "sfx", "voice", "intro", "express"],
};

// Optionnel si tu veux les réutiliser ailleurs :
export const BASE = { ...PRICES, decouverte: 3.49 };
export const LABEL = {
  mini: "Formule Mini",
  classique: "Formule Classique",
  grand: "Formule Grand Héros",
  decouverte: "Offre découverte",
};