# GlassLock

Browser-based file encryption. AES-256-GCM, Argon2id (PBKDF2-SHA256 fallback), Liquid Glass UI. No backend: files and passwords never leave the browser.

## Run in VS Code
1. File > Open Folder > select this `glasslock` folder.
2. Install the **Live Server** extension, right-click `index.html` > **Open with Live Server**.
   (Opening `index.html` directly also works. Use `localhost` or HTTPS, because Web Crypto needs a secure context.)
3. The first load needs internet for the Argon2 library, or put a local copy in `lib/argon2/` (see the README there).

## Structure
- `index.html` page markup
- `css/` base styles, Liquid Glass components, responsive rules
- `js/` `security-utils` > `container-format` > `key-derivation` > `encryption` / `decryption` > `password-manager` > `file-handler` > `ui` > `app` (classic scripts, load order matters)
- `assets/logo.svg`, `lib/argon2/`

## File format (.glasslock)
`magic "GLCK" | version | kdf id | cipher id | kdf params (mem/iter/parallelism) | salt16 | nonce12 | name | mime | ciphertext + 16-byte tag`
The whole header is authenticated as AES-GCM additional data, so any change to it, the ciphertext or the tag makes decryption fail.

## Known limits
- One AES-GCM call per file, so very large files can run out of browser memory.
- Key derivation runs on the main thread (no Web Worker yet).
- A forgotten password cannot be recovered.
