# Krigsvold: query, results and selection

Experimental pattern contract 0.3 · Application extension · React reference specimen

## Purpose and composition

Use a results table when the task benefits from comparing several attributes across records. The reference uses the existing component catalogue as its dataset. Search, group filter, sorting, paging and selection are host logic composed from existing primitives. The preparation dialog makes no remote request or actual review decision.

Give query, committed results and selection commands separate jobs. Align names, groups and purposes within the table so comparisons share common edges. Keep the applied scope and pending request distinguishable. Selected-item commands operate on the visible result page and stay beside its count. These regional rules apply whether the query sits above or beside the work.

Visible search and filter labels name their scope. Enter or Apply query submits the draft query. Changing an unapplied input does not relabel old results. Show the committed query, result count and page independently of what is being typed. Put a table caption on the table and a keyboard-accessible name on its scrolling region. Do not make every row simultaneously mean selection, navigation and editing.

## Query and result contract

| Event | Required behavior |
| --- | --- |
| Apply a changed search, filter or sort | Start at page 1. Retain old results with their applied-scope label while pending. Disable selection commands during the transition. |
| Pending result request | Announce loading, mark the result region busy, and retain useful content. Do not label previous results as matches for the new request. |
| Request fails | Explain that the previous results are still shown; preserve the failed request for Retry. Keep its old selection, with commands unavailable until results are current. |
| Retry succeeds | Commit the new result scope and announce its count. Clear the old page selection. |
| Change page | Request the page within the committed query/filter/sort; clear selection when the new page commits. |
| Refresh unchanged results | Retain selected identities that are still on the committed page. Do not restore selection by row index. |
| No matches | Name the applied scope and offer Clear query; retain the dataset. |
| Empty source dataset | Explain that no source records exist; do not present it as a failed query. |

The reference simulates asynchronous completion and an optional one-shot failure. Each request carries a generation: an obsolete completion cannot replace newer state or update an unmounted specimen. The available sample data and sorting are deterministic. No remote retrieval, server pagination or durable selection is claimed.

## Selection and dialog contract

Selection means the checked records on the currently committed result page. Native checkboxes name each record. There is no select-all control, cross-page selection, mixed checkbox state or implied edit permission in this contract. The count is textual; row color is supplementary. Query/filter/sort/page changes clear selection only when their new result set commits. A failed request retains previous selection and scope for recovery.

Review selection opens a native modal listing the exact selected component names. Prepare comparison is a simulated operation. Failure keeps the dialog and selection available for retry. Success closes the dialog, retains selection and announces completion. Cancel or Escape cancels an in-flight preparation, preserves selection and returns focus to Review selection. A late completion cannot announce success after dismissal. No action in this specimen promotes component maturity or records a real readiness review.

Native dialog semantics make the background inert and keep modal keyboard behavior conventional. Non-modal navigation popups and disclosures do not inherit that modal contract or require a backdrop.

## Responsive behavior and implementation

Query controls wrap into one coherent sequence; status and commands wrap without clipping. A genuinely comparative table may scroll within its labelled region at narrow widths. Keep its caption, row-selection labels and all columns. Do not hide data or turn each row into a different task simply to remove horizontal scrolling. Surrounding prose and controls must still reflow.

React uses Field, TextInput, Select, Checkbox, DataTable, Pagination, Button and Dialog. A host owns querying, sorting, paging, selection and request cancellation. Core owns the existing family styles. Astro native HTML guidance shares these semantics, but an interactive results controller is not supplied by the Astro package. Both languages permit a table or a list when the task supports it; neither is compulsory for one family.

Tests exercise changed/unapplied scope, pending and failed retrieval, retry, no matches, paging, selection reset, modal failure/cancel/success, focus restoration, long text, narrow reflow and automated accessibility. Manual screen-reader review, localization/RTL, large datasets and real network races remain open consumer work.
