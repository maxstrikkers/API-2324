# Procesverslag API: Ontwikkeling van de Trein Vertrek Tijden App

## Inleiding
Ik reis vaak met de trein en vond het altijd zo'n gedoe om steeds de hele route in te moeten vullen alleen om de vertrektijden te zien. Voor een schoolopdracht voor het vak API moest ik iets nuttigs maken met een API. Dit was de perfecte kans om mijn idee uit te voeren. Ik besloot een app te bouwen waarbij je direct alle vertrektijden en spoorinformatie van Nederlandse stations kunt zien, zonder gedoe. Ik gebruikte de NS API voor de data. Het resultaat? Een app die de vertrektijden laat zien, net zoals op de schermen op het station.

## Week 1: Het idee en de basis opzetten

De eerste week stond in het teken van het bedenken van het concept en het opzetten van de basis van de app. Ik ben begonnen met het installeren van NPM om alle benodigde pakketten te kunnen beheren. Voor de frontend heb ik gekozen voor Liquid, een templating engine die helpt bij het dynamisch genereren van HTML op basis van de data. Liquid is handig omdat het de server-side data netjes integreert in mijn templates. Voor het server-gedeelte gebruikte ik Express, een webapplicatie-framework voor Node.js dat helpt bij het afhandelen van serveraanvragen zoals het opvragen van API-data.

Tijdens deze week heb ik ook veel tijd besteed aan het testen van de NS API. Ik onderzocht welke data beschikbaar was en hoe ik deze kon gebruiken. Een belangrijk onderdeel was het ontwikkelen van de 'nearby'-pagina die de vijf dichtstbijzijnde stations toont, gebaseerd op de locatie van de gebruiker die via de Locatie API van de browser wordt opgehaald.

## Week 2: De stationpagina en treindetails
In de tweede week heb ik de belangrijkste pagina van de app ontwikkeld, waarop alle vertrektijden van een station zichtbaar zijn. Deze pagina toont essentiële informatie zoals de vertrektijd, de bestemming, het type trein (Intercity of Sprinter), en het vertrekspoor. Het ontwerp van deze pagina is geïnspireerd op de informatieschermen die je op de stations tegenkomt. Een extra functionaliteit die ik heb toegevoegd, is dat wanneer gebruikers op een trein klikken, ze worden doorverwezen naar een gedetailleerde pagina. Deze detailpagina bevat de volledige route van de trein, zowel de stations die al zijn afgelegd als de nog te rijden trajecten. Bovenaan de pagina staat een illustratie van de betreffende trein, en er is informatie beschikbaar over voorzieningen zoals toiletten en fietsplaatsen.
