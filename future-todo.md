# Future Improvements

This document tracks potential improvements that can be implemented in the future.

## Performance Optimizations

### 2. Optimize ClickSpark animation (ClickSpark.tsx)
- **Issue**: Canvas animation loop runs continuously even without sparks
- **Solution**: Add early return when sparks array is empty to save CPU cycles
- **Impact**: Reduced CPU usage when no animations are active
- **File**: `components/ui/ClickSpark.tsx:93-127`

## Security

### 8. Fix security issue: plain text passwords
- **Issue**: Passwords stored in plain text in database for albums and contacts
- **Solution**: Hash passwords using bcrypt or similar before storing
- **Impact**: Critical security improvement
- **Files**:
  - `app/api/albums/route.ts`
  - `app/api/contacts/verify/route.ts`
  - `prisma/schema.prisma`

## Code Quality

### 9. Add type safety (blog/[slug]/page.tsx)
- **Issue**: Using `any` types in generateMetadata and Blog component
- **Solution**: Replace with proper TypeScript types: `Promise<{ params: { slug: string } }>`
- **Impact**: Better type safety and IDE support
- **File**: `app/blog/[slug]/page.tsx:14,57`

### 10. Remove empty list item (footer.tsx:96)
- **Issue**: Empty `<li></li>` serves no purpose
- **Solution**: Remove the empty list item
- **Impact**: Cleaner HTML output
- **File**: `components/footer.tsx:96`

## Style & UI Improvements

### 13. Standardize spacing
- **Issue**: Inconsistent margins throughout (mb-8, mt-8, mt-10)
- **Solution**: Use consistent spacing scale throughout the application
- **Impact**: More cohesive visual design
- **Files**: Multiple components

### 15. Consolidate className patterns
- **Issue**: Mix of manual string concatenation and `cn()` utility
- **Solution**: Use `cn()` consistently for better maintainability
- **Impact**: More maintainable styling code
- **Files**: Multiple components

### 16. Improve work experience visual hierarchy
- **Issue**: Timeline could be more prominent, better visual separation needed
- **Solution**:
  - Make timeline line more prominent
  - Add better spacing/visual separation between companies
- **Impact**: Better visual hierarchy and readability
- **File**: `components/work-experience.tsx`

### 17. Fix inconsistent component patterns
- **Issue**: Prose component in work-experience redefines styles already in MDX
- **Solution**: Extract to shared component or use existing MDX prose classes
- **Impact**: DRY principle, consistent styling
- **Files**:
  - `components/work-experience.tsx:207-218`
  - `components/mdx.tsx`
