import faqs from '@data/en/faqs.json';
import features from '@data/en/features.json';
import pricing from '@data/en/pricing.json';
import type { Copy } from './index';

/**
 * English copy table, the secondary locale of the Tenun Lestari site
 * (served under `/en/`). Must satisfy `Copy`, the shape of `./id.ts`.
 *
 * Tenun Lestari is a fictional brand: every person, testimonial and figure
 * below is sample content for demonstration only.
 */
export const en: Copy = {
  site: {
    description:
      'Tenun Lestari makes handwoven fabrics, scarves and home goods together with local Indonesian artisans, using natural dyes and fair pay.',
    descriptionShort:
      'Handwoven fabrics, scarves and home goods from local Indonesian artisans.',
    ogTitle: 'Tenun Lestari: Sustainable Handwoven Textiles',
    ogDescription:
      'Ikat, lurik and songket cloth woven slowly by village artisans, coloured with natural dyes and made to be used for years. Explore the Tenun Lestari collection.',
  },

  layout: {
    skipToContent: 'Skip to content',
    changeLanguage: 'Change language',
    toggleNavigation: 'Toggle navigation',
    darkTheme: 'Dark Theme Toggle',
    lightTheme: 'Light Theme Toggle',
    toggleTheme: 'Toggle theme',
  },

  nav: {
    labels: {
      home: 'Home',
      products: 'Collection',
      services: 'Services',
      blog: 'Journal',
      contact: 'Contact',
    },
    footer: {
      sectionTitles: {
        shop: 'Shop & Guides',
        about: 'About',
      },
      links: {
        collection: 'Collection',
        services: 'Services',
        careGuide: 'Care Guide',
        story: 'Artisan Stories',
        journal: 'Journal',
        artisans: 'Partner Artisan Programme',
        careers: 'Careers',
      },
      hiringBadge: "We're hiring!",
      stayUpToDate: 'Notes from the studio',
      stayUpToDateContent:
        'New collections, workshop dates and artisan stories, once a month.',
      craftedBy: 'Built on the template',
      newsletterDemoMessage:
        'Thanks! (Demo only — wire an email service to collect real subscribers.)',
    },
    megaMenu: {
      services: {
        guides: {
          title: 'Fabric Care Guide',
          description:
            'How to wash, store and look after handwoven cloth so its colour lasts',
        },
        integrations: {
          title: 'Boutique & Hotel Partnerships',
          description:
            'Made-to-order woven textiles and decor for your hospitality space',
        },
        experts: {
          title: 'Custom Orders',
          description: 'Design a motif and colourway together with our weavers',
        },
        tools: {
          title: 'New Arrivals',
          description:
            'Ikat cloth, lurik scarves and home decor from this weaving season',
        },
        plans: {
          title: 'Weaving Workshops',
          description:
            'Learn the basics of weaving and natural dyeing from the artisans',
        },
        community: {
          title: 'Weaving Community',
          description: 'Share stories, motifs and care tips for woven cloth',
        },
      },
      successStories: 'Customer Stories',
      successStory: {
        description:
          'See how Tenun Lestari cloth brings warmth to the homes and spaces of our customers.',
        imageAlt: 'Woven motif illustration',
      },
      learnMore: 'Learn more',
    },
  },

  forms: {
    email: 'Email',
    emailAddress: 'Email address',
    emailPlaceholder: 'Enter your email',
    emailInvalid:
      'Please include a valid email address so we can get back to you',
    subscribe: 'Subscribe',
    phone: 'Phone Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot password?',
    passwordHint: '8+ characters required',
    passwordMismatch: 'Passwords do not match',
    rememberMe: 'Remember me',
    acceptTerms: 'I accept the ',
    termsAndConditions: 'Terms and Conditions',
    or: 'Or',
    demoFallbackMessage: 'Demo only — this form is not connected to a backend.',
  },

  auth: {
    logIn: 'Log in',
    signIn: 'Sign in',
    signUp: 'Sign up',
    signInWithGoogle: 'Sign in with Google',
    signUpWithGoogle: 'Sign up with Google',
    noAccountYet: "Don't have an account yet?",
    signUpHere: 'Sign up here',
    alreadyHaveAccount: 'Already have an account?',
    signInHere: 'Sign in here',
    forgotPasswordTitle: 'Forgot password?',
    rememberYourPassword: 'Remember your password?',
    resetPassword: 'Reset password',
    credentialsDemoNotice:
      'Demo only – connect a real auth provider before collecting credentials.',
    recoveryDemoNotice:
      'Demo only – password recovery is not connected to a backend.',
    signInDemoMessage: 'Demo only – sign-in is not connected to a backend.',
    registerDemoMessage:
      'Demo only – registration is not connected to a backend.',
    recoverDemoMessage:
      'Demo only – password recovery is not connected to a backend.',
  },

  share: {
    share: 'Share',
    shareOn: (platform: string) => `Share on ${platform}`,
    copied: 'Copied',
    copyLink: 'Copy link',
  },

  banner: {
    dismiss: 'Dismiss',
    region: 'Informational banner',
  },

  blog: {
    readMore: 'Read More',
    minRead: (minutes: number) => `${minutes} min read`,
    relatedArticles: 'Related articles',
    wasHelpful: 'Was this post helpful?',
    yes: 'Yes',
    no: 'No',
    ogSection: 'Journal',
  },

  insights: {
    readMore: 'Read more',
    tableOfContents: 'Table of Contents:',
    ogSection: 'Insights',
  },

  products: {
    ogSection: 'Collection',
    tabs: 'Tabs',
    motifAlt: 'Motif detail',
  },

  notFound: {
    title: 'Page Not Found',
    subTitle: 'Looks like this thread came loose from the cloth.',
    content:
      "No harm done. Let's head back home and keep exploring the collection.",
    goHome: 'Go Home',
    goBack: 'Go Back',
  },

  home: {
    banner: 'The 2026 Rainy Season collection is here',
    hero: {
      title:
        'Handwoven cloth, made <span class="italic text-ochre-600 dark:text-ochre-300">to last</span>, from the village to your home',
      subTitle:
        'Every piece is woven slowly by local artisans, dyed with indigo, turmeric and tree bark, and finished to live in your home for years.',
      primaryBtn: 'Explore the Collection',
      secondaryBtn: 'Custom Orders',
      rating: '<span class="font-bold">4.9</span> / 5',
      reviews:
        'from <span class="font-bold">1,200+</span> reviews (sample data)',
      imageAlt:
        'Illustration of folded ikat cloth in indigo and ochre patterns',
    },
    process: {
      eyebrow: 'The Weaving Process',
      title: 'From yarn to cloth, slowly and with care',
      subTitle:
        'There are no motif-printing machines in our studio. Every cloth goes through four stages, all done by hand by artisans in our partner villages.',
      steps: [
        {
          title: 'Preparing the Yarn',
          content:
            'Local cotton and silk yarn is spun, washed and stretched as warp to the width of the cloth.',
        },
        {
          title: 'Tying & Dyeing',
          content:
            'The motif is tied off with raffia, then the yarn is dipped again and again in indigo, turmeric or tree bark.',
        },
        {
          title: 'Weaving',
          content:
            'On a backstrap or treadle loom the weft goes in thread by thread until the motif slowly appears.',
        },
        {
          title: 'Finishing',
          content:
            "The cloth is washed, its edges finished, labelled with the artisan's name and packed without plastic.",
        },
      ],
      note: 'A single ikat cloth takes three to six weeks from yarn to ready-to-ship.',
    },
    artisans: {
      eyebrow: 'Artisan Stories',
      title: 'The hands behind every thread',
      paragraphs: [
        'Tenun Lestari began with a visit to a weaving village that its young people were slowly leaving. The cloth was beautiful, but what it sold for was not enough to live on.',
        'Today we work with weaving groups on prices agreed up front, natural-dye training, and orders that come all year round rather than only in season.',
      ],
      quote: {
        content:
          'My grandmother taught me this motif. Now young people are learning again, because weaving can be a livelihood once more.',
        author: 'Ibu Ratna Wulandari',
        role: 'Weaving group leader (fictional character)',
      },
      list: [
        {
          name: 'Ibu Ratna Wulandari',
          craft: 'Ikat weaving',
          village: 'Benang Sari village',
          years: '32 years weaving',
        },
        {
          name: 'Mbok Sumirah',
          craft: 'Treadle-loom lurik',
          village: 'Watu Lungsin village',
          years: '25 years weaving',
        },
        {
          name: 'Kak Melati Ndun',
          craft: 'Natural dyeing',
          village: 'Nila Wangi village',
          years: '12 years dyeing',
        },
      ],
      note: 'The names, villages and quote in this section are fictional, for demo purposes only.',
      imageAlt:
        'Illustration of a loom with half-woven ikat cloth and skeins of naturally dyed yarn',
      cta: 'Meet the Partner Artisan Programme',
    },
    featuresGeneral: {
      title: 'Values in Every Thread',
      subTitle:
        "We believe beautiful cloth shouldn't cost the earth or the people who make it. That's why every collection is made in small batches, from materials we can trace back to their source.",
      imageAlt: 'Illustration of a gold songket motif on an indigo ground',
    },
    featuresNavs: {
      title:
        'Find the <span class="italic text-ochre-600 dark:text-ochre-300">weave</span> that suits your home and style.',
      tabs: {
        kain: {
          heading: 'Woven Fabrics',
          content:
            'Full-width ikat and lurik cloth to tailor into clothing, use as a throw, or hang as a piece of wall art.',
          alt: 'Illustration of a length of ikat cloth',
        },
        syal: {
          heading: 'Scarves & Shawls',
          content:
            'Light, soft and easy to wear. Our scarves are woven from local cotton and silk in natural colours that age beautifully.',
          alt: 'Illustration of a striped lurik scarf',
        },
        dekorasi: {
          heading: 'Home Decor',
          content:
            'Cushion covers, tablecloths and runners that bring the warmth of handweaving to your living room and dining table.',
          alt: 'Illustration of a cushion cover with a woven check motif',
        },
      },
    },
    testimonials: {
      title: 'Stories from Customers',
      subTitle:
        'The testimonials on this page are fictional samples for demo purposes; names and figures do not refer to real people or data.',
      quotes: [
        {
          content:
            'The indigo shawl I bought two years ago has only grown more beautiful with wear. It feels like taking home a piece of the village it came from.',
          author: 'Rara Anindita (sample)',
          role: 'Fictional customer | Bandung',
        },
      ],
      statistics: [
        {
          count: '120+',
          description: 'partner artisans across six weaving villages (sample)',
        },
        {
          count: '100%',
          description: 'natural dyes across our core collection',
        },
        {
          count: '3 wks',
          description: 'average time to weave a single ikat cloth',
        },
        {
          count: '0',
          description: 'single-use plastics in our shipping',
        },
      ],
    },
    faqTitle: 'Frequently<br />asked questions',
    heroAlt: {
      title: 'Keeping Tradition Alive, Together',
      subTitle:
        'Every purchase helps artisans keep weaving and pass their motifs on to the next generation.',
      btn: 'See the Collection',
    },
  },

  services: {
    title: 'Services',
    metaDescription:
      'Custom woven orders, weaving workshops, boutique and hotel partnerships, and textile care from Tenun Lestari.',
    ogTitle: 'Services | Tenun Lestari',
    intro: {
      title: 'More Than Just Cloth',
      subTitle:
        'Beyond our ready-to-ship collection, we offer services that connect you directly with our artisans: from designing your own motif to learning to weave in our studio.',
      cta: 'Book a Consultation',
    },
    articles: {
      guidance: {
        title: 'Custom Woven Orders',
        subTitle:
          "Need cloth in your family's colours, a motif for a wedding, or a size you can't find in the shop? Tell us what you need and our artisans will sketch the motif and dye colour samples before they start weaving.",
        imageAlts: [
          'Illustration of an ikat motif sketch on grid paper',
          'Illustration of naturally dyed yarn colour samples',
        ],
      },
      craftsmanship: {
        title: 'Weaving Workshops',
        subTitle:
          'Small classes to get to know the backstrap loom, tie an ikat motif and dye yarn with indigo. Perfect for beginners, communities and teams who want to learn by making.',
        imageAlts: ['Illustration of a loom with warp threads set up'],
        cta: 'See the Schedule',
      },
      oversight: {
        title: 'Boutique & Hotel Partnerships',
        subTitle:
          'We prepare cloth, cushion covers and table runners in medium runs for boutiques, cafés and guesthouses. Every order comes with an artisan story card you can share with your guests.',
        imageAlts: [
          'Illustration of a stack of woven cushion covers',
          'Illustration of a table runner with a woven check motif',
        ],
      },
      maintenance: {
        title: 'Textile Care & Repair',
        subTitle:
          'Pulled threads, faded colour or a fraying edge? Send your cloth to the studio and we will care for it with the same techniques used to weave it.',
        imageAlts: ['Illustration of neatly folded cloth after care'],
      },
      bespoke: {
        title: 'Partner Artisan Programme',
        subTitle:
          'We work with village weaving groups through prices agreed up front, natural-dye training and long-term contracts, so that weaving remains decent, dignified work.',
        imageAlts: [
          'Illustration of a lurik motif from a partner weaving group',
          'Illustration of a songket motif from a partner weaving group',
        ],
        cta: 'Read More',
      },
    },
    stats: {
      title: 'By the Numbers',
      subTitle:
        'These figures are sample data that illustrate how we want to grow: slowly, measurably and together with our artisans.',
      mainStatTitle: '92%',
      mainStatSubTitle: 'of sample customers buy again within their first year',
      stats: [
        { stat: '6', description: 'partner weaving villages' },
        { stat: '8,500+', description: 'pieces woven so far' },
        { stat: '40+', description: 'workshops held' },
      ],
    },
  },

  contact: {
    title: 'Contact',
    metaDescription:
      'Questions about the collection, custom orders or workshops? Get in touch with the Tenun Lestari team.',
    ogTitle: 'Contact Us | Tenun Lestari',
    heading: 'Contact us',
    subTitle:
      "Questions about the collection, custom orders or workshops? Drop us a line and we'll be happy to help.",
    formTitle: 'Fill in the form below',
    formSubTitle: "We'll get back to you in 1–2 business days.",
    firstName: 'First Name',
    lastName: 'Last Name',
    details: 'Message',
    send: 'Send Message',
    demoMessage:
      'Thanks! (Demo only — wire a form endpoint to receive real messages.)',
    knowledgeHeading: 'Guides',
    knowledgeContent: 'Read our fabric care guide and introduction to motifs.',
    knowledgeLink: 'Open the guides',
    faqHeading: 'FAQ',
    faqContent: 'Find quick answers to the questions we hear most often.',
    faqLink: 'Visit FAQ',
    officeHeading: 'Visit our studio',
    officeContent: 'Tenun Lestari Studio, Yogyakarta (sample address)',
    emailHeading: 'Email us',
    emailContent: 'Prefer the written word? Drop us an email at',
  },

  blogIndex: {
    title: 'Journal',
    metaDescription:
      'Artisan stories, fabric care guides and notes on natural dyes from the Tenun Lestari Journal.',
    ogTitle: 'Journal | Tenun Lestari',
    heading: 'The Tenun Lestari Journal',
    subTitle:
      'Notes from the studio and the weaving villages: on natural dyes, caring for cloth, and the people behind every thread.',
    insightsHeading: 'Insights',
    insightsSubTitle:
      'Longer reads on slow fashion, fair supply chains and the future of traditional weaving.',
    noPosts: 'No journal posts yet. Check back soon.',
    noInsights: 'No insights yet. Check back soon.',
  },

  productsIndex: {
    title: 'Collection',
    metaDescription:
      'Explore Tenun Lestari handwoven fabrics, scarves and home decor, made together with local artisans.',
    ogTitle: 'Collection | Tenun Lestari',
    heading: 'Collection',
    subTitle:
      'Every piece is made in small batches by our partner artisans. Colours and motifs vary slightly from piece to piece, and that is the beauty of handweaving.',
    customerStories: 'Customer Stories',
    testimonials: {
      title: 'What Customers Say (Samples)',
      quotes: [
        {
          content:
            ' "The songket cushion covers became the centrepiece of our living room. The stitching is neat and the colours stayed bright after several washes." ',
          author: 'Dewi Pramesti (sample)',
          role: 'Fictional customer | Surabaya',
          avatarAlt: 'Woven pattern avatar',
        },
        {
          content:
            ' "We ordered table runners for our small café. Guests often ask where the cloth comes from, and the artisan story cards make for warmer conversations." ',
          author: 'Bagas Wicaksono (sample)',
          role: 'Fictional café owner | Malang',
          avatarAlt: 'Woven pattern avatar',
        },
        {
          content:
            ' "The lurik scarf is so light and comfortable in hot weather. It is lovely to know who wove it." ',
          author: 'Laras Kinanti (sample)',
          role: 'Fictional customer | Jakarta',
          avatarAlt: 'Woven pattern avatar',
        },
      ],
    },
    stats: {
      title: 'Why Tenun Lestari?',
      subTitle:
        'We make less, but better. Every cloth can be traced to the village and weaving group that made it.',
      benefits: [
        'Natural dyes from indigo, turmeric, noni root and tree bark.',
        'Fair prices agreed with artisans before weaving begins.',
        'Plastic-free packaging and a lifetime repair service.',
      ],
      imageAlt:
        'Illustration of songket cushion covers and a basket-weave runner on a table',
    },
  },

  data: { faqs, features, pricing },
};
