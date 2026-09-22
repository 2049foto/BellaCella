/* BELLA CELLA — BẢN DỊCH TIẾNG ANH của products.ts.
   Dịch sát nghĩa từ catalogue tiếng Việt; không thêm công dụng, số liệu hay chứng nhận.
   Bản tiếng Việt là bản gốc (footer tiếng Anh ghi rõ). Sửa products.ts thì sửa cả file này.
   Khoá theo slug/key để không lệch thứ tự. */

type ProductEn = {
  desc: string; group: string; size: string; priceUnit: string;
  actives: string | null; activeList: string[] | null; body: string[]; needsReview: string | null;
};

export const PRODUCTS_EN: Record<string, ProductEn> = {
  'bubble-clear-cleanser': {
    desc: 'Gentle foaming facial cleanser', group: 'Cleanse', size: '200ml', priceUnit: '',
    actives: 'Citrus Grandis (grapefruit) seed extract, Artemisia Princeps, Camellia Sinensis (tea) leaf extract.', activeList: null, needsReview: null,
    body: ['A gentle foaming cleanser derived from natural ingredients that effectively removes dirt and impurities while maintaining the skin’s natural moisture, without leaving it feeling tight after washing.'],
  },
  'toner-pad': {
    desc: 'Multi-purpose skincare toner pads', group: 'Balance', size: '200ml', priceUnit: '',
    actives: 'Citrus Grandis (grapefruit) seed extract, Asiatic Pennywort (centella) extract, 3 types of Amino Acid.', activeList: null,
    needsReview: 'The catalogue states 200ml; the jar label states 180ml / 70 pads — awaiting confirmation.',
    body: ['With nourishment from plant extracts, it helps hydrate, balance the skin’s pH and leave skin fresh, healthy, smooth and full of vitality.'],
  },
  'exo-bio-ampoule': {
    desc: 'Exo-Bio Ampoule essence', group: 'Essence', size: '5ml × 10 vials', priceUnit: '/ box',
    actives: null, needsReview: null,
    activeList: ['6 types of Exosome derived from plant stem cells', '7 types of Collagen', '15 types of Peptide', '8 types of Hyaluronic Acid'],
    body: ['An intensive essence for both professional treatments and home care, containing 20% plant Exosome, helping energise the skin, improve firmness and help slow the visible signs of ageing.'],
  },
  'nmn-serum-mask': {
    desc: 'Dr.Becell NMN essence sheet mask', group: 'Mask', size: '25ml × 10 sheets / box', priceUnit: '',
    actives: 'NMN (Nicotinamide Mononucleotide) with moisturising and restoring actives.', activeList: null, needsReview: null,
    body: ['A premium serum mask that provides intensive hydration, helps restore the skin barrier and improves elasticity. Its nutrient-rich formula leaves skin soft, plump and radiant — especially suited to dry or dull skin, or after intensive treatments.'],
  },
  'sun-cushion': {
    desc: 'Sunscreen cushion SPF50+ PA++++', group: 'Sun care', size: '200ml', priceUnit: '',
    actives: 'Aloe, centella and a blend of natural botanicals.', activeList: null,
    needsReview: 'The catalogue states 200ml for a cushion compact — unusual, awaiting confirmation.',
    body: ['A mineral sunscreen cushion that protects skin from UV rays and gives a thin, light, natural base, while soothing and hydrating thanks to its cooling ingredients.',
           'The product holds a Korean safety certification, is gentle, and is suitable even for children’s skin.'],
  },
  'recovery-bb-cushion': {
    desc: 'Recovery BB Cushion', group: 'Recovery', size: '15g', priceUnit: '',
    actives: null, activeList: null, needsReview: null,
    body: ['Contains BELLA CELLA’s exclusive complex of Exosome from plant stem cells, 8 precious plant-derived nutrients and 7 types of Peptide.',
           'A make-up product that gives natural coverage, helps strengthen the skin barrier, nourishes healthy skin and brings a youthful, radiant finish.',
           'Its special formula can be used as a restorative moisturising layer after aesthetic treatments. It can stay on the skin overnight without cleansing, helping nourish and support the skin’s renewal.'],
  },
  'exo-bio-ampoule-mist': {
    desc: 'Exo-Bio Ampoule Mist', group: 'Hydrate', size: '50ml', priceUnit: '',
    actives: null, needsReview: null,
    activeList: ['2 types of plant-derived Exosome', '8 types of Hyaluronic Acid'],
    body: ['A facial mist that delivers instant moisture and nutrients, keeping skin fresh and plump. Its formula combines plant Exosome with 8 types of Hyaluronic Acid and BELLA CELLA’s exclusive ingredients to nourish healthy skin every day.'],
  },
  'recella-cream': {
    desc: 'ReCella Cream', group: 'Moisturise', size: '24ml × 30 sachets', priceUnit: '/ box',
    actives: null, needsReview: null,
    activeList: ['Babassu oil: 50,000 ppm'],
    body: ['A day and night cream with 14 plant extracts that deeply nourishes, reinforces the skin’s natural moisture barrier and keeps skin soft and healthy.',
           'Packed in single-use sachets for hygiene and convenience, easy to carry anywhere.'],
  },
};

