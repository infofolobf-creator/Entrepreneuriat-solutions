import React, { useState } from 'react';
import { User } from '../types';
import { TrendingUp, Sparkles, AlertCircle, Heart, CheckCircle2, History } from 'lucide-react';

interface ImpactProps {
  user: User;
  onUpdateUser: (newUser: User) => void;
}

interface ImpactLogEntry {
  domain: string;
  progress: number;
  obstacles: string;
  peopleInfluenced: number;
  timestamp: string;
}

export const Impact: React.FC<ImpactProps> = ({ user, onUpdateUser }) => {
  const currentDomain = user.domaine_actif;
  const currentProgress = user.progression_par_domaine[currentDomain] || { impact: 0, discipline_streak: 0 };

  const [progressVal, setProgressVal] = useState<number>(currentProgress.impact);
  const [obstacles, setObstacles] = useState<string>('');
  const [peopleVal, setPeopleVal] = useState<number>(0);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [historyLogs, setHistoryLogs] = useState<ImpactLogEntry[]>(() => {
    const raw = localStorage.getItem('mentor360_impact_history');
    return raw ? JSON.parse(raw) : [];
  });

  const handleSaveImpact = (e: React.FormEvent) => {
    e.preventDefault();

    // Update progression par domaine
    const nextProgression = {
      ...user.progression_par_domaine,
      [currentDomain]: {
        ...currentProgress,
        impact: progressVal
      }
    };

    onUpdateUser({
      ...user,
      progression_par_domaine: nextProgression
    });

    // Save to history list
    const newEntry: ImpactLogEntry = {
      domain: currentDomain,
      progress: progressVal,
      obstacles: obstacles.trim() || 'Aucun obstacle particulier noté.',
      peopleInfluenced: peopleVal,
      timestamp: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const nextHistory = [newEntry, ...historyLogs];
    setHistoryLogs(nextHistory);
    localStorage.setItem('mentor360_impact_history', JSON.stringify(nextHistory));

    setObstacles('');
    setPeopleVal(0);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="impact-module">
      <div className="flex items-center gap-3 border-b border-concrete/40 pb-3">
        <div className="p-2 bg-copper/10 text-copper rounded-lg">
          <TrendingUp size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-offwhite uppercase tracking-tight">
            Indicateur d'Impact National & Social
          </h3>
          <p className="text-zinc-400 text-xs font-sans">
            Évaluez périodiquement votre taux de maîtrise, loggez vos résolutions d'obstacles et comptabilisez votre influence positive dans votre communauté immédiate.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs Panel */}
        <div className="lg:col-span-6 bg-card-bg border border-concrete/40 p-5 rounded-2xl shadow-lg space-y-4">
          <form onSubmit={handleSaveImpact} className="space-y-4">
            <div className="border-b border-concrete/15 pb-2">
              <span className="text-[10px] font-mono text-copper uppercase tracking-wider font-bold">
                LOG d'IMPACT EN DIRECT ({currentDomain.toUpperCase()})
              </span>
            </div>

            {/* Progress Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Niveau d'impact estimé :
                </label>
                <span className="text-xs font-mono font-bold text-copper">{progressVal}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progressVal}
                onChange={(e) => setProgressVal(Number(e.target.value))}
                className="w-full h-1.5 bg-bg-deep rounded-lg appearance-none cursor-pointer accent-copper"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>0% Éveil</span>
                <span>50% Maîtrise active</span>
                <span>100% Rayonnement</span>
              </div>
            </div>

            {/* Obstacles Textarea */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Quels obstacles ou résistances avez-vous surmonté ?
              </label>
              <textarea
                value={obstacles}
                onChange={(e) => setObstacles(e.target.value)}
                placeholder="Ex : J'ai mis en veille mon téléphone à l'entrée de ma zone de bureau ce qui m'a fait surmonter l'impulsion de scroller pendant mes blocs d'étude..."
                rows={3}
                className="w-full bg-bg-deep border border-concrete/30 rounded-xl p-3 text-xs text-offwhite placeholder:text-zinc-600 focus:outline-none focus:border-copper/70 transition"
                required
              />
            </div>

            {/* People Influenced Input */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Heart size={12} className="text-copper animate-pulse" /> Nombre de personnes influencées ou guidées :
              </label>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Indiquez le nombre d'individus à qui vous avez transmis un conseil de votre mentor actif ou aidé aujourd'hui.
              </p>
              <input
                type="number"
                min="0"
                max="5000"
                value={peopleVal === 0 ? '' : peopleVal}
                onChange={(e) => setPeopleVal(Number(e.target.value))}
                placeholder="0"
                className="w-full bg-bg-deep border border-concrete/30 rounded-xl p-3 text-xs text-offwhite font-mono placeholder:text-zinc-600 focus:outline-none focus:border-copper/70 transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-copper hover:bg-copper-hover text-bg-deep uppercase font-bold tracking-wider text-xs font-mono flex items-center justify-center gap-2 transition rounded-xl cursor-pointer shadow-lg shadow-copper/10 border border-transparent"
            >
              Enregistrer ma progression d'impact
            </button>

            {savedSuccess && (
              <div className="p-3 bg-impact/10 border border-impact/30 text-impact-hover rounded-xl text-center font-mono text-xs uppercase font-bold animate-fade-in flex items-center justify-center gap-1.5">
                <CheckCircle2 size={14} /> Données d'impact historisées avec succès !
              </div>
            )}
          </form>
        </div>

        {/* Right column: Status Summary and Logs History */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-card-bg border border-concrete/40 p-5 rounded-2xl shadow-lg space-y-4 flex flex-col justify-between">
            <div className="flex items-center gap-2 border-b border-concrete/15 pb-2">
              <History size={14} className="text-copper" />
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                HISTORIQUE DE VOS ACCOMPLISSEMENTS
              </span>
            </div>

            <div className="space-y-3 max-h-[310px] overflow-y-auto pr-1">
              {historyLogs.length > 0 ? (
                historyLogs.map((log, index) => (
                  <div key={index} className="p-3 bg-bg-deep rounded-xl border border-concrete/20 text-xs space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] bg-copper/10 text-copper px-1.5 py-0.5 rounded font-bold uppercase">
                        {log.domain}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono">{log.timestamp}</span>
                    </div>

                    <div className="space-y-1 font-sans">
                      <div className="text-zinc-400 leading-normal">
                        <strong className="text-[10px] font-mono text-zinc-500 uppercase block">Obstacles surmontés :</strong>
                        « {log.obstacles} »
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 pt-1 border-t border-concrete/10">
                      <span>Progrès : <strong className="text-offwhite">{log.progress}%</strong></span>
                      <span className="text-impact-hover flex items-center gap-1">
                        👥 {log.peopleInfluenced} pers. aidées
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-zinc-600 font-sans text-xs flex flex-col items-center justify-center space-y-2 h-44">
                  <AlertCircle size={20} className="text-zinc-600" />
                  <p>Aucun log d'impact enregistré pour le moment.</p>
                  <p className="text-[10px] text-zinc-500 max-w-xs leading-normal">
                    Faites un premier enregistrement à l'aide du formulaire de gauche pour visualiser votre journal d'activités citoyennes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
