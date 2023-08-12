import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Paragraph from "./Paragraph";
import { v4 as uuidv4 } from "uuid";

export type ParagraphState = {
    content: string;
    topic?: string;
    isEditing: boolean;
    targetWordCount: number;
    currWordCount: number;
    id: string;
};

function EssayBody(): JSX.Element {
    const [paragraphs, setParagraphs] = useState<ParagraphState[]>([
        {
            content: "",
            isEditing: true,
            targetWordCount: 0,
            currWordCount: 0,
            id: uuidv4(),
        },
    ]);

    const onContentChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        id: string
    ): void => {
        let wordCount: number = 0;
        const text = e.target.value;
        const paragraph = paragraphs.find((paragraph) => paragraph.id === id);
        if (paragraph) {
            if (e.target.value) {
                wordCount = text.split(/\s+/).length;
            }

            if (!(wordCount > paragraph?.targetWordCount)) {
                const newParagraphs = paragraphs.map((paragraph) => {
                    if (paragraph.id === id) {
                        return {
                            ...paragraph,
                            content: e.target.value,
                            currWordCount: wordCount,
                        };
                    } else {
                        return paragraph;
                    }
                });
                setParagraphs(newParagraphs);
            }
            if (wordCount > paragraph?.targetWordCount) {
                alert(
                    "You have reached your target word count for this paragraph"
                );
            }
        }
    };

    const save = (data: ParagraphState[]) => {
        localStorage.setItem("paragraphs", JSON.stringify(data));
    };

    const handleSave = (id: string) => {
        const filtered = paragraphs.filter((paragraph) => {
            return !(paragraph.content.trim() === "" && !paragraph.isEditing);
        });

        const newParagraphs = filtered.map((paragraph) => {
            if (paragraph.id === id) {
                return { ...paragraph, isEditing: false };
            } else {
                return paragraph;
            }
        });

        save(newParagraphs);

        setParagraphs(newParagraphs);
    };

    const handleDelete = (id: string) => {
        const newParagraphs = paragraphs.filter(
            (paragraph) => paragraph.id !== id
        );

        save(newParagraphs);
        setParagraphs(newParagraphs);
    };

    const handleEdit = (id: string) => {
        const newParagraphs = paragraphs.map((paragraph) => {
            if (paragraph.id === id) {
                return { ...paragraph, isEditing: true };
            } else {
                return paragraph;
            }
        });

        setParagraphs(newParagraphs);
    };

    const handleWordCountChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        const newParagraphs = paragraphs.map((paragraph) => {
            if (paragraph.id === id) {
                return {
                    ...paragraph,
                    targetWordCount: Number(e.target.value),
                };
            } else {
                return paragraph;
            }
        });

        setParagraphs(newParagraphs);
    };

    const addParagraph = () => {
        const newParagraph: ParagraphState = {
            content: "",
            isEditing: true,
            targetWordCount: 0,
            currWordCount: 0,
            id: uuidv4(),
        };

        setParagraphs(paragraphs.concat(newParagraph));
    };

    useEffect(() => {
        const data = localStorage.getItem("paragraphs");

        if (data) {
            setParagraphs(JSON.parse(data));
        }
    }, []);

    return (
        <EssayBodyContainer>
            <AddParagraphButton onClick={addParagraph}>
                Add Paragraph
            </AddParagraphButton>
            {paragraphs.map((paragraph) => (
                <Paragraph
                    para={paragraph}
                    onContentChange={onContentChange}
                    handleSave={handleSave}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleWordCountChange={handleWordCountChange}
                    key={paragraph.id}
                />
            ))}
        </EssayBodyContainer>
    );
}

const EssayBodyContainer = styled.div`
    width: 90%;
    max-width: 816px;
    background-color: #fff;
    padding: 1.5rem;
    font-size: 1.2rem;
    font-weight: 500;
    position: relative;
`;

const AddParagraphButton = styled.button`
    padding: 0.7rem 1rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 600;
    background-color: #0a78c3;
    color: #eee;
`;

export default EssayBody;
