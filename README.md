# Professional Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Inspired by contemporary design trends and optimized for performance and user experience.

## ✨ Features

- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Responsive Layout**: Optimized for mobile, tablet, and desktop devices
- **Interactive Elements**: Smooth scroll animations, hover effects, and micro-interactions
- **Performance Optimized**: Fast loading times with optimized images and lazy loading
- **SEO Friendly**: Comprehensive meta tags, sitemap, and structured data
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Dark/Light Mode**: Automatic theme detection based on user preference

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Geist Sans & Geist Mono
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── loading.tsx       # Loading component
│   ├── sitemap.ts        # SEO sitemap
│   ├── robots.ts         # Robots.txt
│   └── manifest.ts       # PWA manifest
├── components/
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Navigation header
│   │   └── Footer.tsx    # Site footer
│   ├── sections/         # Page sections
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Projects.tsx  # Projects showcase
│   │   ├── Skills.tsx    # Skills section
│   │   └── Contact.tsx   # Contact form
│   └── ui/              # Reusable UI components
│       ├── Button.tsx    # Custom button
│       ├── ScrollProgress.tsx
│       ├── BackToTop.tsx
│       └── CustomCursor.tsx
├── hooks/               # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Personal Information

Update the following files with your information:

1. **src/components/sections/Hero.tsx** - Name, title, and introduction
2. **src/components/sections/Projects.tsx** - Your projects and links
3. **src/components/sections/Contact.tsx** - Contact information
4. **src/app/layout.tsx** - Meta tags and SEO information

### Styling

- **Colors**: Modify the color palette in `tailwind.config.ts`
- **Fonts**: Update font imports in `src/app/layout.tsx`
- **Animations**: Customize animations in component files using Framer Motion

### Content

- **Projects**: Add your projects to the projects array in `Projects.tsx`
- **Skills**: Update the skills categories in `Skills.tsx`
- **Social Links**: Update social media links in `Header.tsx` and `Footer.tsx`

## 📱 Responsive Design

The website is fully responsive and optimized for:

- **Mobile**: 320px - 768px
- **Tablet**: 769px - 1024px
- **Desktop**: 1025px+

## ⚡ Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Components and images load on demand

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build command
- **AWS Amplify**: Configure build settings for Next.js
- **Railway**: Direct deployment from GitHub
- **DigitalOcean App Platform**: Container-based deployment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/portfolio/issues).

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out:

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- GitHub: [Your GitHub](https://github.com/yourusername)

---

⭐ If you found this portfolio template helpful, please give it a star on GitHub!
