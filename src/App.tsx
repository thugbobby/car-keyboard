import react, { useState } from 'react'
import { Input} from 'antd'
import CarNum from './CarKeyboard'


const App = () => {
    const [showCarKeyboard, setShowCarKeyboard] = useState(false);
    const [carNumber, setCarNumber] = useState('');

    return (
        <div style={{ width: '500px' }}>
            <Input readOnly value={carNumber} placeholder={"点击输入车牌号码"} width={"100%"} size={"large"} onClick={()=>{setShowCarKeyboard(true)}}/>
            <CarNum showCarKeyboard={showCarKeyboard} setShowCarKeyboard={setShowCarKeyboard} carNumber={carNumber} setCarNumber={setCarNumber} />
        </div>
    )
}

export default App