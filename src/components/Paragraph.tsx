import React from "react";
import Text from "./Text";
import Editor from "./Editor";
import styled from "styled-components";
import { ParagraphState } from "./EssayBody";

type ParagraphProps = {
    para: ParagraphState;
    onContentChange: (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        id: string
    ) => void;
    handleSave: (id: string) => void;
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
    handleWordCountChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => void;
};

function Paragraph({
    para,
    onContentChange,
    handleSave,
    handleDelete,
    handleEdit,
    handleWordCountChange,
}: ParagraphProps): JSX.Element {
    return (
        <ParagraphContainer isEditing={para.isEditing}>
            {para.isEditing ? (
                <Editor
                    para={para}
                    onContentChange={onContentChange}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    handleWordCountChange={handleWordCountChange}
                />
            ) : (
                <Text
                    content={para.content}
                    handleEdit={handleEdit}
                    id={para.id}
                />
            )}
        </ParagraphContainer>
    );
}

const ParagraphContainer = styled.div<{ isEditing: boolean }>`
    padding: 1.5rem;
    transition: background-color 0.2s ease-in;
    position: relative;
    margin: 0.2rem 0;
    background-color: ${(props) => (props.isEditing ? "#eceff1" : "#fff")};

    &:hover {
        background-color: #eceff1;
    }
`;

export default Paragraph;
