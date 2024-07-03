import React,{useState,useEffect} from 'react'
// import { Editor, EditorState, convertFromRaw } from 'draft-js';

const Inbox = () => {

  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // useEffect(()=>{
  //   const content = JSON.parse(localStorage.getItem('content'))
  // const contentState = convertFromRaw(content);
  // setEditorState(contentState)
  // },[])
  


  return (
    <div className=" bg-white h-full">
    
    {/* <Editor
          editorState={editorState}
          toolbarHidden
          readOnly
          wrapperClassName="w-full"
          editorClassName="px-4 py-2 min-h-[200px]"
        /> */}
    </div>
  )
}

export default Inbox
