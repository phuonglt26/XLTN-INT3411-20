import pickle

from fastapi import FastAPI, Body, File, UploadFile
from pydantic import BaseModel
from model import check_audio_length_removed_silent, calculate_similarity
import os

app = FastAPI()
import shortuuid
import pandas as pd

data_root = "D:\Voice-Verification-System\VoiceVerifiation-data"
db_user = data_root + "/database-user.csv"
model = pickle.load(open('model.sav', 'rb'))


@app.get("/api/ping")
async def root():
    return "pong"


@app.post("/api/register/check-length")
async def check_length(file: UploadFile = File(...)):
    try:
        file_id = shortuuid.uuid()
        path = "{data_root}/{filename}.wav".format(data_root=data_root, filename=file_id)
        f = open(path, "wb")
        f.write(file.file.read())
        result = check_audio_length_removed_silent(path)
        return {
            "success": True,
            "data": {
                "result": result,
                "file_id": file_id
            }
        }
    except Exception as e:
        return {
            "success": False,
            "reason": str(e)
        }


class NewUser(BaseModel):
    name: str
    record1: str
    record2: str
    record3: str
    record4: str


@app.post("/api/register")
async def register(user: NewUser):
    # print(user.record1, user.record2, user.record3, user.record4, user.name)
    try:
        df = pd.read_csv(db_user)
        if user.name in df.name.values:
            return {
                "success": True,
                "data": {
                    "result": False
                }
            }
        user_id = shortuuid.uuid()
        df = df.append({
            "id": user_id,
            "name": user.name,
            "record1": "{filename}.wav".format(filename=user.record1),
            "record2": "{filename}.wav".format(filename=user.record2),
            "record3": "{filename}.wav".format(filename=user.record3),
            "record4": "{filename}.wav".format(filename=user.record4),
        }, ignore_index=True)
        df.to_csv(db_user, index=False)
        return {
            "success": True,
            "data": {
                "result": True,
                "id": user_id
            }
        }
    except Exception as e:
        return {
            "success": False,
            "reason": str(e)
        }


class UserVerificationModel(BaseModel):
    name: str
    record: str


@app.post("/api/verification")
async def verification(user: UserVerificationModel):
    # try:
    df = pd.read_csv(db_user)
    auth_user = df.loc[df['name'] == user.name]
    if len(auth_user) == 0:
        return {
            "success": True,
            "data": {
                "result": False,
                "message": "Name was not exist"
            }
        }
    chunk_test = "{data_root}/{filename}.wav".format(data_root=data_root, filename=user.record)
    chunk1 = "{data_root}/{filename}".format(data_root=data_root, filename=auth_user.record1.values[0])
    chunk2 = "{data_root}/{filename}".format(data_root=data_root, filename=auth_user.record2.values[0])
    chunk3 = "{data_root}/{filename}".format(data_root=data_root, filename=auth_user.record3.values[0])
    chunk4 = "{data_root}/{filename}".format(data_root=data_root, filename=auth_user.record4.values[0])
    cos = calculate_similarity(chunk_test, chunk1, chunk2, chunk3, chunk4)
    predict = model.predict([cos])

    return {
        "success": True,
        "data": {
            "result": bool(predict[0] == 1),
        }
    }


@app.get("/api/get-accounts")
async def get_accounts():
    df = pd.read_csv(db_user)
    df = df[['id', 'name']]
    accounts_list = df.to_dict('records')
    return {
        "success": True,
        "data": {
            "result": accounts_list,
        }
    }
