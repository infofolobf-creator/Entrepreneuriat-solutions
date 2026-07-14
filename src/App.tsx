import { useState, useEffect, useMemo } from 'react';
import { Mentor, User } from './types';
import { SEED_MENTORS, LIFE_DOMAINS } from './data/seedData';
import { Diagnostic } from './components/Diagnostic';
import { Parcours } from './components/Parcours';
import { Discipline } from './components/Discipline';
import { Academie } from './components/Academie';
import { Impact } from './components/Impact';
import { MentorSelectorModal } from './components/MentorSelectorModal';
import {
  Sparkles,
  ShieldCheck,
  Star,
  Users,
  Award,
  Crown,
  BookOpen,
  Compass,
  ShieldCheck as ShieldIcon,
  Flame,
  GraduationCap,
  TrendingUp,
  UserCheck,
  UserPlus,
  RefreshCw,
  Menu,
  X,
  Plus,
  Globe,
  ChevronRight
} from 'lucide-react';

export default function App() {
  // --- 1. STATE INITIALIZATION ---
  const [mentors, setMentors] = useState<Mentor[]>(() => {
    const cached = localStorage.getItem('mentor360_mentors');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    localStorage.setItem('mentor360_mentors', JSON.stringify(SEED_MENTORS));
    return SEED_MENTORS;
  });

  const [user, setUser] = useState<User>(() => {
    const cached = localStorage.getItem('mentor360_user');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    const defaultUser: User = {
      domaine_actif: "Professionnel",
      mentor_actif_id: "aliko-dangote",
      maitres_principaux: [],
      tous_mes_mentors: [],
      progression_par_domaine: {
        "Professionnel": { impact: 0, discipline_streak: 0 },
        "Personnel": { impact: 0, discipline_streak: 0 },
        "Couple": { impact: 0, discipline_streak: 0 },
        "Famille": { impact: 0, discipline_streak: 0 },
        "Spiritualité": { impact: 0, discipline_streak: 0 },
        "Finance": { impact: 0, discipline_streak: 0 },
        "Amitié": { impact: 0, discipline_streak: 0 },
        "Éducation": { impact: 0, discipline_streak: 0 },
        "Santé / Bien-être": { impact: 0, discipline_streak: 0 },
        "Leadership / Gestion": { impact: 0, discipline_streak: 0 }
      },
      votes: {}
    };
    localStorage.setItem('mentor360_user', JSON.stringify(defaultUser));
    return defaultUser;
  });

  const [activeTab, setActiveTab] = useState<'diagnostic' | 'parcours' | 'discipline' | 'academie' | 'impact'>('diagnostic');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- 2. LOCAL STORAGE PERSISTENCE ---
  const handleUpdateUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('mentor360_user', JSON.stringify(newUser));
  };

  const handleUpdateMentor = (newMentor: Mentor) => {
    const updated = mentors.map(m => m.id === newMentor.id ? newMentor : m);
    setMentors(updated);
    localStorage.setItem('mentor360_mentors', JSON.stringify(updated));
  };

  const handleAddNewMentor = (newMentor: Mentor) => {
    const updated = [newMentor, ...mentors];
    setMentors(updated);
    localStorage.setItem('mentor360_mentors', JSON.stringify(updated));

    // Auto select newly created mentor
    handleUpdateUser({
      ...user,
      mentor_actif_id: newMentor.id
    });
  };

  // --- 3. DYNAMIC METRICS ---
  // Global score = arithmetical average of all 10 domain impacts. If no data, counts as 0.
  const globalScore = useMemo(() => {
    let total = 0;
    LIFE_DOMAINS.forEach(dom => {
      const prog = user.progression_par_domaine[dom];
      total += prog ? prog.impact : 0;
    });
    return Math.round(total / LIFE_DOMAINS.length);
  }, [user.progression_par_domaine]);

  // Find currently active mentor
  const activeMentor = useMemo(() => {
    const found = mentors.find(m => m.id === user.mentor_actif_id);
    // If not found or inactive, handle fallback gracefully
    if (!found || !found.actif) {
      // Find top rated active mentor of current domain
      const sortedActiveList = mentors
        .filter(m => m.domaines.includes(user.domaine_actif) && m.actif)
        .sort((a, b) => (b.note_communaute * b.nb_suivis) - (a.note_communaute * a.nb_suivis));
      
      if (sortedActiveList.length > 0) {
        return sortedActiveList[0];
      }
      // Ultimate absolute fallback (first active mentor)
      return mentors.find(m => m.actif) || SEED_MENTORS[0];
    }
    return found;
  }, [mentors, user.mentor_actif_id, user.domaine_actif]);

  // Handle auto fallback sync if activeMentor ID changed behind the scenes (e.g. mentor went inactive)
  useEffect(() => {
    if (activeMentor && activeMentor.id !== user.mentor_actif_id) {
      handleUpdateUser({
        ...user,
        mentor_actif_id: activeMentor.id
      });
    }
  }, [activeMentor, user.mentor_actif_id]);

  // --- 4. LOGIQUES CRITIQUES ---
  // Change Domain
  const handleChangeDomain = (newDomain: string) => {
    setMobileMenuOpen(false);
    
    // Check if user is following any active mentor in this domain
    const followedInDomain = mentors.filter(
      m => m.domaines.includes(newDomain) && m.actif && user.tous_mes_mentors.includes(m.id)
    );

    let nextMentorId = user.mentor_actif_id;

    if (followedInDomain.length > 0) {
      // Set to the first followed mentor in this domain
      nextMentorId = followedInDomain[0].id;
    } else {
      // si aucun mentor suivi dans le domaine, mentor_actif_id = premier mentor de la liste triée du domaine.
      const sortedDomainList = mentors
        .filter(m => m.domaines.includes(newDomain) && m.actif)
        .sort((a, b) => {
          const scoreA = a.note_communaute * a.nb_suivis;
          const scoreB = b.note_communaute * b.nb_suivis;
          return scoreB - scoreA;
        });

      if (sortedDomainList.length > 0) {
        nextMentorId = sortedDomainList[0].id;
      }
    }

    handleUpdateUser({
      ...user,
      domaine_actif: newDomain,
      mentor_actif_id: nextMentorId
    });
  };

  // Follow / Unfollow Toggle
  const handleToggleFollow = () => {
    if (!activeMentor) return;

    const isCurrentlyFollowing = user.tous_mes_mentors.includes(activeMentor.id);
    let updatedFollowed = [...user.tous_mes_mentors];
    let updatedPrincipals = [...user.maitres_principaux];
    let nextFollowCount = activeMentor.nb_suivis;

    if (isCurrentlyFollowing) {
      // Unfollow
      updatedFollowed = updatedFollowed.filter(id => id !== activeMentor.id);
      updatedPrincipals = updatedPrincipals.filter(id => id !== activeMentor.id);
      nextFollowCount = Math.max(0, nextFollowCount - 1);
    } else {
      // Follow
      updatedFollowed.push(activeMentor.id);
      nextFollowCount += 1;

      // If maitres_principaux length < 3, also push
      if (updatedPrincipals.length < 3) {
        updatedPrincipals.push(activeMentor.id);
      }
    }

    // Update mentor counts in list
    const updatedMentorObj = {
      ...activeMentor,
      nb_suivis: nextFollowCount
    };

    handleUpdateMentor(updatedMentorObj);
    handleUpdateUser({
      ...user,
      tous_mes_mentors: updatedFollowed,
      maitres_principaux: updatedPrincipals
    });
  };

  // Toggle Principal Master designation
  const handleTogglePrincipalMaster = () => {
    if (!activeMentor) return;

    const isPrincipal = user.maitres_principaux.includes(activeMentor.id);
    let updatedPrincipals = [...user.maitres_principaux];

    if (isPrincipal) {
      // Remove
      updatedPrincipals = updatedPrincipals.filter(id => id !== activeMentor.id);
    } else {
      // Add (limit to 3 maximum)
      if (updatedPrincipals.length >= 3) {
        alert("Vous ne pouvez désigner que 3 Maîtres Principaux au maximum.");
        return;
      }
      updatedPrincipals.push(activeMentor.id);
      
      // Auto follow if not already followed
      if (!user.tous_mes_mentors.includes(activeMentor.id)) {
        const updatedFollowed = [...user.tous_mes_mentors, activeMentor.id];
        const updatedMentorObj = {
          ...activeMentor,
          nb_suivis: activeMentor.nb_suivis + 1
        };
        handleUpdateMentor(updatedMentorObj);
        handleUpdateUser({
          ...user,
          tous_mes_mentors: updatedFollowed,
          maitres_principaux: updatedPrincipals
        });
        return;
      }
    }

    handleUpdateUser({
      ...user,
      maitres_principaux: updatedPrincipals
    });
  };

  // Check if a domain has at least one followed mentor (to display active Pastille)
  const hasFollowedMentorInDomain = (domain: string) => {
    return mentors.some(
      m => m.domaines.includes(domain) && m.actif && user.tous_mes_mentors.includes(m.id)
    );
  };

  const isFollowingActive = user.tous_mes_mentors.includes(activeMentor?.id || '');
  const isPrincipalActive = user.maitres_principaux.includes(activeMentor?.id || '');

  // Reset all app data helper (for quick evaluation and clean start)
  const handleResetAllData = () => {
    if (window.confirm("Voulez-vous réinitialiser toutes vos données de progression et restaurer les mentors de base ?")) {
      localStorage.removeItem('mentor360_user');
      localStorage.removeItem('mentor360_mentors');
      localStorage.removeItem('mentor360_impact_history');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-bg-deep text-offwhite flex flex-col font-sans" id="mentor360-root">
      
      {/* HEADER BAR */}
      <header className="border-b border-concrete/40 bg-[#0c0c0c] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-copper text-bg-deep flex items-center justify-center shadow-lg shadow-copper/15">
              <GraduationCap size={24} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-wider text-offwhite flex items-center gap-1.5 font-mono">
                MENTOR 360
              </h1>
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                Institut de Souveraineté de Vie
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Global Score Indicator */}
            <div className="flex items-center gap-3 bg-[#111] px-4 py-2 rounded-2xl border border-concrete/30 shadow-md">
              <div className="text-right">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Score Global</span>
                <span className="text-xs font-mono font-bold text-copper">Moyenne Nationale</span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-concrete/40 flex items-center justify-center font-mono font-bold text-sm relative">
                <div className="absolute inset-0 rounded-full border-2 border-copper" style={{ clipPath: `polygon(0 0, 100% 0, 100% ${globalScore}%, 0 ${globalScore}%)` }} />
                {globalScore}%
              </div>
            </div>

            {/* Reset data helper */}
            <button
              onClick={handleResetAllData}
              title="Réinitialiser l'application"
              className="p-2 text-zinc-600 hover:text-red-400 hover:bg-concrete/10 transition rounded-xl cursor-pointer"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* LIFE DOMAINS HORIZONTAL BAR (10 selectables) */}
      <div className="bg-[#0e0e0e] border-b border-concrete/25 py-3 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-concrete scrollbar-track-transparent">
            {LIFE_DOMAINS.map((domain) => {
              const isActive = user.domaine_actif === domain;
              const hasPastille = hasFollowedMentorInDomain(domain);
              
              return (
                <button
                  key={domain}
                  onClick={() => handleChangeDomain(domain)}
                  className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 rounded-xl border flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-copper text-bg-deep border-copper shadow-md shadow-copper/10'
                      : 'bg-card-bg text-zinc-400 border-concrete/20 hover:border-concrete/40'
                  }`}
                  id={`domain-select-${domain.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {hasPastille && (
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-bg-deep animate-pulse' : 'bg-copper'}`} />
                  )}
                  {domain}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: ACTIVE MENTOR CARD & PRINCIPALS */}
        <section className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          
          {/* Active Mentor Profile Frame */}
          {activeMentor && (
            <div className="bg-card-bg border border-concrete/40 p-6 rounded-2xl shadow-xl flex flex-col justify-between h-[420px] relative overflow-hidden" id="active-mentor-card">
              
              {/* Top Bar inside card */}
              <div className="flex justify-between items-start">
                <div className="flex gap-3.5 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-copper text-bg-deep flex items-center justify-center font-mono text-xl font-black shadow-lg shadow-copper/15">
                    {activeMentor.nom.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-offwhite flex items-center gap-1.5 uppercase tracking-tight">
                      {activeMentor.nom}
                      {activeMentor.badge_verifie && (
                        <ShieldCheck size={16} className="text-copper fill-copper/5" title="Sceau de confiance validé" />
                      )}
                    </h2>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-wider flex items-center gap-1 uppercase">
                      <Globe size={10} /> {activeMentor.pays}
                    </span>
                  </div>
                </div>

                {isPrincipalActive && (
                  <div className="p-1.5 bg-amber-950/10 text-amber-500 border border-amber-500/20 rounded-xl" title="Désigné Maître Principal">
                    <Crown size={16} className="fill-amber-500/10" />
                  </div>
                )}
              </div>

              {/* Style tags list */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {activeMentor.tags_style.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono bg-bg-deep border border-concrete/25 text-zinc-400 px-2.5 py-1 rounded-lg uppercase font-bold tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Dynamic Citation par domaine */}
              <div className="p-4 bg-bg-deep border-l-2 border-copper rounded-r-xl my-4 relative">
                <p className="text-zinc-300 italic text-xs leading-relaxed font-serif">
                  « {activeMentor.citation_par_domaine[user.domaine_actif] || activeMentor.citation_par_domaine['Professionnel'] || 'Marchez vers la souveraineté.'} »
                </p>
                <span className="block text-[9px] font-mono text-zinc-500 mt-2 text-right uppercase tracking-wider">
                  — Doctrine en {user.domaine_actif}
                </span>
              </div>

              {/* Actions controls for active mentor */}
              <div className="space-y-2.5 pt-4 border-t border-concrete/15">
                <div className="grid grid-cols-2 gap-3.5">
                  
                  {/* Changer de mentor */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="py-3 px-4 bg-bg-deep hover:bg-[#161616] border border-concrete/30 hover:border-concrete/60 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer text-center flex items-center justify-center gap-1.5"
                    id="btn-change-mentor"
                  >
                    <RefreshCw size={12} /> Remplacer
                  </button>

                  {/* Suivre / Suivi toggle */}
                  <button
                    onClick={handleToggleFollow}
                    className={`py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                      isFollowingActive
                        ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700/50'
                        : 'bg-copper text-bg-deep hover:bg-copper-hover font-black'
                    }`}
                    id="btn-follow-mentor"
                  >
                    {isFollowingActive ? (
                      <span className="flex items-center gap-1.5">
                        <UserCheck size={14} /> Suivi
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <UserPlus size={14} /> Suivre
                      </span>
                    )}
                  </button>

                </div>

                {/* Toggle principal master trigger */}
                <button
                  onClick={handleTogglePrincipalMaster}
                  className={`w-full py-2 px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-center border rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
                    isPrincipalActive
                      ? 'border-amber-500/30 bg-amber-950/15 text-amber-500'
                      : 'border-concrete/30 text-zinc-500 hover:text-zinc-300 hover:border-concrete/50'
                  }`}
                >
                  <Crown size={12} className={isPrincipalActive ? 'fill-amber-500/10' : ''} />
                  {isPrincipalActive ? "Retirer de mes Maîtres Principaux" : "Désigner Maître Principal (Max 3)"}
                </button>
              </div>

            </div>
          )}

          {/* Collapsible/Summary principal masters tracking panel */}
          <div className="bg-card-bg border border-concrete/40 p-5 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-concrete/15 pb-2.5">
              <span className="text-[10px] font-mono text-copper uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Crown size={12} /> Maîtres Principaux ({user.maitres_principaux.length} / 3)
              </span>
            </div>

            <div className="space-y-2">
              {user.maitres_principaux.length > 0 ? (
                user.maitres_principaux.map((mid) => {
                  const mObj = mentors.find(item => item.id === mid);
                  if (!mObj) return null;
                  return (
                    <div
                      key={mid}
                      onClick={() => handleUpdateUser({ ...user, mentor_actif_id: mid })}
                      className="p-3 bg-bg-deep rounded-xl border border-concrete/15 hover:border-copper/40 transition cursor-pointer flex justify-between items-center text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-offwhite uppercase tracking-tight block">
                          {mObj.nom}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                          {mObj.pays}
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-zinc-600" />
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-5 text-zinc-600 text-[11px] font-mono uppercase">
                  Aucun maître principal désigné
                </div>
              )}
            </div>

            <p className="text-[9px] text-zinc-500 font-sans leading-normal bg-bg-deep/50 p-2.5 rounded-lg border border-concrete/10">
              💡 Suivez des mentors d'exception et cliquez sur "Désigner Maître Principal" pour afficher vos 3 piliers relationnels et spirituels d'appui à tout moment.
            </p>
          </div>

        </section>

        {/* RIGHT COLUMN: INTERACTIVE TABS & MODULE LAYOUTS */}
        <section className="lg:col-span-8 bg-[#0c0c0c] border border-concrete/40 rounded-2xl shadow-2xl p-6 flex flex-col justify-between">
          
          {/* Module tabs buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-concrete/20 pb-3 mb-6">
            
            {/* Tab 1: Diagnostic */}
            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'diagnostic'
                  ? 'bg-copper/10 text-copper border border-copper/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <BookOpen size={14} /> 1. Diagnostic
            </button>

            {/* Tab 2: Parcours */}
            <button
              onClick={() => setActiveTab('parcours')}
              className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'parcours'
                  ? 'bg-copper/10 text-copper border border-copper/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Compass size={14} /> 2. Parcours
            </button>

            {/* Tab 3: Discipline */}
            <button
              onClick={() => setActiveTab('discipline')}
              className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'discipline'
                  ? 'bg-copper/10 text-copper border border-copper/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Flame size={14} /> 3. Discipline
            </button>

            {/* Tab 4: Académie */}
            <button
              onClick={() => setActiveTab('academie')}
              className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'academie'
                  ? 'bg-copper/10 text-copper border border-copper/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <GraduationCap size={14} /> 4. Académie
            </button>

            {/* Tab 5: Impact */}
            <button
              onClick={() => setActiveTab('impact')}
              className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'impact'
                  ? 'bg-copper/10 text-copper border border-copper/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <TrendingUp size={14} /> 5. Impact
            </button>

          </div>

          {/* Module container with smooth animated transitions */}
          <div className="flex-1 min-h-[460px]">
            {activeMentor ? (
              <>
                {activeTab === 'diagnostic' && (
                  <Diagnostic
                    mentor={activeMentor}
                    user={user}
                    onUpdateUser={handleUpdateUser}
                    onUpdateMentor={handleUpdateMentor}
                  />
                )}
                {activeTab === 'parcours' && (
                  <Parcours
                    mentor={activeMentor}
                    user={user}
                    onUpdateUser={handleUpdateUser}
                  />
                )}
                {activeTab === 'discipline' && (
                  <Discipline
                    user={user}
                    onUpdateUser={handleUpdateUser}
                  />
                )}
                {activeTab === 'academie' && (
                  <Academie
                    user={user}
                    onUpdateUser={handleUpdateUser}
                  />
                )}
                {activeTab === 'impact' && (
                  <Impact
                    user={user}
                    onUpdateUser={handleUpdateUser}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-24 text-zinc-500 font-mono text-xs">
                SÉLECTIONNEZ UN MENTOR EN DOUBLE-CLIQUANT DANS LE CATALOGUE
              </div>
            )}
          </div>

        </section>

      </main>

      {/* MENTOR SELECTION MODAL CATALOGUE */}
      <MentorSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mentorsList={mentors}
        activeDomain={user.domaine_actif}
        user={user}
        onSelectMentor={(id) => {
          handleUpdateUser({
            ...user,
            mentor_actif_id: id
          });
        }}
        onAddNewMentor={handleAddNewMentor}
      />

      {/* FOOTER GENERAL LEGAL INFO */}
      <footer className="border-t border-concrete/30 bg-[#060606] py-5 mt-12 text-center text-[10px] font-mono text-zinc-600 tracking-wider">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>&copy; {new Date().getFullYear()} MENTOR 360 CO. TOUS DROITS CIVIQUES RÉSERVÉS.</span>
          <span>DISCIPLINE CONSTANTE • IMPACT NATIONAL • SOUVERAINETÉ SANS LIMITE</span>
        </div>
      </footer>

    </div>
  );
}
