/**
 * "Finding Peace with God" — a 7-day guided journey.
 *
 * Each day is a small, self-contained ~5 minute walk. Reflections are
 * original writing. Scripture is cited by reference (ESV) so the wording
 * can be read in the reader's own Bible or preferred translation.
 *
 * This module is the single source of truth for journey content. Pages and
 * components read from it; nothing here renders UI.
 */

export const journey = {
  slug: 'finding-peace-with-god',
  title: 'Finding Peace with God',
  subtitle: 'A 7-day walk from restlessness to rest.',
  description:
    'Seven short readings to help you trade anxiety for trust, one quiet morning at a time.',
  days: [
    {
      day: 1,
      title: 'The Invitation to Rest',
      scriptureRef: 'Matthew 11:28–30',
      scripture:
        '“Come to me, all who labor and are heavy laden, and I will give you rest.”',
      reflection:
        'Peace does not begin with trying harder. It begins with coming. Before you fix anything in your life, Jesus invites you to simply arrive — tired, distracted, unfinished — and to let Him carry what you cannot. Today, you are not asked to perform. You are asked to come.',
      prayer:
        'Father, I come to You as I am. I am carrying more than I can hold. Teach me to lay it down and to trust that Your rest is real. Amen.',
      step: 'Name one thing you are carrying today, and say out loud: “I give this to You.”',
    },
    {
      day: 2,
      title: 'Why We Lose Our Peace',
      scriptureRef: 'Isaiah 26:3',
      scripture:
        '“You keep him in perfect peace whose mind is stayed on you, because he trusts in you.”',
      reflection:
        'Most of our anxiety is a mind that has wandered — rehearsing the future, replaying the past. Peace is not the absence of trouble; it is the presence of a settled trust. The question is never whether life is uncertain, but where your mind is resting while it is.',
      prayer:
        'Lord, my thoughts run ahead of me into fear. Draw my mind back to You. Steady me in what is true about who You are. Amen.',
      step: 'When a worry comes today, gently redirect it into a one-sentence prayer.',
    },
    {
      day: 3,
      title: 'Honest Before God',
      scriptureRef: 'Psalm 62:8',
      scripture:
        '“Trust in him at all times, O people; pour out your heart before him; God is a refuge for us.”',
      reflection:
        'You do not have to clean yourself up before you speak to God. Peace grows in honesty. The Psalms are full of raw, unedited prayers — anger, grief, confusion — all spoken to a God who can hold them. He is not fragile. He is a refuge.',
      prayer:
        'God, here is my heart, unfiltered. I stop pretending. Thank You that You are a safe place for the truth of me. Amen.',
      step: 'Tell God one thing you have been afraid to admit — in plain, honest words.',
    },
    {
      day: 4,
      title: 'The Peace Jesus Gives',
      scriptureRef: 'John 14:27',
      scripture:
        '“Peace I leave with you; my peace I give to you. Not as the world gives do I give to you.”',
      reflection:
        'The world offers peace that depends on conditions — once the problem is solved, once the money comes, once people approve. Jesus offers a different kind: peace that holds even when conditions do not. It is a gift, not a reward. You can receive it before anything around you changes.',
      prayer:
        'Jesus, I have been waiting for circumstances to give me peace. Today I receive Yours instead. Let it guard my heart. Amen.',
      step: 'Take three slow breaths and quietly receive: “Your peace is for me, right now.”',
    },
    {
      day: 5,
      title: 'Letting Go of Control',
      scriptureRef: '1 Peter 5:6–7',
      scripture:
        '“Humble yourselves… casting all your anxieties on him, because he cares for you.”',
      reflection:
        'We hold tightly because we believe it all depends on us. But casting your cares is an act of humility — admitting you were never meant to carry the weight of the world. The same God who holds the stars is not too busy for the thing that kept you awake last night. He cares.',
      prayer:
        'Father, I release my grip. I cast this anxiety onto You, trusting that You care more than I can imagine. Amen.',
      step: 'Write down one worry, then physically set the paper aside as a sign of handing it over.',
    },
    {
      day: 6,
      title: 'Peace That Guards',
      scriptureRef: 'Philippians 4:6–7',
      scripture:
        '“…by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God… will guard your hearts.”',
      reflection:
        'Notice the order: prayer mixed with thanksgiving comes first, and peace follows — peace described as a guard standing watch over your heart. Gratitude is not denial of what is hard; it is choosing to remember what is also true. Thankfulness reopens the door peace walks through.',
      prayer:
        'Lord, I bring You my requests, and I thank You for what is good even now. Let Your peace stand guard over my heart and mind. Amen.',
      step: 'List three things you are genuinely thankful for before you ask God for anything today.',
    },
    {
      day: 7,
      title: 'Walking Forward in Peace',
      scriptureRef: 'Romans 15:13',
      scripture:
        '“May the God of hope fill you with all joy and peace in believing, so that… you may abound in hope.”',
      reflection:
        'Peace with God is not a single moment — it is a way of walking. These seven days were never the destination; they were the first steps of a path you can keep on. Hope is not wishful thinking. It is confidence in the One who has been with you all along, and who is not finished yet.',
      prayer:
        'God of hope, fill me with joy and peace as I keep trusting You. Let me walk forward, one quiet day at a time, with You. Amen.',
      step: 'Decide on a simple time and place to meet with God tomorrow — and keep the walk going.',
    },
  ],
}

/** Total number of days in the journey. */
export const totalDays = journey.days.length

/** Return a single day's content (1-indexed). Returns null if out of range. */
export function getDay(dayNumber) {
  return journey.days.find((d) => d.day === Number(dayNumber)) ?? null
}
