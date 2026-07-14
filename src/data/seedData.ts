import { Mentor } from '../types';

export const SEED_MENTORS: Mentor[] = [
  {
    id: "aliko-dangote",
    nom: "Aliko Dangote",
    domaines: ["Professionnel", "Finance", "Leadership / Gestion"],
    tags_style: ["Visionnaire", "Opérationnel", "Déterminé"],
    pays: "Nigeria",
    langues: ["Anglais", "Haoussa"],
    citation_par_domaine: {
      "Professionnel": "Ne lancez pas une entreprise si vous n'avez pas une compréhension claire de la chaîne de valeur du début à la fin.",
      "Finance": "Réinvestissez vos bénéfices dans l'industrie de base plutôt que de les thésauriser. L'argent doit circuler pour créer de l'emploi.",
      "Leadership / Gestion": "Le leadership consiste à transformer les difficultés d'approvisionnement nationales en opportunités industrielles de grande envergure."
    },
    defi_signature: "Bâtir un business plan d'intégration verticale sur 5 ans pour éliminer un goulot d'étranglement logistique majeur.",
    realisation_mesurable: "A construit la plus grande cimenterie d'Afrique subsaharienne, éliminant la dépendance aux importations de ciment au Nigeria.",
    actif: true,
    note_communaute: 4.8,
    nb_suivis: 15200,
    badge_verifie: true,
    nb_votes: 65
  },
  {
    id: "tony-elumelu",
    nom: "Tony Elumelu",
    domaines: ["Professionnel", "Finance"],
    tags_style: ["Africapitalisme", "Stratégique", "Phare"],
    pays: "Nigeria",
    langues: ["Anglais", "Français"],
    citation_par_domaine: {
      "Professionnel": "L'Africapitalisme est la clé : le secteur privé doit mener la transformation sociale et économique du continent par des investissements à long terme.",
      "Finance": "Le capitalisme doit être inclusif. Investissez de manière à générer simultanément de la richesse économique et du bien-être social."
    },
    defi_signature: "Identifier et formaliser 3 partenariats stratégiques locaux pour stimuler votre écosystème commercial immédiat.",
    realisation_mesurable: "A financé et accompagné plus de 10 000 jeunes entrepreneurs africains à travers sa fondation éponyme.",
    actif: true,
    note_communaute: 4.7,
    nb_suivis: 12400,
    badge_verifie: true,
    nb_votes: 52
  },
  {
    id: "esther-perel",
    nom: "Esther Perel",
    domaines: ["Couple", "Personnel"],
    tags_style: ["Relationnel", "Psychologique", "Analytique"],
    pays: "Belgique",
    langues: ["Français", "Anglais", "Hébreu"],
    citation_par_domaine: {
      "Couple": "La qualité de nos relations détermine la qualité de nos vies. L'amour a besoin de connexion, mais le désir a besoin d'espace.",
      "Personnel": "La confiance en soi s'ancre dans notre capacité à tolérer l'incertitude et à naviguer dans la complexité de nos émotions."
    },
    defi_signature: "Établir un rituel hebdomadaire de parole active sans aucun écran pour désamorcer les non-dits accumulés.",
    realisation_mesurable: "A transformé la thérapie de couple contemporaine avec des millions d'auditeurs réguliers sur ses podcasts d'analyse relationnelle.",
    actif: true,
    note_communaute: 4.9,
    nb_suivis: 9800,
    badge_verifie: true,
    nb_votes: 74
  },
  {
    id: "john-gottman",
    nom: "John Gottman",
    domaines: ["Couple", "Famille"],
    tags_style: ["Scientifique", "Méthodique", "Écoute"],
    pays: "États-Unis",
    langues: ["Anglais"],
    citation_par_domaine: {
      "Couple": "Les petites tentatives de connexion quotidienne sont plus importantes pour la longévité du couple que les grands gestes dramatiques.",
      "Famille": "Les parents qui agissent comme des guides émotionnels transmettent à leurs enfants des facultés de résilience inestimables pour leur futur."
    },
    defi_signature: "Pratiquer le ratio de Gottman (5 interactions positives pour 1 négative) de manière rigoureuse pendant 7 jours.",
    realisation_mesurable: "A conçu des modèles mathématiques de prédiction de stabilité de couple avec 90% d'exactitude scientifique (The Love Lab).",
    actif: true,
    note_communaute: 4.8,
    nb_suivis: 8500,
    badge_verifie: true,
    nb_votes: 41
  },
  {
    id: "thich-nhat-hanh",
    nom: "Thich Nhat Hanh",
    domaines: ["Spiritualité", "Personnel", "Santé / Bien-être"],
    tags_style: ["Sagesse", "Zen", "Bienveillant"],
    pays: "Vietnam",
    langues: ["Français", "Vietnamien", "Anglais"],
    citation_par_domaine: {
      "Spiritualité": "Il n'y a pas de chemin vers la paix, la paix est le chemin. Tout commence par votre respiration présente.",
      "Personnel": "Le miracle n'est pas de marcher sur l'eau, mais de marcher sur la terre verte dans le moment présent avec une conscience éveillée.",
      "Santé / Bien-être": "La respiration consciente est le pont qui réconcilie le corps et l'esprit, apaisant le système nerveux en un instant."
    },
    defi_signature: "Pratiquer 10 minutes de marche méditative en pleine conscience chaque matin, sans montre ni téléphone.",
    realisation_mesurable: "A fondé le Village des Pruniers en France, formant des dizaines de milliers de personnes aux rituels de pleine conscience.",
    actif: true,
    note_communaute: 4.95,
    nb_suivis: 14000,
    badge_verifie: true,
    nb_votes: 95
  },
  {
    id: "warren-buffett",
    nom: "Warren Buffett",
    domaines: ["Finance", "Professionnel"],
    tags_style: ["Prudent", "Rationnel", "Légendaire"],
    pays: "États-Unis",
    langues: ["Anglais"],
    citation_par_domaine: {
      "Finance": "Règle numéro 1 : Ne perdez jamais d'argent. Règle numéro 2 : N'oubliez jamais la règle numéro 1. Investissez dans ce que vous comprenez.",
      "Professionnel": "Il faut vingt ans pour bâtir une réputation et cinq minutes pour la détruire. Si vous y pensez, vous agirez différemment."
    },
    defi_signature: "Analyser les états financiers de 3 entreprises locales et évaluer l'épaisseur de leur fossé concurrentiel.",
    realisation_mesurable: "A transformé une entreprise textile défaillante (Berkshire Hathaway) en un conglomérat mondial de plus de 700 milliards de dollars.",
    actif: true,
    note_communaute: 4.9,
    nb_suivis: 22000,
    badge_verifie: true,
    nb_votes: 110
  },
  {
    id: "nelson-mandela",
    nom: "Nelson Mandela",
    domaines: ["Leadership / Gestion", "Personnel"],
    tags_style: ["Résilient", "Charismatique", "Réconciliateur"],
    pays: "Afrique du Sud",
    langues: ["Anglais", "Xhosa"],
    citation_par_domaine: {
      "Leadership / Gestion": "Un leader est comme un berger. Il reste derrière le troupeau, laissant les plus agiles aller devant, tandis que les autres suivent sans s'en rendre compte.",
      "Personnel": "Notre plus grande gloire n'est pas de ne jamais tomber, mais de nous relever à chaque fois que nous tombons."
    },
    defi_signature: "Identifier une rancune ou un conflit professionnel et initier une discussion de réconciliation désintéressée.",
    realisation_mesurable: "A unifié une Afrique du Sud au bord de la guerre civile après 27 ans d'emprisonnement politique.",
    actif: true,
    note_communaute: 4.98,
    nb_suivis: 18000,
    badge_verifie: true,
    nb_votes: 154
  },
  {
    id: "james-clear",
    nom: "James Clear",
    domaines: ["Personnel", "Santé / Bien-être"],
    tags_style: ["Pragmatique", "Méthodique", "Efficace"],
    pays: "États-Unis",
    langues: ["Anglais"],
    citation_par_domaine: {
      "Personnel": "Vous ne vous élevez pas au niveau de vos objectifs. Vous tombez au niveau de vos systèmes. Les habitudes sont les intérêts composés du développement personnel.",
      "Santé / Bien-être": "Chaque habitude saine est un vote en faveur de l'identité que vous souhaitez incarner à long terme."
    },
    defi_signature: "Concevoir un système d'empilement d'habitudes (Habit Stacking) pour intégrer une activité physique incontournable.",
    realisation_mesurable: "Auteur du best-seller 'Un rien peut tout changer', vendu à plus de 15 millions d'exemplaires et traduit en 50 langues.",
    actif: true,
    note_communaute: 4.75,
    nb_suivis: 16500,
    badge_verifie: true,
    nb_votes: 62
  },
  {
    id: "david-goggins",
    nom: "David Goggins",
    domaines: ["Santé / Bien-être", "Personnel", "Leadership / Gestion"],
    tags_style: ["Inflexible", "Mental de Fer", "Intense"],
    pays: "États-Unis",
    langues: ["Anglais"],
    citation_par_domaine: {
      "Santé / Bien-être": "Quand votre esprit vous supplie d'arrêter, vous n'êtes en réalité qu'à 40% de vos capacités réelles de résistance physique.",
      "Personnel": "La motivation est un sentiment éphémère. Seule une discipline militaire auto-imposée vous mènera au bout de vos ambitions.",
      "Leadership / Gestion": "Le leadership s'acquiert par l'action brute. Montrez l'exemple en faisant en premier ce que tout le monde redoute."
    },
    defi_signature: "Exécuter une séance d'endurance physique éprouvante à l'aube pour recalibrer votre résistance mentale à l'effort.",
    realisation_mesurable: "Seul membre des forces armées américaines à avoir complété les sélections des Navy SEALs, Rangers et Air Control.",
    actif: true,
    note_communaute: 4.85,
    nb_suivis: 19000,
    badge_verifie: true,
    nb_votes: 88
  },
  {
    id: "dr-arikana-chihombori",
    nom: "Dr. Arikana Chihombori",
    domaines: ["Santé / Bien-être", "Leadership / Gestion"],
    tags_style: ["Militante", "Généreuse", "Authentique"],
    pays: "Zimbabwe",
    langues: ["Anglais", "Shona"],
    citation_par_domaine: {
      "Santé / Bien-être": "La véritable santé d'un peuple commence par la décolonisation culturelle de son esprit et la réappropriation de son hygiène de vie traditionnelle.",
      "Leadership / Gestion": "Le rôle d'un dirigeant est de dénoncer l'injustice systémique, même si cela bouscule l'ordre établi et menace sa propre position."
    },
    defi_signature: "Initier et animer un atelier d'éducation sanitaire ou civique axé sur l'autosuffisance locale.",
    realisation_mesurable: "Ancienne représentante de l'Union Africaine aux USA, fondatrice de réseaux de cliniques médicales panafricaines de haut standing.",
    actif: true,
    note_communaute: 4.8,
    nb_suivis: 7800,
    badge_verifie: true,
    nb_votes: 36
  },
  {
    id: "sugata-mitra",
    nom: "Sugata Mitra",
    domaines: ["Éducation", "Personnel"],
    tags_style: ["Innovateur", "Expérimental", "Enthousiaste"],
    pays: "Inde",
    langues: ["Anglais", "Bengali"],
    citation_par_domaine: {
      "Éducation": "L'éducation est un système auto-organisé. Fournissez aux enfants des outils numériques de recherche libres, et ils apprendront d'eux-mêmes.",
      "Personnel": "Pour rester jeune d'esprit, mettez régulièrement à l'épreuve vos certitudes d'adulte en observant la curiosité innée d'un enfant."
    },
    defi_signature: "Construire une énigme conceptuelle ardue et la soumettre à un cercle de collègues ou d'élèves sans intervenir dans leur recherche.",
    realisation_mesurable: "Créateur de l'expérience révolutionnaire 'Hole in the Wall' démontrant l'auto-apprentissage technologique des enfants défavorisés.",
    actif: true,
    note_communaute: 4.7,
    nb_suivis: 6900,
    badge_verifie: true,
    nb_votes: 30
  },
  {
    id: "robin-dunbar",
    nom: "Robin Dunbar",
    domaines: ["Amitié", "Famille"],
    tags_style: ["Sociologue", "Analytique", "Réaliste"],
    pays: "Royaume-Uni",
    langues: ["Anglais"],
    citation_par_domaine: {
      "Amitié": "La taille biologique de notre cortex limite nos relations stables à environ 150 personnes. Concentrez vos efforts sur les 5 piliers de votre premier cercle.",
      "Famille": "Les liens familiaux résistent mieux au temps et à l'éloignement géographique, mais nécessitent des rituels de contact minimum pour ne pas s'étioler."
    },
    defi_signature: "Faire le tri de vos contacts et passer un appel de reconnexion d'au moins 20 minutes à un ami cher perdu de vue.",
    realisation_mesurable: "A théorisé le célèbre 'Nombre de Dunbar' (150 contacts), socle de la sociologie des réseaux modernes.",
    actif: true,
    note_communaute: 4.6,
    nb_suivis: 5400,
    badge_verifie: true,
    nb_votes: 24
  },
  {
    id: "adebayo-ogunlesi",
    nom: "Adebayo Ogunlesi",
    domaines: ["Finance", "Professionnel"],
    tags_style: ["Rationnel", "Bâtisseur", "Haut Niveau"],
    pays: "Nigeria",
    langues: ["Anglais"],
    citation_par_domaine: {
      "Finance": "Les infrastructures physiques sont des actifs exceptionnels : elles fournissent des services indispensables et génèrent des cash-flows prévisibles à long terme.",
      "Professionnel": "La rigueur opérationnelle absolue et la réputation d'intégrité financière sont les seuls passeports valides pour le très haut niveau industriel."
    },
    defi_signature: "Rédiger une note de calcul de rentabilité ou de valorisation simplifiée pour un projet d'infrastructure de quartier.",
    realisation_mesurable: "Directeur de Global Infrastructure Partners, gérant plus de 100 milliards de dollars d'actifs d'envergure (dont l'aéroport de Gatwick).",
    actif: true,
    note_communaute: 4.85,
    nb_suivis: 8100,
    badge_verifie: true,
    nb_votes: 39
  },
  {
    id: "jacinda-ardern",
    nom: "Jacinda Ardern",
    domaines: ["Leadership / Gestion", "Famille"],
    tags_style: ["Empathique", "Moderne", "Résolue"],
    pays: "Nouvelle-Zélande",
    langues: ["Anglais"],
    citation_par_domaine: {
      "Leadership / Gestion": "La bienveillance et l'empathie ne sont pas des faiblesses politiques, ce sont les moteurs les plus puissants de l'adhésion collective en temps de crise.",
      "Famille": "Aucun succès public ou professionnel ne peut compenser l'absence émotionnelle auprès de vos enfants pendant leurs années de fondation."
    },
    defi_signature: "Mettre en place un protocole d'arbitrage de groupe valorisant l'inclusion et la sécurité psychologique de chaque membre.",
    realisation_mesurable: "A mené la Nouvelle-Zélande avec une acclamation internationale à travers des crises majeures tout en devenant mère en cours de mandat.",
    actif: true,
    note_communaute: 4.8,
    nb_suivis: 9200,
    badge_verifie: true,
    nb_votes: 43
  },
  {
    id: "nana-kofi",
    nom: "Nana Kofi",
    domaines: ["Famille", "Spiritualité", "Leadership / Gestion"],
    tags_style: ["Traditionnel", "Savant", "Transmetteur"],
    pays: "Ghana",
    langues: ["Anglais", "Twi"],
    citation_par_domaine: {
      "Famille": "La famille est comme la forêt : vue de l'extérieur elle est dense, mais chaque arbre y puise sa propre lumière tout en protégeant les autres.",
      "Spiritualité": "Honorer nos ancêtres, c'est comprendre que nous sommes le maillon d'une chaîne éternelle. Nos choix d'aujourd'hui résonneront sur sept générations.",
      "Leadership / Gestion": "Le véritable souverain ne gouverne pas par décret solitaire, il rassemble les aînés sous l'arbre à palabres pour forger le consensus communautaire."
    },
    defi_signature: "Rédiger un testament moral de 5 principes philosophiques essentiels à transmettre impérativement à votre descendance.",
    realisation_mesurable: "Dignitaire ghanéen de haut rang, réputé pour avoir arbitrateur de nombreux pactes de paix foncière et de réconciliation tribale.",
    actif: true,
    note_communaute: 4.75,
    nb_suivis: 6100,
    badge_verifie: true,
    nb_votes: 28
  }
];

