import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// ---------- PRODUCTS ----------
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

// ---------- MAIN ----------
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
          description:
            'Thoughtfully designed interiors and bespoke furniture pieces that turn everyday living into a refined, sensory experience.',
          primaryCTA: {
            label: 'Start Your Project',
            link: '/consultation',
          },
        },

        {
          _type: 'featureSection',
          title: 'Our Services',
          subtitle: 'What we do',
          items: [
            {
              title: 'Interior Design',
              description:
                'Full-space concepts that blend spatial flow, lighting, and material harmony.',
            },
            {
              title: 'Custom Furniture',
              description:
                'Bespoke pieces designed to complement architecture and lifestyle.',
            },
            {
              title: 'Turnkey Projects',
              description:
                'End-to-end execution from concept to completion with precision.',
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

    console.log('✅ Home page seeded successfully')
  } catch (err) {
    console.error('❌ Error seeding:', err)
  }
}

seedHome()