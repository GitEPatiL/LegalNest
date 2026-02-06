# Global Config & Theme System Documentation

## Overview

The LegalNest platform uses a centralized configuration and theme system to ensure consistency across all components and easy maintenance.

---

## Configuration File

**Location:** `src/config/siteConfig.js`

### Structure

```javascript
import siteConfig, { getThemeColor } from '@/config/siteConfig';
```

### Available Configuration

#### Company Information
- `siteConfig.companyName` - "LegalNest"
- `siteConfig.tagline` - Company tagline
- `siteConfig.logo` - Logo configuration object
  - `text`, `url`, `alt`, `favicon`

#### Contact Information
- `siteConfig.email`
- `siteConfig.contactNumber`
- `siteConfig.whatsappNumber`

#### Website Configuration
- `siteConfig.websiteUrl`
- `siteConfig.title`
- `siteConfig.description`
- `siteConfig.keywords` (array)

#### Social Media
- `siteConfig.social.twitter`
- `siteConfig.social.linkedin`
- `siteConfig.social.facebook`
- `siteConfig.social.instagram`
- `siteConfig.social.youtube`

#### Business Hours
- `siteConfig.businessHours.openDays`
- `siteConfig.businessHours.openHours`
- `siteConfig.businessHours.timezone`

---

## Theme Colors

### Yellow + Black Palette

The platform uses a professional yellow and black color scheme:

#### Primary Yellow Shades
```javascript
siteConfig.themeColors.primary[50]  // #fffbeb (lightest)
siteConfig.themeColors.primary[500] // #f59e0b (main yellow)
siteConfig.themeColors.primary[950] // #451a03 (darkest)
```

#### Dark/Black Shades
```javascript
siteConfig.themeColors.dark[50]  // #f7f7f7 (lightest)
siteConfig.themeColors.dark[900] // #1a1a1a (main dark)
siteConfig.themeColors.dark[950] // #0a0a0a (deepest black)
```

#### Accent Colors
```javascript
siteConfig.themeColors.accent.yellow      // #fbbf24
siteConfig.themeColors.accent.gold        // #f59e0b
siteConfig.themeColors.accent.lightYellow // #fde68a
siteConfig.themeColors.accent.darkGray    // #383838
```

#### Semantic Colors
```javascript
siteConfig.themeColors.semantic.success // #10b981 (green)
siteConfig.themeColors.semantic.error   // #ef4444 (red)
siteConfig.themeColors.semantic.warning // #f59e0b (yellow)
siteConfig.themeColors.semantic.info    // #3b82f6 (blue)
```

---

## Helper Functions

### Theme Utilities (`src/lib/theme.js`)

#### Get Theme Color
```javascript
import { getThemeColor } from '@/config/siteConfig';

const yellowColor = getThemeColor('primary.500'); // Returns: '#f59e0b'
const darkColor = getThemeColor('dark.900');      // Returns: '#1a1a1a'
const accentColor = getThemeColor('accent.gold'); // Returns: '#f59e0b'
```

#### Get CSS Variable
```javascript
import { getThemeColorVar } from '@/lib/theme';

const cssVar = getThemeColorVar('primary.500');
// Returns: 'var(--color-primary-500)'
```

#### Get Theme Styles
```javascript
import { getThemeStyles } from '@/lib/theme';

const styles = getThemeStyles({
  backgroundColor: 'primary.500',
  color: 'dark.950',
  borderColor: 'accent.gold',
});
// Returns style object with hex color values
```

#### Check Live Chat Availability
```javascript
import { isLiveChatAvailable } from '@/lib/theme';

if (isLiveChatAvailable()) {
  // Show live chat widget
}
```

#### Get WhatsApp URL
```javascript
import { getWhatsAppUrl } from '@/lib/theme';

const url = getWhatsAppUrl('I need help with GST registration');
// Opens WhatsApp with pre-filled message
```

#### Get Notification Config
```javascript
import { getNotificationConfig } from '@/lib/theme';

const config = getNotificationConfig('success');
// Returns notification styling and behavior settings
```

---

## CSS Custom Properties

All theme colors are available as CSS variables in `globals.css`:

### Usage in CSS/Tailwind

```css
.my-element {
  background-color: var(--color-primary-500);
  color: var(--color-dark-950);
  border: 1px solid var(--brand-primary);
}
```

### Available CSS Variables

#### Colors
- `--color-primary-{50-950}` - Yellow shades
- `--color-dark-{50-950}` - Black/gray shades
- `--color-accent-{yellow|gold|light-yellow|dark-gray}`
- `--color-{success|error|warning|info}` - Semantic colors
- `--brand-primary`, `--brand-dark`, `--brand-black`

#### Spacing
- `--spacing-{xs|sm|md|lg|xl|2xl}`

