import { AwardConfig } from '../types';

export const DEFAULT_AWARD_CONFIG: AwardConfig = {
  awardTitle: "THE BEST GIRLFRIEND AWARD",
  recipientTitle: "My Princess",
  recipientSubtitle: "Presented to my Princess ❤️",
  senderName: "Your Suttuumaniii ❤️",
  heroQuote: "Because being loved by you feels like having my own little piece of heaven.",
  reasons: [
    {
      id: "r1",
      iconType: "love",
      title: "For Your Love",
      description: "For loving me in ways words can never completely explain.",
      subtext: "Unconditional, pure, and my greatest blessing."
    },
    {
      id: "r2",
      iconType: "smile",
      title: "For Your Smile",
      description: "Because somehow your smile can make even an ordinary day feel special.",
      subtext: "The brightest light in my world."
    },
    {
      id: "r3",
      iconType: "patience",
      title: "For Your Patience",
      description: "For staying beside me, understanding me, and believing in me.",
      subtext: "My safe haven whenever the world gets loud."
    },
    {
      id: "r4",
      iconType: "presence",
      title: "For Your Presence",
      description: "Because everything feels a little better when you're around.",
      subtext: "Home isn't a place — it's being with you."
    },
    {
      id: "r5",
      iconType: "royal",
      title: "For Being You",
      description: "No one else could ever be you — and that's exactly why you're my princess.",
      subtext: "One of a kind, forever and always."
    }
  ],
  loveLetter: {
    salutation: "My Princess,",
    paragraphs: [
      "I don't need a special occasion to tell you how much you mean to me. But if I had to give you an award for everything you are to me, there would never be a trophy big enough.",
      "Thank you for your smile, your care, your patience, your little moments, and simply for being you.",
      "You are not just my girlfriend. You are my favorite person, my comfort, my happiness, and the person who makes ordinary moments feel extraordinary.",
      "If I could choose again, I'd still choose you. Every single time. ❤️"
    ],
    signoffPrefix: "With all my love,",
    senderName: "Your Suttuumaniii ❤️"
  },
  universeQuoteLine1: "Somewhere in this huge universe…",
  universeQuoteLine2: "I found you.",
  universeQuoteLine3: "And somehow, you became my favorite part of it. ❤️",
  certificate: {
    officialTitle: "CERTIFICATE OF LOVE",
    awardType: "BEST GIRLFRIEND AWARD",
    presentedTo: "My Princess❤️",
    citation: "For being the sweetest, most beautiful, caring and irreplaceable part of my life.",
    signatureDate: "Always & Forever",
    endlessLoveText: "With endless love ❤️",
    certificateNumber: "BGA-№-001-FOREVER"
  },
  finale: {
    leadIn: "One Last Thing…",
    mainStatement: "You're my favorite person. ❤️",
    promise: "And you'll always have a special place in my heart.",
    gratitude: "Thank you for being my Princess. 👑❤️"
  }
};
