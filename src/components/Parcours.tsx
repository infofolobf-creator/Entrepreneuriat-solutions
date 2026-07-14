import React, { useState } from 'react';
import { Mentor, User } from '../types';
import { Compass, Quote, ArrowRight, ShieldAlert, CheckCircle2, Award } from 'lucide-react';

interface ParcoursProps {
  mentor: Mentor;
  user: User;
  onUpdateUser: (newUser: User) => void;
}

type StageType = 'Fondation' | 'Construction' | 'Équilibre' | 'Rayonnement';

export const Parcours: React.FC<ParcoursProps> = ({ mentor, user, onUpdateUser }) => {
  const [activeStage, setActiveStage] = useState<StageType>('Fondation');

  // Dynamic Case Studies Generator based on activeStage, domain, and mentor traits
  const getContextualCaseStudy = (stage: StageType) => {
    const domain = user.domaine_actif;
    const name = mentor.nom;

    const database: Record<StageType, {
      title: string;
      context: string;
      challenges: string[];
      strategies: string[];
      results: string[];
      lesson: string;
    }> = {
      Fondation: {
        title: `L'Ancrage de Base en ${domain} selon ${name}`,
        context: `Dans cette phase de Fondation en ${domain}, la priorité absolue de la méthode de ${name} est de purger les bases de toute fragilité structurelle avant d'envisager la croissance ou l'expansion.`,
        challenges: [
          `Absence de structure ou de repères stables de démarrage en ${domain}.`,
          `Dysfonctionnements récurrents liés à un manque d'alignement ou à de mauvaises habitudes de base.`,
          `Difficulté à mesurer les premiers indicateurs de succès concrets.`
        ],
        strategies: [
          `Mettre en œuvre la doctrine signature de ${name} : « ${mentor.defi_signature} » afin de sceller le point de départ.`,
          `Établir une charte éthique et des indicateurs primaires rigoureux.`,
          `Éliminer les distractions et goulots d'étranglement parasitaires de l'écosystème.`
        ],
        results: [
          `Création d'un socle d'action d'une solidité éprouvée face à l'imprévu.`,
          `Mise en place d'une discipline de fer qui soutient l'effort sans s'essouffler.`,
          `Validation des premiers jalons indispensables au passage à l'étape supérieure.`
        ],
        lesson: `La grandeur ne commence jamais par le sommet. Elle commence par des fondations tellement profondes et stables que rien ne peut faire vaciller l'édifice par la suite.`
      },
      Construction: {
        title: `La Phase d'Exécution et d'Expansion par ${name}`,
        context: `La phase de Construction en ${domain} marque le passage de la théorie à l'action d'envergure. Sous l'égide de ${name}, nous bâtissons des piliers solides et multiplions l'impact par un engagement intense.`,
        challenges: [
          `Essoufflement de la motivation initiale lors de la confrontation au terrain ou au réel.`,
          `Tensions liées à l'augmentation de la complexité de l'environnement en ${domain}.`,
          `Nécessité de déléguer, de systématiser ou de structurer les processus pour éviter l'épuisement.`
        ],
        strategies: [
          `Déployer l'approche systémique de ${name} pour industrialiser vos efforts.`,
          `Concentrer toutes vos ressources financières, cognitives ou émotionnelles sur les 20% d'activités qui génèrent 80% de l'impact réel.`,
          `Créer des boucles de rétroaction rapide pour corriger immédiatement les failles d'exécution.`
        ],
        results: [
          `Une accélération mesurable des résultats dans le domaine ${domain}.`,
          `Acquisition d'une résilience mentale de fer face aux imprévus extérieurs.`,
          `Souveraineté et autonomie acquises sur les tâches à forte valeur ajoutée.`
        ],
        lesson: `Bâtir exige de la patience et de la précision. Chaque brique posée de manière méthodique est une garantie de pérennité pour l'édifice tout entier.`
      },
      Équilibre: {
        title: `L'Harmonisation et la Résistance aux Chocs de ${name}`,
        context: `Une fois l'empire personnel ou professionnel édifié, la doctrine de ${name} enseigne la maîtrise de l'Équilibre. Il s'agit de sanctuariser vos acquis et de préserver vos ressources vitales.`,
        challenges: [
          `Risque d'épuisement (burnout) ou de cassure interne dû à une surcharge prolongée.`,
          `Désalignement progressif entre les succès visibles et le bien-être intérieur.`,
          `Tensions ou frottements avec le cercle proche (couple, famille, communauté).`
        ],
        strategies: [
          `Sanctuariser des périodes d'arrêt absolu en pleine conscience, en appliquant les conseils bienveillants de ${name}.`,
          `Réguler activement le stress par une hygiène de vie ou de pensée calibrée pour l'endurance.`,
          `Négocier des limites fermes et respectueuses entre les différents domaines de vie.`
        ],
        results: [
          `Maintien d'un niveau d'excellence stable, sans pics de fatigue critique ni de baisse de lucidité.`,
          `Apaisement des tensions relationnelles et reconnexion sincère avec ses proches.`,
          `Alignement profond entre vos valeurs spirituelles, physiques et matérielles.`
        ],
        lesson: `Le véritable pouvoir ne réside pas dans la vitesse de pointe, mais dans la capacité à maintenir l'allure indéfiniment sans jamais briser le moteur.`
      },
      Rayonnement: {
        title: `La Transmission de Valeur et Impact Collectif par ${name}`,
        context: `L'étape finale de la doctrine de ${name} est le Rayonnement. Vos succès personnels doivent être convertis en héritage collectif, en formation de disciples et en impact durable pour la communauté.`,
        challenges: [
          `Risque de voir son savoir ou ses accomplissements disparaître avec soi.`,
          `Sentiment d'isolement au sommet si l'écosystème direct ne grandit pas en même temps.`,
          `Nécessité de bâtir une structure de transmission autonome et pérenne.`
        ],
        strategies: [
          `Mettre en œuvre la grande œuvre de transmission symbolisée par la réussite de ${name} : « ${mentor.realisation_mesurable} ».`,
          `Parrainer activement les nouvelles générations ou les membres de votre famille en partageant votre testament moral.`,
          `Créer une fondation, un rituel ou un espace communautaire d'apprentissage autonome.`
        ],
        results: [
          `Création d'une empreinte positive durable et hautement respectée par vos pairs.`,
          `Sensation profonde de plénitude, de sens et de devoir accompli.`,
          `Démultiplication de votre influence positive bien au-delà de votre sphère directe.`
        ],
        lesson: `La richesse ou la sagesse accumulée n'a de valeur que si elle est partagée. Le but ultime de l'excellence est d'allumer le flambeau d'autrui.`
      }
    };

    return database[stage];
  };

  const handleCompleteStage = (stage: StageType) => {
    // Increase progress for active domain on course completion
    const currentProgress = user.progression_par_domaine[user.domaine_actif] || { impact: 0, discipline_streak: 0 };
    const nextImpact = Math.min(100, currentProgress.impact + 8);
    
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
  };

  const currentStudy = getContextualCaseStudy(activeStage);
  const currentProgress = user.progression_par_domaine[user.domaine_actif] || { impact: 0, discipline_streak: 0 };

  return (
    <div className="space-y-6 animate-fade-in" id="parcours-module">
      <div className="flex items-center gap-3 border-b border-concrete/40 pb-3">
        <div className="p-2 bg-copper/10 text-copper rounded-lg">
          <Compass size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-offwhite uppercase tracking-tight">
            Parcours de Stratégie (Case Studies)
          </h3>
          <p className="text-zinc-400 text-xs font-sans">
            Pilotez votre parcours personnel en explorant les 4 niveaux stratégiques d'intégration de la doctrine Dangote-Mentor.
          </p>
        </div>
      </div>

      {/* Stage Selectors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(['Fondation', 'Construction', 'Équilibre', 'Rayonnement'] as StageType[]).map((stage) => {
          const isSelected = activeStage === stage;
          return (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer text-center rounded-xl border ${
                isSelected
                  ? 'bg-copper text-bg-deep border-copper shadow-md shadow-copper/10'
                  : 'bg-card-bg text-zinc-400 border-concrete/30 hover:border-concrete/60'
              }`}
              id={`btn-parcours-${stage}`}
            >
              {stage}
            </button>
          );
        })}
      </div>

      {/* Case Study Content Card */}
      <div className="bg-card-bg border border-concrete/40 p-6 rounded-2xl shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-concrete/20 pb-4">
          <div>
            <span className="text-[10px] font-mono text-copper uppercase tracking-wider font-bold">
              Étude de Cas d'Élite : {activeStage.toUpperCase()}
            </span>
            <h4 className="text-base font-bold text-offwhite mt-1 uppercase tracking-tight">
              {currentStudy.title}
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-bg-deep px-3 py-1.5 rounded-lg border border-concrete/20">
            <Award size={14} className="text-copper" />
            <span>Maitrise : Niveau {activeStage === 'Fondation' ? '1' : activeStage === 'Construction' ? '2' : activeStage === 'Équilibre' ? '3' : '4'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Context and Quote */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-4 bg-bg-deep border-l-4 border-copper rounded-r-xl relative">
              <Quote className="absolute right-3 top-3 text-concrete/10" size={32} />
              <p className="text-zinc-300 italic font-serif text-xs leading-relaxed max-w-[90%]">
                « {mentor.citation_par_domaine[user.domaine_actif] || mentor.citation_par_domaine['Professionnel'] || "Avancez toujours avec discipline."} »
              </p>
              <span className="block text-[10px] font-mono text-copper mt-2 text-right">
                — {mentor.nom}, {mentor.pays}
              </span>
            </div>

            <div className="space-y-2">
              <h5 className="font-mono text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                📋 Contexte du Cas d'Étude
              </h5>
              <p className="text-zinc-300 text-xs font-sans leading-relaxed">
                {currentStudy.context}
              </p>
            </div>
          </div>

          {/* Challenges & Action grid */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-red-950/10 border border-red-900/20 rounded-xl space-y-2.5">
              <h5 className="font-mono text-[10px] text-red-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <ShieldAlert size={12} /> Les défis du terrain
              </h5>
              <ul className="space-y-1.5 text-zinc-400 text-[11px] font-sans list-disc pl-4 leading-relaxed">
                {currentStudy.challenges.map((challenge, idx) => (
                  <li key={idx}>{challenge}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-emerald-950/10 border border-emerald-900/20 rounded-xl space-y-2.5">
              <h5 className="font-mono text-[10px] text-impact-hover uppercase font-bold tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={12} /> Résolution & Résultats
              </h5>
              <ul className="space-y-1.5 text-zinc-400 text-[11px] font-sans list-disc pl-4 leading-relaxed">
                {currentStudy.results.map((result, idx) => (
                  <li key={idx}>{result}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Strategies implemented */}
        <div className="p-4 bg-[#141414] border border-concrete/30 rounded-xl space-y-3">
          <h5 className="font-mono text-[10px] text-copper uppercase font-bold tracking-wider">
            🛠️ Actions stratégiques mises en œuvre par {mentor.nom} :
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-zinc-300 leading-relaxed">
            {currentStudy.strategies.map((strat, idx) => (
              <div key={idx} className="flex gap-2.5 items-start bg-[#0A0A0A] p-3 rounded-lg border border-concrete/10">
                <span className="font-mono text-copper font-bold">{idx + 1}.</span>
                <p className="text-[11px]">{strat}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Lesson */}
        <div className="p-4 bg-bg-deep border border-copper/20 rounded-xl space-y-1.5">
          <h5 className="font-mono text-[10px] text-copper uppercase font-bold tracking-wider">
            💡 Enseignement direct pour l'entrepreneur :
          </h5>
          <p className="text-zinc-300 italic text-xs font-serif leading-relaxed">
            « {currentStudy.lesson} »
          </p>
        </div>

        {/* Action Validation Bar */}
        <div className="border-t border-concrete/25 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-zinc-500 font-mono text-[10px] text-center sm:text-left">
            VOTRE NIVEAU DE COMPRÉHENSION EN {user.domaine_actif.toUpperCase()} : {currentProgress.impact}%
          </div>
          <button
            onClick={() => handleCompleteStage(activeStage)}
            className="w-full sm:w-auto px-6 py-2.5 bg-impact hover:bg-impact-hover text-offwhite uppercase font-mono font-bold tracking-wider text-xs flex items-center justify-center gap-2 transition rounded-xl cursor-pointer"
          >
            Assimiler l'étude de cas et progresser <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
