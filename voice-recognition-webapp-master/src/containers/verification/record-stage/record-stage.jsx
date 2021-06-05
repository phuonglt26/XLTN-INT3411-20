import React, { Fragment, useRef, useState } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

import recordIcon from 'assets/register/record-icon.svg';
import signalBar from 'assets/register/signal.svg';
import fingerIcon from 'assets/register/finger.svg';
import { toast } from 'react-toastify';
import { BabelLoading } from 'react-loadingg';
import smileIcon from 'assets/register/smile.svg'
import registerApi from 'api/register'

const RECORD_TIME = 5000; //ms

export default function RecordStage({setRecord, stage}) {
	const [recordState, setRecordState] = useState(null);
  const [loading, setLoading] = useState(false);
	const timeOut = useRef(null);
  const isCancel = useRef(false);

  const _cancelRecord = () => {
    isCancel.current = true;
    _recordStop();
  }

	const _recordStop = () => {
		setRecordState(RecordState.STOP);
		clearTimeout(timeOut.current);
	}
	const _recordStart = () => {
    isCancel.current = false;
		setRecordState(RecordState.START);
		toast.info(`Waiting for record in ${RECORD_TIME / 1000}s.`)
		timeOut.current = setTimeout(()=>{
			_recordStop();
		}, RECORD_TIME)
	}
	const _onStop = (audioData) => {
    if(isCancel.current) return;
      setLoading(true)
      registerApi.checkLength({file: audioData}).then(data => {
        setLoading(false);
        if(data.result) {
          setRecord(data.file_id);
          stage.next();
        } else {
          toast.warn("Please speak louder and longer")
        }
		}).catch(err => console.log(err));
	}
  const text = ['Tôi đã đăng kí tài khoản, tôi muốn thử nghiệm tính năng xác thực giọng nói.']
  const speedRecord = 0.2;
	return (
		<Fragment>
			<div className="record-stage">
				<img className="stage-icon" src={recordIcon} alt="record-icon" />
        {recordState === 'start' ? <div className="signal-bar"><BabelLoading speed = {speedRecord}/></div>: <img className="signal-bar" src={signalBar} alt="record-icon" />}
        {recordState === 'start' &&
        <>
        <div className="done-message" style={{marginTop:'100px'}}> 
          <span>Hãy đọc câu dưới đây nếu bạn không biết nói gì &nbsp;</span> 
          <img style={{width:'20px'}} src={smileIcon} alt="record-icon" />
        </div>
        <img style={{width:'40px'}} src={fingerIcon} alt="record-icon" />
        <div className="done-message" style={{fontSize:'20px'}}>{text[0]}</div> </>}
				{recordState !== RecordState.START ? (
					<span className="button" onClick={_recordStart}>Click to record</span>
				) : (
					<span className="button" onClick={_cancelRecord}>Cancel</span>
				)}
			</div>
			<AudioReactRecorder state={recordState} onStop={_onStop} />
		</Fragment>
	);
}
