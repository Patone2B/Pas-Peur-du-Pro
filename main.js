// ================== 1) QUIZ — Mappage + base de données ==================

/* 1) Mappage des IDs de sections -> clés de quiz */
const QUIZ_KEYS = {
  "fusion-360": "fusion360",
  "adobe-premiere-pro": "premiere",
  "blueprint-unreal-engine": "blueprint",
  "adobe-media-encodeur": "media-encoder",
  "lm-studio": "lm-studio",
  "garageband": "garageband",
  "ableton": "ableton",
  "github": "github",
  "adobe-dreamweaver": "dreamweaver",
  "Da Vinci": "davinci"
};

/* 2) Base de données des quiz (questions par logiciel) */
const quizDB = {
  // 🎬 Premiere Pro
  "premiere": [
    {
      q: "Comment s’appelle la fonctionnalité qui permet de rendre une image en noir et blanc, ou au contraire de la rendre plus saturée ?",
      choices: ["Modification de rush", "Colorimétrie", "Colorisation"],
      correct: 1,
      explain: "💬 Cette fonction sert à corriger ou modifier les couleurs d’une image : on peut la rendre plus froide, plus chaude, en noir et blanc ou plus saturée."
    },
    {
      q: "Dans le jargon du montage vidéo, comment s’appelle une vidéo non montée ?",
      choices: ["Un plan", "Une vidéo", "Un rush"],
      correct: 2,
      explain: "💬 En montage, un rush est une vidéo brute, non montée ; c’est la matière première du projet."
    },
    {
      q: "Dans quel onglet se situe « Rendu de l’entrée à la sortie » ?",
      choices: ["Rendu", "Exportation", "Séquence"],
      correct: 2,
      explain: "💬 L’option se trouve dans l’onglet Séquence, car elle concerne la lecture/rendu de la timeline."
    },
    {
      q: "Comment s’appelle la fonctionnalité qui permet de couper un rush en deux ?",
      choices: ["Un cut", "Un ciseau", "Couper un rush"],
      correct: 0,
      explain: "💬 Faire un cut, c’est couper un clip en deux (outil Rasoir, touche C) pour monter plus précisément."
    },
    {
      q: "Dans quel onglet trouve-t-on, par exemple, la réverbération, les transitions ou encore le fondu exponentiel ?",
      choices: ["Onglet Effets", "Onglet Options d’effet", "Onglet Modification de rush"],
      correct: 0,
      explain: "💬 Ces éléments se trouvent dans l’onglet Effets (audio/vidéo)."
    }
  ],

  // ⚙ Fusion 360
  "fusion360": [
    {
      q: "Après avoir dessiné sur une face en 2D, sur quel bouton faut-il appuyer ?",
      choices: ["Terminer l’esquisse", "Finir l’esquisse", "Continuer"],
      correct: 0,
      explain: "💬 On valide le sketch avec « Terminer l’esquisse » pour passer à la 3D."
    },
    {
      q: "À quoi sert Fusion 360 ?",
      choices: ["Monter une vidéo", "Utiliser une IA en local", "Modéliser des objets, et éventuellement les imprimer ensuite"],
      correct: 2,
      explain: "💬 CAO/FAO : on conçoit des objets 3D et on peut les préparer pour l’impression 3D."
    },
    {
      q: "Comment s’appelle la fonctionnalité qui permet d’arrondir les angles ?",
      choices: ["Un congé", "Une extrusion", "Un arrondissement"],
      correct: 0,
      explain: "💬 Le congé arrondit les arêtes/coins d’une pièce."
    },
    {
      q: "Quel est le fichier le plus pris en charge par le plus de logiciels ?",
      choices: ["STL", "OBJ", "3MF"],
      correct: 0,
      explain: "💬 STL est le format le plus universel, surtout pour l’impression 3D."
    },
    {
      q: "Quelle fonctionnalité permet de “nettoyer” et d’obtenir un aperçu plus propre du modèle 3D afin de voir ce que cela donnera réellement ?",
      choices: ["Un rendu", "Un nettoyage", "Il faut un logiciel externe pour le faire"],
      correct: 0,
      explain: "💬 Il est possible de demander à Fusion 360, dans l’onglet Rendu, d’effectuer un rendu. Vous allez voir : c’est très classe."
    }
  ],

  // 💻 Dreamweaver
  "dreamweaver": [
    {
      q: "À quoi sert Adobe Dreamweaver ?",
      choices: ["Coder en HTML", "Modéliser", "Faire du mixage audio"],
      correct: 0,
      explain: "💬 Dreamweaver sert à créer/éditer du HTML/CSS/JS et prévisualiser le rendu."
    },
    {
      q: "Quelle est la touche qui permet d’afficher la page web dans le navigateur ?",
      choices: ["F12", "Impr Écran", "F9"],
      correct: 0,
      explain: "💬 F12 lance l’aperçu dans le navigateur."
    },
    {
      q: "Que permet le bouton Fractionner ?",
      choices: [
        "Permet de fractionner son code HTML",
        "N’affiche qu’une partie visuelle du code HTML",
        "Permet d’afficher à la fois le code HTML et une vue visuelle du site web"
      ],
      correct: 2,
      explain: "💬 Vue fractionnée = code + rendu visuel côte à côte."
    },
    {
      q: "Dreamweaver affiche-t-il en couleur la syntaxe HTML ?",
      choices: ["Oui", "Non"],
      correct: 0,
      explain: "💬 Oui, coloration syntaxique (balises, attributs, contenu) pour mieux lire le code."
    },
    {
      q: "Quelle est l’extension d’un fichier HTML ?",
      choices: [".html", ".web", ".codehtml"],
      correct: 0,
      explain: "💬 Les fichiers web de base portent l’extension .html."
    }
  ],

  // 🌐 GitHub
  "github": [
    {
      q: "GitHub permet-il de publier une page web ?",
      choices: ["Oui", "Non"],
      correct: 0,
      explain: "💬 Oui, via GitHub Pages pour un site statique (HTML/CSS/JS) gratuit."
    },
    {
      q: "Quel langage GitHub accepte-t-il ?",
      choices: ["Uniquement le HTML", "HTML et Python", "Tous les langages de programmation"],
      correct: 2,
      explain: "💬 GitHub héberge tous les langages (Python, JS, C#, etc.)."
    },
    {
      q: "Qu’est-ce qu’un dépôt (repository) ?",
      choices: [
        "Un endroit où sont stockées des marchandises",
        "Un endroit où stocker des fichiers de code",
        "Ce mot n’existe pas"
      ],
      correct: 1,
      explain: "💬 Un dépôt contient les fichiers et l’historique d’un projet."
    },
    {
      q: "Quel type de site peut-on héberger gratuitement ?",
      choices: ["Tous", "Aucun", "Un site web statique (HTML/CSS/JS)"],
      correct: 2,
      explain: "💬 GitHub Pages héberge des sites statiques (HTML/CSS/JS)."
    },
    {
      q: "À qui appartient GitHub ?",
      choices: ["Apple", "Amazon", "Microsoft"],
      correct: 2,
      explain: "💬 GitHub appartient à Microsoft depuis le 4 juin 2018, pour un montant total de 7,5 milliards de dollars."
    }
  ],

  // 🎥 DaVinci Resolve
  "DaVinci-Resolve": [
    {
      q: "Quelle est la page du logiciel dédiée à la correction colorimétrique ?",
      choices: ["Edit", "Fusion", "Color"],
      correct: 2,
      explain: "💬 La page Color est dédiée à la correction colorimétrique."
    },
    {
      q: "Que permet la section Fusion dans DaVinci Resolve ?",
      choices: ["Le compositing et les effets visuels", "Le montage audio", "Le mixage rapide"],
      correct: 1,
      explain: "💬 Fusion = VFX/compositing 2D/3D (incrustations, animations, etc.)."
    },
    {
      q: "Quelle est la différence entre les onglets Edit et Cut ?",
      choices: [
        "Cut = montage rapide, Edit = montage complet et détaillé",
        "Edit = effets spéciaux",
        "Cut = mixage audio"
      ],
      correct: 1,
      explain: "💬 Cut pour aller vite ; Edit pour les montages complexes et précis."
    },
    {
      q: "Dans la page Delivery, que peut-on définir avant d’exporter la vidéo ?",
      choices: [
        "Le codec, la résolution et le nom du fichier",
        "Uniquement le nom du projet",
        "Le thème du rendu"
      ],
      correct: 1,
      explain: "💬 Delivery règle format/codec, résolution, destination/nom de fichier."
    },
    {
      q: "Peut-on ajouter du texte sur une vidéo ?",
      choices: ["Oui", "Non", "Peut-être"],
      correct: 1,
      explain: "💬 Oui, sur DaVinci Resolve, il est possible d’ajouter du texte sur n’importe quel média, que ce soit une image ou une vidéo."
    }
  ],

  // 🧩 Adobe Media Encoder
  "media-encoder": [
    {
      q: "Quelles options influencent principalement la taille finale du fichier ?",
      choices: ["Résolution et débit (bitrate)", "Durée du projet", "Type de piste audio"],
      correct: 0,
      explain: "💬 Plus la résolution et le bitrate sont élevés, plus le fichier est lourd."
    },
    {
      q: "Quel est le rôle d’Adobe Media Encoder dans la suite Adobe ?",
      choices: [
        "Convertir et encoder les fichiers vidéo",
        "Créer des montages",
        "Gérer les effets spéciaux"
      ],
      correct: 0,
      explain: "💬 Il encode/convertit les projets vers des fichiers vidéo diffusables."
    },
    {
      q: "Pourquoi l’utiliser plutôt que l’export direct dans Premiere Pro ?",
      choices: [
        "Pour continuer à travailler pendant l’encodage",
        "Pour accélérer la lecture",
        "Pour ajouter des transitions"
      ],
      correct: 0,
      explain: "💬 Il libère Premiere Pro et gère plusieurs exports en file d’attente."
    },
    {
      q: "Quelle est la fonction de la file d’attente (queue) dans Adobe Media Encoder ?",
      choices: [
        "Exporter plusieurs projets automatiquement",
        "Supprimer les fichiers inutiles",
        "Rendre en haute qualité"
      ],
      correct: 0,
      explain: "💬 La queue enchaîne des rendus sans intervention."
    },
    {
      q: "Sur Adobe Media Encoder, puis-je exporter ou convertir des fichiers uniquement s’ils sont au format vidéo (MP4, MOV…) ?",
      choices: ["Oui", "Non, cela fonctionne pour tout", "Oui, mais il faut acheter un abonnement en plus du logiciel"],
      correct: 1,
      explain: "💬 Adobe Media Encoder permet également de convertir des fichiers audio ou même des fichiers image."
    }
  ],

  // 🧠 LM Studio
  "lm-studio": [
    {
      q: "À quoi sert LM Studio et pourquoi le qualifie-t-on d’application d’IA locale ?",
      choices: [
        "Pour chatter en ligne",
        "Pour héberger un site web",
        "Pour utiliser une IA sur son ordinateur sans Internet"
      ],
      correct: 2,
      explain: "💬 LM Studio exécute des modèles d’IA localement, sans cloud."
    },
    {
      q: "Quelle est la différence entre un modèle téléchargé localement et un modèle hébergé en ligne ?",
      choices: ["Aucune", "Le local s’exécute sur ton PC ; l’en ligne sur un serveur distant", "Le modèle en ligne est plus petit"],
      correct: 1,
      explain: "💬 Local = autonomie/confidentialité ; en ligne = dépend du réseau/serveur."
    },
    {
      q: "Quel rôle jouent le CPU, la RAM et le GPU dans le fonctionnement de LM Studio ?",
      choices: [
        "Ils affichent le site web",
        "Ils exécutent et accélèrent le calcul des modèles",
        "Ils stockent les prompts"
      ],
      correct: 1,
      explain: "💬 CPU/GPU calculent l’inférence ; la RAM stocke le modèle et le contexte."
    },
    {
      q: "Pourquoi est-il important d’« éjecter » le modèle lorsqu’on ne l’utilise plus ?",
      choices: [
        "Pour libérer la mémoire et éviter de ralentir l’ordinateur",
        "Pour sauvegarder la conversation",
        "Pour éteindre le GPU"
      ],
      correct: 0,
      explain: "💬 Éjecter libère la RAM et évite la saturation du système."
    },
    {
      q: "LM Studio est-il un logiciel gratuit et légal ?",
      choices: ["Oui", "Non", "Il est légal mais payant"],
      correct: 0,
      explain: "💬 LM Studio est gratuit et légal. Il permet d’installer une IA en local gratuitement. Les modèles proposés sont également gratuits et conformes à leurs licences."
    }
  ],

  // 🧱 Blueprint (Unreal Engine)
  "blueprint": [
    {
      q: "Qu’est-ce qu’un Blueprint dans Unreal Engine et à quoi sert-il ?",
      choices: [
        "Un script visuel qui permet de créer des interactions sans coder",
        "Un modèle 3D",
        "Un plan de caméra"
      ],
      correct: 1,
      explain: "💬 Blueprint = programmation visuelle via nœuds logiques."
    },
    {
      q: "Comment se connectent les nœuds entre eux dans l’éditeur Blueprint ?",
      choices: [
        "Avec des fils (wires) reliant les entrées et sorties",
        "Par clic droit",
        "Automatiquement"
      ],
      correct: 1,
      explain: "💬 Les fils transportent le flux d’exécution et les données entre nœuds."
    },
    {
      q: "Pourquoi le système Blueprint est-il considéré comme visuel et accessible pour les débutants ?",
      choices: [
        "Parce qu’il utilise du texte simple",
        "Parce qu’il remplace le code par des blocs graphiques",
        "Parce qu’il est gratuit"
      ],
      correct: 1,
      explain: "💬 Pas de code texte : on relie des blocs, idéal pour débuter."
    },
    {
      q: "Donne un exemple d’action simple que l’on peut créer avec un Blueprint (ex. : ouvrir une porte, déplacer un objet).",
      choices: [
        "Faire apparaître un menu",
        "Ouvrir une porte quand le joueur s’approche",
        "Changer la langue du jeu"
      ],
      correct: 1,
      explain: "💬 Exemple classique : trigger + action « ouvrir la porte »."
    },
    {
      q: "Le Blueprint remplace-t-il le C++ ?",
      choices: ["Oui", "Non", "Il est complémentaire et accessible aux débutants."],
      correct: 2,
      explain: "💬 Le Blueprint simplifie la création sans code, mais le C++ reste nécessaire pour les fonctions avancées."
    }
  ]
};



