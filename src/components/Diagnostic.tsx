import React, { useState } from 'react';
import { Mentor, User } from '../types';
import { HelpCircle, Star, Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface DiagnosticProps {
  mentor: Mentor;
  user: User;
  onUpdateUser: (newUser: User) => void;
  onUpdateMentor: (newMentor: Mentor) => void;
}

export const Diagnostic: React.FC<DiagnosticProps> = ({
  mentor,
  user,
  onUpdateUser,
  onUpdateMentor,
}) => {
  const [blockage, setBlockage] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState<{
    text: string;
    defi: string;
    realisation: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessVote, setShowSuccessVote] = useState(false);

  const handleDiagnose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockage.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Structure a highly contextualized and professional response based on mentor traits
      const styleStr = mentor.tags_style.join(', ');
      const responseText = `En tant que mentor d'orientation ${styleStr}, j'ai analysé votre situation en ${user.domaine_actif}. \n\nVotre blocage (« ${blockage.trim()} ») reflète un défi classique d'alignement stratégique. Face à cette résistance, ma doctrine recommande de ne pas chercher de solution de contournement temporaire, mais de s'attaquer de front à la racine structurelle du problème.`;

      setDiagnosisResult({
        text: responseText,
        defi: mentor.defi_signature,
        realisation: mentor.realisation_mesurable,
      });
      setIsSubmitting(false);

      // Increase progress slightly for the active domain when they complete a diagnostic
      const currentProgress = user.progression_par_domaine[user.domaine_actif] || { impact: 0, discipline_streak: 0 };
      if (currentProgress.impact < 100) {
        const nextImpact = Math.min(100, currentProgress.impact + 5);
        const nextProgression = {
          ...user.progression_par_domaine,
          [user.domaine_actif]: {
            ...currentProgress,
            impact: nextImpact
          }
        };
        onUpdateUser({
          ...user,
          progression_par_domaine: nextProgression
        });
      }
    }, 600);
  };

  const handleVote = (rating: number) => {
    const existingVotes = user.votes || {};
    const previousVote = existingVotes[mentor.id];
    
    // Update user votes
    const updatedUserVotes = {
      ...existingVotes,
      [mentor.id]: rating
    };

    // Calculate new community rating for the mentor
    const currentNbVotes = mentor.nb_votes || 40;
    let newNbVotes = currentNbVotes;
    let newNote = mentor.note_communaute;

    if (previousVote !== undefined) {
      // User has already voted, adjust current rating without increasing vote count
      const totalScore = mentor.note_communaute * currentNbVotes;
      newNote = (totalScore - previousVote + rating) / currentNbVotes;
    } else {
      // New vote
      newNbVotes = currentNbVotes + 1;
      const totalScore = mentor.note_communaute * currentNbVotes;
      newNote = (totalScore + rating) / newNbVotes;
    }

    // Keep it neat with 2 decimal places max
    newNote = Math.round(newNote * 100) / 100;

    // Rule: if community note < 3.5 and total votes > 50, mentor becomes inactive
    const isActif = !(newNote < 3.5 && newNbVotes > 50);

    const updatedMentor: Mentor = {
      ...mentor,
      note_communaute: newNote,
      nb_votes: newNbVotes,
      actif: isActif,
    };

    onUpdateMentor(updatedMentor);
    onUpdateUser({
      ...user,
      votes: updatedUserVotes,
    });

    setShowSuccessVote(true);
    setTimeout(() => setShowSuccessVote(false), 2000);
  };

  const currentUserVote = (user.votes || {})[mentor.id] || 0;

  return (
    <div className="space-y-6 animate-fade-in" id="diagnostic-module">
      <div className="flex items-center gap-3 border-b border-concrete/40 pb-3">
        <div className="p-2 bg-copper/10 text-copper rounded-lg">
          <HelpCircle size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-offwhite uppercase tracking-tight">
            Diagnostic & Résolution de Blocages
          </h3>
          <p className="text-zinc-400 text-xs font-sans">
            Identifiez votre verrou #1 en <span className="text-copper font-medium">{user.domaine_actif}</span> pour obtenir une feuille de route formulée par {mentor.nom}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Input Form */}
        <div className="lg:col-span-5 bg-card-bg border border-concrete/30 p-5 rounded-xl space-y-4 shadow-md">
          <form onSubmit={handleDiagnose} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Quel est votre goulot d'étranglement ou blocage #1 ?
              </label>
              <textarea
                value={blockage}
                onChange={(e) => setBlockage(e.target.value)}
                placeholder="Ex : Je n'arrive pas à déléguer mes tâches quotidiennes et je me sens débordé, ce qui bloque la croissance de mon département..."
                rows={4}
                className="w-full bg-[#181818] border border-concrete/40 rounded-lg p-3 text-sm text-offwhite placeholder:text-zinc-600 focus:outline-none focus:border-copper/80 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !blockage.trim()}
              className="w-full py-3 bg-copper hover:bg-copper-hover disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-bg-deep uppercase font-bold tracking-wider text-xs font-mono flex items-center justify-center gap-2 transition rounded-xl cursor-pointer shadow-lg shadow-copper/10"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-bg-deep border-t-transparent rounded-full animate-spin" />
                  Analyse de la situation...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} /> Consulter la doctrine de {mentor.nom}
                </span>
              )}
            </button>
          </form>

          {/* Community Rating Widget */}
          <div className="pt-4 border-t border-concrete/20 space-y-3">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Évaluation communautaire
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Ce mentor vous a-t-il aidé à y voir plus clair ? Exprimez votre vote pour influencer sa note globale de confiance.
            </p>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleVote(star)}
                  className="p-1 hover:scale-115 transition cursor-pointer text-zinc-600 hover:text-amber-500"
                  title={`Attribuer ${star} étoiles`}
                >
                  <Star
                    size={22}
                    className={`${
                      star <= currentUserVote
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-zinc-700'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-mono text-zinc-400">
                {currentUserVote > 0 ? `Votre vote : ${currentUserVote}/5` : 'Aucun vote'}
              </span>
            </div>

            {showSuccessVote && (
              <div className="text-[11px] text-impact-hover font-mono flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 size={12} /> Vote enregistré et pondéré avec succès !
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 bg-[#161616] px-3 py-2 rounded-lg">
              <span>Note : {mentor.note_communaute}/5 ({mentor.nb_votes} votes)</span>
              {mentor.note_communaute < 3.8 && mentor.nb_votes && mentor.nb_votes > 35 ? (
                <span className="text-amber-500 flex items-center gap-1">
                  <ShieldAlert size={10} /> Risque de mise en veille
                </span>
              ) : (
                <span className="text-impact-hover">Vérifié & Actif</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Results Display */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {diagnosisResult ? (
            <div className="bg-[#111] border border-concrete/40 p-5 rounded-xl space-y-5 animate-fade-in h-full flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-concrete/20 pb-2">
                  <span className="text-[10px] font-mono bg-copper/10 text-copper px-2 py-0.5 rounded uppercase tracking-wider">
                    SYNTHÈSE DE DOCTRINE
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    ID : {mentor.id.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-offwhite">L'ANALYSE DE {mentor.nom.toUpperCase()} :</h4>
                  <p className="text-zinc-300 text-xs leading-relaxed font-sans whitespace-pre-line">
                    {diagnosisResult.text}
                  </p>
                </div>

                <div className="p-4 bg-amber-950/10 border border-copper/20 rounded-xl space-y-2">
                  <h4 className="text-xs uppercase font-bold text-copper font-mono flex items-center gap-1.5">
                    <Sparkles size={12} /> DÉFI SIGNATURE COMPORTEMENTAL :
                  </h4>
                  <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                    « {diagnosisResult.defi} »
                  </p>
                </div>

                <div className="p-4 bg-emerald-950/10 border border-impact/20 rounded-xl space-y-2">
                  <h4 className="text-xs uppercase font-bold text-impact-hover font-mono flex items-center gap-1.5">
                    <CheckCircle2 size={12} /> RÉALISATION MESURABLE DE RÉFÉRENCE :
                  </h4>
                  <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                    {diagnosisResult.realisation}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-concrete/15 text-[10px] font-mono text-zinc-500 flex justify-between items-center">
                <span>IMPACT DU DIAGNOSTIC ENREGISTRÉ</span>
                <span className="text-impact-hover">+5% D'IMPACT SUR LE DOMAINE</span>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-concrete/30 rounded-xl p-8 text-center flex flex-col items-center justify-center h-full min-h-[300px] text-zinc-500 bg-[#0F0F0F] space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-concrete/30 flex items-center justify-center text-zinc-400">
                <HelpCircle size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">En attente de soumission</p>
                <p className="text-[11px] max-w-sm mx-auto leading-normal">
                  Rédigez brièvement votre blocage ou goulot d'étranglement de vie dans le formulaire de gauche, puis soumettez-le pour charger l'analyse de votre mentor actif.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
