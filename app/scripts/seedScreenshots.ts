import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function createProducts() {
  const products = [
    {
      _type: 'product',
      title: 'Private Residence — Mumbai',
      slug: { _type: 'slug', current: 'mumbai-residence' },
      category: 'Residential',
      attributes: ['Luxury', 'Modern'],
    },
    {
      _type: 'product',
      title: 'Luxury Villa — Dubai',
      slug: { _type: 'slug', current: 'dubai-villa' },
      category: 'Villa',
      attributes: ['Premium', 'Spacious'],
    },
    {
      _type: 'product',
      title: 'Penthouse — Bangalore',
      slug: { _type: 'slug', current: 'bangalore-penthouse' },
      category: 'Penthouse',
      attributes: ['Urban', 'Elegant'],
    },
  ]

  const created = []
  for (const product of products) {
    const res = await client.create(product)
    created.push(res)
  }
  return created
}

async function seedHome() {
  try {
    const products = await createProducts()

    const page = {
      _type: 'page',
      title: 'Home',
      slug: { _type: 'slug', current: 'home' },

      sections: [
        {
          _type: 'hero',
          title: 'We design spaces you remember',
          subtitle: 'remember',
          description: 'Thoughtfully designed interiors and bespoke furniture pieces that turn everyday living into a refined, sensory experience.',
          primaryCTA: {
            label: 'Start Your Project',
            link: '/consultation',
          },
        },

        {
          _type: 'editorialSection',
          title: 'We believe design is not just visual — it is',
          highlight: 'something you experience.',
          description: 'From the warmth of materials to the flow of light, every detail is curated to create spaces that feel effortless, refined, and deeply personal.',
        },

        {
          _type: 'aboutSection',
          title: 'About',
          highlight: 'Us',
          paragraphs: [
            'Laminate Gallery began as a passion project exploring the intersection of architecture, furniture, and emotional design.',
            "Today, it stands as a studio dedicated to crafting interiors that balance modern aesthetics with timeless sensibilities — spaces that don't just look beautiful, but feel complete."
          ]
        },

        {
          _type: 'statsSection',
          stats: [
            { number: '12+', label: 'Years of Experience' },
            { number: '85+', label: 'Projects Completed' },
            { number: '30+', label: 'Cities Covered' },
            { number: '100%', label: 'Client Satisfaction' },
          ]
        },

        {
          _type: 'highlightSection',
          tag: 'Spatial Study',
          title: 'Sculptural Comfort',
          description: 'Exploring bold forms and soft textures in a modern living space.'
        },

        {
          _type: 'featureSection',
          title: 'Our Services',
          subtitle: 'What we do',
          items: [
            {
              title: 'Interior Design',
              description: 'Full-space concepts that blend spatial flow, lighting, and material harmony.',
            },
            {
              title: 'Custom Furniture',
              description: 'Bespoke pieces designed to complement architecture and lifestyle.',
            },
            {
              title: 'Turnkey Projects',
              description: 'End-to-end execution from concept to completion with precision.',
            },
          ],
        },

        {
          _type: 'productGrid',
          title: 'Projects',
          products: products.map((p) => ({
            _type: 'reference',
            _ref: p._id,
          })),
        },
      ],
    }

    await client.createOrReplace({
      _id: 'home-page',
      ...page,
    })

    console.log('✅ Accurate screenshot data seeded successfully')
  } catch (err) {
    console.error('❌ Error seeding:', err)
  }
}

seedHome()
