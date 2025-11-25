# Testing Checklist - Pokemon Cards Redesign

## 🚀 Quick Start
```bash
npm run dev
```
Open: http://localhost:5174

---

## ✅ Visual Tests

### Background & Atmosphere
- [ ] Animated mesh gradient is visible and moving smoothly
- [ ] Gradient colors transition between violet, blue, and cyan
- [ ] Grain texture overlay is subtle and animated
- [ ] Background doesn't cause performance issues
- [ ] Animation respects prefers-reduced-motion setting

### Navigation (ExperienceSwitcher)
- [ ] Navigation pills are centered and glassmorphic
- [ ] Hover effect shows liquid fill animation
- [ ] Active state has gradient background with glow
- [ ] Click feedback scales button to 0.98
- [ ] Switching between experiences works smoothly
- [ ] Sticky positioning works on scroll
- [ ] Mobile: Buttons are properly sized and responsive

### Search Interface
#### Kanto 151 Experience
- [ ] Search bar is glassmorphic and centered
- [ ] Focus state adds cyan glow and scales container
- [ ] Pokeball icon rotates and scales when searching
- [ ] Input field has proper focus ring
- [ ] Quick filter pills have hover effects
- [ ] Pills glow cyan on hover
- [ ] Search functionality works correctly

#### Holo Experience
- [ ] Search bar matches Kanto styling
- [ ] Focus states work correctly
- [ ] Search icon glows on focus
- [ ] API search functionality works (if API key present)

### Card Grid
- [ ] Cards fade in with staggered timing
- [ ] Entry animation includes blur effect
- [ ] Cards lift on hover (translateY -8px)
- [ ] Grid spacing is increased (60px / 3vw)
- [ ] Max-width is 1400px on large screens
- [ ] Mobile: Cards stack properly
- [ ] Mobile: Staggered rotation is preserved

### Typography
- [ ] H1 headings have gradient fill (cyan to violet)
- [ ] Inter font is loaded and applied
- [ ] Letter-spacing is improved
- [ ] Text is readable on all backgrounds
- [ ] Responsive font sizing works

---

## 🎮 Interaction Tests

### Card Behavior (CRITICAL - Must be 100% preserved)
- [ ] Click card to expand - works perfectly
- [ ] Card centers on screen when expanded
- [ ] Card rotates on mouse move
- [ ] Holographic effects are visible
- [ ] Glare follows cursor
- [ ] Card flips on first activation
- [ ] Click outside to close card
- [ ] ESC key closes card
- [ ] Mobile: Touch interactions work
- [ ] Mobile: Card expands properly
- [ ] Multiple cards can be tested sequentially
- [ ] Z-index hierarchy is correct (active card on top)

### Navigation Interactions
- [ ] Hover on nav buttons shows effects
- [ ] Click switches experience smoothly
- [ ] Active state persists correctly
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Focus states are visible

### Search Interactions
- [ ] Typing in search filters cards
- [ ] Search is debounced (not instant)
- [ ] Clear search shows all cards
- [ ] Quick filter pills work correctly
- [ ] URL updates with search query
- [ ] Back button restores search state

### Hover Effects
- [ ] Cards lift on hover (non-active)
- [ ] Nav buttons show liquid fill
- [ ] Filter pills glow on hover
- [ ] Links show glow effect
- [ ] All hover states are smooth

---

## 📱 Responsive Tests

### Mobile (< 600px)
- [ ] Background gradient is visible
- [ ] Navigation is properly sized
- [ ] Search bar is full width
- [ ] Cards stack correctly
- [ ] Card interactions work on touch
- [ ] No horizontal scroll
- [ ] Text is readable
- [ ] Blur effects are reduced (performance)

### Tablet (600px - 900px)
- [ ] Grid shows proper layout
- [ ] Navigation is centered
- [ ] Search bar is sized correctly
- [ ] Cards have proper spacing
- [ ] Touch interactions work

### Desktop (> 900px)
- [ ] 3-column grid is visible
- [ ] All effects are enabled
- [ ] Hover states work
- [ ] Maximum width is respected (1400px)
- [ ] Content is centered

---

## ⚡ Performance Tests

### Animation Performance
- [ ] 60fps on card hover
- [ ] 60fps on card expansion
- [ ] 60fps on background animation
- [ ] No jank on scroll
- [ ] Smooth transitions throughout
- [ ] GPU acceleration is working (check DevTools)

### Loading Performance
- [ ] Page loads in < 2 seconds
- [ ] Fonts load without FOIT/FOUT
- [ ] Images lazy load correctly
- [ ] No layout shift on load
- [ ] Staggered animations don't block interaction

### Memory Usage
- [ ] No memory leaks on card interactions
- [ ] Background animation doesn't accumulate memory
- [ ] Switching experiences doesn't leak
- [ ] DevTools shows stable memory usage

---

## ♿ Accessibility Tests

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus states are clearly visible
- [ ] Enter/Space activates buttons
- [ ] ESC closes expanded card
- [ ] No keyboard traps
- [ ] Skip links work (if present)

