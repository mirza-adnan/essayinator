import styled from "styled-components";
import EssayBody from "./components/EssayBody";

function App(): JSX.Element {
    return (
        <Main>
            <EssayBody />
        </Main>
    );
}

const Main = styled.main`
    min-height: 100%;
    width: 100%;
    background-color: #edf2fa;
    padding: 0.5rem 0;
    display: flex;
    justify-content: center;
`;

export default App;
