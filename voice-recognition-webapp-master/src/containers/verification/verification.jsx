import React, { useEffect, useState } from 'react';

import RecordStage from './record-stage/record-stage';
import InputStage from './input-stage/input-stage';
import DoneStage from './done-stage/done-stage';

import VerificationApi from 'api/verification'
import { toast } from 'react-toastify';

const INPUT_NAME_STAGE = "input-name";
const RECORD_STAGE = "record";
const DONE_STAGE = "done";
const stageName = [INPUT_NAME_STAGE, RECORD_STAGE, DONE_STAGE];

export default function Verification() {
  const [name, setName] = useState("")
	const [record, setRecord] = useState(null);
	const [stage, setStage] = useState(stageName[0]);

  const [finalState, setFinalState] = useState(null);
	const _stage = {
		next: function() {
			const idStage = stageName.indexOf(stage);
			if(idStage === stageName.length - 1) return;
			setStage(stageName[(idStage+1) % stageName.length]);
		},
		prev: function() {
			const idStage = stageName.indexOf(stage);
			if(idStage === 0) return;
			setStage(stageName[(idStage-1) % stageName.length]);
		},
	};

	
  	const renderStage_ = () => {
		switch (stage) {
		case INPUT_NAME_STAGE:
			return <InputStage name={name} setName={setName} stage={_stage}/>
		case RECORD_STAGE:
			return <RecordStage record={record} setRecord={setRecord} stage={_stage}/>
		case DONE_STAGE:
			return <DoneStage finalState={finalState}/>
		default:
			return null;
		}
	}
	const _submit = () => {
		return VerificationApi.post({record, name}).then(data => {
      setFinalState(data.result)
      if(data.message) {
        toast.warn(data.message);
      }
		}).catch(err => {
			toast.error(err);
		})
	}

	// useEffect(()=> {
	// 	console.log("info", {record, name});
	// }, [record, name])
	
	useEffect(() => {
		if(stage === DONE_STAGE) {
			_submit()
		}
	//eslint-disable-next-line  react-hooks/exhaustive-deps
	}, [stage])

	

  return (
    <div className="verification-page default-background">
        	{renderStage_()}
    </div>
  );
}



