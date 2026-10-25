# Krigsvold grammar coverage review

Review 0.3 · October 24, 2026 · Experimental

The baseline grammar described intent and an experimental collection/editor. This review adds decision rules for grouping, density, action scope, layers, validated forms and queried results. Existing origin objects remain authoritative. New application patterns are justified extensions and are not retrospectively attributed to the origin site.

| ID | Domain | Disposition | Rule or remaining work | Evidence surface |
| --- | --- | --- | --- | --- |
| G01 | Source authority | Documented | Origin objects, translations and extensions remain distinct. | Source audit and source-decisions.md |
| G02 | Field / group / region spacing | Rule clarified + reference | Use relational roles; do not inherit page-section spacing inside forms. | Validated-form reference |
| G03 | Density and targets | Claim corrected; compact open | Comfortable examples only; 44px is a design target, not blanket certification. | Foundations; target-size checks |
| G04 | Typography and hierarchy | Observed roles retained | Keep prose, UI, selective display and code roles; no decorative monospace. | Source decisions; existing React/Astro checks |
| G05 | Surfaces and layers | Rule corrected + reference | Modal, popup and inline disclosure have different interaction contracts. | Native dialog in form/results |
| G06 | Action placement and scope | Rule clarified + reference | Commands name and follow their field, object or collection scope. | Validated-form and results references |
| G07 | Responsive composition | Reference checks | Reflow fields/actions; scroll only genuine comparison surfaces; retain source order. | Narrow/enlarged-text browser checks |
| G08 | Substantial forms | New experimental contract | Validate, retain values, retry and guard specimen reset. | docs/patterns/forms.md |
| G09 | Query / sort / page | New experimental contract | Draft query differs from applied results; changed query starts page 1. | docs/patterns/query-results.md |
| G10 | Selection | New bounded contract | Binary current-page selection; scope changes reset on commit, failure retains it. | Results reference; no mixed/select-all API |
| G11 | Pending / failed / empty states | Reference coverage expanded | Keep useful previous content and distinguish no matches from empty source data. | Form/results/collection specimens |
| G12 | Focus and recovery | Reference checks; manual open | Summary links, modal dismissal, return trigger and late-response cancellation. | Browser assertions; manual AT still open |
| G13 | Top / side / focused frames | Existing support retained | Frame follows task; source navigation direction is not a family restriction. | AppShell and existing browser checks |
| G14 | Reading / contents / footer | Existing source contracts retained | Contents, body, support and host identity remain separate. | Astro candidate and source audit |
| G15 | Cross-framework agreement | Availability clarified | Rules cross frameworks; React state/focus props do not become Astro APIs. | language.json; native-HTML guidance |
| G16 | Figure / footnote / maths / archive vocabulary | Open | Do not infer shipped components from origin CSS. | Source decisions; no new API claim |
| G17 | Localization / RTL / assistive technology | Open | Long-text checks are partial evidence; no manual or locale certification. | Consumer and manual review required |
| G18 | Sustained use / dashboard breadth | Open | Focused references do not establish production fitness or cover all application patterns. | Future consumer evidence |

## Acceptance and limits

Each pattern contract names its purpose, anatomy, scope, states, keyboard/focus behavior, responsive behavior and implementation availability. Automated results are recorded separately from documented requirements. A rule is not stable merely because a specimen passes. New form and results specimens use deterministic session state and simulated latency/failure. They do not add a new application or change the collection/editor into a production service.

The foundations no longer claim that every React target is 44 pixels, no longer require a backdrop for all overlays, and now acknowledge the optional core source-profile aliases. Modal focus behavior, native read-only/disabled distinctions, selection scope and draft-versus-applied query are explicit. Compatibility remains additive; existing package defaults and APIs are retained.

## Framework boundaries

Core owns grammar, semantic roles and source profiles. React supplies interactive specimens using existing exports. Astro retains its documented component inventory and can use the same native HTML semantics; host scripts own form/query controllers. The main reference and agent snapshots identify this exact canonical revision. No framework receives an implementation claim from shared prose alone.

## Reference method

The source audit, adopted charter and actual exported APIs govern these decisions. Carbon's [form](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms), [loading](https://www.carbondesignsystem.com/building-blocks/core/patterns/loading) and [filtering](https://www.carbondesignsystem.com/building-blocks/core/patterns/filtering) guidance informed the breadth of questions, not either language's palette or composition. Our search controls retain visible labels under our own grammar. Target sizing follows the distinctions in [W3C SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), without treating automated checks as overall WCAG certification.