// ================== 2) QUIZ — Injection + logique ==================

/* 3) Injection auto d’un bouton "Quiz [logiciel]" dans chaque .content */
(function injectQuizButtons(){
  document.querySelectorAll('.content[id]').forEach(section=>{
    const id = section.id;
    const key = QUIZ_KEYS[id];
    if(!key) return;

    // Crée la petite barre si absente
    let bar = section.querySelector('.section-toolbar');
    if(!bar){
      bar = document.createElement('div');
      bar.className = 'section-toolbar';
      section.prepend(bar);
    }
    // Ajoute le bouton s’il n’existe pas
    if(!bar.querySelector('.quiz-mini')){
      const btn = document.createElement('button');
      btn.className = 'quiz-mini';
      btn.dataset.quiz = key;
      btn.textContent = '🧩 Quiz ' + labelForKey(key);
      btn.addEventListener('click', ()=> openQuiz(key));
      bar.appendChild(btn);
    }
  });
})();

/* 4) Logique du quiz (aucun auto-lancement) */
let currentQuizKey = null, currentIndex = 0, answers = [];
const modal = document.getElementById('quizModal');
const bodyEl = document.getElementById('quizBody');
const titleEl = document.getElementById('quizTitle');
const barEl = document.getElementById('quizProgressBar');
const btnPrev = document.getElementById('quizPrev');
const btnNext = document.getElementById('quizNext');
const btnSubmit = document.getElementById('quizSubmit');

