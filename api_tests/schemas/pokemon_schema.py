pokemon_schema = {
    "type": "object",
    "required": ["id", "name", "base_experience", "height", "weight"],
    "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string"},
        "base_experience": {"type": "integer"},
        "height": {"type": "integer"},
        "weight": {"type": "integer"},
        "abilities": {"type": "array"}
    },
    "additionalProperties": True  # allow extra fields
}