export const LIFE_DOMAINS = [
  "Professionnel",
  "Personnel",
  "Couple",
  "Famille",
  "Spiritualité",
  "Finance",
  "Amitié",
  "Éducation",
  "Santé / Bien-être",
  "Leadership / Gestion"
];

// Map of Academy cards for each domain as requested
export const ACADEMY_MAPPING: Record<string, string[]> = {
  "Professionnel": ["Professionnel-Stratégie", "Professionnel-Exécution", "Professionnel-Management", "Professionnel-Croissance"],
  "Personnel": ["Personnel-Habitudes", "Personnel-Mental", "Personnel-Énergie", "Personnel-Focus"],
  "Couple": ["Couple-Communication", "Couple-Confiance", "Couple-Intimité", "Couple-Projets communs"],
  "Famille": ["Famille-Éducation", "Famille-Transmission", "Famille-Conflits", "Famille-Héritage"],
  "Spiritualité": ["Spiritualité-Méditation", "Spiritualité-Sens", "Spiritualité-Rituels", "Spiritualité-Service"],
  "Finance": ["Finance-Épargne", "Finance-Investissement", "Finance-Dette", "Finance-Transmission"],
  "Amitié": ["Amitié-Créer du lien", "Amitié-Entretien", "Amitié-Conflits", "Amitié-Communauté"],
  "Éducation": ["Éducation-Apprendre", "Éducation-Enseigner", "Éducation-Curiosité", "Éducation-Transmission"],
  "Santé / Bien-être": ["Santé / Bien-être-Nutrition", "Santé / Bien-être-Mouvement", "Santé / Bien-être-Sommeil", "Santé / Bien-être-Prévention"],
  "Leadership / Gestion": ["Leadership / Gestion-Vision", "Leadership / Gestion-Décision", "Leadership / Gestion-Délégation", "Leadership / Gestion-Influence"]
};

