# Krigsvold: a grammar of clear regions

Experimental grammar 0.3 · Core 2.2.0 candidate · Astro 1.2.0 candidate · React 0.1.0

Krigsvold makes complex work legible through purposeful regions, stable alignment, controlled contrast, and precise state. Its clarity must remain approachable when a person is uncertain or an operation fails. Its adopted charter supplies the criteria for these experimental application rules.

## Source authority and current decisions

Existing origin objects are the baseline. Read the `decisions` MCP reference or the source-decision profile before choosing visual rules. Distinguish observed source roles, a contextual translation, and a new application extension. Do not add a global gold stripe, decorative monospace labels, arbitrary accent rules, or mechanically opposite family layouts. Keep new capabilities only with a stated task purpose. The October 23 audit is a fixed record; the reconciliation ledger records implemented decisions and remaining gaps. This remains an experimental grammar, not a declaration of stability.

## Assign each region a job

Identify orientation, scope, work, supporting information, and commands. Align related information so that a person can compare it without reconstructing the layout. Use a boundary when purpose or context changes; use local proximity inside a working region. A border around every field does not explain the larger structure, and a large empty gap does not automatically make it clear.

The optional source profile exposes `--krigsvold-field-gap`, `--krigsvold-group-gap`, and `--krigsvold-region-gap`. This pattern maps local grouping to the existing 0.5rem scale step, groups to 1.5rem, and distinct regions to the existing 3rem scale step. These experimental application roles explain relationships rather than replacing the foundation's reference scale. Regional space and compact local rows can coexist. Density is a region-level decision; keep readable text, visible focus, and usable targets.

## Make hierarchy exact

Use Roboto for interface and body text, Roboto Slab for heading roles, and Roboto Mono where code or numerical comparison benefits. Establish common edges for related labels, values, and actions. Keep the existing navy, glacier, paper, and bronze vocabulary assigned through semantic roles. Contrast should identify importance and interaction state, not merely alternate decorative sections.

Keep the desktop navigation popup white with ink text and source pointer/elevation, even inside a dark header. Below 992px its source mobile submenu becomes transparent and in-flow. Use other surface changes only to distinguish purpose or depth. A selected result needs a visible non-color cue as well as contrast. Metadata must remain subordinate without becoming illegible. Truncation is appropriate only when the complete information remains available at a predictable destination.

## Make scope visible

Keep commands near the region they affect. Distinguish collection operations from object operations and persistent state from draft state. Show the current scope beside filtering and search. A result-row activation opens its record; a separate Edit action starts modification. Selection does not silently imply a destructive command or an edit.

Use explicit labels for what is pending, completed, unavailable, or failed. Put the recovery action where the failure occurred. Precision is assistance: explain a useful next step rather than displaying only a diagnostic code.

## Keep change controlled

Retain context while results, details, and forms change. Prefer stable region boundaries during loading and filtering; preserve useful previous information when it remains valid. A save's pending state prevents duplicate submission without hiding the work. A failed save keeps the changed data visible and recoverable. Move keyboard focus when a new task surface requires orientation, and announce state changes without unnecessary interruptions.

Before leaving a changed editor, offer an explicit choice and preserve the draft when that choice is cancelled. Use reversible operations and undo where the domain permits. Explain irreversible consequences before commitment. Transitions may clarify state, but the same information must remain understandable without animation.

## Let the frame follow the work

A horizontal navbar, side rail, or focused workspace without primary navigation can each be Krigsvold. Choose based on destination count, frequency, available space, and the task's need for persistent context. Vertical navigation is not a language rule. A reading page deserves the same coherent regional structure as an operations console.

At narrow widths, place regions in a meaningful reading order rather than compressing all of them into unusable columns. Keep the current object identifiable and supply a clear return route. Long labels, enlarged text, and translated content must not depend on fixed-width assumptions.

## Choose a grouping, then a density

Assign orientation, query, work, supporting context and commands distinct jobs. Align comparable information within each job. Use a boundary when scope changes; do not repeat a border around every local relationship. A region can be compact internally while remaining clearly separated from the next region.

Use comfortable density for the current reference patterns. A compact mode remains proposed, with no new public density prop. Adjust related padding locally only while preserving readable text, usable targets, visible labels and the field/group/region hierarchy. Source page section spacing does not belong inside an editor. A source index or footer is an object-specific composition; it does not establish a universal application rail or surface.

## Bind actions to committed scope

Put a field's assistance beside that field, object commands beside the object, and collection commands beside a named collection. A pending query and its previous results are different scopes: identify both. Retain input and useful results after failure, with a recovery action that names the failed operation. Selection belongs to stable record identities in a declared result scope; clearing, retaining or extending it must follow a documented transition, not an accidental rerender.

The validated-form and query-results contracts add concrete state transitions, focus destinations and narrow-layout rules. They are application extensions. Shared native keyboard conventions do not make the languages interchangeable, and a shared grammar rule does not imply the same framework API. The coverage ledger distinguishes documented rules, checked reference behavior and open consumer evidence.

## Use layers for their actual purpose

An inline disclosure stays in document flow. A non-modal popup anchors to its trigger and retains the source navigation surface. A modal interrupts the task, names its consequence and uses the native dialog top layer with a clear dismissal route. A backdrop belongs to the modal; it is not required for every overlay. Keep focus visible and return it to a meaningful trigger when a temporary surface closes. Motion never carries the only explanation of a state change.

## Working pattern: collection and detail workspace

The Notes workspace specimen puts collection scope and search in a common command region. Results use aligned rows with title, collection, and preview. A clear selected edge identifies the opened record. The detail region remains beside results when width permits, so a person can move through records without losing the collection. Editing is explicit and stays within the detail region. Local working density supports scanning; stronger separation distinguishes the collection from the current note.

When the available width is insufficient, results precede the detail region and opening a note moves focus to its heading. Closing returns focus to the collection heading. The layout changes while scope and task meanings persist.

This pattern does not require every Krigsvold application to use a split view. A sustained-reading task may use a dedicated page. The language's regional, alignment, contrast, and state rules apply in either frame.

## State and recovery rules

Search names its scope and reports the result count. No matches offer a clear reset; an empty collection offers creation. Changing folders is an explicit context change. Opening and editing remain separate actions. Save success returns the note to a committed reading state; failure keeps the editor and offers retry. A context change from a changed editor requires a keep-or-discard choice. Moving a saved note to trash preserves an undo route.

The specimen contains fictional, session-only data. Reload restores initial examples. Its failure-inspection control deliberately fails one save and is separate from ordinary product commands. It does not implement network retrieval, durable storage, collaboration, or rich text.

## Review the grammar

Can someone identify the current region, command scope, selected record, and save state without relying on color? Does aligned information support comparison? Are boundaries meaningful rather than repetitive decoration? Does the regional structure remain understandable in a compact table, a form, and a reading experience? Test these questions across complete transitions, not only the populated initial view.

Expected keyboard behavior and accessible semantics need not differ from Martlet. Independence comes from coherent decisions that serve the task, not arbitrary opposites. Manual assistive-technology review, localization, RTL adaptation, and sustained consumer evidence remain open before stability.
