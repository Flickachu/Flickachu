import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const settingsData = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  brandName: 'Laminate Gallery',
  footerDescription: 'Crafting timeless interiors and bespoke furniture with a focus on detail,\nmateriality, and emotion.',
  mainNav: [
    { _type: 'navItem', _key: 'nav1', label: 'About', link: '/about' },
    { _type: 'navItem', _key: 'nav2', label: 'Products', link: '/products' },
    { _type: 'navItem', _key: 'nav3', label: 'Projects', link: '/projects' },
    { _type: 'navItem', _key: 'nav4', label: 'Spaces', link: '/spaces' },
    { _type: 'navItem', _key: 'nav5', label: 'Insights', link: '/insights' },
    { _type: 'navItem', _key: 'nav6', label: 'Contact', link: '/contact' },
  ],
  ctaButton: {
    _type: 'navItem',
    label: 'Get Quote',
    link: '/get-quote'
  },
  studioLinks: [
    { _type: 'navItem', _key: 'stu1', label: 'About', link: '/about' },
    { _type: 'navItem', _key: 'stu2', label: 'Products', link: '/products' },
    { _type: 'navItem', _key: 'stu3', label: 'Projects', link: '/projects' },
    { _type: 'navItem', _key: 'stu4', label: 'Insights', link: '/insights' },
  ],
  connectLinks: [
    { _type: 'navItem', _key: 'con1', label: 'Contact', link: '/contact' },
    { _type: 'navItem', _key: 'con2', label: 'Instagram', link: '#' },
    { _type: 'navItem', _key: 'con3', label: 'LinkedIn', link: '#' },
  ],
  address: 'Pune, India',
  email: 'hello@laminategallery.com',
  phone: '+91 98765 43210',
  copyrightText: '© 2026 Laminate Gallery. All rights reserved.',
}

async function seedSettings() {
  try {
    console.log('Seeding Global Settings...')
    
    // Wipe if exists
    await client.delete('siteSettings').catch(() => {})
    await client.delete('drafts.siteSettings').catch(() => {})
    
    const result = await client.createIfNotExists(settingsData)
    console.log('✅ Global Settings Seeded successfully:', result._id)
  } catch (error) {
    console.error('❌ Error seeding settings:', error)
  }
}

seedSettings()
