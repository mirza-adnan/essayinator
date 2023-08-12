import React from "react";
import styled from "styled-components";
import { ParagraphState } from "./EssayBody";

type EditorProps = {
    onContentChange: (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        id: string
    ) => void;
    para: ParagraphState;
    handleSave: (id: string) => void;
    handleDelete: (id: string) => void;
    handleWordCountChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => void;
};

function Editor({
    para,
    onContentChange,
    handleSave,
    handleDelete,
    handleWordCountChange,
}: EditorProps): JSX.Element {
    return (
        <EditorContainer>
            <div>
                <Label>Target: </Label>
                <input
                    type="number"
                    onChange={(e) => handleWordCountChange(e, para.id)}
                    value={para.targetWordCount || ""}
                    placeholder="Insert your target word count"
                />
            </div>
            <div>
                <span>Word Count:</span> <span>{para.currWordCount}</span>
            </div>
            <TextArea
                value={para.content}
                placeholder="Start typing..."
                onChange={(e) => onContentChange(e, para.id)}></TextArea>
            <ButtonsContainer>
                <button onClick={() => handleSave(para.id)}>Save</button>
                <button onClick={() => handleDelete(para.id)}>Delete</button>
            </ButtonsContainer>
        </EditorContainer>
    );
}

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const Label = styled.label``;

const TextArea = styled.textarea`
    resize: none;
    border: none;
    min-height: 730px;
    font-size: 1rem;
    font-weight: 500;
    padding: 1rem;
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 3px 0px;
    outline: none;
`;

const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;

    & button {
        width: 90px;
        padding: 0.7rem 1rem;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        font-size: 0.9rem;
        font-weight: 600;
    }

    & button:first-child {
        background-color: hsl(161, 69%, 44%);
        color: #eee;
    }

    & button:nth-child(2) {
        background-color: hsl(0, 91%, 86%);
        color: hsl(0, 53%, 57%);
    }
`;

export default Editor;
