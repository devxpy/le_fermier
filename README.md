# Le Fermier

Le Fermier is an AI agriculture assistant that helps French Farmers, built for the **Mistral AI Worldwide Hackathon 2026**.  
It helps farmers and extension agents get fast, practical recommendations in French, with support for voice, document-grounded answers, and location-aware soil guidance.

<img width="1677" height="995" alt="image" src="https://github.com/user-attachments/assets/0dce2a90-744c-48d5-9d76-070000a1df0e" />

## Demo Links

- [Web demo](https://gooey.ai/chat/le-fermier-QJ2/)
- [WhatsApp demo](https://wa.me/+15102293323?text=%2Fextension+43285) (Scan QR below)
  <img width="512" height="512" alt="image" src="https://github.com/user-attachments/assets/3d8c90d5-e881-44f5-974a-1f125983e864" />

## Problem

Farmers often need immediate, local, and crop-specific advice, but reliable recommendations are spread across long technical documents and hard-to-access data sources.

Le Fermier converts this into short, actionable answers at a simple reading level.

## Core Capabilities

- Answers farming and crop-health questions in French with concise guidance.
- Uses **RAG over French agricultural PDFs** to ground advice in practical documentation.
- Accepts voice notes and returns voice responses.
- Uses geospatial soil insights to suggest fertilizer strategies.
- Uses web data for local weather and price context when needed.
- Persists key user context (location, crops, profile fields) with memory for more personalized follow-ups.

## Architecture

### Architecture Slide

![Le Fermier Architecture Slide](https://v3b.fal.media/files/b/0a9079c0/kpabFrLqDT_yuysWT7FRt_mEjkcRmF.png)

### 1) Knowledge Ingestion (French docs -> searchable knowledge)

1. Source French agricultural PDFs.
2. Run **Mistral OCR** to extract document content.
3. Preserve structured data, including **tables as Markdown**, so agronomic recommendations and dosage grids remain machine-readable.
4. Chunk the extracted text.
5. Generate embeddings with **Mistral Embed**.
6. Store vectors + metadata in **Vespa vector DB** for semantic retrieval.

### 2) Retrieval + Reasoning at Runtime

1. User sends text, voice, or image query.
2. Read user profile memory using `GOOEY_MEMORY_READ_VALUE` (for example: location, crop type, prior constraints).
3. Query is rewritten for retrieval quality (standalone reformulation).
4. Retrieve relevant chunks from Vespa using Mistral embeddings.
5. Pull tool outputs when needed:

- **ISDA Soil API**: geospatial soil properties from user latitude/longitude (especially useful for fertilizer and soil-health decisions).
- **Google Search API/Tool**: local weather, market prices, and region-specific agricultural context.

6. Compose grounded context and answer with **Mistral Large**.
7. Write back durable profile facts with `GOOEY_MEMORY_WRITE_VALUE` (for example updated location/crop preferences).
8. Return response with references and suggested follow-up questions.

### 3) Voice I/O

- **ASR**: **Voxtral Mini** transcribes farmer voice notes to text.
- **TTS**: **ElevenLabs French voice** synthesizes clear spoken responses.

## Tech Stack

- Mistral OCR
- Mistral Embed
- Mistral Large (LLM)
- Vespa (vector database)
- Voxtral Mini (ASR)
- ElevenLabs (French TTS)
- ISDA Soil API function
- Google Search function/tool
- GooeyAI Copilot API
- Memory tools

## Repository Structure

- `config/gooey_workflow.json`: Exported GooeyAI workflow definition for Le Fermier - https://gooey.ai/copilot/le-fermier-krr6eborsl0v/
- `docs/hackathon-submission.md`: Submission checklist and event links.
- `supporting/isda-soil-function.js`: ISDA soil property fetch + condensation helper.
- `supporting/google-search-function.js`: Serper-powered Google search helper.
- `README.md`: Architecture, judging fit, and usage.

## Quick Start

1. Clone this repository.
2. Set your API key:
   ```bash
   export GOOEY_API_KEY="your_api_key"
   ```
3. Create or update your bot definition:
   ```bash
   curl 'https://api.gooey.ai/v2/video-bots?example_id=krr6eborsl0v' \
     -H "Authorization: bearer $GOOEY_API_KEY" \
     -H 'Content-Type: application/json' \
     -d @config/gooey_workflow.json
   ```

## Related Work

- GooeyAI PR for Mistral support: https://github.com/GooeyAI/gooey-server/pull/902

## Supporting Code: ISDA Soil API Function

The repository includes a helper for soil-property lookup and normalization:

- File: `supporting/isda-soil-function.js`
- Inputs: `lat`, `long`
- Output: condensed values for `nitrogen_total`, `phosphorous_extractable`, `potassium_extractable`, `ph`, and `texture_class`

## Supporting Code: Google Search Function

The repository includes a helper for runtime web retrieval through Serper:

- File: `supporting/google-search-function.js`
- Input: `search_query`
- Output: `search_results` JSON payload

## Memory: How It Works and Why It Helps

Le Fermier uses memory primitives to persist critical user profile context:

- `GOOEY_MEMORY_READ_VALUE`: reads saved user facts at the start of a turn.
- `GOOEY_MEMORY_WRITE_VALUE`: writes newly confirmed facts at the end of a turn.

Typical memory keys:

- `location`
- `crop`
- `gender`
- `preferred_language`

Benefits:

- Fewer repetitive clarification questions.
- Faster path to actionable advice.
- Better continuity across sessions and follow-up questions.
- Stronger demo story: “the assistant remembers me and adapts recommendations.”

## License

MIT
