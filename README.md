# 🚇 EquiRame - L'Intelligence au service du quai

**Répartir intelligemment les voyageurs dans les rames du métro afin de réduire l’entassement, améliorer le confort et diminuer le temps de stationnement.**

![Aperçu du projet](favicon.png) ## 💡 Notre Raison d'être
Rendre les transports en commun plus efficaces, plus sûrs et plus agréables, sans travaux lourds ni transformation du réseau. 

Équirame permet de fluidifier les flux directement sur le quai, **avant l’arrivée de la rame**, grâce à un guidage lumineux et à un affichage dynamique basé sur des capteurs d’occupation en temps réel.

## 🚀 Le Démonstrateur (Interface Voyageur)
Ce projet contient le prototype web interactif de l'interface EquiRame, configuré pour la **Ligne 7** du métro parisien. 

### Fonctionnalités de la démo :
* **Sélection de trajet détaillée :** Choix parmi les 38 arrêts de la Ligne 7 et des 3 directions (La Courneuve, Mairie d'Ivry, Villejuif).
* **Panneau d'affichage RATP :** Simulation réaliste du temps d'attente des deux prochains métros.
* **Visualiseur d'occupation en temps réel :** Schéma interactif des 5 wagons du métro avec un code couleur intuitif :
  * 🟢 **Vert (< 30%) :** Libre, places assises disponibles.
  * 🟠 **Orange (30 - 70%) :** Moyen, places debout.
  * 🔴 **Rouge (> 70%) :** Saturé, forte affluence.
* **Algorithme de recommandation :** Suggestion textuelle intelligente indiquant au voyageur où se positionner sur le quai pour optimiser son trajet.
* **Simulateurs de flux :** Boutons permettant de tester le comportement de l'interface en situation d'heure de pointe (surcharge) ou d'heure creuse.

## 🛠️ Technologies Utilisées
Ce prototype a été développé pour être léger, rapide et exécutable sans serveur complexe (Single Page Application) :
* **HTML5 :** Structure sémantique.
* **CSS3 (Vanilla) :** Design moderne "Glassmorphism", respectant les codes couleurs de la marque (Turquoise `#41A796`). Animations fluides et interface responsive.
* **JavaScript (Vanilla) :** Logique algorithmique, génération de données aléatoires pour la simulation et mise à jour dynamique du DOM.

## 📂 Structure des fichiers
```text
/equirame-demo
│
├── index.html       # La page principale contenant la structure de l'interface
├── style.css        # La feuille de style gérant le design et les animations
├── script.js        # Le moteur logique (simulation, calculs, recommandations)
├── votre-logo.png   # Le logo affiché dans l'interface (à ajouter)
└── favicon.png      # L'icône de l'onglet du navigateur (à ajouter)