### Screen Reader
- [ ] Navigation buttons are announced
- [ ] Card names are announced
- [ ] Search field has proper label
- [ ] Focus changes are announced
- [ ] ARIA labels are present

### Motion Preferences
- [ ] Test with prefers-reduced-motion enabled
- [ ] Animations are disabled/reduced
- [ ] Functionality still works
- [ ] No disorienting motion

### Color Contrast
- [ ] Text on glass containers is readable
- [ ] Links have sufficient contrast
- [ ] Focus indicators are visible
- [ ] Gradient text is readable

---

## 🌐 Browser Tests

### Chrome/Edge (90+)
- [ ] All features work
- [ ] Backdrop-filter works
- [ ] Animations are smooth
- [ ] No console errors

### Firefox (88+)
- [ ] All features work
- [ ] Backdrop-filter works
- [ ] Animations are smooth
- [ ] No console errors

### Safari (14+)
- [ ] All features work
- [ ] -webkit-backdrop-filter works
- [ ] Animations are smooth
- [ ] No console errors
- [ ] iOS Safari works correctly

---

## 🐛 Known Issues to Check

### Potential Issues
- [ ] Backdrop-filter performance on low-end devices
- [ ] Blur effects on older browsers
- [ ] Animation performance on mobile
- [ ] Font loading flash
- [ ] Z-index conflicts with cards

### Edge Cases
- [ ] Very long card names
- [ ] Rapid clicking on cards
- [ ] Switching experiences while card is open
- [ ] Resizing window with card open
- [ ] Multiple tabs open simultaneously

---

## 📊 DevTools Checks

### Console
- [ ] No JavaScript errors
- [ ] No CSS warnings
- [ ] No 404s for resources
- [ ] No CORS errors

### Network
- [ ] Fonts load correctly
- [ ] Images load correctly
- [ ] No unnecessary requests
- [ ] Proper caching headers

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] No layout shifts (CLS < 0.1)
- [ ] Frame rate stays at 60fps

### Rendering
- [ ] Layers panel shows GPU acceleration
- [ ] Paint flashing shows minimal repaints
- [ ] No forced synchronous layouts
- [ ] Transform and opacity used for animations

---

## ✨ Feature Verification

### Implemented Features
- [x] Animated mesh gradient background
- [x] Glassmorphic UI elements
- [x] Staggered card entry animations
- [x] Hover lift effects
- [x] Focus glow states
- [x] Gradient text on headings
- [x] Liquid fill button animations
- [x] Pokeball rotation animation
- [x] Responsive design
- [x] Accessibility support
- [x] Performance optimization
- [x] Card behavior preservation

### Card Behavior Preserved
- [x] Click to expand
- [x] Mouse tracking
- [x] Holographic effects
- [x] Rotation physics
- [x] Glare effects
- [x] Spring animations
- [x] Popover centering
- [x] Mobile touch support
- [x] Orientation support
- [x] Showcase mode

---

## 🎯 Success Criteria

### Must Pass
- ✅ All card interactions work perfectly
- ✅ No console errors
- ✅ 60fps on interactions
- ✅ Responsive on all devices
- ✅ Accessible via keyboard
- ✅ Works in all modern browsers

### Should Pass
- ✅ Lighthouse score > 90
- ✅ No layout shifts
- ✅ Smooth animations
- ✅ Fast load time
- ✅ Good color contrast
- ✅ Reduced motion support

### Nice to Have
- ✅ Lighthouse score > 95
- ✅ Perfect accessibility score
- ✅ Sub-second load time
- ✅ Zero console warnings
- ✅ Optimal font loading
- ✅ Perfect mobile experience

---

## 📝 Test Report Template

```markdown
## Test Results - [Date]

**Tester:** [Name]
**Browser:** [Browser + Version]
**Device:** [Device Type]
**Screen Size:** [Resolution]

### Visual Tests
- Background: ✅/❌
- Navigation: ✅/❌
- Search: ✅/❌
- Cards: ✅/❌
- Typography: ✅/❌

### Interaction Tests
- Card Behavior: ✅/❌
- Navigation: ✅/❌
- Search: ✅/❌
- Hover Effects: ✅/❌

### Performance
- FPS: [Number]
- Load Time: [Seconds]
- Lighthouse: [Score]

### Issues Found
1. [Issue description]
2. [Issue description]

### Notes
[Additional observations]
```

---

## 🚨 Critical Test (Must Pass)

**Card Interaction Test:**
1. Open http://localhost:5174
2. Switch to "Kanto 151" experience
3. Wait for cards to load
4. Click on any card
5. Card should expand and center
6. Move mouse over expanded card
7. Card should rotate following mouse
8. Holographic effects should be visible
9. Click outside card
10. Card should close smoothly

**Result:** ✅ PASS / ❌ FAIL

If this test fails, the redesign has broken core functionality and must be fixed immediately.

---

## 📞 Support

If you find any issues:
1. Check browser console for errors
2. Verify browser version is supported
3. Test in different browser
4. Check network tab for failed requests
5. Review REDESIGN_SUMMARY.md for implementation details

---

**Last Updated:** [Current Date]
**Version:** 1.0
**Status:** Ready for Testing
