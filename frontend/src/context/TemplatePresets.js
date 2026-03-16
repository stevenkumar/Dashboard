export const TEMPLATE_PRESETS = {
  1: {
    name: 'Modern Portfolio',
    globalStyling: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      fontFamily: 'Outfit'
    },
    pages: {
      home: {
        name: 'home',
        navigationLabel: 'Home',
        route: '/',
        sections: [
          {
            id: 'hero-portfolio',
            type: 'hero',
            visible: true,
            heading: 'Creative Developer & Designer',
            description: 'Building minimalist digital experiences with a focus on typography and motion.',
            media: {
              url: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f',
              mediaType: 'image',
              position: 'right'
            },
            ctas: [{ label: 'View Projects', link: '#', variant: 'primary' }]
          },
          {
            id: 'about-portfolio',
            type: 'content',
            visible: true,
            heading: 'My Philosophy',
            description: 'Design is not just what it looks like and feels like. Design is how it works.',
            media: {
              url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
              mediaType: 'image',
              position: 'left'
            }
          }
        ]
      }
    }
  },
  2: {
    name: 'SaaS Landing Page',
    globalStyling: {
      primaryColor: '#3b82f6',
      secondaryColor: '#1e293b',
      fontFamily: 'Inter'
    },
    pages: {
      home: {
        name: 'home',
        navigationLabel: 'Home',
        route: '/',
        sections: [
          {
            id: 'hero-saas',
            type: 'hero',
            visible: true,
            heading: 'Scale Your Business Faster',
            description: 'The all-in-one platform to manage your engineering teams and ship code with confidence.',
            media: {
              url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
              mediaType: 'image',
              position: 'right'
            },
            ctas: [
              { label: 'Get Started', link: '#', variant: 'primary' },
              { label: 'Book Demo', link: '#', variant: 'outline' }
            ]
          }
        ]
      }
    }
  },
  3: {
    name: 'E-commerce Store',
    globalStyling: {
      primaryColor: '#e11d48',
      secondaryColor: '#f8fafc',
      fontFamily: 'Playfair Display'
    },
    pages: {
      home: {
        name: 'home',
        navigationLabel: 'Home',
        route: '/',
        sections: [
          {
            id: 'hero-shop',
            type: 'hero',
            visible: true,
            heading: 'Summer Collection 2024',
            description: 'Explore our latest arrivals and find your perfect style for the season.',
            media: {
              url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
              mediaType: 'image',
              position: 'bottom'
            },
            ctas: [{ label: 'Shop Now', link: '#', variant: 'primary' }]
          }
        ]
      }
    }
  },
  4: {
    name: 'Agency Dashboard',
    globalStyling: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#0f172a',
      fontFamily: 'Space Grotesk'
    },
    pages: {
      home: {
        name: 'home',
        navigationLabel: 'Home',
        route: '/',
        sections: [
          {
            id: 'hero-dash',
            type: 'hero',
            visible: true,
            heading: 'Insights at a Glance',
            description: 'Powerful data visualization tools for modern digital agencies.',
            media: {
              url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
              mediaType: 'image',
              position: 'right'
            },
            ctas: [{ label: 'Open Analytics', link: '#', variant: 'primary' }]
          }
        ]
      }
    }
  }
};