#### Border Radius
- `--radius-{sm|md|lg|xl|full}`

#### Shadows
- `--shadow-{sm|md|lg|xl}`
- `--shadow-yellow` - Yellow glow effect

#### Transitions
- `--transition-{fast|normal|slow}`

#### Z-Index
- `--z-{dropdown|sticky|fixed|modal-backdrop|modal|popover|tooltip}`

---

## Utility Classes

### Gradients
```html
<div class="gradient-yellow">Yellow gradient</div>
<div class="gradient-dark">Dark gradient</div>
<div class="gradient-yellow-dark">Yellow to dark gradient</div>
```

### Glass Effects
```html
<div class="glass-effect">Glass morphism light</div>
<div class="glass-dark">Glass morphism dark</div>
```

### Shadows
```html
<div class="shadow-yellow">Yellow glow shadow</div>
```

### Transitions
```html
<button class="transition-fast">Fast transition</button>
<button class="transition-normal">Normal transition</button>
<button class="transition-slow">Slow transition</button>
```

---

## Notification System

### Configuration

```javascript
siteConfig.notifications = {
  enabled: true,
  position: 'top-right',
  duration: 5000,
  showCloseButton: true,
  pauseOnHover: true,
  types: {
    success: { icon: '✓', backgroundColor: '#10b981', textColor: '#ffffff' },
    error: { icon: '✕', backgroundColor: '#ef4444', textColor: '#ffffff' },
    warning: { icon: '⚠', backgroundColor: '#f59e0b', textColor: '#ffffff' },
    info: { icon: 'ℹ', backgroundColor: '#3b82f6', textColor: '#ffffff' },
  },
};
```

---

## Live Chat System

### Configuration

```javascript
siteConfig.liveChat = {
  enabled: true,
  provider: 'whatsapp',
  position: 'bottom-right',
  welcomeMessage: 'Hi! How can we help you with your legal compliance needs?',
  workingHours: {
    enabled: true,
    timezone: 'Asia/Kolkata',
    schedule: {
      monday: { start: '09:00', end: '18:00', available: true },
      // ... other days
    },
  },
};
```

### Working Hours

Chat availability is automatically determined based on:
- Day of the week
- Current time in Asia/Kolkata timezone
- Configured working hours

---

## Usage Examples

### In Components

```javascript
import siteConfig from '@/config/siteConfig';
import { getThemeColor, getWhatsAppUrl } from '@/lib/theme';

export default function ContactButton() {
  const handleClick = () => {
    window.open(getWhatsAppUrl('I need assistance'), '_blank');
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: getThemeColor('primary.500'),
        color: getThemeColor('dark.950'),
      }}
    >
      Contact us on {siteConfig.whatsappNumber}
    </button>
  );
}
```

### For SEO Metadata

```javascript
import { generateMetadata, generateOrganizationData } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'GST Registration Services',
  description: 'Professional GST registration services',
  path: '/services/gst',
});

const organizationData = generateOrganizationData();
// Use in JSON-LD script
```

---

## Best Practices

1. **Always import from config** - Never hardcode company info, colors, or contact details
2. **Use helper functions** - Utilize `getThemeColor()` for programmatic color access
3. **Use CSS variables** - Prefer CSS custom properties for styling
4. **Consistent theming** - Stick to the yellow/black palette
5. **Responsive design** - Use utility classes and design tokens
6. **Semantic colors** - Use semantic colors for status indicators

---

## Files Modified

- ✅ [siteConfig.js](file:///d:/NEW%20JOURNEY%20BEGINS/LegalNest/src/config/siteConfig.js) - Enhanced with full configuration
- ✅ [globals.css](file:///d:/NEW%20JOURNEY%20BEGINS/LegalNest/src/app/globals.css) - Added CSS custom properties
- ✅ [theme.js](file:///d:/NEW%20JOURNEY%20BEGINS/LegalNest/src/lib/theme.js) - Created utility functions
- ✅ [layout.jsx](file:///d:/NEW%20JOURNEY%20BEGINS/LegalNest/src/app/layout.jsx) - Using siteConfig for metadata
- ✅ [Header.jsx](file:///d:/NEW%20JOURNEY%20BEGINS/LegalNest/src/app/components/Header.jsx) - Imports siteConfig
- ✅ [Footer.jsx](file:///d:/NEW%20JOURNEY%20BEGINS/LegalNest/src/app/components/Footer.jsx) - Imports siteConfig
- ✅ [seo.js](file:///d:/NEW%20JOURNEY%20BEGINS/LegalNest/src/lib/seo.js) - Updated to use siteConfig
- ✅ [sitemap.js](file:///d:/NEW%20JOURNEY%20BEGINS/LegalNest/src/lib/sitemap.js) - Updated to use siteConfig
