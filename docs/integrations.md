## Project overview

This project will allow user to add widgets for their customizable home page in low-poly-dither style.

The goal is to give a quick overview of upcoming/current activities.

## Rules

- Make sure to update this document along the development process and mark what was already implemented and what we need to do next.

## 1. Integrations list

Create a separate page 'IntegrationsList', that will have a list of all integrations that we'll implement (e.g., Google Calendar, Gmail, etc.). User will be able to authorize the corresponding accoount to be able to add integration to the main page.

### 1.1 Planned Integrations

1. Google Calendar

   - Display upcoming events for today
   - Show week overview
   - Quick add event functionality
   - Color coding for different calendars

2. Gmail

   - Unread email count
   - Preview of latest important emails
   - Quick compose functionality

3. Weather (Future)

   - Current weather conditions
   - Daily forecast
   - Weather alerts

4. Tasks/Todo (Future)
   - Integration with Google Tasks
   - Quick add task
   - Due date tracking

## 2. Implementation Plan

### Phase 1: Google Calendar Integration

1. Setup & Authentication

   - Create Google Cloud Project
   - Set up OAuth 2.0 credentials
   - Implement secure token storage
   - Add authentication flow

2. Calendar Widget Development

   - Create base widget component structure
   - Implement Google Calendar API calls
   - Design low-poly-dither style calendar view
   - Add today's events list view
   - Implement week overview
   - Add event creation modal

3. Testing & Polish
   - Test with multiple calendars
   - Implement error handling
   - Add loading states
   - Optimize performance

### Phase 2: Gmail Integration

1. Authentication Extension

   - Extend existing Google auth to include Gmail scope
   - Implement Gmail-specific token handling

2. Email Widget Development
   - Create email widget component
   - Implement Gmail API integration
   - Design low-poly-dither style email preview
   - Add unread count badge
   - Implement quick compose functionality

## 3. Technical Requirements

1. Frontend

   - Astro.js as the main framework
   - TypeScript for type safety
   - Google API client library
   - Responsive design

2. Authentication

   - OAuth 2.0 implementation
   - Secure token storage
   - Refresh token handling

3. Styling
   - CSS modules/Tailwind
   - Low-poly-dither design system
   - Responsive grid layout
   - Dark/Light theme support

## 4. Security Considerations

1. Authentication

   - Use secure token storage
   - Implement proper scope handling
   - Regular token rotation

2. Data Protection
   - Minimal data storage
   - Client-side only processing where possible
   - Clear data retention policies

## 5. Performance Goals

1. Loading

   - Initial page load < 2s
   - Widget load < 1s
   - Smooth animations (60fps)

2. Updates
   - Real-time updates where applicable
   - Efficient API polling
   - Optimized re-renders
