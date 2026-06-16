from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.models.content import ContentPage, PageSlug
from app.schemas.content import ContentPageResponse, ContentPageUpdate

router = APIRouter(prefix="/content", tags=["content"])


@router.get("", response_model=list[ContentPageResponse])
def list_pages(db: Session = Depends(get_db)):
    return db.query(ContentPage).order_by(ContentPage.slug).all()


@router.get("/{slug}", response_model=ContentPageResponse)
def get_page(slug: PageSlug, db: Session = Depends(get_db)):
    page = db.query(ContentPage).filter(ContentPage.slug == slug).first()
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    return page


@router.patch("/{slug}", response_model=ContentPageResponse)
def update_page(
    slug: PageSlug,
    payload: ContentPageUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    page = db.query(ContentPage).filter(ContentPage.slug == slug).first()
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(page, field, value)
    db.commit()
    db.refresh(page)
    return page
