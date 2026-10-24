# Krigsvold source decisions

Origin reconciliation 0.2 · Consolidation candidate · Original palette and existing defaults retained

Use krigsvold.org as the authority for existing objects. This profile distinguishes restored source roles from application extensions. The full grammar remains experimental. Original source commit: `a3cf072c516c59ed35814e0fa153028cc91ceecd`, repository `basuhoward/krigsvold.org`. Review `src/styles/site.css`, `src/components/SiteHeader.astro`, `SiteFooter.astro`, `src/layouts/Page.astro` and active Material Kit styles. The audit and reconciliation ledger record evidence and remaining limits.

## Existing source objects

| Role | Decision | Source / reason |
| --- | --- | --- |
| Canvas/type | Paper #fbfaf7, ink #17202a, Roboto 1rem/1.65. Editorial prose 1.06rem/1.65. | Host overrides and live origin. |
| Headings | Roboto Slab, weight 700, source scale/leading/tracking. | Source global/editorial/masthead roles. Medium-weight alternate docs headings were removed. |
| UI labels | Roboto; .76rem/.16em uppercase blue eyebrow where the source uses it. | Source eyebrow and navbar. Roboto Mono is for code and useful numerical work, not ordinary status/folder labels. |
| Reading | Bounded 760px editorial measure with source hierarchy. Supporting facts can have their own region. | Page layout and editorial CSS. An accent rail/mono label is not mandatory article anatomy. |
| Desktop navbar | Navy rgba(6,19,37,.84), .4rem radius, white 20% border, 14px blur, source navbar shadow. | Source site-navbar. Docs retains a contained in-flow variant because there is no photographic masthead. |
| Desktop popup | White surface, ink text, ice hover; 15rem min width; .55rem padding; .3rem radius; source rule and `0 18px 44px rgba(6,19,37,.18)` shadow; white 12px pointer. | Source dropdown and live observation. The light surface is independent of the dark parent and full-page mode. |
| Popup item | .9rem/1.65 Roboto; .62rem/.7rem padding; small item radius. | Source dropdown-item. Use source SVG chevron. |
| Mobile navigation | Collapsed Menu below 992px; submenu static/indented/transparent on navy; no popup pointer, border or shadow. | Source mobile overrides. Do not impose desktop popup styling here. |
| Navigation behavior | Native details retains click/Enter/Space and exclusive groups; Escape restores summary, blur closes; mobile Menu Escape restores trigger. | Explicit implementation translation of source dropdown capability. Hover is visual feedback, not the only access route. |
| Search | Source field material, label and underline retained. Docs uses an explicitly labelled live component filter rather than site-wide GET search. | Source site-search visual role; task-specific documentation extension. |
| Primary action | Navy with blue hover in light mode; .75rem bold uppercase UI type, .035em tracking, .625rem/1.5rem padding. | Observed source navy button and foundation dimensions. Dark mode uses semantic contrast roles. |
| Input | Native control and own small radius, theme/source padding; keep visible labels. | Source control vocabulary; site-search is not the default general form geometry. |
| Table | .95rem UI type, .85rem/.7rem cells, top alignment, source rule; no arbitrary compact-family default. | Editorial source table. Explicit compact density remains future task-specific work. |
| Quote | 4px blue leading rule, Slab quotation text. | Editorial blockquote. |
| Footer | Navy identity column spanning two tracks, four link groups, and a separate ownership/contact base line; 5rem/1.5rem vertical padding, 48px desktop gap. | SiteFooter/site.css. The adopting host owns identities, organizations and destinations. |

## Explicit application extensions

AppShell is an application frame, not the entire origin website. Both languages support top, side and none. The existing Krigsvold default side frame is retained for compatibility with the workbench; it is not a grammar requirement. The hard-coded rail colophon is removed.

No origin object establishes a universal Krigsvold TOC. The experimental index/inline extension uses native fragment navigation, unnumbered depth-aware hierarchy and reading order before body. A persistent rail appears only when the available width supports it. No invented accent top rule or mono eyebrow is required. DefinitionList supports rows, stack and grid in either family; source fellow facts already demonstrate stacking.

Task dialogs, validation summaries, notices, badges, switches, tabs, file controls and controlled result paging are explicit new application objects. They preserve native semantics, visible focus, clear labels and recoverable operations. ErrorSummary uses a leading severity rule, consistent with its task rather than a forced opposite Martlet treatment. Tabs use a selected underline, not an invented filled institutional badge. Invalid styling means `aria-invalid="true"`, never mere attribute presence.

Field/group/region roles are .5/1.5/3rem source-scale values with experimental relational assignments. Local density serves comparison; generous source page section spacing remains a different role. A 3px selection edge explains the current note, while nonnumeric status/folder labels use Roboto. The results/detail composition is a task choice, not compulsory Krigsvold anatomy.

Dark mode keeps the source object hierarchy and existing semantic contrast roles. The source desktop navbar popup remains light; mobile remains transparent on navy. New status/error/switch surfaces are application extensions and need state/contrast evidence. Code keeps theme roles pending a matched origin code specimen review.

## Boundary and evidence

The theme-site crystal is the existing system mark used by documentation. It does not replace an adopting application's own identity or the origin institution's snowflake badge. Docs preview, finder, copy/download controls, simulated failure and session-only notes are host tooling.

Polar imagery, title/arms, award content, legal policy and analytics remain host responsibilities. Origin masthead, evidence/fellow/card/figure/FAQ variants outside the current 22 exports remain named vocabulary gaps, not silently shipped components. Full accessibility, RTL/localization and sustained-use evidence remain open. Read this profile with the grammar/API references; catalogue hashes do not ratify design choices.

## Framework consolidation

Core 2.2.0 and Astro 1.2.0 are unreleased candidates. The source profile is an opt-in import and class; existing core defaults and existing Astro slots remain compatible. New TableOfContents and grouped SiteFooter anatomy are available in the paired candidate packages. React 0.1.0 retains its existing theme 2.1.0 dependency and React-specific events and focus contracts. Framework support is recorded in language.json. These additions do not make the grammar stable.