function labelForKey(key){
  const map = {
    "fusion360":"Fusion 360",
    "premiere":"Premiere Pro",
    "blueprint":"Blueprint",
    "media-encoder":"Media Encoder",
    "lm-studio":"LM Studio",
    "garageband":"GarageBand",
    "ableton":"Ableton",
    "github":"GitHub",
    "dreamweaver":"Dreamweaver",
    "davinci":"DaVinci Resolve",
    "general":"Général"
  };
  return map[key] || key;
}

function openQuiz(key){
  const data = quizDB[key] || [];
  if(!data.length){
    alert("Aucune question définie pour ce quiz (complète la base de données dans le code).");
    return;
  }
  currentQuizKey = key;
  currentIndex = 0;
  answers = new Array(data.length).fill(null);
  titleEl.textContent = "Quiz — " + labelForKey(key);
  renderQuestion();
  modal.setAttribute('open',''); // affiche le modal
  document.body.style.overflow = 'hidden';
}

function closeQuiz(){
  modal.removeAttribute('open');
  document.body.style.overflow = '';
}

function renderQuestion(){
  const data = quizDB[currentQuizKey];
  const q = data[currentIndex];
  const total = data.length;

  barEl.style.width = (currentIndex/total*100) + "%";
  btnPrev.disabled = currentIndex === 0;
  btnNext.hidden = currentIndex >= total-1;
  btnSubmit.hidden = !(currentIndex === total-1);

  const selected = answers[currentIndex];
  const optionsHTML = q.choices.map((c,i)=>`
    <label class="quiz-option">
      <input type="radio" name="quizOption" value="${i}" ${selected===i ? 'checked':''}/>
      <span>${c}</span>
    </label>`).join("");

  bodyEl.innerHTML = `
    <div class="quiz-q">
      <p><strong>Question ${currentIndex+1}/${total}</strong><br>${q.q}</p>
      <div class="quiz-options">${optionsHTML}</div>
    </div>`;

  bodyEl.querySelectorAll('input[name="quizOption"]').forEach(inp=>{
    inp.addEventListener('change', e=>{
      answers[currentIndex] = parseInt(e.target.value,10);
    });
  });
}

