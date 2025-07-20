# WeAuth

A modern, customizable authentication template to help developers implement secure and flexible authentication systems.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Lucia_Auth-5B21B6?style=for-the-badge&logo=auth0&logoColor=white" alt="Lucia Auth"/>
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite"/>
</p>

---

<p align="center">
  <img width="500" height="500" alt="WeAuth Demo" src="https://github.com/user-attachments/assets/425e23bf-0f6f-41ef-8183-8f4564347796/" />
</p>

## 🚀 Overview

WeAuth provides developers with a highly customizable authentication template that leverages the best modern authentication libraries and frameworks. Whether you're building a simple login system or a complex multi-provider authentication flow, WeAuth gives you the foundation to create secure, scalable authentication for your applications.

## ✨ Features

- 🔐 **Secure Authentication** - Built with Lucia Auth for robust session management
- 🌐 **OAuth Integration** - Multiple OAuth providers support via Arctic v3
- 🛡️ **Cryptographic Security** - Enhanced security with Oslo cryptographic utilities
- 🎨 **Modern UI** - Beautiful, accessible components with shadcn/ui
- 📱 **Responsive Design** - Mobile-first responsive design
- 🗄️ **Database Ready** - Prisma ORM for type-safe database operations
- ⚡ **High Performance** - Built on Next.js 15 with React 19
- 🔧 **Customizable** - Easily adaptable to your specific needs

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Runtime**: [Bun](https://bun.sh/) for fast package management and runtime
- **Authentication**: [Lucia Auth](https://lucia-auth.com/) for session management
- **OAuth**: [Arctic v3](https://arctic.js.org/) for OAuth provider integration
- **Cryptography**: [Oslo](https://oslo.js.org/) for cryptographic utilities
- **Database**: [Prisma ORM](https://www.prisma.io/) with SQLite (easily configurable for demo purpose)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons**: [Lucide React](https://lucide.dev/) + [Remix Icon](https://remixicon.com/)

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/smilewilson1999/WeAuth.git
   cd WeAuth
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up the database**
   ```bash
   bun prisma generate
   bun prisma db push
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   # Add your OAuth provider credentials (e.g. Google)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

5. **Start the development server**
   ```bash
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
weauth/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   ├── lib/             # Utility functions and configurations
│   ├── hooks/           # Custom React hooks
│   └── generated/       # Generated files
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── dev.db          # SQLite database (development)
├── public/              # Static assets
└── ...config files
```

## 🔧 Configuration

### Database

WeAuth uses Prisma ORM with SQLite by default. To use a different database:

1. Update your `DATABASE_URL` in `.env.local`
2. Modify `prisma/schema.prisma` if needed
3. Run `bun prisma generate && bun prisma db push`

### OAuth Providers

Configure OAuth providers in your environment variables and update the authentication configuration in `src/lib/`.

## 📖 Usage

### Basic Authentication Flow

1. **Sign Up**: Users can create accounts with email/password
2. **Sign In**: Support for email/password and OAuth providers
3. **Session Management**: Secure session handling with Lucia Auth

### Extending Authentication

WeAuth is designed to be easily extensible. You can:

- Add new OAuth providers via Arctic v3
- Implement custom authentication strategies
- Add additional user fields and validation
- Customize the UI components
- Integrate with external services

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Lucia Auth](https://lucia-auth.com/) for excellent authentication library built by a young boy

## 💬 Support

- 💬 [Issue Tracker](https://github.com/smilewilson1999/weauth/issues)

---

Made with ❤️ by Wilson
