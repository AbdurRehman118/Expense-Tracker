# Expense Tracker

A modern expense tracking application built with React and Supabase, featuring real-time updates, user authentication, and comprehensive financial management capabilities.

## Features

- 🔐 User Authentication (Login/Signup)
- 💰 Expense and Income Management
- 📊 Financial Summary Dashboard
- 🏷️ Custom Categories
- 📱 Responsive Design
- 🌓 Dark/Light Theme
- 📊 Data Visualization
- 📤 CSV Export
- ⚡ Real-time Updates
- 🔄 Session Persistence

## Tech Stack

- React
- Supabase (Backend & Authentication)
- React Router
- CSS Modules
- Context API for State Management

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/AbdurRehman118/Expense-Tracker.git
cd Expense-Tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm start
```

## Deployment on Netlify

1. Push your code to a GitHub repository

2. Connect to Netlify:
   - Log in to Netlify
   - Click "New site from Git"
   - Choose your repository
   - Set build command to: `npm run build`
   - Set publish directory to: `build`

3. Configure environment variables in Netlify:
   - Go to Site settings > Build & deploy > Environment
   - Add the following variables:
     ```
     REACT_APP_SUPABASE_URL=your_supabase_project_url
     REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Enable Netlify Identity (optional, if using Netlify Identity):
   - Go to Site settings > Identity
   - Click "Enable Identity"
   - Configure registration preferences

5. Deploy:
   - Netlify will automatically deploy your site
   - Any push to the main branch will trigger a new deployment

## Environment Setup

1. Create a Supabase account and project at [https://supabase.com](https://supabase.com)
2. Set up the following tables in your Supabase database:
   - profiles
   - expenses
   - incomes
   - categories

## Session Management

The application implements robust session management:
- Persistent sessions across page reloads
- Automatic token refresh
- Secure session storage
- Profile synchronization
- Real-time authentication state updates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 