export const STEP_LABELS_EN: Record<string, string> = {
  'bubble-clear-cleanser': 'Cleanse', 'toner-pad': 'Balance', 'exo-bio-ampoule': 'Essence',
  'exo-bio-ampoule-mist': 'Instant hydration', 'nmn-serum-mask': 'Weekly mask', 'recella-cream': 'Seal in moisture',
  'recovery-bb-cushion': 'Recovery & base', 'sun-cushion': 'Sun protection',
};

// Câu trích trong NEEDS phải nằm nguyên văn trong body tiếng Anh ở trên (kiểm lúc build).
export const NEEDS_EN: Record<string, { label: string; quotes: Record<string, string> }> = {
  'lam-sach': { label: 'Cleansing without tightness', quotes: {
    'bubble-clear-cleanser': 'effectively removes dirt and impurities while maintaining the skin’s natural moisture, without leaving it feeling tight after washing' } },
  'cap-am': { label: 'Hydration', quotes: {
    'toner-pad': 'helps hydrate, balance the skin’s pH', 'exo-bio-ampoule-mist': 'delivers instant moisture and nutrients', 'nmn-serum-mask': 'provides intensive hydration' } },
  'san-chac': { label: 'Firmness and elasticity', quotes: {
    'exo-bio-ampoule': 'improve firmness and help slow the visible signs of ageing', 'nmn-serum-mask': 'improves elasticity' } },
  'hang-rao': { label: 'Skin barrier', quotes: {
    'nmn-serum-mask': 'helps restore the skin barrier', 'recovery-bb-cushion': 'helps strengthen the skin barrier', 'recella-cream': 'reinforces the skin’s natural moisture barrier' } },
  'da-kho': { label: 'Dry, dull skin', quotes: {
    'nmn-serum-mask': 'especially suited to dry or dull skin' } },
  'sau-lieu-trinh': { label: 'Home care after treatments', quotes: {
    'exo-bio-ampoule': 'for both professional treatments and home care', 'nmn-serum-mask': 'after intensive treatments', 'recovery-bb-cushion': 'can be used as a restorative moisturising layer after aesthetic treatments' } },
  'chong-nang': { label: 'Sun protection and base', quotes: {
    'sun-cushion': 'protects skin from UV rays and gives a thin, light, natural base', 'recovery-bb-cushion': 'gives natural coverage' } },
};

