import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    DATABASE_URL: str = f"sqlite:///{os.getenv('DATABASE_NAME', 'app.db')}"
    JWT_SECRET: str = os.getenv("JWT_SECRET")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY")


settings = Settings()
