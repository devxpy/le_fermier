# Le Fermier

Le Fermier is an agriculture assistant bot built with GooeyAI for the Mistral AI Worldwide Hackathon 2026.

## What it does
- Supports farmers and agriculture extension agents with concise, practical recommendations.
- Uses web search for location-sensitive data (weather, local prices).
- Uses ISDA soil analysis for fertilizer guidance from coordinates.
- Supports text, voice, and image input.
- Uses Mistral models for generation, embedding, and OCR.

## Stack
- GooeyAI Video Bots API
- Mistral (`mistral_large`, `mistral_embed`, Mistral OCR)
- ElevenLabs TTS
- ISDA Soil API function
- Google Search function

## Repo Structure
- `config/gooey_workflow.json`: Exported GooeyAI workflow definition for Le Fermier.
- `docs/hackathon-submission.md`: Submission checklist and links.
- `README.md`: Project overview and setup.

## Quick Start
1. Clone this repository.
2. Set your API key:
   ```bash
   export GOOEY_API_KEY="your_api_key"
   ```
3. Create or update your bot using:
   ```bash
   curl 'https://api.gooey.ai/v2/video-bots?example_id=krr6eborsl0v' \
     -H "Authorization: bearer $GOOEY_API_KEY" \
     -H 'Content-Type: application/json' \
     -d @config/gooey_workflow.json
   ```

## Hackathon Context
This project is prepared for the **Mistral AI Worldwide Hackathon 2026**.

Track suggestion: **Mistral AI track**

Possible challenges to enter:
- Hugging Face (agent skills)
- Mistral Vibe
- WhiteCircle (if relevant to your city)
- Tilde Research (if relevant to your city)

## Related Work
- GooeyAI PR for Mistral support: https://github.com/GooeyAI/gooey-server/pull/902

## Submission Checklist
- Add project screenshot (16:9)
- Add 2-minute Loom/YouTube demo
- Fill title + description on hackiterate
- Add this repository URL
- Select track + optional challenge

## License
MIT
