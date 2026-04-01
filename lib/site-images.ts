/** Public marketing photography — `/public/images/site`. */
export const siteImages = {
  programmersCollaboration: "/images/site/programmers-collaboration.png",
  executiveLeader: "/images/site/executive-leader.png",
  engineerAtWork: "/images/site/engineer-at-work.png",
  teamCollaborationOffice: "/images/site/team-collaboration-office.png",
  engineeringOutcomesWhiteboard: "/images/site/engineering-outcomes-whiteboard.png",
  techAcademy: "/images/site/tech-academy.png",
  graduatesCafe: "/images/site/graduates-cafe.png",
  remoteGlobalDeveloper: "/images/site/remote-global-developer.png",
  graduationCelebration: "/images/site/graduation-celebration.png",
  foundationStemOutreach: "/images/site/foundation-stem-outreach.png",
  globalDeliveryTeam: "/images/site/global-delivery-team.png",
  leadEngineerIde: "/images/site/lead-engineer-ide.png",
  datacenterSpecialist: "/images/site/datacenter-specialist.png",
} as const;

export type SiteImageKey = keyof typeof siteImages;
