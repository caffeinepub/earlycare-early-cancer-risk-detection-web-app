# EarlyCare   Early Cancer Risk Detection Web App

## Overview
EarlyCare is a web application focused on early cancer risk detection with a professional medical and modern design aesthetic. The app provides users with a risk assessment tool, health resources, and emergency assistance features. The application is permanently deployed to production with full persistence, continuous availability, and always-on accessibility on the Internet Computer with a custom domain at `earlycare.icp.app`.

## Design Theme
- **Colors**: Teal/blue (primary), soft green (secondary), orange/purple (accent)
- **Background**: White or very light grey
- **Typography**: Poppins/Montserrat for headings, Inter/Roboto for body text
- **UI Elements**: Large buttons, soft shadows, rounded corners, icons for all options, minimal text, smooth animations and transitions, card hover effects, progress indicators
- **Language**: English

## Core Features

### Multi-Screen Navigation
The application consists of six main screens with smooth transitions:

1. **Splash Screen**
   - EarlyCare logo display
   - Tagline: "Detect Early. Live Long."
   - Start button to enter the application

2. **Home Screen**
   - Four main feature cards with icons:
     - 🩺 Check My Health (leads to Test Screen)
     - 📊 My Reports (displays saved results)
     - 💡 Health Tips (educational content)
     - 🚑 Emergency Help (emergency resources)
   - Bottom navigation bar: Home | Test | Tips | Help

3. **Test Screen (Multi-step Form)**
   - Step 1: Personal information (Name, Age, Gender)
   - Step 2: Lifestyle factors (Smoking toggle, Alcohol toggle)
   - Step 3: Symptoms assessment (Pain Yes/No, Lump Yes/No, Weight loss Yes/No)
   - Step 4: Image upload with "Analyze" button
   - Visual progress indicator showing current step
   - Smooth transitions between form steps

4. **Result Screen**
   - Risk level display in large card format (High/Medium/Low)
   - Color-coded results: High (red tone), Medium (orange tone), Low (green tone)
   - Context-aware advice message box
   - Action buttons: "Find Hospital" and "Download Report"

5. **Health Tips Screen**
   - Educational content cards:
     - Quit Smoking
     - Eat Healthy
     - Exercise
     - Regular Checkup

6. **Emergency Screen**
   - Large action buttons:
     - "Call 108" (emergency services)
     - "Nearby Hospitals"
     - "Doctor Chat (Future)" (placeholder)

## Authentication
- Internet Identity authentication system for user access
- Secure user session management
- Persistent authentication state across redeployments

## Data Management

### Frontend Data Storage
- Form responses temporarily stored during test completion
- User test results cached for display on Results screen
- Navigation state management for smooth transitions

### Backend Data Storage
- User test submissions (personal info, lifestyle factors, symptoms, uploaded images) with permanent persistence
- Generated risk assessment results stored permanently
- User report history for "My Reports" feature with full data retention
- Health tips content and educational materials stored persistently
- All data maintained with production-grade reliability and backup systems

### Backend Operations
- Process multi-step form submissions with guaranteed persistence
- Generate risk level assessments based on user inputs
- Store and retrieve user test history with permanent data retention
- Handle image upload and storage with production-grade file management
- Serve health tips and educational content with high availability
- Maintain data integrity and backup systems for production deployment

## Production Deployment Requirements
- Permanent deployment on the Internet Computer with continuous availability at `earlycare.icp.app`
- Custom domain configuration under the `icp.app` namespace with DNS setup
- Full data persistence across all user interactions with no expiration
- Always-on accessibility with high availability and no draft limitations
- Production-grade data storage and backup systems optimized for continuous operation
- Reliable file upload and storage capabilities with permanent retention
- Persistent user session and data management with no time-based expiration
- Scalable infrastructure configured for indefinite continuous operation
- Optimized configuration to prevent any service interruptions or data loss
- Synchronized deployment of all backend canisters (authorization, blob storage, main) and frontend to production environment
- Public accessibility with Internet Identity authentication for user-specific features
- Persistent backend data and authentication functionality maintained across redeployments
- Mandatory redeployment with permanent binding to the free Internet Computer subdomain `earlycare.icp.app`
- Domain configuration ensuring correct DNS pointing to deployed canister for public accessibility
- Non-expiring domain binding with permanent availability

## Technical Requirements
- File upload capability for image analysis with permanent storage
- Responsive design for mobile and desktop
- Smooth animations and transitions throughout the application
- Progress tracking for multi-step forms
- Color-coded result display system
- Placeholder integration points for future AI/ML features (Teachable Machine)
- Production-ready deployment with full persistence and continuous availability
- Custom domain setup and DNS configuration for `earlycare.icp.app`
- Canister synchronization and deployment coordination across all services
- Internet Identity integration for secure user authentication

## User Experience
- Intuitive navigation with bottom navigation bar
- Visual feedback for all interactions
- Clear progress indication during form completion
- Accessible design with large touch targets
- Consistent iconography throughout the application
- Reliable, always-available service for users with guaranteed uptime
- Professional domain presence at `earlycare.icp.app`
- Secure authentication flow with Internet Identity
- Seamless user experience with persistent data across sessions
