import styled from "styled-components"

import visibility_24 from "../assets/images/visibility_24.svg"
import visibility_off_24 from "../assets/images/visibility_off_24.svg"

export function VisibilityIcon( {ToggleIcon, visible} ) {
    
    return (
        <IconContainer onClick={ToggleIcon}>
            {visible ? 
                <img src={visibility_24} alt="visibility icon"/>
                :
                <img src={visibility_off_24} alt="visibility off icon"/>
            }
            {/* <img src={visibility_off_24} alt="visibility off icon"/> */}
        </IconContainer>
    )
}

const IconContainer = styled.div`
    position: absolute;
    right: 8px;   // the right margin edge to the right edge of it's container block is 8px
    top: 15px;
`