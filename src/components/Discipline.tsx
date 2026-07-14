import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { ShieldCheck, Calendar, Award, Star, Flame, Zap, ShieldAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface DisciplineProps {
  user: User;
  onUpdateUser: (newUser: User) => void;
}

// Customized 3 daily habits for each of the 10 domains
const DOMAIN_HABITS: Record<string, string[]> = {
  "Professionnel": [
    "Planifier et consigner par écrit les 3 priorités stratégiques absolues de la journée.",
    "Exécuter 90 minutes de travail concentré (Deep Work) sans aucune notification.",
    "Rédiger un mémo ou un audit d'amélioration sur un processus bloquant."
  ],
  "Personnel": [
    "Consacrer 15 minutes au réveil à la lecture active d'un livre de croissance.",
    "Pratiquer l'auto-réflexion ou tenir son journal personnel pendant 10 minutes.",
    "Prendre une douche froide ou accomplir une tâche inconfortable pour forger la volonté."
  ],
  "Couple": [
    "Exprimer de vive voix une appréciation honnête et sincère à son conjoint.",
    "Réserver au moins 30 minutes de temps d'échange de qualité, hors de tout écran.",
    "Faire une micro-attention ou un geste bienveillant inattendu pour renforcer le lien."
  ],
  "Famille": [
    "Prendre un repas complet en famille en instaurant une déconnexion numérique totale.",
    "Prendre 15 minutes individuelles de discussion ou d'écoute attentive avec son enfant.",
    "Raconter une anecdote de la lignée familiale ou une valeur d'héritage au foyer."
  ],
  "Spiritualité": [
    "Méditer en silence ou faire des exercices de respiration consciente pendant 10 minutes.",
    "Exprimer et noter par écrit 3 gratitudes précises pour la journée écoulée.",
    "Réaliser une action désintéressée ou un geste d'aide anonyme pour la communauté."
  ],
  "Finance": [
    "Enregistrer et catégoriser toutes les transactions financières de la veille.",
    "Différer de 24h tout achat impulsif ou non planifié dans le budget mensuel.",
    "Consacrer 15 minutes à l'étude d'un investissement ou à l'automatisation de l'épargne."
  ],
  "Amitié": [
    "Prendre des nouvelles directes d'un ami de valeur par un appel ou message sincère.",
    "Se rendre disponible pour aider ou conseiller un ami sur un défi personnel.",
    "Planifier un moment de convivialité ou de partage de connaissances avec son cercle."
  ],
  "Éducation": [
    "Apprendre une nouvelle notion complexe et essayer de l'expliquer simplement.",
    "Lire au moins 5 pages d'un ouvrage scientifique, d'un article de recherche ou historique.",
    "Mettre à jour ses fiches de connaissances ou son résumé visuel d'apprentissage."
  ],
  "Santé / Bien-être": [
    "Hydrater le corps de manière continue en buvant au moins 2 litres d'eau pure.",
    "Exécuter au moins 30 minutes d'activité physique (renforcement, marche ou cardio).",
    "Couper tous les écrans 1 heure avant le coucher pour préserver le sommeil réparateur."
  ],
  "Leadership / Gestion": [
    "Prendre une décision difficile en suspens plutôt que de la reporter au lendemain.",
    "Déléguer ou clarifier une responsabilité auprès d'un collaborateur clé.",
    "Faire preuve de courage managérial en donnant un feedback constructif et direct."
  ]
};

export const Discipline: React.FC<DisciplineProps> = ({ user, onUpdateUser }) => {
  const habits = DOMAIN_HABITS[user.domaine_actif] || DOMAIN_HABITS["Professionnel"];
  
  // Local state for checkboxes
  const [checkedState, setCheckedState] = useState<boolean[]>([false, false, false]);
  const [dayValidated, setDayValidated] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const activeProgress = user.progression_par_domaine[user.domaine_actif] || { impact: 0, discipline_streak: 0 };
  const currentStreak = activeProgress.discipline_streak;

  // Reset checkboxes when domain changes
  useEffect(() => {
    setCheckedState([false, false, false]);
    setDayValidated(false);
  }, [user.domaine_actif]);

  const handleCheckboxChange = (index: number) => {
    if (dayValidated) return;
    const nextState = [...checkedState];
    nextState[index] = !nextState[index];
    setCheckedState(nextState);
  };

  const handleValidateDay = () => {
    if (!checkedState.every(Boolean) || dayValidated) return;

    setDayValidated(true);

    const nextStreak = currentStreak + 1;
    const nextImpact = Math.min(100, activeProgress.impact + 10); // +10% impact for validation

    const nextProgression = {
      ...user.progression_par_domaine,
      [user.domaine_actif]: {
        impact: nextImpact,
        discipline_streak: nextStreak
      }
    };

    onUpdateUser({
      ...user,
      progression_par_domaine: nextProgression
    });

    // Celebration modal triggers at exactly 30 days
    if (nextStreak === 30) {
      setShowCelebration(true);
    }
  };

  // Simulator helper: allows quick adjustments for evaluation
  const adjustStreak = (amount: number) => {
    const nextStreak = Math.max(0, currentStreak + amount);
    
    const nextProgression = {
      ...user.progression_par_domaine,
      [user.domaine_actif]: {
        ...activeProgress,
        discipline_streak: nextStreak
      }
    };

    onUpdateUser({
      ...user,
      progression_par_domaine: nextProgression
    });

    if (nextStreak === 30) {
      setShowCelebration(true);
    }
  };

  const setSpecificStreak = (target: number) => {
    const nextProgression = {
      ...user.progression_par_domaine,
      [user.domaine_actif]: {
        ...activeProgress,
        discipline_streak: target
      }
    };

    onUpdateUser({
      ...user,
      progression_par_domaine: nextProgression
    });

    if (target === 30) {
      setShowCelebration(true);
    }
  };

  const allChecked = checkedState.every(Boolean);

  // Calculate Rank Title based on current streak
  const getRankInfo = (streak: number) => {
    if (streak >= 30) return { title: "Bâtisseur d'Empire", color: "text-amber-500", bg: "bg-amber-950/10", border: "border-amber-500/30" };
    if (streak >= 15) return { title: "Capitaine d'Industrie", color: "text-copper", bg: "bg-orange-950/10", border: "border-copper/30" };
    if (streak >= 5) return { title: "Planificateur d'Usine", color: "text-impact-hover", bg: "bg-emerald-950/10", border: "border-emerald-500/30" };
    return { title: "Éveilleur National", color: "text-zinc-400", bg: "bg-zinc-900/40", border: "border-concrete/20" };
  };

  const currentRank = getRankInfo(currentStreak);

  return (
    <div className="space-y-6 animate-fade-in" id="discipline-module">
      <div className="flex items-center gap-3 border-b border-concrete/40 pb-3">
        <div className="p-2 bg-copper/10 text-copper rounded-lg">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-offwhite uppercase tracking-tight">
            Forge de Discipline Quotidienne
          </h3>
          <p className="text-zinc-400 text-xs font-sans">
            La discipline constante est la clé du succès. Validez vos 3 actions quotidiennes spécifiques en <span className="text-copper font-medium">{user.domaine_actif}</span> pour forger votre série.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Checkbox Panel */}
        <div className="lg:col-span-7 bg-card-bg border border-concrete/40 p-5 rounded-2xl shadow-lg space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-concrete/15 pb-2">
              <span className="text-[10px] font-mono text-copper uppercase tracking-wider font-bold">
                FEUILLE DE ROUTE DU JOUR ({user.domaine_actif.toUpperCase()})
              </span>
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                <Calendar size={12} /> STATUT : {dayValidated ? 'VALIDE' : 'EN COURS'}
              </span>
            </div>

            <div className="space-y-3">
              {habits.map((habit, idx) => {
                const isChecked = checkedState[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => handleCheckboxChange(idx)}
                    className={`p-4 border transition-all duration-150 rounded-xl flex items-start gap-4 select-none cursor-pointer ${
                      dayValidated
                        ? 'border-concrete/10 bg-bg-deep/40 opacity-60'
                        : isChecked
                          ? 'border-copper bg-copper/5 shadow-inner'
                          : 'border-concrete/20 bg-[#141414] hover:border-concrete/50'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 border flex items-center justify-center font-mono font-bold text-sm rounded-lg transition-colors duration-150 ${
                        isChecked
                          ? 'border-copper bg-copper text-bg-deep'
                          : 'border-concrete/40 bg-transparent'
                      }`}
                    >
                      {isChecked ? '✓' : ''}
                    </div>
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                        HABITUDE {idx + 1}
                      </span>
                      <p className="text-zinc-300 text-xs font-sans leading-relaxed">
                        {habit}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            {!dayValidated ? (
              <button
                onClick={handleValidateDay}
                disabled={!allChecked}
                className={`w-full py-3.5 uppercase font-mono font-bold tracking-widest text-xs flex items-center justify-center gap-2 transition rounded-xl border ${
                  allChecked
                    ? 'bg-impact hover:bg-impact-hover text-offwhite border-transparent cursor-pointer shadow-lg shadow-impact/10'
                    : 'bg-bg-deep text-zinc-600 border-concrete/20 cursor-not-allowed'
                }`}
                id="btn-validate-discipline"
              >
                Valider ma journée d'excellence
              </button>
            ) : (
              <div className="p-4 bg-impact/10 border border-impact/30 rounded-xl text-impact-hover text-center font-mono text-xs uppercase font-bold space-y-1 animate-fade-in">
                <div>⚡ Journée validée avec succès !</div>
                <div className="text-[10px] text-zinc-400">Progression enregistrée sur votre série industrielle de réussite.</div>
              </div>
            )}
          </div>
        </div>

        {/* Status and Streak Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card-bg border border-concrete/40 p-6 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between h-full min-h-[280px]">
            {/* Background graphic for streak */}
            <div className="absolute right-[-10px] bottom-[-20px] opacity-5 select-none pointer-events-none text-offwhite font-mono font-bold text-[130px] leading-none">
              {currentStreak}
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest bg-copper text-bg-deep px-2 py-0.5 rounded font-bold">
                  SÉRIE DE DISCIPLINE ACTIVE
                </span>
                <h4 className="text-xs font-mono uppercase text-zinc-400">Série Actuelle en {user.domaine_actif}</h4>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-mono font-bold text-offwhite flex items-center gap-1.5">
                  <Flame size={40} className="text-copper animate-pulse fill-copper" /> {currentStreak}
                </span>
                <span className="text-xs font-mono text-zinc-500">Jours consécutifs</span>
              </div>

              {/* Rank and progression banner */}
              <div className={`p-4 border rounded-xl ${currentRank.border} ${currentRank.bg} space-y-2`}>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Statut honorifique :</div>
                <div className={`text-sm font-bold uppercase tracking-wider font-mono flex items-center gap-2 ${currentRank.color}`}>
                  <Award size={16} /> {currentRank.title}
                </div>
              </div>

              {/* Progress bar towards military challenge of 30 days */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 font-bold">
                  <span>DÉFI MILITAIRE : 30 JOURS</span>
                  <span>{Math.min(100, Math.round((currentStreak / 30) * 100))}%</span>
                </div>
                <div className="h-2 bg-bg-deep border border-concrete/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-copper transition-all duration-300"
                    style={{ width: `${Math.min(100, (currentStreak / 30) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-concrete/20 pt-4 mt-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 flex items-center justify-center border rounded-xl ${
                  currentStreak >= 30 ? 'border-impact bg-impact/10 text-impact-hover' : 'border-dashed border-zinc-800 text-zinc-600'
                }`}>
                  <Star size={22} className={currentStreak >= 30 ? 'animate-bounce text-amber-500 fill-amber-500' : ''} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-tight text-offwhite">Badge d'Honneur Supérieur</h4>
                  <p className="text-[10px] text-zinc-400 leading-normal">
                    {currentStreak >= 30
                      ? "Débloqué ! Vous possédez une discipline de fer."
                      : "Maintenez 30 jours de série pour débloquer le badge d'autorité de l'institution Dangote."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATION PANEL - MANDATORY HELPER */}
          <div className="bg-card-bg border border-amber-900/20 p-5 space-y-3 rounded-2xl shadow-lg">
            <div className="flex items-center gap-1.5 text-amber-500 font-mono text-xs font-bold uppercase">
              <Zap size={14} className="animate-bounce" /> Console de Simulation (Test de Badge)
            </div>
            <p className="text-[10px] text-zinc-500 font-sans leading-normal">
              Utilisez ces boutons de test rapides pour simuler l'incrémentation de votre série et vérifier le déclenchement de la modal de célébration.
            </p>

            <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
              <button
                onClick={() => adjustStreak(1)}
                className="p-2.5 bg-bg-deep border border-concrete/30 hover:border-copper hover:text-copper transition rounded-xl text-center cursor-pointer font-bold uppercase"
              >
                +1 Jour
              </button>
              <button
                onClick={() => adjustStreak(5)}
                className="p-2.5 bg-bg-deep border border-concrete/30 hover:border-copper hover:text-copper transition rounded-xl text-center cursor-pointer font-bold uppercase"
              >
                +5 Jours
              </button>
              <button
                onClick={() => setSpecificStreak(29)}
                className="p-2.5 bg-bg-deep border border-concrete/30 hover:border-copper hover:text-copper transition rounded-xl text-center cursor-pointer font-bold uppercase col-span-2 text-amber-500"
              >
                ⚡ Sauter directement à 29 jours de série
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Modal (30 days limit achieved) */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/95 backdrop-blur-md animate-fade-in">
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card-bg border border-copper max-w-lg w-full p-8 text-center space-y-6 relative rounded-2xl shadow-2xl"
            >
              <div className="absolute top-3 left-3 text-[9px] font-mono text-copper/30">CÉLÉBRATION DE SÉRIE</div>
              <div className="absolute top-3 right-3 text-[9px] font-mono text-copper/30">ID-30-DAYS</div>

              <div className="flex justify-center">
                <div className="w-20 h-20 bg-copper/10 rounded-full border border-copper flex items-center justify-center text-copper animate-bounce">
                  <Star size={36} className="fill-copper text-copper" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-copper uppercase tracking-widest font-bold">
                  MILITARY STREAK VALIDATED
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-offwhite font-mono">
                  LÉGENDE DE DISCIPLINE : 30 JOURS SANS FAILLE
                </h3>
              </div>

              <div className="p-4 bg-bg-deep border border-concrete/30 rounded-xl font-sans text-xs text-zinc-300 leading-relaxed space-y-3 text-left">
                <p>
                  Félicitations, bâtisseur émérite. En validant et en maintenant une discipline inflexible pendant 30 jours consécutifs sur votre domaine <strong>{user.domaine_actif}</strong>, vous prouvez que vous possédez le tempérament de fer nécessaire pour piloter des projets d'envergure.
                </p>
                <p className="italic text-zinc-400 font-serif">
                  « La discipline est le pont entre vos buts de vie et leur accomplissement matériel. Sans elle, le talent n'est qu'un mirage. »
                </p>
              </div>

              <button
                onClick={() => setShowCelebration(false)}
                className="w-full py-3 bg-copper hover:bg-copper-hover text-bg-deep font-mono uppercase font-bold rounded-xl text-xs tracking-wider transition cursor-pointer shadow-lg shadow-copper/10 border border-transparent"
              >
                Retourner à la forge quotidienne
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
