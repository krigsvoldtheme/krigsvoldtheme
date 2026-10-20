# Prepublication validation snapshots

These exact archives are built from @krigsvold/theme 2.0.0 and @krigsvold/astro 1.0.0. They allow clean installation and CI before registry publication. Do not modify the archives.

This migration must remain unmerged until both packages are published to npm. Then switch package.json to exact registry versions, regenerate package-lock.json, remove vendor/, and pass CI again before deployment. Only after that gate passes may krigsvold.org be migrated.
