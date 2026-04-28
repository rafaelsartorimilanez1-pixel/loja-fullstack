import React from 'react'
import styled from 'styled-components';

const InputComponentStyle = styled.div`
    display: flex;
    flex-direction: column;
`

const AreaInput = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px
`

const InputArea = (props) => {
    return (
        <InputComponentStyle>
            <label>{props.label}</label>
            <AreaInput 
                type={props.type} 
                name={props.name}
            />
        </InputComponentStyle>
    )
}

export default InputArea