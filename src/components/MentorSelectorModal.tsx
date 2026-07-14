import React, { useState, useMemo } from 'react';
import { Mentor, User } from '../types';
import { Search, Filter, ShieldCheck, Star, Users, Globe, Plus, Check, X, Sparkles } from 'lucide-react';

interface MentorSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorsList: Mentor[];
  activeDomain: string;
  user: User;
  onSelectMentor: (mentorId: string) => void;
  onAddNewMentor: (newMentor: Mentor) => void;
}

export const MentorSelectorModal: React.FC<MentorSelectorModalProps> = ({
  isOpen,
  onClose,
  mentorsList,
  activeDomain,
  user,
  onSelectMentor,
  onAddNewMentor,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyleTag, setSelectedStyleTag] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [filterNoteFourPlus, setFilterNoteFourPlus] = useState(false);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);

  // Pagination limit
  const [visibleCount, setVisibleCount] = useState(12);

  // Tab state inside modal: 'select' (choose existing) or 'create' (add custom mentor)
  const [modalTab, setModalTab] = useState<'select' | 'create'>('select');

  // New Custom Mentor Form State
  const [newMentorName, setNewMentorName] = useState('');
  const [newMentorCountry, setNewMentorCountry] = useState('');
  const [newMentorLanguages, setNewMentorLanguages] = useState('');
  const [newMentorStyleTags, setNewMentorStyleTags] = useState('');
  const [newMentorSelectedDomains, setNewMentorSelectedDomains] = useState<string[]>([]);
  const [newMentorCitations, setNewMentorCitations] = useState<Record<string, string>>({});
  const [newMentorDefi, setNewMentorDefi] = useState('');
  const [newMentorRealisation, setNewMentorRealisation] = useState('');
  const [customMentorError, setCustomMentorError] = useState('');

  // Extract all unique style tags from ALL mentors for filter dropdown
  const allStyleTags = useMemo(() => {
    const tags = new Set<string>();
    mentorsList.forEach(m => m.tags_style.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [mentorsList]);

  // Extract all unique countries from ALL mentors for filter dropdown
  const allCountries = useMemo(() => {
    const countries = new Set<string>();
    mentorsList.forEach(m => countries.add(m.pays));
    return Array.from(countries);
  }, [mentorsList]);

  // Filter and sort the mentors list
  const filteredAndSortedMentors = useMemo(() => {
    // 1. Core requirement: domains.includes(activeDomain) AND actif === true
    let list = mentorsList.filter(
      (m) => m.domaines.includes(activeDomain) && m.actif === true
    );

    // 2. Search filter (name, country, or tag)
    if (searchTerm.trim() !== '') {
      const s = searchTerm.toLowerCase();
      list = list.filter(
        (m) =>
          m.nom.toLowerCase().includes(s) ||
          m.pays.toLowerCase().includes(s) ||
          m.tags_style.some((tag) => tag.toLowerCase().includes(s))
      );
    }

    // 3. Style tag filter
    if (selectedStyleTag !== '') {
      list = list.filter((m) => m.tags_style.includes(selectedStyleTag));
    }

    // 4. Country filter
    if (selectedCountry !== '') {
      list = list.filter((m) => m.pays === selectedCountry);
    }

    // 5. Note > 4.0 filter
    if (filterNoteFourPlus) {
      list = list.filter((m) => m.note_communaute >= 4.0);
    }

    // 6. Verified only filter
    if (filterVerifiedOnly) {
      list = list.filter((m) => m.badge_verifie === true);
    }

    // 7. Core requirement: sorted by note_communaute * nb_suivis DESC
    return list.sort((a, b) => {
      const scoreA = a.note_communaute * a.nb_suivis;
      const scoreB = b.note_communaute * b.nb_suivis;
      return scoreB - scoreA;
    });
  }, [
    mentorsList,
    activeDomain,
    searchTerm,
    selectedStyleTag,
    selectedCountry,
    filterNoteFourPlus,
    filterVerifiedOnly,
  ]);

  // Handle Loading more mentors
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const visibleMentors = filteredAndSortedMentors.slice(0, visibleCount);

  // Custom mentor domain checkbox toggle
  const handleDomainCheckbox = (domain: string) => {
    if (newMentorSelectedDomains.includes(domain)) {
      setNewMentorSelectedDomains(newMentorSelectedDomains.filter(d => d !== domain));
    } else {
      setNewMentorSelectedDomains([...newMentorSelectedDomains, domain]);
    }
  };

  // Custom mentor citation setter
  const handleCitationChange = (domain: string, val: string) => {
    setNewMentorCitations({
      ...newMentorCitations,
      [domain]: val
    });
  };

  // Custom mentor submission
  const handleCreateMentor = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomMentorError('');

    if (!newMentorName.trim()) {
      setCustomMentorError("Le nom du mentor est requis.");
      return;
    }
    if (newMentorSelectedDomains.length === 0) {
      setCustomMentorError("Sélectionnez au moins un domaine de vie.");
      return;
    }
    if (!newMentorDefi.trim()) {
      setCustomMentorError("Le défi signature comportemental est requis.");
      return;
    }
    if (!newMentorRealisation.trim()) {
      setCustomMentorError("La réalisation de référence est requise.");
      return;
    }

    // Map citations for selected domains
    const citations: Record<string, string> = {};
    newMentorSelectedDomains.forEach(dom => {
      citations[dom] = newMentorCitations[dom]?.trim() || `Avancez avec vision dans le domaine ${dom}.`;
    });

    // Create new mentor object
    const createdMentor: Mentor = {
      id: `custom-mentor-${Date.now()}`,
      nom: newMentorName.trim(),
      domaines: newMentorSelectedDomains,
      tags_style: newMentorStyleTags.split(',').map(t => t.trim()).filter(Boolean),
      pays: newMentorCountry.trim() || 'International',
      langues: newMentorLanguages.split(',').map(l => l.trim()).filter(Boolean),
      citation_par_domaine: citations,
      defi_signature: newMentorDefi.trim(),
      realisation_mesurable: newMentorRealisation.trim(),
      actif: true,
      note_communaute: 5.0, // High starter score
      nb_suivis: 1, // Start with 1 follow (the author)
      badge_verifie: false, // Custom creations start unverified
      nb_votes: 1
    };

    onAddNewMentor(createdMentor);

    // Reset Form
    setNewMentorName('');
    setNewMentorCountry('');
    setNewMentorLanguages('');
    setNewMentorStyleTags('');
    setNewMentorSelectedDomains([]);
    setNewMentorCitations({});
    setNewMentorDefi('');
    setNewMentorRealisation('');
    setModalTab('select'); // Jump back to list
  };

  if (!isOpen) return null;

  const ALL_LIFE_DOMAINS = [
    "Professionnel", "Personnel", "Couple", "Famille", "Spiritualité",
    "Finance", "Amitié", "Éducation", "Santé / Bien-être", "Leadership / Gestion"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/95 backdrop-blur-md animate-fade-in">
      <div className="bg-[#111] border border-concrete/40 w-full max-w-4xl h-[85vh] flex flex-col justify-between overflow-hidden rounded-2xl shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-concrete/20 flex justify-between items-center bg-[#151515]">
          <div>
            <span className="text-[10px] font-mono text-copper uppercase tracking-widest font-bold">
              MODAL DE SÉLECTION DE MENTOR
            </span>
            <h3 className="text-lg font-bold text-offwhite uppercase tracking-tight">
              Trouver un Mentor pour : {activeDomain}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-offwhite hover:bg-concrete/20 transition rounded-xl cursor-pointer"
            id="close-mentor-modal-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Tabs Navigation */}
        <div className="flex border-b border-concrete/20 bg-[#121212] font-mono text-xs">
          <button
            onClick={() => setModalTab('select')}
            className={`flex-1 py-3 text-center border-b-2 font-bold uppercase transition ${
              modalTab === 'select'
                ? 'border-copper text-copper bg-copper/5'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Sélectionner un mentor de confiance ({filteredAndSortedMentors.length} dispos)
          </button>
          <button
            onClick={() => setModalTab('create')}
            className={`flex-1 py-3 text-center border-b-2 font-bold uppercase transition ${
              modalTab === 'create'
                ? 'border-copper text-copper bg-copper/5'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <Plus size={14} /> Ajouter un Mentor sur-mesure
            </span>
          </button>
        </div>

        {/* Modal Body Scroll Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {modalTab === 'select' ? (
            /* SELECT TAB */
            <div className="space-y-6">
              {/* Filter Panel */}
              <div className="p-4 bg-bg-deep rounded-2xl border border-concrete/25 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3.5 text-zinc-600" size={14} />
                    <input
                      type="text"
                      placeholder="Rechercher nom, pays, tag..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#161616] border border-concrete/30 rounded-xl py-2.5 pl-9 pr-4 text-xs text-offwhite placeholder:text-zinc-600 focus:outline-none focus:border-copper/70"
                    />
                  </div>

                  {/* Style selector dropdown */}
                  <div className="relative">
                    <select
                      value={selectedStyleTag}
                      onChange={(e) => setSelectedStyleTag(e.target.value)}
                      className="w-full bg-[#161616] border border-concrete/30 rounded-xl py-2.5 px-3 text-xs text-zinc-300 focus:outline-none focus:border-copper/70 cursor-pointer"
                    >
                      <option value="">Filtre : Style de Mentor</option>
                      {allStyleTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>

                  {/* Country selector dropdown */}
                  <div className="relative">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full bg-[#161616] border border-concrete/30 rounded-xl py-2.5 px-3 text-xs text-zinc-300 focus:outline-none focus:border-copper/70 cursor-pointer"
                    >
                      <option value="">Filtre : Pays d'Origine</option>
                      {allCountries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Checkbox toggles */}
                <div className="flex flex-wrap gap-6 text-[11px] font-mono text-zinc-400">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterNoteFourPlus}
                      onChange={(e) => setFilterNoteFourPlus(e.target.checked)}
                      className="accent-copper rounded"
                    />
                    <span>Note d'excellence (Note &ge; 4.0)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterVerifiedOnly}
                      onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
                      className="accent-copper rounded"
                    />
                    <span className="flex items-center gap-1">
                      Badge de Confiance Vérifié <ShieldCheck size={12} className="text-copper" />
                    </span>
                  </label>
                </div>
              </div>

              {/* Mentors Grid display */}
              {visibleMentors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleMentors.map((m) => {
                    const isUserActive = user.mentor_actif_id === m.id;
                    const isFollowed = user.tous_mes_mentors.includes(m.id);
                    const isPrincipal = user.maitres_principaux.includes(m.id);
                    
                    return (
                      <div
                        key={m.id}
                        onClick={() => {
                          onSelectMentor(m.id);
                          onClose();
                        }}
                        className={`p-4 border rounded-2xl flex flex-col justify-between h-[210px] cursor-pointer transition relative group ${
                          isUserActive
                            ? 'border-copper bg-copper/5 shadow-md shadow-copper/5'
                            : 'border-concrete/30 bg-[#141414] hover:border-concrete/60 hover:bg-[#181818]'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div className="space-y-0.5">
                              <h4 className="font-bold text-xs text-offwhite uppercase tracking-tight group-hover:text-copper transition flex items-center gap-1">
                                {m.nom}
                                {m.badge_verifie && (
                                  <ShieldCheck size={12} className="text-copper fill-copper/5" title="Certifié de Confiance" />
                                )}
                              </h4>
                              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                                <Globe size={10} />
                                <span>{m.pays}</span>
                              </div>
                            </div>

                            {/* Verification / Active badges */}
                            <div className="flex flex-col gap-1 items-end">
                              {isUserActive && (
                                <span className="text-[8px] font-mono bg-copper text-bg-deep px-1.5 py-0.5 rounded font-bold uppercase">
                                  Actif
                                </span>
                              )}
                              {isPrincipal && (
                                <span className="text-[8px] font-mono bg-amber-950/20 text-amber-500 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold uppercase">
                                  Maître
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Citation block */}
                          <p className="text-[10px] text-zinc-400 font-sans italic line-clamp-3 leading-relaxed border-l-2 border-concrete/30 pl-2">
                            « {m.citation_par_domaine[activeDomain] || m.citation_par_domaine['Professionnel'] || 'Marchez vers la souveraineté.'} »
                          </p>
                        </div>

                        {/* Bottom metrics */}
                        <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 pt-2 border-t border-concrete/10 mt-2">
                          <span className="flex items-center gap-0.5 text-amber-500">
                            <Star size={10} className="fill-amber-500" /> {m.note_communaute}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Users size={10} /> {m.nb_suivis.toLocaleString('fr-FR')} suivis
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-zinc-500 font-sans text-xs space-y-2">
                  <p className="font-mono uppercase font-bold text-zinc-400">Aucun mentor disponible</p>
                  <p className="text-[11px] max-w-sm mx-auto leading-normal">
                    Aucun de nos experts de confiance en {activeDomain} ne correspond à vos filtres actifs. Veuillez élargir vos critères ou réinitialiser les sélecteurs.
                  </p>
                </div>
              )}

              {/* Load More Button */}
              {filteredAndSortedMentors.length > visibleCount && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2.5 border border-concrete/30 hover:border-copper hover:text-copper font-mono uppercase text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Charger plus d'experts
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* CREATE TAB */
            <form onSubmit={handleCreateMentor} className="space-y-6">
              {customMentorError && (
                <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-xl font-mono">
                  {customMentorError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-sans">
                {/* Basic fields */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                      Nom complet du mentor *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : Frantz Fanon"
                      value={newMentorName}
                      onChange={(e) => setNewMentorName(e.target.value)}
                      className="w-full bg-[#161616] border border-concrete/30 rounded-xl p-3 text-xs text-offwhite placeholder:text-zinc-600 focus:outline-none focus:border-copper/70"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                      Pays d'origine
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : Martinique"
                      value={newMentorCountry}
                      onChange={(e) => setNewMentorCountry(e.target.value)}
                      className="w-full bg-[#161616] border border-concrete/30 rounded-xl p-3 text-xs text-offwhite placeholder:text-zinc-600 focus:outline-none focus:border-copper/70"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                      Langues parlées (séparées par virgules)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : Français, Anglais"
                      value={newMentorLanguages}
                      onChange={(e) => setNewMentorLanguages(e.target.value)}
                      className="w-full bg-[#161616] border border-concrete/30 rounded-xl p-3 text-xs text-offwhite placeholder:text-zinc-600 focus:outline-none focus:border-copper/70"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                      Style ou tags de doctrine (séparés par virgules)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : Combattif, Philosophe, Stratège"
                      value={newMentorStyleTags}
                      onChange={(e) => setNewMentorStyleTags(e.target.value)}
                      className="w-full bg-[#161616] border border-concrete/30 rounded-xl p-3 text-xs text-offwhite placeholder:text-zinc-600 focus:outline-none focus:border-copper/70"
                    />
                  </div>
                </div>

                {/* Domains list checkboxes */}
                <div className="space-y-3">
                  <label className="block font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                    Sélectionner les domaines d'activité du mentor (1 à 10 domaines) *
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-3 bg-bg-deep rounded-xl border border-concrete/20 max-h-[190px] overflow-y-auto">
                    {ALL_LIFE_DOMAINS.map(domain => {
                      const isChecked = newMentorSelectedDomains.includes(domain);
                      return (
                        <div
                          key={domain}
                          onClick={() => handleDomainCheckbox(domain)}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-concrete/10 cursor-pointer select-none text-[11px]"
                        >
                          <div className={`w-4 h-4 border flex items-center justify-center rounded text-[10px] font-bold ${
                            isChecked ? 'border-copper bg-copper text-bg-deep' : 'border-concrete/40 bg-transparent'
                          }`}>
                            {isChecked ? '✓' : ''}
                          </div>
                          <span className="text-zinc-300">{domain}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Citations per selected domain inputs */}
              {newMentorSelectedDomains.length > 0 && (
                <div className="space-y-3 p-4 bg-bg-deep rounded-xl border border-concrete/20">
                  <h4 className="font-mono text-copper uppercase tracking-wider text-[10px] font-bold">
                    Citations philosophiques par domaine sélectionné
                  </h4>
                  <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                    {newMentorSelectedDomains.map(domain => (
                      <div key={domain} className="space-y-1 text-xs">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">{domain} :</span>
                        <input
                          type="text"
                          placeholder={`Ex : La citation marquante du mentor pour le domaine ${domain}...`}
                          value={newMentorCitations[domain] || ''}
                          onChange={(e) => handleCitationChange(domain, e.target.value)}
                          className="w-full bg-[#161616] border border-concrete/30 rounded-xl p-2.5 text-xs text-offwhite placeholder:text-zinc-600 focus:outline-none focus:border-copper/70"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Signatures */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-sans">
                <div className="space-y-1">
                  <label className="block font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                    Défi signature comportemental de base (Défi Signature) *
                  </label>
                  <textarea
                    placeholder="Ex : Lire 3 essais critiques sans interruption pour purifier son esprit analytique."
                    value={newMentorDefi}
                    onChange={(e) => setNewMentorDefi(e.target.value)}
                    rows={3}
                    className="w-full bg-[#161616] border border-concrete/30 rounded-xl p-3 text-xs text-offwhite placeholder:text-zinc-600 focus:outline-none focus:border-copper/70"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                    Réalisation de référence mesurable (Réalisation Mesurable) *
                  </label>
                  <textarea
                    placeholder="Ex : A mené de multiples mouvements de libération intellectuelle à travers de célèbres essais littéraires."
                    value={newMentorRealisation}
                    onChange={(e) => setNewMentorRealisation(e.target.value)}
                    rows={3}
                    className="w-full bg-[#161616] border border-concrete/30 rounded-xl p-3 text-xs text-offwhite placeholder:text-zinc-600 focus:outline-none focus:border-copper/70"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-copper hover:bg-copper-hover text-bg-deep font-mono uppercase font-bold text-xs tracking-wider transition rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-copper/10 border border-transparent cursor-pointer"
                >
                  <Sparkles size={14} /> Injecter le mentor dans la base active
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-concrete/20 bg-[#121212] flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-zinc-500">
          <span>RÉGIME DE CONFIANCE ET DE GESTION DE L'INSTITUT</span>
          <span>SÉLECTIONNEZ UN ACTEUR CONCEVANT LA DISCIPLINE</span>
        </div>

      </div>
    </div>
  );
};
