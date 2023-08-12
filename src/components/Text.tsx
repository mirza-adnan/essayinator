import styled from "styled-components";

type TextProps = {
    content: string;
    handleEdit: (id: string) => void;
    id: string;
};

function Text({ content, handleEdit, id }: TextProps): JSX.Element {
    return (
        <pre>
            <ParagraphText onClick={() => handleEdit(id)}>
                {content}
            </ParagraphText>
        </pre>
    );
}

const ParagraphText = styled.p``;

export default Text;
