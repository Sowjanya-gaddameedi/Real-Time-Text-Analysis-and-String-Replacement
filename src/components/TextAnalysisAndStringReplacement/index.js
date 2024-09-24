import {useState,useEffect} from "react"
import './index.css'


const TextAnalysisAndStringReplacement = () => {
    const [textInput,changeTextInput] = useState("")
    const [searchStringInput,changeSearchStringInput] = useState("")
    const [replaceStringInput,changeReplaceStringInput] = useState("")
    const [uniqueWordLength,setUniqueWordLength] = useState(0)
    const [uniqueCharacterLength,setUniqueCharacterLength] = useState(0)
    const [replacedString,setReplacedString] = useState("")
    const onChangeTextInput = event =>{
        changeTextInput(event.target.value)
    }

    const onChangeSearchStringInput = event =>{
        changeSearchStringInput(event.target.value)
    }
    
    const onChangeReplaceStringInput = event =>{
        changeReplaceStringInput(event.target.value)
    }

    useEffect(()=>{
        //Finding Unique Words and Characters except puncutation marks
        let textAreaInput = textInput.toLowerCase()
        textAreaInput = textAreaInput.replaceAll("_"," ") 
        const arrayOfUniqueWords = textAreaInput.match(/\b\w+\b/gi)
        const uniqueSetOfWords = new Set(arrayOfUniqueWords)
        const uniqueWordLengthExceptPuncuations = uniqueSetOfWords.size 
        setUniqueWordLength(uniqueWordLengthExceptPuncuations)

        const charactersExceptPuntuationMarks = textAreaInput.match(/[a-zA-Z0-9]/g)
        const setOfCharactersExceptPuntuationMarks = new Set(charactersExceptPuntuationMarks)
        const LengthOfUniqueCharacters = setOfCharactersExceptPuntuationMarks.size
        setUniqueCharacterLength(LengthOfUniqueCharacters)
    },[textInput])

    const replaceWordsInSentence = event => {
        event.preventDefault()
        const updatedString = textInput.replaceAll(searchStringInput,`<span>${replaceStringInput}</span>`)
        setReplacedString(updatedString)
    }
    

    return(
        <div className='main-container'>
            <form onSubmit={replaceWordsInSentence} className="input-area">
                <textarea rows={10} cols={50} value={textInput} onChange={onChangeTextInput} className="text-area" placeholder='Enter Text'></textarea>
                <label className="label" htmlFor="replace">Replace</label>
                <input type="text" placeholder="Enter string to search" value={searchStringInput} onChange={onChangeSearchStringInput} className="input" id='replace' />
                <label className="label" htmlFor="with">With</label>
                <input type="text" placeholder="Enter string to replace" value={replaceStringInput} onChange={onChangeReplaceStringInput} className="input" id='with' />
                <button type='submit' className="button">Replace All</button>
            </form>
            <div className="output-area">
                <p>UNIQUE WORD COUNT: <span className="count-value">{uniqueWordLength}</span></p>
                <p>UNIQUE CHARACTER COUNT: <span className="count-value">{uniqueCharacterLength}</span></p>
                <p className="replace">REPLACED STRING :</p>
                <p dangerouslySetInnerHTML={{__html: replacedString}} className="replaced" />
            </div>
        </div>
    )
}
export default TextAnalysisAndStringReplacement