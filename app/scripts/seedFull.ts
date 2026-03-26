import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function createProductsAndProjects() {
  // Products
  const products = [
    { _type: 'product', title: 'Private Residence — Mumbai', slug: { _type: 'slug', current: 'mumbai-residence' }, category: 'Residential', attributes: ['Luxury', 'Modern'] },
    { _type: 'product', title: 'Luxury Villa — Dubai', slug: { _type: 'slug', current: 'dubai-villa' }, category: 'Villa', attributes: ['Premium', 'Spacious'] },
    { _type: 'product', title: 'Penthouse — Bangalore', slug: { _type: 'slug', current: 'bangalore-penthouse' }, category: 'Penthouse', attributes: ['Urban', 'Elegant'] },
  ]

  const createdProds = []
  for (const product of products) {
    const res = await client.create(product)
    createdProds.push(res)
  }

  // Check if project exists or create a dummy project for Reference
  const project = {
    _type: 'project',
    title: 'Modern Elegance',
    slug: { _type: 'slug', current: 'modern-elegance' },
    description: 'This project explores contrast — warm wood textures paired with sculptural lighting and soft neutral fabrics.',
  }
  const createdProj = await client.create(project);

  return { createdProds, createdProj }
}

async function seedFull() {
  try {
    const existing = await client.fetch(`*[_type == "page"]{_id}`);
    for (const p of existing) {
      await client.delete(p._id).catch(() => {});
      await client.delete(`drafts.${p._id}`).catch(() => {});
    }
    
    // Also explicitly delete 'home-page' and its draft
    await client.delete('home-page').catch(() => {});
    await client.delete('drafts.home-page').catch(() => {});

    const { createdProds, createdProj } = await createProductsAndProjects()

    const page = {
      _type: 'page',
      title: 'Home',
      slug: { _type: 'slug', current: 'home' },

      sections: [
        { _type: 'hero', title: 'We design spaces you remember', subtitle: 'remember', description: 'Thoughtfully designed interiors and bespoke furniture pieces that turn everyday living into a refined, sensory experience.', primaryCTA: { label: 'Start Your Project', link: '/consultation' } },
        { _type: 'editorialSection', title: 'We believe design is not just visual — it is', highlight: 'something you experience.', description: 'From the warmth of materials to the flow of light, every detail is curated to create spaces that feel effortless, refined, and deeply personal.' },
        { _type: 'aboutSection', title: 'About', highlight: 'Us', paragraphs: ['Laminate Gallery began as a passion project exploring the intersection of architecture, furniture, and emotional design.', "Today, it stands as a studio dedicated to crafting interiors that balance modern aesthetics with timeless sensibilities — spaces that don't just look beautiful, but feel complete."] },
        { _type: 'statsSection', stats: [{ number: '12+', label: 'Years of Experience' }, { number: '85+', label: 'Projects Completed' }, { number: '30+', label: 'Cities Covered' }, { number: '100%', label: 'Client Satisfaction' }] },
        { _type: 'highlightSection', tag: 'Spatial Study', title: 'Sculptural Comfort', description: 'Exploring bold forms and soft textures in a modern living space.' },
        { _type: 'featureSection', title: 'Our Services', subtitle: 'What we do', items: [{ title: 'Interior Design', description: 'Full-space concepts that blend spatial flow, lighting, and material harmony.' }, { title: 'Custom Furniture', description: 'Bespoke pieces designed to complement architecture and lifestyle.' }, { title: 'Turnkey Projects', description: 'End-to-end execution from concept to completion with precision.' }] },
        { _type: 'featuredProjectSection', tag: 'Featured Project', project: { _type: 'reference', _ref: createdProj._id } },
        { _type: 'productGrid', title: 'Projects', products: createdProds.map((p) => ({ _type: 'reference', _ref: p._id })) },
        { _type: 'processSection', tag: 'How we work', title: 'Our Process', description: 'A meticulous, step-by-step approach to transforming your vision into a refined reality.', steps: [ { phase: '01', title: 'Discovery & Vision', description: 'We begin by understanding your lifestyle, aesthetic preferences, and the inherent character of your space.', bgColor: 'bg-[#fcfbf9]' }, { phase: '02', title: 'Concept & Curation', description: 'Our team develops a comprehensive design narrative, curating material palettes, furniture plans, and lighting concepts.', bgColor: 'bg-[#f6f3ee]' }, { phase: '03', title: 'Refinement & Details', description: 'Every element is meticulously reviewed and refined, ensuring harmony between architecture, interiors, and custom pieces.', bgColor: 'bg-white' }, { phase: '04', title: 'Realization', description: 'We oversee the precise execution of the design, from construction to the final styling of objects and art.', bgColor: 'bg-[#fcfbf9]' } ] },
        { _type: 'materialsSection', tag: 'The Essentials', title: 'Material Palette', description: 'A curated exploration of textures, finishes, and tones that define our spaces.', materials: [ { name: 'Natural Wood' }, { name: 'Refined Leather' }, { name: 'Stone & Marble' } ] },
        { _type: 'marqueeSection', tag: 'Selected Collaborations & Explorations', logos: [ "https://placehold.co/500x120/transparent/1a1a1a/?text=ARCHITECTURAL+DIGEST&font=playfair-display", "https://placehold.co/300x120/transparent/1a1a1a/?text=VOGUE&font=playfair-display", "https://placehold.co/300x120/transparent/1a1a1a/?text=ELLE+DECOR&font=playfair-display", "https://placehold.co/300x120/transparent/1a1a1a/?text=GQ&font=playfair-display", "https://placehold.co/400x120/transparent/1a1a1a/?text=HARPER'S+BAZAAR&font=playfair-display" ] },
        { _type: 'insightsSection', title: 'Latest Insights' },
        { _type: 'testimonialsSection', title: 'Client Experiences', testimonials: [ { quote: "The team transformed our space into something beyond what we imagined. Every detail feels intentional and refined.", author: "Ananya Sharma" }, { quote: "Working with Laminate Gallery was effortless. Their understanding of materials and lighting is exceptional.", author: "Rahul Mehta" } ] },
        { _type: 'ctaSection', title: "Let's Create Something Exceptional", description: "Whether you're designing a new space or redefining an existing one, we bring clarity, craftsmanship, and character to every project.", placeholder: "Enter your email", buttonText: "Join", footerText: "or fill out a detailed project quote", footerLink: "/get-quote" }
      ],
    }

    await client.createOrReplace({
      _id: 'home-page',
      ...page,
    })

    console.log('✅ Full Homepage Seeded to CMS successfully')
  } catch (err) {
    console.error('❌ Error seeding:', err)
  }
}

seedFull()
