# Vendor docs fragment — anketaplan (DEEP)

**Когда:** 2026-08-08  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Задача:** TG `sendDocument` gap + Cursor skill boundaries + form/env patterns → Timeweb (`eg.egoshev.ru`)  
**SKIP:** OpenAI / Claude / Gemini cookbooks (явный brief)

> 💡 Нет production code. Нет секретов. Только факты + idea_seeds для factory / prompt-craft.

## Context (локальный gap)

| Факт | Путь / значение |
|------|-----------------|
| Существует | `site-next/lib/notifications/telegram.ts` — только `sendMessage` (JSON + `parse_mode: HTML`) |
| Gap | нет `sendDocument` / multipart upload |
| Deploy | Timeweb VPS · PM2 `egoshev` · nginx · `eg.egoshev.ru` |
| Env pattern уже | `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` (+ `STRATEGY_TG_*` overrides) — server-only |

```yaml
status: ok
vendor_docs_brief:
  vendors: [telegram, cursor, nextjs, vercel_patterns_adapt_only]
  skipped_by_brief: [openai, anthropic, gemini]
  rows:
    - vendor: telegram
      kind: docs
      url: "https://core.telegram.org/bots/api"
      fetched: "2026-08-08"
      published_or_updated: "2026-07-14"
      freshness: ok
      takeaway: "Bot API 10.2. sendMessage text 1-4096; sendDocument upload ≤50MB multipart; caption 0-1024; parse_mode HTML; JSON нельзя для upload файлов."

    - vendor: telegram
      kind: docs
      url: "https://core.telegram.org/bots/features"
      fetched: "2026-08-08"
      published_or_updated: "2026-08-08"
      freshness: ok
      takeaway: "Official Bot API: max upload 50MB, max download 20MB. Local Bot API server: upload up to 2000MB — не нужен для anketaplan PDF."

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/context/skills"
      fetched: "2026-08-08"
      published_or_updated: "2026-08-08"
      freshness: ok
      takeaway: "SKILL.md: name+description required; paths / disable-model-invocation optional; dirs scripts|references|assets; progressive load; When/Do NOT use в description."

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/agent/prompting"
      fetched: "2026-08-08"
      published_or_updated: "2026-08-08"
      freshness: ok
      takeaway: "Skills descriptions inject в system context; держать description узким — иначе noise в token budget."

    - vendor: agentskills
      kind: docs
      url: "https://agentskills.io/specification"
      fetched: "2026-08-08"
      published_or_updated: "2026-08-08"
      freshness: ok
      takeaway: "name≤64 hyphen-lowercase; description≤1024; SKILL.md body <500 lines recommended; progressive disclosure; relative refs one level deep."

    - vendor: nextjs
      kind: docs
      url: "https://nextjs.org/docs/app/guides/forms"
      fetched: "2026-08-08"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: "Server Actions + FormData; Zod safeParse server-side; useActionState errors; secrets never in Client Components."

    - vendor: nextjs
      kind: docs
      url: "https://nextjs.org/docs/app/guides/environment-variables"
      fetched: "2026-08-08"
      published_or_updated: "2026-03-03"
      freshness: ok
      takeaway: "NEXT_PUBLIC_ inlined at build; server-only vars runtime on server; .env* gitignore; load order process.env → .env.[mode].local → …"

    - vendor: vercel
      kind: docs
      url: "https://vercel.com/docs/projects/environment-variables"
      fetched: "2026-08-08"
      published_or_updated: "2026-06-16"
      freshness: ok
      takeaway: "ADAPT ONLY: dashboard/CLI env → на Timeweb заменить на .env.local / PM2 env_file; НЕ создавать новый Vercel project."

  tg_contract_facts:
    endpoint_base: "https://api.telegram.org/bot<token>/<METHOD>"
    methods:
      sendMessage:
        content_type: "application/json | x-www-form-urlencoded | query"
        required: [chat_id, text]
        text_limit: "1-4096 characters after entities parsing"
        parse_mode: "HTML | MarkdownV2 | Markdown (legacy)"
        notes:
          - "Существующий telegram.ts: JSON POST + parse_mode HTML + disable_web_page_preview — валидно."
          - "link_preview_options — современная замена disable_web_page_preview (legacy ещё работает)."
      sendDocument:
        content_type_upload: "multipart/form-data (обязательно для нового файла)"
        content_type_file_id_or_url: "application/json допустим если document = file_id или HTTP URL"
        required: [chat_id, document]
        caption_limit: "0-1024 characters after entities parsing"
        parse_mode_caption: "HTML | MarkdownV2 | …"
        upload_size_limit_official: "50 MB (bots; may change)"
        url_send_limits:
          photos: "5 MB"
          other_via_url: "20 MB"
          sendDocument_by_url: "currently only .PDF and .ZIP"
        multipart_limits:
          photos: "10 MB"
          other_files: "50 MB"
        download_getFile_official: "20 MB"
        local_bot_api_upload: "2000 MB (не требуется для anketaplan)"
    html_parse_mode:
      pass: "parse_mode=HTML"
      escape_required:
        "<": "&lt;"
        ">": "&gt;"
        "&": "&amp;"
      named_entities_supported: ["&lt;", "&gt;", "&amp;", "&quot;"]
      note: "Только поддерживаемые теги; сырой user input в caption/text — escape обязателен иначе 400 Bad Request."
    anketaplan_implication:
      - "Короткий summary → sendMessage (≤4096)."
      - "PDF / HTML-план вложение → sendDocument multipart; caption ≤1024 (не весь план в caption)."
      - "Если caption не вмещает summary — sendDocument + отдельный sendMessage (2 запроса)."
      - "JSON Content-Type на upload файла → FAIL; нужен FormData/Blob multipart."
      - "Не класть token в клиент; только Route Handler / Server Action на Timeweb."

  idea_seeds:
    - source: "Cursor docs / Agent Skills + agentskills.io"
      pattern: "Progressive disclosure: short description for discovery; body workflow; heavy TG/HTML tables → references/"
      adapt_for_cursor: |
        eg-anketaplan SKILL.md: description с When + Do NOT use (как eg-bot-manager-flow).
        references/telegram-contract.md — лимиты 4096/1024/50MB.
        references/timeweb-deploy.md — PM2 restart checklist.
        Не дублировать полный Bot API в body.

    - source: "Cursor docs / skills boundaries"
      pattern: "disable-model-invocation + explicit /skill; paths glob для route scope"
      adapt_for_cursor: |
        paths: site-next/app/**/anketaplan/**, site-next/lib/notifications/**
        Do NOT: Vercel new project; правка /anketa; bot.py P02; publish secrets.
        Handoff code → factory / engineer; skill = wrapper workflow + cite paths.

    - source: "Telegram Bot API Sending files"
      pattern: "Three send modes: file_id / URL / multipart; JSON except uploads"
      adapt_for_cursor: |
        Расширить telegram.ts: sendTelegramDocument({ buffer|Blob, filename, caption?, parse_mode }).
        FormData.append('document', blob, filename); append chat_id, caption, parse_mode.
        Не ставить Content-Type вручную (boundary).
        Fallback: если !token → { ok:false, reason:'not_configured' } как sendMessage.

    - source: "Next.js forms guide"
      pattern: "Server Action receives FormData; Zod safeParse; typed errors; no secrets client-side"
      adapt_for_cursor: |
        /anketaplan submit → server action/route: validate → build PDF/HTML → sendDocument.
        Client: pending via useActionState; generic error UI (no stack / no token leak).
        Rate-limit / honeypot — operational note в skill references.

    - source: "Next.js env + Vercel env (adapt)"
      pattern: "Server-only secrets; NEXT_PUBLIC_ build-time bake; env per environment"
      adapt_for_cursor: |
        Timeweb: TELEGRAM_* только в site-next/.env.local или PM2 env — НЕ NEXT_PUBLIC_.
        После смены env: next build + pm2 restart (не vercel env pull).
        .env.example ключи без значений; README: cp .env.example .env.local.

  timeweb_adaptation_checklist:
    title: "Vercel README form/env patterns → Timeweb self-host (eg.egoshev.ru)"
    do_not:
      - "Создавать новый Vercel project / vercel env add / vercel --prod"
      - "Класть TELEGRAM_BOT_TOKEN / CHAT_ID под NEXT_PUBLIC_"
      - "Коммитить .env / .env.local"
    map_from_vercel_pattern:
      - vercel_pattern: "Dashboard Environment Variables (Production/Preview/Development)"
        timeweb: "Один prod на VPS: site-next/.env.local или ecosystem.config.js env_file; secrets только на сервере"
      - vercel_pattern: "vercel env pull → .env.local"
        timeweb: "scp/ssh edit .env.local на VPS; локально — свой .env.local из .env.example"
      - vercel_pattern: "Server Actions keep secrets on server"
        timeweb: "То же: Route Handler / Server Action в site-next; PM2 Node process читает process.env"
      - vercel_pattern: "NEXT_PUBLIC_ baked at build"
        timeweb: "После смены публичных vars — полный next build на VPS; server-only TG vars можно менять + pm2 restart без rebuild (если не инлайнятся)"
      - vercel_pattern: "Form progressive enhancement + Zod"
        timeweb: "Сохранить паттерн; nginx client_max_body_size ≥ ожидаемого PDF (типично 10–20m) если upload через сайт"
      - vercel_pattern: "Preview vs Production env split"
        timeweb: "Нет preview env Vercel; staging опционально отдельный PM2 app — иначе один prod chat_id"
    deploy_smoke:
      - "curl /anketaplan 200 на eg.egoshev.ru"
      - "submit test lead → TG message OK"
      - "если PDF: TG document + caption ≤1024"
      - "pm2 logs egoshev — нет token в логах"
      - "nginx 413 → поднять client_max_body_size"

  open_questions:
    - "PDF генерится на сервере (Buffer) или клиент шлёт файл? Влияет на multipart vs URL."
    - "Один chat_id (как contact) или отдельный STRATEGY_TG_* / anketaplan chat?"
    - "Нужен ли sendMessage+sendDocument pair или только document с коротким caption?"
    - "Skill name: eg-anketaplan vs eg-anketaplan-intake — factory resolve."

  sources_count: 8
  freshness_verdict: pass
```

## Quick reference — HTML escape (для caption/text)

Перед `parse_mode=HTML` экранировать пользовательский ввод:

| Символ | Entity |
|--------|--------|
| `&` | `&amp;` |
| `<` | `&lt;` |
| `>` | `&gt;` |

## Связи

| Дальше | Кто |
|--------|-----|
| synthesis / adaptation_plan | `t-800-research-synthesizer` / research-lead |
| prompt_spec SKILL.md | `t-800-prompt-craft` (не этот агент) |
| factory code | `t-800-factory` — только после handoff |

## Запреты (этот прогон)

- Не писать production `telegram.ts` / route code здесь  
- Не рекомендовать Vercel deploy  
- Не копировать Bot API / cookbooks целиком  
- Не звать Context7 / prompt-craft
