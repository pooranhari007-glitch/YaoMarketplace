from fastapi import APIRouter, Depends

from app.api.deps import get_current_admin
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_service import get_chat_reply

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def public_chat(payload: ChatRequest):
    messages = [{"role": m.role, "content": m.content} for m in payload.messages]
    reply = get_chat_reply(messages, context=payload.context)
    return ChatResponse(reply=reply)


@router.post("/admin", response_model=ChatResponse)
def admin_chat(payload: ChatRequest, _admin=Depends(get_current_admin)):
    messages = [{"role": m.role, "content": m.content} for m in payload.messages]
    reply = get_chat_reply(messages, context="admin")
    return ChatResponse(reply=reply)