// Course contents mock for active learning
export const ACADEMY_CONTENT: Record<string, { desc: string; actions: string[] }> = {
  // Professionnel
  "Professionnel-Stratégie": {
    desc: "Définition d'un positionnement unique de marché et identification d'une barrière d'entrée pérenne.",
    actions: ["Faire l'analyse SWOT de votre projet principal", "Rédiger votre proposition de valeur en une phrase", "Analyser la stratégie de votre concurrent direct"]
  },
  "Professionnel-Exécution": {
    desc: "Mise en place de rituels opérationnels et d'indicateurs de performance clés (KPIs).",
    actions: ["Établir vos 3 KPIs opérationnels de la semaine", "Créer un tableau de bord d'exécution quotidien", "Éliminer une tâche redondante de votre calendrier"]
  },
  "Professionnel-Management": {
    desc: "Recrutement, animation et alignement d'équipes de haut niveau autour d'une vision forte.",
    actions: ["Rédiger une fiche de poste claire pour votre prochain recrutement", "Mettre en place un point individuel hebdomadaire structuré", "Définir la charte de valeurs de votre équipe"]
  },
  "Professionnel-Croissance": {
    desc: "Méthodes de mise à l'échelle, d'acquisition client de masse et d'automatisation.",
    actions: ["Cartographier votre tunnel d'acquisition client actuel", "Identifier un nouveau canal de distribution de masse", "Créer un partenariat de co-marketing"]
  },

  // Personnel
  "Personnel-Habitudes": {
    desc: "Conception de micro-routines quotidiennes pour automatiser le succès personnel.",
    actions: ["Appliquer l'empilement d'habitudes après votre premier café", "Mettre en place une friction sur votre habitude toxique #1", "Suivre vos habitudes sur un tracker physique pendant 5 jours"]
  },
  "Personnel-Mental": {
    desc: "Développement d'un esprit de résilience absolue face à l'échec et à l'inconfort.",
    actions: ["Faire une liste de vos 3 plus grandes peurs et l'analyser rationnellement", "Pratiquer le dialogue interne positif face à un obstacle", "Prendre une douche froide pour renforcer la volonté"]
  },
  "Personnel-Énergie": {
    desc: "Optimisation de votre niveau de vitalité corporelle et cognitive tout au long de la journée.",
    actions: ["Éliminer le sucre raffiné de vos collations", "Faire une marche de 20 minutes au soleil le matin", "Établir un rituel de coupure numérique de fin de journée"]
  },
  "Personnel-Focus": {
    desc: "Techniques de travail en profondeur (Deep Work) et d'élimination des distractions modernes.",
    actions: ["Travailler en bloc de 90 minutes sans aucune notification", "Installer un bloqueur d'applications distrayantes", "Définir votre unique priorité absolue du jour la veille au soir"]
  },

  // Couple
  "Couple-Communication": {
    desc: "Pratiques d'écoute active et expression de vos besoins sans confrontation stérile.",
    actions: ["Pratiquer l'écoute miroir sans interrompre votre partenaire", "Exprimer un besoin en utilisant le 'Je' au lieu du 'Tu'", "Planifier une discussion sur vos émotions respectives"]
  },
  "Couple-Confiance": {
    desc: "Bâtir la sécurité émotionnelle et restaurer la confiance après des périodes de crise.",
    actions: ["Faire preuve d'une vulnérabilité honnête sur un sujet délicat", "Tenir une promesse insignifiante mais symbolique", "Exprimer votre gratitude sincère pour un geste quotidien"]
  },
  "Couple-Intimité": {
    desc: "Cultiver la complicité, le désir physique et l'attention exclusive dans la durée.",
    actions: ["Planifier un rendez-vous amoureux surprise (Date Night)", "Prendre 10 secondes pour un câlin prolongé en pleine conscience", "Partager un fantasme ou une envie de complicité créative"]
  },
  "Couple-Projets communs": {
    desc: "Aligner vos visions de vie, vos budgets et planifier un avenir harmonieux à deux.",
    actions: ["Rédiger votre charte de vision de couple à 5 ans", "Faire un point budgétaire transparent sans jugement", "Planifier votre prochain grand projet créatif commun"]
  },

  // Famille
  "Famille-Éducation": {
    desc: "Accompagner le développement de vos enfants par l'autonomie et le cadre bienveillant.",
    actions: ["Impliquer vos enfants dans une décision logistique du foyer", "Mettre en place un cadre de temps d'écran négocié et respecté", "Pratiquer le renforcement positif après un effort fourni"]
  },
  "Famille-Transmission": {
    desc: "Transmettre vos valeurs cardinales, votre histoire et vos connaissances morales.",
    actions: ["Raconter une anecdote de vos ancêtres au dîner", "Rédiger les 3 règles éthiques inviolables de la maison", "Partager un savoir-faire artisanal avec un membre plus jeune"]
  },
  "Famille-Conflits": {
    desc: "Résolution pacifique des tensions intergénérationnelles et familiales par l'écoute.",
    actions: ["Mettre en place un conseil de famille hebdomadaire", "Laisser chacun exprimer son grief sans l'interrompre", "Trouver un compromis gagnant-gagnant sur une tension récurrente"]
  },
  "Famille-Héritage": {
    desc: "Préparation de la succession matérielle, spirituelle et culturelle de la lignée.",
    actions: ["Faire l'inventaire des archives et photos familiales de valeur", "Discuter ouvertement des attentes de transmission matérielle", "Créer un carnet de recettes ou de coutumes familiales"]
  },

  // Spiritualité
  "Spiritualité-Méditation": {
    desc: "Ancrage mental par le silence régulier et l'observation sans jugement de vos pensées.",
    actions: ["Méditer 5 minutes en silence au réveil", "Observer vos pensées comme des nuages de passage pendant 10 minutes", "Suivre un scan corporel guidé avant le sommeil"]
  },
  "Spiritualité-Sens": {
    desc: "Alignement de vos actions quotidiennes avec votre mission profonde d'existence (Ikigai).",
    actions: ["Remplir les 4 cercles de votre Ikigai personnel", "Définir vos 3 valeurs existentielles suprêmes", "Écrire une lettre à votre moi de dans 10 ans"]
  },
  "Spiritualité-Rituels": {
    desc: "Création de balises temporelles sacrées pour célébrer la vie et cultiver la gratitude.",
    actions: ["Noter 3 gratitudes précises chaque soir", "Célébrer le début de semaine par un rituel d'intention", "Pratiquer un moment de silence partagé avant le repas"]
  },
  "Spiritualité-Service": {
    desc: "Contribuer de manière désintéressée au bien-être de votre communauté humaine.",
    actions: ["Réaliser une bonne action anonyme aujourd'hui", "Offrir votre aide bénévole à une association locale", "Partager votre expertise gratuitement avec quelqu'un dans le besoin"]
  },

  // Finance
  "Finance-Épargne": {
    desc: "Construire un fonds d'urgence inviolable et optimiser vos dépenses fixes récurrentes.",
    actions: ["Automatiser un virement d'épargne dès le jour de paye", "Auditer et résilier 3 abonnements mensuels inutiles", "Établir votre budget mensuel de base ultra-détaillé"]
  },
  "Finance-Investissement": {
    desc: "Comprendre les intérêts composés, l'immobilier, la bourse et les actifs productifs.",
    actions: ["Simuler la trajectoire d'un investissement mensuel sur 15 ans", "Lire la fiche technique d'un fonds indiciel à bas coût (ETF)", "Étudier le rendement locatif brut d'un bien de votre quartier"]
  },
  "Finance-Dette": {
    desc: "Stratégies d'extinction rapide des dettes toxiques et utilisation du levier sain.",
    actions: ["Lister toutes vos dettes par taux d'intérêt décroissant", "Appliquer la méthode 'Boule de Neige' sur votre plus petite dette", "Négocier de meilleures conditions sur un crédit en cours"]
  },
  "Finance-Transmission": {
    desc: "Structurer son patrimoine pour protéger ses proches et assurer un transfert optimal.",
    actions: ["Se renseigner sur la fiscalité des donations familiales", "Rédiger les volontés de répartition de vos objets de valeur", "Ouvrir un compte d'épargne de long terme pour vos enfants"]
  },

  // Amitié
  "Amitié-Créer du lien": {
    desc: "Vaincre la timidité et initier des rencontres de valeur avec des profils inspirants.",
    actions: ["Aborder un inconnu de manière polie lors d'un événement", "S'inscrire à une activité associative ou sportive locale", "Inviter une nouvelle connaissance à prendre un café informel"]
  },
  "Amitié-Entretien": {
    desc: "Pratiques de fidélité amicale pour conserver des amitiés saines malgré la distance.",
    actions: ["Envoyer un message de soutien inattendu à un vieil ami", "Planifier un appel vidéo de rattrapage avec un ami éloigné", "Se souvenir et fêter un anniversaire important par écrit"]
  },
  "Amitié-Conflits": {
    desc: "Résoudre les malentendus amicaux sans rompre le lien de confiance établi.",
    actions: ["Exprimer calmement une déception amicale sans agressivité", "Présenter des excuses honnêtes après un tort de votre part", "Accepter un désaccord d'opinion sans rancune prolongée"]
  },
  "Amitié-Communauté": {
    desc: "Animer un cercle social de soutien mutuel et de partage de moments festifs.",
    actions: ["Organiser un dîner de retrouvailles pour 6 amis proches", "Créer un groupe de discussion pour coordonner une activité commune", "Lancer un club de lecture ou de partage thématique amical"]
  },

  // Éducation
  "Éducation-Apprendre": {
    desc: "Techniques de mémorisation rapide, de lecture efficace et d'auto-apprentissage.",
    actions: ["Apprendre une nouvelle notion en utilisant la méthode Feynman", "Faire un résumé visuel (Mind Map) de votre dernière lecture", "Pratiquer une session de répétition espacée sur un concept dur"]
  },
  "Éducation-Enseigner": {
    desc: "Transmettre un savoir complexe de manière simple, vivante et accessible à tous.",
    actions: ["Expliquer un concept technique de votre métier à un adolescent", "Rédiger un court article didactique sur un de vos sujets forts", "Animer une session de partage de connaissances de 10 minutes"]
  },
  "Éducation-Curiosité": {
    desc: "Explorer des domaines inconnus pour enrichir votre culture générale et créativité.",
    actions: ["Regarder un documentaire sur un sujet scientifique hors de votre zone", "Poser 3 questions d'approfondissement à un expert d'un autre domaine", "Lire un article sur l'histoire ancienne d'un pays lointain"]
  },
  "Éducation-Transmission": {
    desc: "Créer des systèmes éducatifs pérennes pour transmettre le savoir au sein d'une école.",
    actions: ["Rédiger le plan de cours d'une compétence que vous maîtrisez", "Concevoir un exercice d'application pratique pour vos apprentis", "Participer à un programme de parrainage scolaire bénévole"]
  },

  // Santé / Bien-être
  "Santé / Bien-être-Nutrition": {
    desc: "Adopter une alimentation brute, vivante, locale et adaptée à vos dépenses d'énergie.",
    actions: ["Préparer 3 repas sains à base d'ingrédients entiers et de saison", "Remplacer l'alcool et les sodas par de l'eau infusée pendant 3 jours", "Prendre le temps de mâcher chaque bouchée pendant 20 minutes"]
  },
  "Santé / Bien-être-Mouvement": {
    desc: "Intégrer le renforcement musculaire, le cardio et la mobilité dans votre quotidien.",
    actions: ["Faire 15 minutes d'étirements ou yoga au réveil", "Compléter une marche rapide d'au moins 5 000 pas aujourd'hui", "Exécuter 3 séries de squats et de pompes à intensité modérée"]
  },
  "Santé / Bien-être-Sommeil": {
    desc: "Optimiser vos phases de sommeil profond pour maximiser la récupération nerveuse.",
    actions: ["Éteindre tous les écrans bleus 1 heure avant de dormir", "Maintenir votre chambre à une température fraîche (18°C)", "Se coucher et se lever à la même heure exacte pendant 4 jours"]
  },
  "Santé / Bien-être-Prévention": {
    desc: "Prendre soin de votre santé à long terme par des bilans et des habitudes protectrices.",
    actions: ["Planifier votre prochain billet de santé de contrôle annuel", "Pratiquer 5 minutes de cohérence cardiaque pour chasser le stress", "Évaluer votre posture de travail assise et l'ajuster ergonomiquement"]
  },

  // Leadership / Gestion
  "Leadership / Gestion-Vision": {
    desc: "Inspirer vos équipes en décrivant un cap ambitieux, éthique et captivant.",
    actions: ["Rédiger le manifeste écrit de votre vision d'équipe à 3 ans", "Partager votre projet de vie avec un proche pour tester l'inspiration", "Traduire vos ambitions en 3 piliers stratégiques simples"]
  },
  "Leadership / Gestion-Décision": {
    desc: "Trancher rapidement et rationnellement dans l'incertitude avec courage.",
    actions: ["Prendre une décision difficile en suspens depuis plus de 2 semaines", "Établir une matrice de décision critères/poids pour un choix crucial", "Analyser l'échec d'une ancienne décision pour en tirer les leçons"]
  },
  "Leadership / Gestion-Délégation": {
    desc: "Responsabiliser vos collaborateurs en leur transmettant autorité et confiance.",
    actions: ["Déléguer une tâche chronophage en rédigeant un cahier des charges clair", "Accorder une autonomie totale sur un sous-projet à un adjoint", "Établir des points de contrôle d'avancement bienveillants"]
  },
  "Leadership / Gestion-Influence": {
    desc: "Convaincre vos interlocuteurs par la rhétorique, l'écoute et l'exemplarité éthique.",
    actions: ["Préparer un pitch de persuasion en structurant vos arguments", "Pratiquer l'art du storytelling lors de votre prochaine prise de parole", "Rendre service à un collègue clé sans rien attendre en retour"]
  }
};
