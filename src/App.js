import React from 'react';
import logo from './logo.svg';
import './App.css';
import "semantic-ui-react"



import {Card, Comment, CommentGroup} from "semantic-ui-react";
let i = 0;
const commentsJson = [{
    avatar : "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.0-9/37528094_10204918782887188_8597874629320638464_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=2da46aa4c6250dedc605775189a0a679&oe=5D553805",
content:{
  author: "Jsme Wuči",
  created: "2 days ago",
  text: "Čahoj světoune",
}},
    {
        avatar : "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.0-9/37528094_10204918782887188_8597874629320638464_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=2da46aa4c6250dedc605775189a0a679&oe=5D553805",
        content:{
            author: "Jsme Wuči",
            created: "2 days ago",
            text: "Čahoj světoune",
        }
}];
function App() {
    let rows = [];
    for (let i =0; i < commentsJson.length;i++){
        rows.push(<Comment>
            <Comment.Avatar src = {commentsJson[i].avatar}/>
            <Comment.Content>
                <Comment.Author>
                    {commentsJson[i].content.author}
                </Comment.Author>
                <Comment.Metadata>{commentsJson[i].content.created}</Comment.Metadata>
                <Comment.Text>
                    {commentsJson[i].content.text}
                </Comment.Text>
            </Comment.Content>
            <Comment.Action>Reply</Comment.Action>
        </Comment>);
    }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React App
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main className="App-main">
          <Card style={{padding:'10px',margin:'10px'}}>
          <CommentGroup>
              {rows}
          </CommentGroup>
          </Card>
      </main>
    </div>
  );
}

export default App;