export const USAGE_EN: Record<string, { when: string; steps: string[] }> = {
  'bubble-clear-cleanser': { when: 'Morning and evening', steps: [
    'Wet your face with lukewarm water.', 'Pump 1–2 times into your palm.',
    'Massage gently in circles for 30–60 seconds, avoiding the eye area.', 'Rinse with clean water and pat dry with a soft towel.'] },
  'toner-pad': { when: 'After cleansing', steps: [
    'Use the tweezers to take one pad; avoid putting fingers in the jar.', 'Wipe gently over the face from the centre outwards.',
    'You can leave it on areas that need hydration for 3–5 minutes.', 'No need to rinse.'] },
  'exo-bio-ampoule': { when: 'Evening, as part of a treatment course', steps: [
    'Shake the vial gently before opening.', 'Use one full vial per application.',
    'Pat gently to absorb; do not rub.', 'Wait until absorbed before the next step.'] },
  'nmn-serum-mask': { when: '2–3 times a week', steps: [
    'Use after cleansing and balancing.', 'Leave the mask on for 15–20 minutes.',
    'Remove the mask and pat the remaining essence in.', 'Do not rinse; continue with your moisturising steps.'] },
  'sun-cushion': { when: 'Morning, last step', steps: [
    'Apply after completing your skincare steps.', 'Press the puff lightly into the cushion and dab evenly from the centre of the face outwards.',
    'Reapply every 2–3 hours when outdoors.', 'Remove thoroughly at the end of the day.'] },
  'recovery-bb-cushion': { when: 'Daytime or overnight', steps: [
    'Daytime: dab on as a base after skincare.', 'After an aesthetic treatment: apply a thin layer as a restorative moisturiser.',
    'According to the catalogue, it can stay on the skin overnight without cleansing.', 'Clean the puff regularly.'] },
  'exo-bio-ampoule-mist': { when: 'Whenever skin needs moisture', steps: [
    'Shake gently and hold 15–20cm from the face.', 'Mist evenly 2–3 times.',
    'Pat in gently rather than letting it air-dry.', 'Can be used over make-up.'] },
  'recella-cream': { when: 'Morning and evening, moisturising step', steps: [
    'Tear open one sachet and use it all at once.', 'Apply evenly over face and neck.',
    'Pat gently in upward strokes.', 'Use before sunscreen in the morning.'] },
};

export const KNOWLEDGE_EN: Record<string, { title: string; eyebrow: string; body: string[]; evidence: string[] }> = {
  exosome: { title: 'Exosome from plant stem cells', eyebrow: 'Central active',
    body: [
      'Exosomes are tiny vesicles released by cells, carrying proteins, lipids and signalling molecules. The type used in plant-based cosmetics is more precisely called plant-derived exosome-like nanovesicles, extracted from plant stem cells.',
      'In the BELLA CELLA range, Exo-Bio Ampoule contains 6 types of Exosome and 20% plant Exosome according to the catalogue; Exo-Bio Ampoule Mist contains 2 types; Recovery BB Cushion uses the brand’s exclusive complex.'],
    evidence: [
      'A 2026 systematic review of 19 human studies found an association between topical exosomes and short-term improvements in hydration, elasticity, wrinkles, pores, pigmentation and overall appearance.',
      'Most of those studies were non-randomised and observational, with varied methods, short follow-up and no long-term safety data.',
      'Topical use after procedures specifically showed a favourable short-term safety profile — the context this range is designed for.',
      'The FDA states that no exosome product is currently FDA-approved. Marketing claims across the industry are generally ahead of the data.'] },
  nmn: { title: 'NMN — Nicotinamide Mononucleotide', eyebrow: 'Dr.Becell line',
    body: [
      'NMN is a precursor of NAD+, a coenzyme involved in cellular energy metabolism. NAD+ levels in skin decline with age, which is why NMN is of interest as an anti-ageing approach.',
      'In the BELLA CELLA range, NMN appears in Toner Pad and Dr.Becell NMN Serum Mask.'],
    evidence: [
      'Preclinical research in mice shows β-NMN helps strengthen skin barrier function and reduce UV-B-induced ageing.',
      'An in vitro study showed NMN reduces melanin production in aged melanocytes.',
      'Human data on topical NMN are still limited. Treat this as a promising research direction, not a proven effect in people.'] },
  botanical: { title: 'Botanical ingredients', eyebrow: 'Supporting ingredients',
    body: [
      'Centella (Centella asiatica / Asiatic Pennywort) — in Toner Pad and Sun Cushion. A long-established ingredient in restorative skincare, often used for post-procedure and sensitive skin.',
      'Grapefruit seed extract (Citrus Grandis Seed) — in Bubble Clear Cleanser and Toner Pad. Tea leaf (Camellia Sinensis) and Artemisia Princeps also appear in the cleanser.',
      'Babassu oil at 50,000 ppm in Recella Cream. It is pressed from Babassu palm seeds and belongs to the group of occlusive, moisture-sealing oils.'],
    evidence: [
      'These are common, widely used cosmetic ingredients. Concentration and formulation determine real-world results, and the catalogue does not publish the full ingredient list (INCI).',
      'If you have a history of allergies, check the full ingredient list printed on the packaging before use.'] },
  ha: { title: 'Hyaluronic Acid, Collagen and Peptide', eyebrow: 'Hydrating and supporting group',
    body: [
      'Exo-Bio Ampoule combines 7 types of Collagen, 15 types of Peptide and 8 types of Hyaluronic Acid. Exo-Bio Ampoule Mist contains 8 types of Hyaluronic Acid. Recovery BB Cushion adds 7 types of Peptide.',
      'Using several molecular weights of Hyaluronic Acid is a common way to hydrate at different depths of the stratum corneum.'],
    evidence: [
      'Topical Hyaluronic Acid has good, long-standing evidence for hydration and improving surface elasticity.',
      'Peptides are a very broad group; results depend on each specific peptide chain. The catalogue does not name each one, so a more detailed assessment is not possible.',
      'Topical collagen has large molecules; it mainly moisturises the surface and does not replace collagen in the dermis.'] },
};

