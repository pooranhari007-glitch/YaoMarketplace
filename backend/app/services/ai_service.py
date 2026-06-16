from openai import OpenAI

from app.config import settings

SYSTEM_PROMPT = """You are a helpful assistant for a direct booking property website.
Answer questions about stays, events, policies, and the booking process.
Be concise, friendly, and accurate. If unsure, suggest contacting the host."""

FALLBACK_REPLY = (
    "Thanks for your message! Our AI assistant will be available soon. "
    "Please use the contact form or proceed to book directly."
)


def _openai_configured() -> bool:
    key = (settings.openai_api_key or "").strip()
    if not key or "..." in key or len(key) < 20:
        return False
    return True


def get_chat_reply(messages: list[dict], context: str = "public") -> str:
    if not _openai_configured():
        return FALLBACK_REPLY
    try:
        client = OpenAI(api_key=settings.openai_api_key)
        system = SYSTEM_PROMPT
        if context == "admin":
            system += " You are helping the property owner manage their listing and bookings."
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": system}, *messages],
            max_tokens=500,
        )
        return response.choices[0].message.content or FALLBACK_REPLY
    except Exception:
        return FALLBACK_REPLY
