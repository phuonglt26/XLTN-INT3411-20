import React, { useState } from 'react';

import RecordStage from './record-stage/record-stage';
import InputStage from './input-stage/input-stage';
import DoneStage from './done-stage/done-stage';

import RegisterApi from 'api/register'

const RECORD_STAGE1 = "record1";
const RECORD_STAGE2 = "record2";
const RECORD_STAGE3 = "record3";
const RECORD_STAGE4 = "record4";
const INPUT_NAME_STAGE = "input-name";
const DONE_STAGE = "done";
const stageName = [RECORD_STAGE1, RECORD_STAGE2, RECORD_STAGE3, RECORD_STAGE4, INPUT_NAME_STAGE, DONE_STAGE];

export default function Register() {
	const [name, setName] = useState("")
	const [record1, setRecord1] = useState(null);
  const [record2, setRecord2] = useState(null);
  const [record3, setRecord3] = useState(null);
  const [record4, setRecord4] = useState(null);
	const [stage, setStage] = useState(stageName[0]);

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

	// useEffect(()=> {
	// 	console.log("info", {record, name});
	// }, [record, name])
	

	function _onSubmit() {
		return RegisterApi.post({record1, record2, record3, record4, name})
	}

  // _nextStage()
	function renderStage_() {
		switch (stage) {
		case RECORD_STAGE1:
			return <RecordStage record={record1} setRecord={setRecord1} stage={_stage} index='1'/>
    case RECORD_STAGE2:
			return <RecordStage record={record2} setRecord={setRecord2} stage={_stage} index='2'/>
    case RECORD_STAGE3:
			return <RecordStage record={record3} setRecord={setRecord3} stage={_stage} index='3'/>
    case RECORD_STAGE4:
			return <RecordStage record={record4} setRecord={setRecord4} stage={_stage} index='4'/>      
		case INPUT_NAME_STAGE:
			return <InputStage name={name} setName={setName} submit={_onSubmit} stage={_stage}/>
		case DONE_STAGE:
			return <DoneStage />
		default:
			return null;
		}
	}
	return (
		<div className="register-page default-background no-select">
			{renderStage_()}
		</div>
	);
}