export const FAQ_EN = [
  { q: 'What are exosomes, and do they really work?',
    a: 'Exosomes are tiny vesicles released by cells that carry signalling molecules. A 2026 systematic review of 19 human studies found short-term improvements in hydration, elasticity and wrinkles, but most studies were non-randomised and there are no long-term data. No exosome product is currently FDA-approved. In short: early signals are positive, not a firm conclusion.' },
  { q: 'Can I use it right after laser or microneedling?',
    a: 'Follow the instructions of the doctor or specialist treating you. The catalogue positions this range as home care after treatments, and research shows topical exosomes after procedures have a favourable short-term safety profile. But when to start after each procedure differs — we do not give instructions in place of your practitioner.' },
  { q: 'In what order should I use the eight products?',
    a: 'Cleanse, balance, essence, hydrate, weekly mask, seal in moisture, recovery, sun protection. See the Routine page for details. This is a usual care order, not a medical prescription.' },
  { q: 'Is it suitable for sensitive or acne-prone skin?',
    a: 'The catalogue states that Sun Cushion holds a Korean safety certification, is gentle and is suitable even for children’s skin. For the other products, the catalogue does not address sensitive skin specifically — patch-test a small area first and read the ingredient list on the packaging if you have a history of allergies.' },
  { q: 'What does NMN do in Toner Pad and Serum Mask?',
    a: 'NMN is a precursor of NAD+. Preclinical research in mice shows it helps strengthen the skin barrier and reduce UV-B-induced ageing. Human data on topical use are still limited.' },
  { q: 'How soon will I see results?',
    a: 'The catalogue does not publish timing data for this range, so we do not give a number. Studies on topical exosomes generally follow people for a few weeks and record short-term changes. Real results depend on your skin and the treatment you are having.' },
  { q: 'Are the prices on this website final?',
    a: 'Prices shown are list prices from the official catalogue. They may change over time and with promotions. Please contact us to confirm before ordering.' },
  { q: 'Is this the official BELLA CELLA website?',
    a: 'No. This is the website of the distributor in Vietnam. Product content is taken from the official catalogue supplied by the manufacturer. The original brand information belongs to BELLA CELLA.' },
  { q: 'Can I buy online?',
    a: 'Not yet. The website currently provides information only. To order, call or chat on Zalo using the number at the bottom of the page.' },
];

export const CREDENTIALS_EN = {
  caps: {
    'cred-treatment': 'A Japanese specialist performing a skincare treatment with BELLA CELLA.',
    'cred-fukuoka-a': 'BELLA CELLA brand showcase in Fukuoka, Japan.',
    'cred-fukuoka-b': 'BELLA CELLA brand showcase in Fukuoka, Japan.',
    'cred-seminar': 'A BELLA CELLA specialist sharing expertise at a K-Beauty Research Institute seminar, Korea.',
    'cred-press': 'BELLA CELLA featured in beauty publications in Japan.',
  } as Record<string, string>,
  heading: 'Working alongside skincare specialists in Korea and Japan',
  body: 'BELLA CELLA is proud to offer professional skincare solutions trusted by many spas and beauty specialists in Korea and Japan. The brand has also been featured in beauty magazines in Japan, helping spread its philosophy of cell-level skincare to a wide audience.',
};
