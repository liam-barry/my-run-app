
# My Run App

A modern social running app built with React Native and Expo. My Run App allows users to sign up, log in, create posts, edit their profiles, and interact with a running community. The backend is powered by Supabase for authentication and data storage.

## Features

- User authentication (sign up, login, logout)
- Create, edit, and delete posts
- User profiles with editable information
- Notifications
- Rich text editor for posts
- Responsive and modern UI

## Tech Stack

- **Frontend:** React Native, Expo
- **Backend:** Supabase
- **State Management:** React Context
- **Styling:** Custom themes

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/liam-barry/my-run-app.git
   cd my-run-app
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Copy your Supabase credentials to the appropriate config file (see `lib/supabase.js`).
4. **Start the Expo app:**
   ```sh
   npx expo start
   ```

## Folder Structure

```
app/            # Main app screens and navigation
assets/         # Fonts, icons, and images
components/     # Reusable UI components
constants/      # Theme and global constants
contexts/       # React Context providers (e.g., Auth)
helpers/        # Utility functions
lib/            # Supabase client setup
services/       # API and business logic
scripts/        # Project scripts
```

## Usage

- Run the app on your device using the Expo Go app or an emulator.
- Sign up for a new account or log in.
- Create and interact with posts, edit your profile, and explore the community features.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**Made with ❤️ by Liam Barry**