btnPrev.addEventListener('click', ()=>{
  if(currentIndex>0){
    currentIndex--;
    renderQuestion();
  }
});

btnNext.addEventListener('click', ()=>{
  const data = quizDB[currentQuizKey];
  if(answers[currentIndex]==null){
    alert("Sélectionne une réponse avant de continuer.");
    return;
  }
  if(currentIndex < data.length-1){
    currentIndex++;
    renderQuestion();
  }
});

btnSubmit.addEventListener('click', ()=>{
  const data = quizDB[currentQuizKey];
  if(answers[currentIndex]==null){
    alert("Sélectionne une réponse avant de valider.");
    return;
  }
  let score=0;
  const details = data.map((q,i)=>{
    const ok = (answers[i]===q.correct);
    if(ok) score++;
    const chosen = answers[i]!=null ? q.choices[answers[i]] : "—";
    const correct = q.choices[q.correct];
    const exp = q.explain ? `<div><em>${q.explain}</em></div>` : "";
    return `<li><strong>Q${i+1}.</strong> ${ok?"✅ ":"❌ "} Votre réponse: <strong>${chosen}</strong> • Réponse: <strong>${correct}</strong>${exp}</li>`;
  }).join("");

  bodyEl.innerHTML = `
    <div class="quiz-result">
      <p><strong>Résultat:</strong> ${score}/${data.length}</p>
      <ol>${details}</ol>
      <p>Tu peux fermer la fenêtre et relancer un autre quiz depuis son bouton.</p>
    </div>`;
  barEl.style.width = "100%";
  btnPrev.disabled = true;
  btnNext.hidden = true;
  btnSubmit.hidden = true;
});

