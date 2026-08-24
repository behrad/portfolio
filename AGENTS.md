# Always Reply in English

## Objective
Ensure the agent always communicates in English, even when prompted in Persian (or any other language).

## Rule Instructions
- You MUST always respond in English, regardless of the language used by the user in their prompt.
- Even if the user writes in Persian, do not translate your thoughts or reply in Persian.
- The ONLY exception is if the user explicitly (with words like "Explicitly", "مشخصاً", "به فارسی جواب بده", etc.) requests you to reply in Persian for a specific turn. In all other cases, default to English.

# Skills

## Lock-managed skills
`skills-lock.json` records source repo, path, and hash for the marketing skills. Content is
vendored once under `.agents/skills/<name>/`; `.claude/skills/<name>` is a symlink to it. Both
the content and the symlinks are tracked.

## The `impeccable` pack (not lock-managed)
Installed out-of-band, currently version 4.1.1. The installer writes three runtime-specific
variants of the same pack:

| directory | runtime | notes |
| --- | --- | --- |
| `.agents/skills/impeccable/` | agents runtime | `$impeccable` syntax, extra `agents/` subdir |
| `.claude/skills/impeccable/` | Claude Code | `/impeccable` syntax, declares `allowed-tools` |
| `.github/skills/impeccable/` | GitHub Copilot | `/impeccable` syntax |

Each variant hard-codes its own directory in every script path inside its `SKILL.md` and
references, so the three are **not** interchangeable - do not symlink or merge them.

All three are gitignored: they are generated, ~3.4 MB each, and rewritten wholesale on every
pack update. Re-run the impeccable installer to restore them after a fresh clone.
