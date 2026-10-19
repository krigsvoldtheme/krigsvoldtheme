;;; krigsvold-themes.el --- Krigsvold Light and Dark themes -*- lexical-binding: t; -*-
;; Copyright (C) 2026 James P. Howard, II
;; Version: 1.0.0
;; Package-Requires: ((emacs "27.1"))
;; URL: https://github.com/krigsvoldtheme/emacs
;; Keywords: faces, theme
;; SPDX-License-Identifier: MIT
;;; Commentary:
;; Load this package to register the directory; select a variant with load-theme.
;;; Code:
;;;###autoload
(when load-file-name
  (add-to-list 'custom-theme-load-path (file-name-directory load-file-name)))
(provide 'krigsvold-themes)
;;; krigsvold-themes.el ends here
