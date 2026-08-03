# Atlas stylesheet map

Styles are imported once from `app/layout.tsx` in cascade order.

- `globals.css` — design tokens, reset, typography, and shared primitives only.
- `landing.css` — public marketing and landing-page presentation.
- `platform.css` — shared LMS and CMS shells, navigation, cards, lists, and dashboards.
- `journeys.css` — authentication, onboarding, course consumption, assessments, and certificates.
- `platform-refinements.css` — cross-platform readability and late-stage compatibility overrides.
- `learning-flows.css` — gated lesson, module, and final-assessment flows.
- `course-studio.css` — the CMS course-authoring studio.

## Inline-style policy

Static presentation belongs in the stylesheet that owns the component. Inline styles are reserved for values calculated at runtime, including progress widths, chart heights, per-course colours, and CSS custom properties derived from mock data.

When adding a new route, extend the closest existing feature stylesheet. Add another stylesheet only when the route represents a genuinely separate product surface.
