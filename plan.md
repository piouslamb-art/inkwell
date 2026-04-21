# Implement Novel Detail View and Persistent Bottom Bar in Reader

## Goal
Enhance the `Reader.tsx` page to display a comprehensive detail view upon first entry, featuring engagement metrics and a persistent bottom navigation bar for reading controls.

## Tasks
1. **Type & Data Updates**
   - Update `Story` type in `src/lib/types.ts` to explicitly include `views` and `followers` (aliasing or updating current fields).
   - Update `MOCK_STORIES` in `src/lib/mock-data.ts` with enhanced engagement data and associated comments.

2. **Reader Page Logic (src/pages/Reader.tsx)**
   - Add state `viewMode` (`'info' | 'reader'`) to toggle between the story overview and the actual reading interface.
   - Implement the `InfoView` component:
     - Hero section with story cover, title, author, and description.
     - Stats row showing Views and Followers with icons.
     - Comments section using existing comment components but integrated into the info layout.
   - Implement the `PersistentBottomBar`:
     - Bottom-left: "Save to Library" button.
     - Bottom-center: "Read Now" primary action button.
     - Bottom-right: "Share" button.
   - Update the reader interface to allow returning to the info view if needed (or just focus on the transition).

3. **UI/UX Refinement**
   - Ensure the emerald green theme is applied to all new elements.
   - Use `framer-motion` for smooth transitions between info and reader views.
   - Mobile-first responsive design for the bottom bar and detail layout.

4. **Verification**
   - Verify that clicking "Read Now" transitions to the chapter content.
   - Verify that stats and comments are displayed correctly.
   - Ensure the bottom bar remains fixed and functional.
