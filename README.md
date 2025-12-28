# WithIntent

An e-commerce storefront built with Next.js 16, React 19, and Hygraph CMS.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS 4, Framer Motion
- **CMS**: Hygraph (GraphQL)
- **Icons**: Lucide React
- **PWA**: @ducanh2912/next-pwa

## Project Structure

```
app/
├── components/
│   ├── animation/     # FadeInText animations
│   ├── layout/        # Navbar, Footer, PageWrapper
│   ├── sections/      # Hero, ProductGrid, Gallery, FAQ, etc.
│   └── ui/            # Button, ProductCard, Modal, FilterBar
├── hooks/             # Custom hooks (useProductModal)
├── lib/
│   └── hygraph/       # GraphQL client & queries
├── providers/         # ThemeProvider
├── shop/              # Shop pages with dynamic routes
│   ├── category/[slug]
│   └── collection/[slug]
├── about/             # About page
└── types/             # TypeScript types
```

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Variables

Create a `.env.local` file with your Hygraph endpoint:

```
HYGRAPH_API_URL=your_hygraph_endpoint
HYGRAPH_API_TOKEN=your_hygraph_api_token
HYGRAPH_GLOBAL_SETTING_ID=your_hygraph_global_setting_id
```

_____

Built with ❤️ by [@54nd339](https://github.com/54nd339)
