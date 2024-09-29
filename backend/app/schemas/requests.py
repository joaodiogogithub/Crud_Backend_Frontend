from pydantic import BaseModel, EmailStr


class BaseRequest(BaseModel):
    # may define additional fields or config shared across requests
    pass


class RefreshTokenRequest(BaseRequest):
    refresh_token: str


class UserUpdatePasswordRequest(BaseRequest):
    password: str


class UserCreateRequest(BaseRequest):
    email: EmailStr
    password: str


class ProductCreateRequest(BaseRequest):
    name: str
    desc: str
    price: float


class ProductUpdateRequest(BaseRequest):
    name: str
    desc: str
    price: float
