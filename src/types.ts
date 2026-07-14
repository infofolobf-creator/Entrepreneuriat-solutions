/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Mentor {
  id: string;
  nom: string;
  domaines: string[];
  tags_style: string[];
  pays: string;
  langues: string[];
  citation_par_domaine: Record<string, string>;
  defi_signature: string;
  realisation_mesurable: string;
  actif: boolean;
  note_communaute: number;
  nb_suivis: number;
  badge_verifie: boolean;
  nb_votes?: number; // Optional tracking of total votes
}

export interface User {
  domaine_actif: string;
  mentor_actif_id: string;
  maitres_principaux: string[];
  tous_mes_mentors: string[];
  progression_par_domaine: Record<string, { impact: number; discipline_streak: number }>;
  votes: Record<string, number>; // Maps mentor_id to user's vote (1 to 5 stars)
}
