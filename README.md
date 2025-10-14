# AA's Computer Remote Services Website

A modern, responsive Next.js website for a remote computer support business offering software installation, game setup, and troubleshooting services.

## Features

- 🎨 **Modern Design**: Clean, aesthetic interface with subtle background animations
- 📱 **Responsive**: Fully responsive design for desktop and mobile devices
- 🎮 **Product Showcase**: Display software and games with system requirements and platform compatibility
- 📧 **Contact Form**: Email submission via Next.js API route with Gmail integration
- 💬 **Social Integration**: Quick contact via WhatsApp and Facebook
- ⚡ **Fast Performance**: Built with Next.js 15 and optimized for speed
- 🎭 **Animations**: Smooth transitions and floating background shapes

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **React**: React 19
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Email**: Nodemailer 7
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Gmail account for email functionality

### Installation

1. **Clone or navigate to the project directory**

```bash
cd "AA's Computer Remote Services Website"
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Social Media Links
NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yourpage
```

#### Setting up Gmail App Password:

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password to `EMAIL_PASS` in your `.env.local`

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Email API endpoint
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── products/
│   │   └── page.tsx              # Products/Services page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── BackgroundAnimation.tsx   # Floating shapes animation
│   ├── ContactForm.tsx           # Contact form with validation
│   ├── Navigation.tsx            # Header navigation
│   ├── ProductCard.tsx           # Product display card
│   └── SocialButtons.tsx         # WhatsApp & Facebook buttons
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── .env.local                    # Your environment variables (create this)
├── package.json                  # Dependencies
├── tailwind.config.ts            # TailwindCSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Customization

### Adding Products/Services

Edit `app/products/page.tsx` and add items to the `products` array:

```typescript
{
  name: "Product Name",
  description: "Product description",
  requirements: {
    windows: "Windows requirements",
    mac: "Mac requirements or null"
  },
  platforms: ["Windows", "Mac"],
  category: "Category"
}
```

### Updating Social Links

Update the environment variables in `.env.local`:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: Your WhatsApp number (without +)
- `NEXT_PUBLIC_FACEBOOK_URL`: Your Facebook page URL

### Changing Colors

Edit `tailwind.config.ts` and `app/globals.css` to customize the color scheme.

### Modifying Content

- **Home Page**: Edit `app/page.tsx`
- **Products Page**: Edit `app/products/page.tsx`
- **Contact Page**: Edit `app/contact/page.tsx`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables for Production

Make sure to add these in your deployment platform:

- `EMAIL_USER`
- `EMAIL_PASS`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_FACEBOOK_URL`

## Build for Production

```bash
npm run build
npm start
```

## Features Breakdown

### Home Page
- Hero section with business name and tagline
- Quick contact buttons (WhatsApp & Facebook)
- Service overview cards
- Why choose us section
- Call-to-action

### Products/Services Page
- 15+ pre-configured products and games
- Platform indicators (Windows/Mac)
- Expandable system requirements
- Category badges
- Request installation button
- Custom request section

### Contact Page
- Contact form with validation
- Email submission to Gmail
- Social media quick links
- Contact information display
- Success/error feedback

## Troubleshooting

### Email not sending
- Verify Gmail app password is correct
- Check 2-Step Verification is enabled
- Ensure `.env.local` file exists and has correct variables
- Check console for error messages

### Build errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Ensure Node.js version is 18.x or later

### Styling issues
- Clear browser cache
- Check TailwindCSS is properly configured
- Verify `globals.css` is imported in `layout.tsx`

## Support

For issues or questions, please contact through the website's contact form or social media channels.

## License

This project is created for AA's Computer Remote Services. All rights reserved.
