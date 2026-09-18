import platform
import importlib.util
import os


def is_arm64_machine():
    """Check whether the current machine uses ARM64."""
    return platform.machine().lower() in ("arm64", "aarch64")


def is_geniex_installed():
    """Check whether the GenieX Python package is available."""
    return importlib.util.find_spec("geniex") is not None


def get_model_path():
    """Return the configured local model path."""
    return os.getenv(
        "MODEL_PATH",
        "./models/qwen3_1_7b"
    )

def get_engine_status():
    arm64 = is_arm64_machine()
    geniex = is_geniex_installed()
    model_path = get_model_path()

    if arm64 and geniex:
        return {
            "available": True,
            "runtime": "GenieX QAIRT",
            "model": "Qwen3-1.7B",
            "precision": "W4A16",
            "device": "Snapdragon NPU",
            "architecture": "ARM64",
            "mode": "Local Snapdragon NPU",
            "model_path": model_path
        }

    return {
        "available": False,
        "runtime": "GenieX QAIRT",
        "model": "Qwen3-1.7B",
        "precision": "W4A16",
        "device": "Snapdragon NPU",
        "architecture": platform.machine(),
        "geniex_installed": geniex,
        "model_path": model_path,
        "mode": "Gemini fallback",
        "reason": (
            "Snapdragon GenieX runtime is not available on this machine"
        )
    }