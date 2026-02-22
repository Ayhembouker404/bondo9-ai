from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib  # or import torch/tensorflow depending on your model
import numpy as np

app = FastAPI(title="AI Person Classifier")

# Load your model (ensure the file path is correct)
model = joblib.load("assets/model.pkl")

class PersonData(BaseModel):
    # Example of how to define features. Replace with your actual names.
    features: list[float] = Field(..., min_items=28, max_items=28)

@app.post("/predict")
async def predict(data: PersonData):
    # Convert list to numpy array for the model
    input_array = np.array(data.features).reshape(1, -1)
    
    prediction = model.predict(input_array)
    probability = model.predict_proba(input_array).max()
    
    # Mock response for now
    return {
        "class_id": 5, 
        "class_name": "Class Five",
        "confidence": 0.92
    }
