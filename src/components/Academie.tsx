import React, { useState } from 'react';
import { User } from '../types';
import { ACADEMY_MAPPING, ACADEMY_CONTENT } from '../data/seedData';
import { GraduationCap, Quote, BookOpen, CheckSquare, CheckCircle2, ArrowRight } from 'lucide-react';

interface AcademieProps {
  user: User;
  onUpdateUser: (newUser: User) => void;
}

export const Academie: React.FC<AcademieProps> = ({ user, onUpdateUser }) => {
  const currentDomain = user.domaine_actif;
  const courseIds = ACADEMY_MAPPING[currentDomain] || ACADEMY_MAPPING["Professionnel"];

  const [selectedCourseId, setSelectedCourseId] = useState<string>(courseIds[0]);
  const [completedCourses, setCompletedCourses] = useState<Record<string, boolean>>({});
  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>({});

  // Reset selected course when domain changes
  React.useEffect(() => {
    setSelectedCourseId(courseIds[0]);
  }, [currentDomain]);

  const activeCourseData = ACADEMY_CONTENT[selectedCourseId] || {
    desc: "Contenu de formation avancé pour ce module.",
    actions: ["Pratiquer l'auto-analyse du module.", "Identifier un point clé d'action.", "Consulter un avis de référence."]
  };

  const handleActionToggle = (actionKey: string) => {
    setCheckedActions(prev => ({
      ...prev,
      [actionKey]: !prev[actionKey]
    }));
  };

  const handleCompleteCourse = (courseId: string) => {
    const nextCompleted = {
      ...completedCourses,
      [`${currentDomain}-${courseId}`]: true
    };
    setCompletedCourses(nextCompleted);

    // Increment user impact on course completion
    const currentProgress = user.progression_par_domaine[currentDomain] || { impact: 0, discipline_streak: 0 };
    const nextImpact = Math.min(100, currentProgress.impact + 15); // +15% impact for completing a full course

    const nextProgression = {
      ...user.progression_par_domaine,
      [currentDomain]: {
        ...currentProgress,
        impact: nextImpact
      }
    };

    onUpdateUser({
      ...user,
      progression_par_domaine: nextProgression
    });
  };

  // Count courses completed for active domain
  const domainCompletedCount = courseIds.filter(cid => completedCourses[`${currentDomain}-${cid}`]).length;

  return (
    <div className="space-y-6 animate-fade-in" id="academie-module">
      <div className="flex items-center gap-3 border-b border-concrete/40 pb-3">
        <div className="p-2 bg-copper/10 text-copper rounded-lg">
          <GraduationCap size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-offwhite uppercase tracking-tight">
            Académie des Capacités Industrielles
          </h3>
          <p className="text-zinc-400 text-xs font-sans">
            Acquérez des compétences fondamentales adaptées à votre domaine actif de réussite. Complétez les exercices pratiques de chaque cours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Course Selection List & Summary Progress */}
        <div className="lg:col-span-4 space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
              PLAN DE COURS ({currentDomain.toUpperCase()})
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {courseIds.map((cid) => {
                const isSelected = selectedCourseId === cid;
                const isCompleted = completedCourses[`${currentDomain}-${cid}`];
                return (
                  <button
                    key={cid}
                    onClick={() => setSelectedCourseId(cid)}
                    className={`w-full text-left p-4 border transition-all duration-150 flex flex-col justify-between rounded-xl cursor-pointer relative ${
                      isSelected
                        ? 'border-copper bg-copper/5 shadow-md shadow-copper/5'
                        : 'border-concrete/20 bg-[#121212] hover:border-concrete/50'
                    }`}
                    id={`btn-course-${cid}`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-xs font-bold uppercase tracking-wide text-zinc-300">
                        {cid}
                      </span>
                      {isCompleted && (
                        <span className="text-impact-hover text-xs">
                          <CheckCircle2 size={14} className="fill-impact/10" />
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-500 font-sans mt-2 line-clamp-2">
                      {ACADEMY_CONTENT[cid]?.desc || "Découvrez le contenu stratégique de cette compétence clé."}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Tracker Card */}
          <div className="p-4 bg-card-bg border border-concrete/40 rounded-xl text-center space-y-2 shadow-lg shadow-black/10">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Progression d'Académie en {currentDomain}
            </div>
            <div className="text-xl font-mono font-bold text-copper">
              {domainCompletedCount} / 4 <span className="text-xs text-zinc-500">Cours validés</span>
            </div>
            <div className="h-1.5 bg-bg-deep border border-concrete/20 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-impact transition-all duration-300"
                style={{ width: `${(domainCompletedCount / 4) * 100}%` }}
              />
            </div>
            <p className="text-[9px] text-zinc-500 font-mono italic">
              Chaque cours validé ajoute +15% de taux d'impact.
            </p>
          </div>
        </div>

        {/* Right column: Course Details & Practical Actions Panel */}
        <div className="lg:col-span-8 bg-card-bg border border-concrete/40 p-6 rounded-2xl shadow-lg flex flex-col justify-between min-h-[400px]">
          <div className="space-y-6">
            <div className="border-b border-concrete/20 pb-4 space-y-1">
              <span className="text-[10px] font-mono bg-copper text-bg-deep px-2 py-0.5 rounded font-bold tracking-wider uppercase">
                ÉVALUATION DE STRATÉGIE CORPORATIVE : {currentDomain.toUpperCase()}
              </span>
              <h4 className="text-base font-bold uppercase tracking-tight text-offwhite mt-1">
                Cours : {selectedCourseId}
              </h4>
            </div>

            <div className="space-y-4 text-xs font-sans">
              {/* Concept Section */}
              <div className="bg-bg-deep border-l-4 border-copper p-4 rounded-r-xl relative">
                <BookOpen className="absolute right-3 top-3 text-concrete/10" size={28} />
                <h5 className="font-mono text-[10px] text-copper uppercase font-bold tracking-wider mb-1">
                  📚 DESCRIPTION DU CONCEPT
                </h5>
                <p className="text-zinc-300 leading-relaxed text-xs">
                  {activeCourseData.desc}
                </p>
              </div>

              {/* Action List Section */}
              <div className="space-y-3">
                <h5 className="font-mono text-[10px] text-zinc-400 uppercase font-bold tracking-wider flex items-center gap-1">
                  <CheckSquare size={12} className="text-copper" /> ACTIONS ET RECHERCHES PRATIQUES DE TERRAIN :
                </h5>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Pour valider pleinement ce cours, cochez et appliquez ces 3 exercices concrets de prise d'initiative :
                </p>

                <div className="grid grid-cols-1 gap-2.5">
                  {activeCourseData.actions.map((actionText, index) => {
                    const actionKey = `${currentDomain}-${selectedCourseId}-action-${index}`;
                    const isChecked = !!checkedActions[actionKey];
                    const isCourseCompleted = completedCourses[`${currentDomain}-${selectedCourseId}`];

                    return (
                      <div
                        key={index}
                        onClick={() => !isCourseCompleted && handleActionToggle(actionKey)}
                        className={`p-3 border transition-all duration-150 rounded-xl flex items-start gap-3 select-none cursor-pointer ${
                          isCourseCompleted
                            ? 'border-concrete/10 bg-bg-deep/40 opacity-70'
                            : isChecked
                              ? 'border-copper bg-copper/5'
                              : 'border-concrete/20 bg-[#121212] hover:border-concrete/40'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 border flex items-center justify-center font-mono font-bold text-xs rounded transition-colors duration-150 mt-0.5 ${
                            isChecked || isCourseCompleted
                              ? 'border-copper bg-copper text-bg-deep'
                              : 'border-concrete/30 bg-transparent'
                          }`}
                        >
                          {isChecked || isCourseCompleted ? '✓' : ''}
                        </div>
                        <div className="flex-1">
                          <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                            {actionText}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-concrete/20 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[10px] font-mono text-zinc-500">
              {completedCourses[`${currentDomain}-${selectedCourseId}`]
                ? 'COUR COMPLÉTÉ & HISTORISÉ'
                : 'ÉTUDE EN COURS DE DÉPLOIEMENT'}
            </span>

            {!completedCourses[`${currentDomain}-${selectedCourseId}`] ? (
              <button
                onClick={() => handleCompleteCourse(selectedCourseId)}
                disabled={!activeCourseData.actions.every((_, idx) => checkedActions[`${currentDomain}-${selectedCourseId}-action-${idx}`])}
                className={`px-6 py-2.5 uppercase font-mono font-bold tracking-wider text-xs flex items-center gap-2 transition rounded-xl border cursor-pointer ${
                  activeCourseData.actions.every((_, idx) => checkedActions[`${currentDomain}-${selectedCourseId}-action-${idx}`])
                    ? 'bg-impact hover:bg-impact-hover text-offwhite border-transparent shadow-lg shadow-impact/10'
                    : 'bg-bg-deep text-zinc-600 border-concrete/20 cursor-not-allowed'
                }`}
              >
                Valider et Archiver le cours <ArrowRight size={14} />
              </button>
            ) : (
              <div className="px-6 py-2.5 border border-impact/30 text-impact-hover rounded-xl font-mono uppercase text-xs font-bold flex items-center gap-2">
                ✓ Connaissances assimilées avec succès
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
