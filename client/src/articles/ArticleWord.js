import { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"

export function ArticleWord({ word, onWordClicked, setWordExistError }) {
    const {vocabularies} = useContext(UserContext)

    function handleClick(e) {
        setWordExistError(null)
        onWordClicked(e.target.innerHTML)
    }    

    const word_clean = word.toLowerCase().replace(/[^0-9a-zā-ūʻ]+/g, "")       // replace all that's not [a-zā-ūʻ]
    console.log(word_clean==="")
    console.log(word_clean)
    const match = vocabularies?.filter((v) => v.hawaiian_clean.toLowerCase() === word_clean)[0]
    
    
    
    let styling = "rgba(112, 161, 255, 0.5)"
    if (match) {
        // & word_clean!==""
        switch(match.status) {
            // studying
            case 1:
                styling = "rgba(255, 221, 89, 0.5)"
                break;
            // known
            case 2:
                styling = ""
                break;
            // ignored
            case 3:
                styling = ""
                break;
            default: 
                styling = "rgba(112, 161, 255, 0.5)"
        }
    } 
    if (word_clean === "") {
        styling = ""
    }

    return (
        <WordContainer onClick={handleClick} style={{backgroundColor: styling}}>
            {word}
        </WordContainer>
    )
}

const WordContainer = styled.div`
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 8px;
    padding: 0px 4px;
    display: inline-block;
    vertical-align: top;
    font-size: 20px;
    &:hover {
        color: #fff;
        background-color: #bdc3c7;
        cursor: pointer;
    }
`
