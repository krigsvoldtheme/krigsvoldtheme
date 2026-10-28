## Krigsvold page shell

Krigsvold is an opinionated design language. Its reference website starts with the actual working shell of krigsvold.org, not a reconstruction from selected visual details. The imported source revision is `a3cf072c516c59ed35814e0fa153028cc91ceecd` from `basuhoward/krigsvold.org`.

### Complete page composition

The masthead establishes the page title, introductory information and relevant metadata before the content begins. A solid background is a complete default; a photograph is optional. Titles wrap naturally. Dates, versions, authors and tags belong in named metadata or tag regions when the page has those values; empty regions add no placeholder content.

Light appearance uses the source dark masthead. Dark appearance reverses it to a light masthead with dark text. This inversion is an explicit owner-directed extension, not a claim that the original source implemented full-page dark mode. The appearance control is independent from the palette specimens.

Related-page navigation and same-page contents are different objects. The page composition and its available content width determine whether same-page contents use a left index or an inline list. A narrow blog can use inline contents on the same screen where a wider document uses a left index. Viewport reflow then preserves those relationships at smaller sizes.

### Defaults and departures

The shell provides coherent defaults for the masthead, navigation, title and metadata hierarchy, reading measure, content regions and footer. An adopter can replace any part. The adopter is responsible for making the resulting composition coherent, accessible and responsive; the default does not become noncommittal to accommodate arbitrary overrides.

### Implementation boundary

This website implements the source-derived shell. React references and published package APIs are being reconciled separately. The pinned canonical grammar remains a historical snapshot; this host standard records the newer composition explicitly.
