import pickle
import random
import numpy as np
import librosa
from audio import read_mfcc
from batcher import sample_from_mfcc
from constants import SAMPLE_RATE, NUM_FRAMES
from conv_models import DeepSpeakerModel
from test import batch_cosine_similarity

np.random.seed(123)
random.seed(123)
model = DeepSpeakerModel()
model.m.load_weights('ResCNN_triplet_training_checkpoint_265.h5', by_name=True)

from pydub import AudioSegment
from pydub.silence import detect_nonsilent

def to_wav(chunks):
    for chunk, name in chunks:
        out_file = name
        chunk.export(out_file, format="wav")

# Calculate the similarity between 'chunk_test' and 4 chunks of the same person.
# Use pretrain to extract mfcc and convert to embedding vector
# Speaker's embedding = average vector of 4 chunks
# similarity = cosine_similarity(chunk_test, speaker_embedding)

def calculate_similarity(record_test, record1, record2, record3, record4):
    mfcc_test = sample_from_mfcc(read_mfcc(record_test, SAMPLE_RATE), NUM_FRAMES)
    predict_test = model.m.predict(np.expand_dims(mfcc_test, axis=0))
    mfcc_1 = sample_from_mfcc(read_mfcc(record1, SAMPLE_RATE), NUM_FRAMES)
    predict_1 = model.m.predict(np.expand_dims(mfcc_1, axis=0))
    mfcc_2 = sample_from_mfcc(read_mfcc(record2, SAMPLE_RATE), NUM_FRAMES)
    predict_2 = model.m.predict(np.expand_dims(mfcc_2, axis=0))
    mfcc_3 = sample_from_mfcc(read_mfcc(record3, SAMPLE_RATE), NUM_FRAMES)
    predict_3 = model.m.predict(np.expand_dims(mfcc_3, axis=0))
    mfcc_4 = sample_from_mfcc(read_mfcc(record4, SAMPLE_RATE), NUM_FRAMES)
    predict_4 = model.m.predict(np.expand_dims(mfcc_4, axis=0))
    predict = (predict_1 + predict_2 + predict_3 + predict_4) / 4

    return batch_cosine_similarity(predict_test, predict)

def check_audio_length(file_path):
    audio = AudioSegment.from_file(file_path)
    if (audio.duration_seconds > 2) and (audio.duration_seconds < 300):
        return True
    return False

def check_audio_length_removed_silent(file_path):
    audio = AudioSegment.from_file(file_path)
    nonsilent_ranges = detect_nonsilent(audio, min_silence_len=300, silence_thresh=-24)
    length = 0.0
    for start, end in nonsilent_ranges:
        length+= end - start + 1
    length = length/1000
    if (length > 1) and (length < 300):
        return True
    return False





def predict(model, input):
    pred = model.predict(input)
    return pred