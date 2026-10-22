import faqs from '@data/faqs.json';
import features from '@data/features.json';
import pricing from '@data/pricing.json';

/**
 * Bahasa Indonesia copy table, the default locale of the Tenun Lestari site.
 * This file defines the shape every other locale must satisfy (see `Copy` in
 * `./index.ts`), so a missing translation fails `astro check` instead of
 * leaking Indonesian onto the English pages.
 *
 * Paths are unlocalised (`/products`, not `/en/products`); callers run them
 * through `localePath()` from `@utils/locale`.
 *
 * Tenun Lestari is a fictional brand: every person, testimonial and figure
 * below is sample content for demonstration only.
 */
export const id = {
  site: {
    /** Default `<meta name="description">` when a page sets none. */
    description:
      'Tenun Lestari menghadirkan kain tenun tangan, syal, dan dekorasi rumah yang dibuat bersama pengrajin lokal Indonesia dengan pewarna alami dan upah yang adil.',
    /** schema.org `WebSite.description` in every page's `isPartOf`. */
    descriptionShort:
      'Kain tenun tangan, syal, dan dekorasi rumah dari pengrajin lokal Indonesia.',
    ogTitle: 'Tenun Lestari: Kain Tenun Tangan yang Lestari',
    ogDescription:
      'Kain tenun ikat, lurik, dan songket yang ditenun perlahan oleh pengrajin desa, diwarnai dengan bahan alami, dan dibuat untuk dipakai bertahun-tahun. Jelajahi koleksi Tenun Lestari.',
  },

  layout: {
    skipToContent: 'Langsung ke konten',
    changeLanguage: 'Ganti bahasa',
    toggleNavigation: 'Buka/tutup navigasi',
    darkTheme: 'Aktifkan tema gelap',
    lightTheme: 'Aktifkan tema terang',
    toggleTheme: 'Ganti tema',
  },

  nav: {
    /** Labels for `navLinks` in `@data/navigation`, keyed by id. */
    labels: {
      home: 'Beranda',
      products: 'Koleksi',
      services: 'Layanan',
      blog: 'Jurnal',
      contact: 'Kontak',
    },
    footer: {
      /** Section titles and link labels for `footerSections` in `@data/navigation`, keyed by id. */
      sectionTitles: {
        shop: 'Belanja & Panduan',
        about: 'Tentang Kami',
      },
      links: {
        collection: 'Koleksi',
        services: 'Layanan',
        careGuide: 'Panduan Perawatan',
        story: 'Kisah Pengrajin',
        journal: 'Jurnal',
        artisans: 'Program Pengrajin Mitra',
        careers: 'Karier',
      },
      hiringBadge: 'Kami merekrut!',
      stayUpToDate: 'Kabar dari studio',
      stayUpToDateContent:
        'Dapatkan kabar koleksi baru, jadwal lokakarya, dan cerita pengrajin sebulan sekali.',
      craftedBy: 'Dibangun dari templat',
      newsletterDemoMessage:
        'Terima kasih! (Hanya demo — sambungkan layanan email untuk mengumpulkan pelanggan sungguhan.)',
    },
    /** Text for the optional mega menu (`@data/mega_link`). */
    megaMenu: {
      services: {
        guides: {
          title: 'Panduan Perawatan Kain',
          description:
            'Cara mencuci, menyimpan, dan merawat tenun agar warnanya awet',
        },
        integrations: {
          title: 'Kemitraan Butik & Hotel',
          description:
            'Kain dan dekorasi tenun untuk ruang usaha Anda, dibuat sesuai pesanan',
        },
        experts: {
          title: 'Pesanan Khusus',
          description: 'Rancang motif dan warna bersama pengrajin kami',
        },
        tools: {
          title: 'Koleksi Terbaru',
          description:
            'Kain ikat, syal lurik, dan dekorasi rumah dari musim tenun ini',
        },
        plans: {
          title: 'Lokakarya Menenun',
          description:
            'Belajar dasar menenun dan pewarnaan alami langsung dari pengrajin',
        },
        community: {
          title: 'Komunitas Pecinta Tenun',
          description: 'Berbagi cerita, motif, dan tips merawat kain tenun',
        },
      },
      successStories: 'Cerita Pelanggan',
      successStory: {
        description:
          'Lihat bagaimana kain Tenun Lestari menghidupkan rumah dan ruang usaha pelanggan kami.',
        imageAlt: 'Ilustrasi motif tenun',
      },
      learnMore: 'Selengkapnya',
    },
  },

  forms: {
    email: 'Email',
    emailAddress: 'Alamat email',
    emailPlaceholder: 'Masukkan email Anda',
    emailInvalid:
      'Mohon cantumkan alamat email yang valid agar kami bisa membalas pesan Anda',
    subscribe: 'Berlangganan',
    phone: 'Nomor Telepon',
    password: 'Kata sandi',
    confirmPassword: 'Konfirmasi kata sandi',
    forgotPassword: 'Lupa kata sandi?',
    passwordHint: 'Minimal 8 karakter',
    passwordMismatch: 'Kata sandi tidak cocok',
    rememberMe: 'Ingat saya',
    acceptTerms: 'Saya menyetujui ',
    termsAndConditions: 'Syarat dan Ketentuan',
    or: 'Atau',
    demoFallbackMessage:
      'Hanya demo — formulir ini belum tersambung ke server.',
  },

  auth: {
    logIn: 'Masuk',
    signIn: 'Masuk',
    signUp: 'Daftar',
    signInWithGoogle: 'Masuk dengan Google',
    signUpWithGoogle: 'Daftar dengan Google',
    noAccountYet: 'Belum punya akun?',
    signUpHere: 'Daftar di sini',
    alreadyHaveAccount: 'Sudah punya akun?',
    signInHere: 'Masuk di sini',
    forgotPasswordTitle: 'Lupa kata sandi?',
    rememberYourPassword: 'Ingat kata sandi Anda?',
    resetPassword: 'Atur ulang kata sandi',
    credentialsDemoNotice:
      'Hanya demo – sambungkan penyedia autentikasi sungguhan sebelum mengumpulkan data masuk.',
    recoveryDemoNotice:
      'Hanya demo – pemulihan kata sandi belum tersambung ke server.',
    signInDemoMessage: 'Hanya demo – fitur masuk belum tersambung ke server.',
    registerDemoMessage: 'Hanya demo – pendaftaran belum tersambung ke server.',
    recoverDemoMessage:
      'Hanya demo – pemulihan kata sandi belum tersambung ke server.',
  },

  share: {
    share: 'Bagikan',
    shareOn: (platform: string) => `Bagikan ke ${platform}`,
    copied: 'Tersalin',
    copyLink: 'Salin tautan',
  },

  banner: {
    dismiss: 'Tutup',
    region: 'Banner informasi',
  },

  blog: {
    readMore: 'Baca Selengkapnya',
    minRead: (minutes: number) => `${minutes} menit baca`,
    relatedArticles: 'Artikel terkait',
    wasHelpful: 'Apakah tulisan ini bermanfaat?',
    yes: 'Ya',
    no: 'Tidak',
    ogSection: 'Jurnal',
  },

  insights: {
    readMore: 'Baca selengkapnya',
    tableOfContents: 'Daftar Isi:',
    ogSection: 'Wawasan',
  },

  products: {
    ogSection: 'Koleksi',
    tabs: 'Tab',
  },

  notFound: {
    title: 'Halaman Tidak Ditemukan',
    subTitle: 'Sepertinya benang yang Anda cari terlepas dari tenunannya.',
    content:
      'Tidak apa-apa, mari kembali ke beranda dan lanjutkan menjelajahi koleksi kami.',
    goHome: 'Ke Beranda',
    goBack: 'Kembali',
  },

  home: {
    banner: 'Koleksi Musim Hujan 2026 telah hadir',
    hero: {
      title:
        'Kain tenun tangan yang <span class="italic text-ochre-600 dark:text-ochre-300">lestari</span>, dari desa ke rumah Anda',
      subTitle:
        'Setiap helai ditenun perlahan oleh pengrajin lokal, diwarnai dengan nila, kunyit, dan kulit kayu, lalu dirampungkan untuk menemani rumah Anda bertahun-tahun.',
      primaryBtn: 'Jelajahi Koleksi',
      secondaryBtn: 'Pesanan Khusus',
      rating: '<span class="font-bold">4,9</span> / 5',
      reviews:
        'dari <span class="font-bold">1.200+</span> ulasan (data contoh)',
      imageAlt:
        'Ilustrasi kain tenun ikat bermotif nila dan kuning oker yang terlipat',
    },
    clients: {
      title: 'Hadir di Butik dan Penginapan',
      subTitle: 'Logo di bawah ini hanyalah contoh untuk keperluan demo.',
    },
    featuresGeneral: {
      title: 'Nilai di Setiap Helai',
      subTitle:
        'Kami percaya kain yang indah tidak harus mengorbankan alam ataupun orang yang membuatnya. Karena itu setiap koleksi kami dibuat dalam jumlah terbatas, dengan bahan yang bisa ditelusuri asalnya.',
      imageAlt: 'Ilustrasi motif songket emas di atas dasar nila',
    },
    featuresNavs: {
      title:
        'Temukan <span class="italic text-ochre-600 dark:text-ochre-300">tenun</span> yang cocok untuk rumah dan gaya Anda.',
      tabs: {
        tools: {
          heading: 'Kain Tenun',
          content:
            'Kain ikat dan lurik lebar penuh untuk dijahit menjadi busana, dijadikan selimut, atau dipajang sebagai karya dinding.',
          alt: 'Ilustrasi lembaran kain tenun ikat',
        },
        dashboard: {
          heading: 'Syal & Selendang',
          content:
            'Ringan, lembut, dan mudah dipadukan. Syal kami ditenun dari kapas dan sutra lokal dengan warna alami yang menua dengan cantik.',
          alt: 'Ilustrasi syal lurik bergaris',
        },
        features: {
          heading: 'Dekorasi Rumah',
          content:
            'Sarung bantal, taplak, dan pelari meja yang membawa kehangatan tenun ke ruang tamu dan meja makan Anda.',
          alt: 'Ilustrasi sarung bantal bermotif anyaman',
        },
      },
    },
    testimonials: {
      title: 'Cerita dari Pelanggan',
      subTitle:
        'Testimoni di halaman ini adalah contoh fiktif untuk keperluan demo; nama dan angka tidak merujuk pada orang atau data sungguhan.',
      quotes: [
        {
          content:
            'Selendang nila yang saya beli dua tahun lalu justru makin cantik setelah sering dipakai. Rasanya seperti membawa pulang sepotong cerita dari desanya.',
          author: 'Rara Anindita (contoh)',
          role: 'Pelanggan fiktif | Bandung',
        },
      ],
      statistics: [
        {
          count: '120+',
          description: 'pengrajin mitra di enam desa tenun (contoh)',
        },
        {
          count: '100%',
          description: 'pewarna alami pada koleksi inti kami',
        },
        {
          count: '3 mgg',
          description: 'rata-rata waktu menenun satu lembar kain ikat',
        },
        {
          count: '0',
          description: 'plastik sekali pakai dalam kemasan pengiriman',
        },
      ],
    },
    faqTitle: 'Pertanyaan<br />yang sering diajukan',
    heroAlt: {
      title: 'Mari Merawat Tradisi Bersama',
      subTitle:
        'Setiap pembelian membantu pengrajin terus menenun dan mewariskan motif kepada generasi berikutnya.',
      btn: 'Lihat Koleksi',
    },
  },

  services: {
    title: 'Layanan',
    metaDescription:
      'Pesanan kain khusus, lokakarya menenun, kemitraan untuk butik dan hotel, serta layanan perawatan kain dari Tenun Lestari.',
    ogTitle: 'Layanan Tenun Lestari',
    intro: {
      title: 'Lebih dari Sekadar Kain',
      subTitle:
        'Selain koleksi siap kirim, kami membuka layanan yang menghubungkan Anda langsung dengan para pengrajin: dari merancang motif sendiri hingga belajar menenun di studio kami.',
      cta: 'Jadwalkan Konsultasi',
    },
    articles: {
      guidance: {
        title: 'Pesanan Kain Khusus',
        subTitle:
          'Ingin kain dengan warna seragam keluarga, motif untuk acara pernikahan, atau ukuran yang tidak ada di toko? Ceritakan kebutuhan Anda, lalu pengrajin kami akan membuat sketsa motif dan contoh warna sebelum mulai menenun.',
        imageAlts: [
          'Ilustrasi sketsa motif ikat di atas kertas berpetak',
          'Ilustrasi contoh warna benang hasil celupan alami',
        ],
      },
      craftsmanship: {
        title: 'Lokakarya Menenun',
        subTitle:
          'Kelas kecil untuk mengenal alat tenun gendong, mengikat motif, dan mencelup benang dengan nila. Cocok untuk pemula, komunitas, maupun tim kantor yang ingin belajar sambil berkarya.',
        imageAlts: ['Ilustrasi alat tenun dengan benang lungsin terpasang'],
        cta: 'Lihat Jadwal',
      },
      oversight: {
        title: 'Kemitraan untuk Butik & Hotel',
        subTitle:
          'Kami menyiapkan kain, sarung bantal, dan pelari meja dalam jumlah menengah untuk butik, kafe, dan penginapan. Setiap pesanan disertai kartu cerita pengrajin yang bisa Anda tampilkan kepada tamu.',
        imageAlts: [
          'Ilustrasi tumpukan sarung bantal tenun',
          'Ilustrasi pelari meja bermotif anyaman',
        ],
      },
      maintenance: {
        title: 'Perawatan & Perbaikan Kain',
        subTitle:
          'Benang tertarik, warna kusam, atau tepi yang mulai terurai? Kirimkan kain Anda ke studio dan kami akan merawatnya dengan teknik yang sama seperti saat kain itu ditenun.',
        imageAlts: ['Ilustrasi kain tenun terlipat rapi setelah dirawat'],
      },
      bespoke: {
        title: 'Program Pengrajin Mitra',
        subTitle:
          'Kami bekerja dengan kelompok tenun desa melalui harga yang disepakati di awal, pelatihan pewarnaan alami, dan kontrak jangka panjang agar menenun tetap menjadi pekerjaan yang layak.',
        imageAlts: [
          'Ilustrasi motif lurik dari kelompok tenun mitra',
          'Ilustrasi motif songket dari kelompok tenun mitra',
        ],
        cta: 'Baca Selengkapnya',
      },
    },
    stats: {
      title: 'Dalam Angka',
      subTitle:
        'Angka berikut adalah data contoh yang menggambarkan cara kami ingin bertumbuh: perlahan, terukur, dan bersama para pengrajin.',
      mainStatTitle: '92%',
      mainStatSubTitle:
        'pelanggan contoh kembali membeli dalam satu tahun pertama',
      stats: [
        { stat: '6', description: 'desa tenun mitra' },
        { stat: '8.500+', description: 'helai kain telah ditenun' },
        { stat: '40+', description: 'lokakarya digelar' },
      ],
    },
  },

  contact: {
    title: 'Kontak',
    metaDescription:
      'Punya pertanyaan tentang koleksi, pesanan khusus, atau lokakarya? Hubungi tim Tenun Lestari.',
    ogTitle: 'Hubungi Kami | Tenun Lestari',
    heading: 'Hubungi kami',
    subTitle:
      'Punya pertanyaan tentang koleksi, pesanan khusus, atau lokakarya? Tulis pesan dan kami akan membalasnya dengan senang hati.',
    formTitle: 'Isi formulir di bawah ini',
    formSubTitle: 'Kami akan membalas dalam 1–2 hari kerja.',
    firstName: 'Nama Depan',
    lastName: 'Nama Belakang',
    details: 'Pesan',
    send: 'Kirim Pesan',
    demoMessage:
      'Terima kasih! (Hanya demo — sambungkan endpoint formulir untuk menerima pesan sungguhan.)',
    knowledgeHeading: 'Panduan',
    knowledgeContent:
      'Baca panduan perawatan kain dan pengenalan motif tenun kami.',
    knowledgeLink: 'Buka panduan',
    faqHeading: 'FAQ',
    faqContent: 'Temukan jawaban singkat untuk pertanyaan yang sering muncul.',
    faqLink: 'Buka FAQ',
    officeHeading: 'Kunjungi studio kami',
    officeContent: 'Studio Tenun Lestari, Yogyakarta (alamat contoh)',
    emailHeading: 'Kirim email',
    emailContent: 'Lebih suka menulis? Kirimkan email ke',
  },

  blogIndex: {
    title: 'Jurnal',
    metaDescription:
      'Cerita pengrajin, panduan merawat kain, dan catatan tentang pewarna alami dari Jurnal Tenun Lestari.',
    ogTitle: 'Jurnal | Tenun Lestari',
    heading: 'Jurnal Tenun Lestari',
    subTitle:
      'Catatan dari studio dan desa tenun: tentang pewarna alami, cara merawat kain, dan orang-orang di balik setiap helai.',
    insightsHeading: 'Wawasan',
    insightsSubTitle:
      'Tulisan yang lebih panjang tentang mode lambat, rantai pasok yang adil, dan masa depan tenun tradisional.',
    noPosts: 'Belum ada tulisan. Kunjungi lagi nanti.',
    noInsights: 'Belum ada wawasan. Kunjungi lagi nanti.',
  },

  productsIndex: {
    title: 'Koleksi',
    metaDescription:
      'Jelajahi koleksi kain tenun, syal, dan dekorasi rumah Tenun Lestari yang dibuat bersama pengrajin lokal.',
    ogTitle: 'Koleksi | Tenun Lestari',
    heading: 'Koleksi',
    subTitle:
      'Setiap produk dibuat dalam jumlah terbatas oleh pengrajin mitra kami. Warna dan motif bisa sedikit berbeda antarhelai, dan justru di situlah keindahan tenun tangan.',
    customerStories: 'Cerita Pelanggan',
    testimonials: {
      title: 'Kata Pelanggan (Contoh)',
      quotes: [
        {
          content:
            ' "Sarung bantal songketnya jadi pusat perhatian di ruang tamu kami. Jahitannya rapi dan warnanya tetap cerah setelah dicuci beberapa kali." ',
          author: 'Dewi Pramesti (contoh)',
          role: 'Pelanggan fiktif | Surabaya',
          avatarAlt: 'Avatar bermotif tenun',
        },
        {
          content:
            ' "Kami memesan pelari meja untuk kafe kecil kami. Tamu sering bertanya asal kainnya, dan kartu cerita pengrajin membuat obrolan jadi lebih hangat." ',
          author: 'Bagas Wicaksono (contoh)',
          role: 'Pemilik kafe fiktif | Malang',
          avatarAlt: 'Avatar bermotif tenun',
        },
        {
          content:
            ' "Syal luriknya ringan sekali dan nyaman dipakai di cuaca panas. Senang rasanya tahu siapa yang menenunnya." ',
          author: 'Laras Kinanti (contoh)',
          role: 'Pelanggan fiktif | Jakarta',
          avatarAlt: 'Avatar bermotif tenun',
        },
      ],
    },
    stats: {
      title: 'Mengapa Tenun Lestari?',
      subTitle:
        'Kami membuat lebih sedikit, tetapi lebih baik. Setiap kain bisa ditelusuri ke desa dan kelompok tenun yang membuatnya.',
      benefits: [
        'Pewarna alami dari nila, kunyit, mengkudu, dan kulit kayu.',
        'Harga adil yang disepakati bersama pengrajin sebelum menenun.',
        'Kemasan bebas plastik dan layanan perbaikan seumur pakai.',
      ],
    },
  },

  /** Locale-specific JSON data (`src/data_files/`, English under `en/`). */
  data: { faqs, features, pricing },
};
