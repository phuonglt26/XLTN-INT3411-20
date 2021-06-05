import React, { Fragment, useRef, useState } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

import recordIcon from 'assets/register/record-icon.svg';
import signalBar from 'assets/register/signal.svg';
import { toast } from 'react-toastify';
import smileIcon from 'assets/register/smile.svg';
import fingerIcon from 'assets/register/finger.svg';
import { BabelLoading, LoopCircleLoading } from 'react-loadingg';
import registerApi from 'api/register'

const RECORD_TIME = 5000; //ms

export default function RecordStage({setRecord, stage, index}) {
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
		toast.info(`Recoding in ${RECORD_TIME / 1000}s left.`)
		timeOut.current = setTimeout(()=>{
			_recordStop();
		}, RECORD_TIME)
		
	}
	const _onStop = (audioData) => {
		if(isCancel.current) return;
    setLoading(true)
		registerApi.checkLength({file: audioData}).then(data => {
			console.log(data.result);
      setLoading(false);
			if(data.result) {
				stage.next();
				setRecord(data.file_id);
			} else {
				toast.warn("Please speak louder and longer")
			}
		}).catch(err => console.log(err));
	}

  const _renderButton = recordState !== RecordState.START ? (
      <span className="button" onClick={_recordStart}>{`Click to record ${index}/4`}</span>
    ) : (
      <span className="button" onClick={_cancelRecord}>Cancel</span>
    )
  const speedRecord = 0.2;
  const speedLoading = 1;
   const textArray = ['Ứng dụng này thật hay, tôi muốn trải nghiệm nó ngay bây giờ!', 'Ứng dụng này có thể giúp tôi xác thực giọng nói một cách chính xác, nó thật tuyệt!', 'Từ giờ trở đi, tôi có thể mở khóa chỉ bằng giọng nói, thật tiện lợi!', 'Tôi muốn đăng kí tài khoản, ứng dụng này có một giao diện thật đẹp, tôi rất thích!',]
   var textRand = textArray[Math.floor(Math.random() * textArray.length)];
	return (
		<Fragment>
			<div className="record-stage">
				<img className="stage-icon" src={recordIcon} alt="record-icon" />
        {recordState === 'start' ?<BabelLoading speed = {speedRecord}/>: <img className="signal-bar" src={signalBar} alt="record-icon" />}
        {recordState === 'start' &&
        <>
        <div className="done-message" style={{marginTop:'100px'}}> 
          <span>Hãy đọc câu dưới đây nếu bạn không biết nói gì &nbsp;</span> 
          <img style={{width:'20px'}} src={smileIcon} alt="record-icon" />
        </div>
        <img style={{width:'40px'}} src={fingerIcon} alt="record-icon" />
        <div className="done-message" style={{fontSize:'20px'}}>{textArray[index-1]}</div> </>}
        {loading ? <LoopCircleLoading speed = {speedLoading}/>: _renderButton}
			</div>
			<AudioReactRecorder state={recordState} onStop={_onStop} />
		</Fragment>
	);
}
