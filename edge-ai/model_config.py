import os


MODEL_PATH = os.getenv(
    "MODEL_PATH",
    "./models/qwen3_1_7b"
)

MODEL_NAME = "Qwen3-1.7B"
RUNTIME = "GenieX QAIRT"
PRECISION = "W4A16"
TARGET_DEVICE = "Snapdragon X Elite"
USE_NPU = True