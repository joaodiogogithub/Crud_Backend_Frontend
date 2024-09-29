# app/api/endpoints/pets.py

from fastapi import APIRouter, Depends, HTTPException, Path, status
from sqlalchemy import and_, func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import delete, true, update
from starlette.status import HTTP_404_NOT_FOUND

from app.api import deps
from app.models import Product, User
from app.schemas.filter import PaginationParams
from app.schemas.requests import ProductCreateRequest, ProductUpdateRequest
from app.schemas.responses import ProductResponse

router = APIRouter()


@router.post(
    "/",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
    description="Creates new product. Only for logged users.",
)
async def create_new_product(
    data: ProductCreateRequest,
    session: AsyncSession = Depends(deps.get_session),
    current_user: User = Depends(deps.get_current_user),
) -> Product:
    new_product = Product(
        name=data.name, user_id=current_user.user_id, desc=data.desc, price=data.price
    )

    session.add(new_product)
    await session.commit()

    return new_product


@router.get(
    "/{id}",
    response_model=ProductResponse,
    status_code=status.HTTP_200_OK,
    description="Get product by id for currently logged user.",
)
async def get_product(
    id: int,
    session: AsyncSession = Depends(deps.get_session),
    current_user: User = Depends(deps.get_current_user),
) -> Product:
    product = await session.scalar(
        select(Product).where(
            and_(Product.user_id == current_user.user_id, Product.id == id)
        )
    )

    if product is None:
        raise HTTPException(HTTP_404_NOT_FOUND)

    return product


@router.get(
    "/",
    response_model=list[ProductResponse],
    status_code=status.HTTP_200_OK,
    description="Get list of products for currently logged user.",
)
async def get_all_my_products(
    session: AsyncSession = Depends(deps.get_session),
    current_user: User = Depends(deps.get_current_user),
    # filter: PaginationParams = Depends(),
) -> list[Product]:
    products = await session.scalars(
        select(Product)
        .where(Product.user_id == current_user.user_id)
        # .offset(filter.skip)
        # .limit(filter.take)
        .order_by(Product.name)
    )

    return list(products.all())


@router.get(
    "/count",
    response_model=int,
    status_code=status.HTTP_200_OK,
    description="Count products for currently logged user.",
)
async def count_all_my_products(
    session: AsyncSession = Depends(deps.get_session),
    current_user: User = Depends(deps.get_current_user),
) -> int:
    products = await session.execute(
        select(func.count())
        .select_from(Product)
        .where(Product.user_id == current_user.user_id)
    )

    return products.scalar_one()


@router.put(
    "/{id}",
    response_model=ProductResponse,
    status_code=status.HTTP_200_OK,
    description="Get list of products for currently logged user.",
)
async def update_product(
    product_update: ProductUpdateRequest,
    id: int,
    session: AsyncSession = Depends(deps.get_session),
    current_user: User = Depends(deps.get_current_user),
) -> Product:
    await session.execute(
        update(Product)
        .where(Product.id == id)
        .values(**product_update.dict(exclude_unset=True))
    )

    await session.commit()

    product = await session.scalar(
        select(Product).where(
            and_(Product.user_id == current_user.user_id, Product.id == id)
        )
    )

    if product is None:
        raise HTTPException(HTTP_404_NOT_FOUND)

    return product


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    description="Delete specified user by id for currently logged user.",
)
async def delete_product(
    session: AsyncSession = Depends(deps.get_session),
    current_user: User = Depends(deps.get_current_user),
    id: int = Path(..., title="The ID of the product to update"),
) -> None:
    await session.execute(
        delete(Product).where(
            and_(Product.user_id == current_user.user_id, Product.id == id)
        )
    )

    await session.commit()
