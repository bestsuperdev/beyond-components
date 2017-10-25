import * as React from 'react';
import {Container,Header,Main,Footer} from 'MobileLayout'
interface Mobile1AppProps {};

interface Mobile1AppState {};

class Mobile1App extends React.Component<Mobile1AppProps, Mobile1AppState> {
    public render(): JSX.Element {
        return (
            <Container className="container" style={{fontWeight : 'bold'}}>
                <Header className="header" height={100} style={{fontSize : 30}}>header</Header>
                <Main className="main" style={{color : 'pink'}}>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                    <li>111</li>
                </Main>
                <Footer className="footer" height={60} style={{lineHeight : '60px'}} >footer</Footer>
            </Container>
        );
    }
}

 
 export = Mobile1App