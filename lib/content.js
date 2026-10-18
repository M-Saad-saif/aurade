export const articles = [
  {
    slug: 'finding-your-signature',
    title: 'Finding your signature.',
    category: 'PERSONAL STYLE',
    image: 'blue',
    excerpt: 'Start with your everyday rhythm, not someone else’s rules.',
    paragraphs: [
      'A watch is a small detail that becomes part of your everyday routine. Our approach is to start with what you already enjoy wearing: the colors, textures and proportions that feel natural to you.',
      'Try imagining a watch in three settings: a quiet weekday, an evening out and a weekend away. The design that feels at home in your life is a useful place to begin.',
      'The Aurade collection is a demonstration of that perspective. Browse the different silhouettes, save a few favorites, and compare them at your own pace.',
    ],
  },
  {
    slug: 'the-details-that-matter',
    title: 'The details that matter.',
    category: 'DESIGN NOTES',
    image: 'grey',
    excerpt: 'A closer look at balance, contrast and a considered point of view.',
    paragraphs: [
      'Our design perspective is simple: give each detail room to breathe. A dial, a case and a strap can tell a cohesive story without competing for attention.',
      'When exploring the collection, notice which details draw your eye. Perhaps it is a tonal face, a strong silhouette or the contrast between metal and leather.',
      'There is no single right answer. Use the collection as a starting point for discovering your own preferences.',
    ],
  },
];
export const supportPages = {
  shipping: {
    title: 'Shipping information.',
    intro: 'Transparent demo delivery costs.',
    sections: [
      [
        'This is a demonstration',
        'Aurade does not currently ship products. No real delivery estimate or service commitment is offered.',
      ],
      [
        'Demo calculation',
        'The checkout adds $15 shipping for a non-empty bag below $300. At $300 or more, demo shipping is complimentary. All amounts are USD.',
      ],
      [
        'Before a real launch',
        'The store owner must configure supported destinations, carriers, taxes, duties and delivery estimates before accepting real orders.',
      ],
    ],
  },
  returns: {
    title: 'Returns & exchanges.',
    intro: 'Demo information, not an active returns policy.',
    sections: [
      [
        'No real purchases',
        'No payment or fulfillment takes place in this storefront, so no physical return or refund can be processed.',
      ],
      [
        'Your local bag',
        'You can remove products from your bag or wishlist at any time. Demo receipts do not represent purchases.',
      ],
      [
        'Before a real launch',
        'A retailer must publish an accurate returns policy and obtain appropriate legal review before trading.',
      ],
    ],
  },
  care: {
    title: 'Care & keeping.',
    intro: 'A checklist for your future watch.',
    sections: [
      [
        'Use the actual manual',
        'Refer to the manufacturer’s instructions for the exact model. The specifications in this demo are illustrative and must not be used as care guidance.',
      ],
      [
        'Questions to ask',
        'Before purchasing, confirm the model’s care instructions, service requirements, strap compatibility and any usage limitations with the seller.',
      ],
      [
        'Keep your records',
        'For a real purchase, keep the receipt, model reference and manufacturer documentation together.',
      ],
    ],
  },
  faq: {
    title: 'A few good questions.',
    intro: 'Everything you need to know about this demo.',
    sections: [
      [
        'Can I buy a watch here?',
        'Not yet. Checkout creates a local demonstration receipt only. It does not charge you or place a real order.',
      ],
      [
        'Where are my bag and wishlist saved?',
        'They are stored in localStorage in this browser. They do not sync between devices. Clearing site data removes them. Browser tabs can synchronize changes, but simultaneous edits are last-write-wins.',
      ],
      [
        'Are the watches and prices real inventory?',
        'No. Product names, prices, stock and specifications are illustrative. Unsplash photographs are visual references and may depict unrelated brands.',
      ],
      [
        'Do forms send messages?',
        'No. Contact, newsletter and trade forms validate input and show a demo acknowledgement only. They do not send or store the entered information.',
      ],
    ],
  },
  privacy: {
    title: 'Privacy, clearly.',
    intro: 'How this demonstration handles browser data.',
    sections: [
      [
        'Shopping preferences',
        'Cart product IDs, strap choices, quantities and wishlist IDs are saved in your browser’s localStorage. No account is created.',
      ],
      [
        'Demo receipts',
        'The last demo receipt is saved in sessionStorage for the current tab. It contains products, totals, a generated reference and a timestamp, but not checkout contact or address fields.',
      ],
      [
        'Forms and external images',
        'Form entries are not sent or intentionally persisted by this application. Watch photos load from Unsplash image servers, so image requests reach that provider. Browser autofill and hosting access logs are outside this application’s local storage logic.',
      ],
      [
        'Your control',
        'Clear site data in your browser to remove saved shopping preferences. This page describes the demo, not a legally reviewed production privacy policy.',
      ],
    ],
  },
  terms: {
    title: 'Demo terms.',
    intro: 'An interactive storefront, not a live retail service.',
    sections: [
      [
        'No commercial transaction',
        'Products, availability, prices, shipping and specifications are demonstration data. No sale, payment, warranty or delivery commitment is created.',
      ],
      [
        'Photography',
        'Photos are illustrative third-party visual references. Aurade is not claiming to manufacture or represent the photographed brands.',
      ],
      [
        'Before production',
        'Connect a real catalog, secure server-side checkout, verified payment processing, inventory, taxes, fulfillment and legally reviewed policies before accepting purchases.',
      ],
    ],
  },
};
