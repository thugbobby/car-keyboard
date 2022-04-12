import React, { useState } from "react";
import { Button, Modal, Row, Col, message } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import './CarKeyboard.scss';


const CarKeyboard = (props: {showCarKeyboard: any, setShowCarKeyboard: any, carNumber: any, setCarNumber: any}) => {
    const [isEnergy, setIsEnergy] = useState(false); // 是否是新能源车牌
    const inputContent = {
        provinces:["京","沪","粤","津","冀","晋","蒙","辽","吉","黑","苏","浙","皖","闽","赣","鲁","豫","鄂","湘","桂","琼","渝","川","贵","云","藏","甘","陕","青","宁","新","使"],
        keyNums: ["1","2","3","4","5","6","7","8","9","0"],
        keyLetter1: ["Q","W","E","R","T","Y","U","I","O","P"],
        keyLetter2: ["A","S","D","F","G","H","J","K","L"],
        keyLetter3: ["Z","X","C","V","B","N","M"],
        keyLetter4: ["港","澳","学","警","领"]
    };

    // 确认按钮
    const confirmButton = () => {
        if(!isEnergy && props.carNumber.length == 7){
            props.setShowCarKeyboard(false);
        }else if(props.carNumber.length == 8){
            props.setShowCarKeyboard(false);
        } else{
            message.info("请输入正确的车牌号码")
        }
    };

    // 删除按钮
    const deleteButton = () => {
        let number = JSON.parse(JSON.stringify(props.carNumber))
        let newCarNumber = number.substr(0,number.length -1)
        props.setCarNumber(newCarNumber)
    };

    // 省份选择
    const provinceButton = (value: any) => {
        props.setCarNumber(value)
    };

    // 号码按钮
    const keyButton =(value: any) => {
        let newNumber = JSON.parse(JSON.stringify(props.carNumber))
        props.setCarNumber(newNumber + value)
    };

    // 根据车牌规则禁用部分按钮
    const disableButton = (value: any) => {
        let regexStr = /^[港澳学警领]$/;
        if(props.carNumber.length == 1){
            let regexNum = /^\d$/
            if(regexNum.test(value)){
                return true;
            }
        }
        if(isEnergy && props.carNumber.length == 2){
            if(value != 'D' && value !='F'){
                return true
            }
            else {
                return false
            }
        }
        if(isEnergy && props.carNumber.length >= 4){
            let regexNum = /^\d$/
            if(!regexNum.test(value)){
                return true;
            }
        }
        if(props.carNumber.length != 6 && regexStr.test(value)){
            return true;
        }else if (regexStr.test(value)){
            return false;
        }
        if(!isEnergy && props.carNumber.length == 7){
            return true;
        }else if(props.carNumber.length == 8){
            return true;
        }
    };

    return (
        <Modal
            title={<h3 style={{fontSize: 32, textAlign: "center",marginTop:"2px"}}>车牌信息</h3>}
            visible={props.showCarKeyboard}
            onCancel={()=>{props.setShowCarKeyboard(false); props.setCarNumber('')}}
            centered
            width={850}
            footer={null}
            maskClosable={false}
            destroyOnClose={true}
        >
            <div className={"car-input"}>
                <Row style={{marginLeft: "12px"}}>
                    <Col><h3 style={{fontSize: "32px", marginTop: "4px", marginRight:"18px"}}>车牌号码:</h3></Col>
                    <Col span={3}><Button style={{borderRadius: "8px"}}>{props.carNumber && props.carNumber[0]?props.carNumber[0]: ' '}</Button></Col>
                    <Col span={3}><Button style={{borderRadius: "8px"}}>{props.carNumber && props.carNumber[1]?props.carNumber[1]: ' '}</Button></Col>
                    <Col span={3}><Button style={{borderRadius: "8px"}}>{props.carNumber && props.carNumber[2]?props.carNumber[2]: ' '}</Button></Col>
                    <Col span={3}><Button style={{borderRadius: "8px"}}>{props.carNumber && props.carNumber[3]?props.carNumber[3]: ' '}</Button></Col>
                    <Col span={3}><Button style={{borderRadius: "8px"}}>{props.carNumber && props.carNumber[4]?props.carNumber[4]: ' '}</Button></Col>
                    <Col span={3}><Button style={{borderRadius: "8px"}}>{props.carNumber && props.carNumber[5]?props.carNumber[5]: ' '}</Button></Col>
                    <Col span={3}><Button style={{borderRadius: "8px"}}>{props.carNumber && props.carNumber[6]?props.carNumber[6]: ' '}</Button></Col>
                    <Col span={3} onClick={() =>{setIsEnergy(!isEnergy)}}>
                        {isEnergy?
                            <Button style={{borderRadius: "8px"}}>{props.carNumber && props.carNumber[7]?props.carNumber[7]: ' '}</Button>
                            :
                            <div className={"car-energy"}>
                                <Button  style={{borderRadius: "8px", color: "#4facfe"}} icon={<PlusOutlined style={{fontSize: 40}} />}></Button>
                            </div>
                        }
                    </Col>
                </Row>
            </div>

            <div className={"car"} style={{textAlign: "center", marginTop: "1.6rem"}}>
                {props.carNumber.length == 0?
                    <Row gutter={[16, 16]}>
                        {inputContent.provinces.map((value: any, index: any) => (
                            <Col key={"p"+index} span={3}><Button onClick={()=>{provinceButton(value)}} style={{borderRadius: "8px"}}>{value}</Button></Col>
                        ))}
                    </Row>
                :
                    <div>
                        <Row gutter={[14, 16]} style={{marginLeft: "6px"}}>
                            {inputContent.keyNums.map((value: any, index: any) => (
                                <Col key={"n"+index} span={2.4}><Button disabled={disableButton(value)} onClick={()=>{keyButton(value)}} style={{borderRadius: "8px"}} >{value}</Button></Col>
                            ))}
                            {inputContent.keyLetter1.map((value: any, index: any) => (
                                <Col key={"l1"+index} span={2.4}><Button disabled={disableButton(value)} onClick={()=>{keyButton(value)}} style={{borderRadius: "8px"}} >{value}</Button></Col>
                            ))}
                        </Row>
                        <Row gutter={[14, 16]} style={{marginLeft: "2.4rem", marginTop: "16px"}}>
                            {inputContent.keyLetter2.map((value: any, index: any) => (
                                <Col key={"l2"+index} span={2.4}><Button disabled={disableButton(value)} onClick={()=>{keyButton(value)}} style={{borderRadius: "8px"}}>{value}</Button></Col>
                            ))}
                        </Row>
                        <Row gutter={[14, 16]} style={{marginLeft: "7rem", marginTop: "16px"}}>
                            {inputContent.keyLetter3.map((value: any, index: any) => (
                                <Col key={"l3"+index} span={2.4}><Button disabled={disableButton(value)} onClick={()=>{keyButton(value)}} style={{borderRadius: "8px"}} >{value}</Button></Col>
                            ))}
                        </Row>
                        <Row gutter={[16, 16]} style={{marginLeft: "6px", marginTop: "16px"}}>
                            {inputContent.keyLetter4.map((value: any, index: any) => (
                                <Col key={"l4"+index} span={2.4}><Button disabled={disableButton(value)} onClick={()=>{keyButton(value)}} style={{borderRadius: "8px", width: "80px"}} >{value}</Button></Col>
                            ))}
                            <Col onClick={confirmButton} span={2.4}><Button type={"primary"} style={{borderRadius: "8px", width: "120px"}}>确认</Button></Col>
                            <Col onClick={deleteButton} span={2.4}><Button danger style={{borderRadius: "8px", width: "120px"}}>删除</Button></Col>
                        </Row>
                    </div>
                }
            </div>
        </Modal>
    )
};

export default CarKeyboard;
