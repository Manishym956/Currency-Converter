# 💱 Currency Converter

A modern React-based currency converter application with real-time exchange rates, theme switching, and historical data tracking.

## ✨ Features

- **Real-time Currency Conversion**: Convert between 20+ major world currencies
- **Interactive UI**: Clean and intuitive user interface
- **Theme Support**: Dark and light mode with system preference detection
- **Historical Data**: View 7-day exchange rate history
- **Recent Conversions**: Track your last 5 currency conversions
- **Error Handling**: User-friendly error messages and loading states
- **Persistent Storage**: Saves theme preference and recent conversions
- **Responsive Design**: Works on all device sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- API key from [ExchangeRate-API](https://www.exchangerate-api.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd currency-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Framework
- [Vite](https://vitejs.dev/) - Build Tool
- [ExchangeRate-API](https://www.exchangerate-api.com/) - Exchange Rate Data Provider

## 📦 Project Structure

```
currency-converter/
├── src/
│   ├── services/
│   │   └── api.js         # API integration
│   ├── data/
│   │   └── currencies.js  # Currency data
│   ├── App.jsx           # Main application component
│   ├── App.css          # Styles
│   └── main.jsx         # Entry point
├── .env                 # Environment variables
└── package.json        # Dependencies and scripts
```

## 🎯 Features in Detail

### Currency Conversion
- Real-time conversion between 20+ currencies
- Support for major world currencies with country flags
- Swap functionality for quick currency exchange

### Theme Support
- Toggle between light and dark themes
- Persistent theme preference
- System theme detection

### Historical Data
- 7-day exchange rate history
- Visual representation of rate changes
- Easy-to-read historical data display

### Recent Conversions
- Track last 5 conversions
- Persistent storage using localStorage
- Quick access to recent conversion history

## 📱 Responsive Design

- Desktop optimized layout
- Mobile-friendly interface
- Tablet support with adaptive design

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Created with ❤️ using React and Vite
- `.env` files are excluded from version control
- No sensitive data is stored in the browser
- HTTPS recommended for production

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Ensure environment variables are set on your server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ExchangeRate-API](https://www.exchangerate-api.com/) for providing the currency data
- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-username/currency-converter/issues) page
2. Create a new issue with detailed information
3. Include your browser version and operating system

---

Made with ❤️ by [Your Name]