/* Fermer en cliquant hors de la carte */
modal.addEventListener('click', (e)=>{
  if(e.target.id === 'quizModal') closeQuiz();
});


// ================== 3) Affichage des sections (.round-button) ==================

function showContent(id) {
  const contents = document.querySelectorAll('.content');
  contents.forEach(content => {
    content.classList.remove('active');
  });
  const selectedContent = document.getElementById(id);
  if(selectedContent){
    selectedContent.classList.add('active');
  }
}


// ================== 4) Thème clair/sombre + bouton mail ==================

(function(){
  const root = document.documentElement;
  if(!root.hasAttribute('data-theme')) root.setAttribute('data-theme','light');

  // Theme
  const THEME_KEY = 'site-theme';
  const themeBtn = document.getElementById('themeBtn');
  const themeLabel = document.getElementById('themeLabel');

  function applyTheme(theme){
    root.setAttribute('data-theme', theme);
    if(themeLabel) themeLabel.textContent = theme === 'dark' ? 'Mode clair' : 'Mode sombre';
    try{ localStorage.setItem(THEME_KEY, theme); }catch{}
  }

  let stored = null;
  try{
    stored = localStorage.getItem(THEME_KEY);
  }catch{}

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored || (prefersDark ? 'dark' : 'light'));

  themeBtn && themeBtn.addEventListener('click', ()=>{
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // Mail
  const DEFAULT_EMAIL = 'paspeurdupro@gmail.com';
  function buildMailtoLink(toEmail){
    const subject = 'Demande d’aide — Page Aides Logicielles';
    const selection = window.getSelection ? String(window.getSelection()) : '';
    const page = location.href;
    const parts = [
      'Bonjour,',
      '',
      'Je vous écris depuis la page d’aides logicielles.',
      selection ? 'Texte sélectionné :\n' + selection : '',
      'Page : ' + page
    ].filter(Boolean);
    const body = encodeURIComponent(parts.join('\n'));
    return `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  const mailBtn = document.getElementById('mailBtn');
  mailBtn && mailBtn.addEventListener('click', ()=>{
    const to = prompt('Adresse e-mail du destinataire :', DEFAULT_EMAIL);
    if(!to) return;
    window.location.href = buildMailtoLink(to.trim());
  });
})();


// ================== 5) Légende + barre d’infos (anecdotes) ==================

document.addEventListener('DOMContentLoaded', function() {
  // 1⃣ Déplacement de la légende en dehors du container
  const container = document.querySelector('.button-container');
  const legend = document.querySelector('.legend-aide');
  if (container && legend && container.contains(legend)) {
    container.after(legend);
  }

  // 2⃣ Barre d'infos — anecdotes
  const INFOS = [
    "💻 HTML a été inventé en 1991 par Tim Berners-Lee au CERN.",
    "🎨 Fusion 360 fusionne conception, simulation et usinage dans un seul outil cloud.",
    "🛠 Le moteur de rendu de Fusion 360 s’appuie sur Arnold, la même technologie utilisée dans les films de Pixar et Marvel.",
    "🎬 Premiere Pro a servi au montage du film Deadpool.",
    "💡 Le raccourci \\ de Premiere Pro permettant d’afficher toute la timeline a été ajouté à la demande d’un monteur de National Geographic.",
    "🧩 Blueprint dans Unreal Engine génère du code en C++ automatiquement.",
    "🐙 La mascotte de GitHub, Octocat, a été dessinée par l’artiste du logo Twitter.",
    "🤖 LM Studio fait tourner des IA localement sans connexion Internet.",
    "🌈 DaVinci Resolve traite les couleurs en 32 bits flottants pour une précision extrême.",
    "🌐 Dreamweaver a été créé par Macromedia en 1997 avant d’être racheté par Adobe.",
    "⌨ Le raccourci « \\ » de Premiere Pro permettant d’afficher toute la timeline a été ajouté à la demande d’un monteur de National Geographic.",
    "🌌 Les décors de The Mandalorian ont été animés grâce à Blueprint dans Unreal Engine.",
    "🎥 Netflix utilise Adobe Media Encoder pour garantir la compatibilité HDR de ses fichiers.",
    "🎥 DaVinci Resolve a servi à étalonner Oppenheimer, Dune 2 et Avatar 2.",
    "🌍 GitHub héberge plus de 420 millions de dépôts publics en 2025.",
    "💡 Adobe Dreamweaver reste l’un des rares éditeurs mêlant édition visuelle et code pur.",
    "😂 L’outil «Blueprint» de Unreal permet à des non-programmeurs de créer des jeux entiers sans écrire une ligne de code — ce qui a surpris des développeurs “pur C++”",
    "   Le premier site web est : http://info.cern.ch",
    " Les créateurs ont vendu GitHub à Microsoft pour… 7,5 milliards $",
    "Le mot “Dream Weaver” (tisseur de rêves) apparaît dans une chanson des années 70 ; les fondateurs l’ont repris pour évoquer la “création de sites rêvés”",
    "😂 Le logiciel a été lancé initialement sous le nom de ReelTime chez SuperMac Technology, pour la carte de capture Video Spigot, avant d’être acquis par Adobe Systems et rebaptisé « Premiere »",
  ];

  // Mélange aléatoire à chaque chargement
  INFOS.sort(() => Math.random() - 0.5);

  // Sélection de la barre d'infos
  const bar = document.getElementById('infoBar');
  if (!bar) return;

  // Gestion de l'affichage successif
  let i = -1;
  const showNext = () => {
    i = (i + 1) % INFOS.length;
    bar.classList.remove('show');
    setTimeout(() => {
      bar.textContent = INFOS[i];
      bar.classList.add('show');
    }, 200);
  };

  // Premier affichage + changement automatique
  showNext();
  setInterval(showNext, 10000); // 10 secondes (valeur que tu avais)
});


// ================== 6) Mini-éditeur HTML (Editeur-HTML) ==================

// ⚙ SCRIPT JAVASCRIPT
// - gère le projet pré-rempli
// - la sauvegarde localStorage
// - l'exécution du code dans l'iframe
// - le téléchargement en .html

// 🔹 Modèle HTML pré-rempli pour débutant
const defaultProject = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Projet HTML débutant</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f9fafb;
        color: #111827;
        padding: 1.5rem;
      }
      h1 {
        color: #2563eb;
      }
      p {
        line-height: 1.6;
      }
      .encadre {
        border: 1px solid #d1d5db;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
        background: #ffffff;
      }
    </style>
  </head>
  <body>
    <h1>Bienvenue sur votre premier projet HTML&nbsp;!</h1>
    <p>
      Ce modèle est un exemple de page simple. Vous pouvez modifier le texte,
      les couleurs, ajouter des images, des listes, et bien plus encore.
    </p>
    <div class="encadre">
      <h2>Section de démonstration</h2>
      <p>
        Essayez de changer ce paragraphe, d'ajouter un autre titre ou de créer une
        liste&nbsp;:
      </p>
      <ul>
        <li>Découvrir les balises de base</li>
        <li>Modifier le texte et le style</li>
        <li>Enregistrer la page sur l’ordinateur</li>
      </ul>
    </div>
  </body>
</html>`;

const STORAGE_KEY = 'mini-editeur-html-projet';
const textarea = document.getElementById('codeHTML');
const iframe = document.getElementById('preview');

// 🟡 Au chargement de la page :
// - si un projet est déjà sauvegardé, on le charge
// - sinon, on met le modèle par défaut
(function initEditor() {
  if (!textarea || !iframe) return; // sécurité au cas où la section n’est pas sur la page
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    textarea.value = saved;
  } else {
    textarea.value = defaultProject;
  }
  // On exécute une première fois pour voir un résultat dès l'arrivée
  executer();
})();

// 💾 Sauvegarde automatique dans localStorage à chaque modification
if (textarea) {
  textarea.addEventListener('input', () => {
    localStorage.setItem(STORAGE_KEY, textarea.value);
  });
}

// ⚙ Fonction : exécuter le code dans l'iframe
function executer() {
  if (!iframe) return;
  const code = textarea.value;
  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(code);
  doc.close();
}

// ⚙ Fonction : télécharger le code au format .html
function telecharger() {
  if (!textarea) return;
  const code = textarea.value;
  const blob = new Blob([code], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'projet-debutant.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ⚙ Fonction : réinitialiser l'éditeur avec le modèle par défaut
function reinitialiser() {
  if (!textarea) return;
  if (!confirm('Réinitialiser le projet et remplacer le code actuel ?')) return;
  textarea.value = defaultProject;
  localStorage.setItem(STORAGE_KEY, defaultProject);
  executer();
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Pas-Peur-du-Pro/service-worker.js')
      .catch(err => {
        console.error('Service worker registration failed:', err);
      });
  });
}
