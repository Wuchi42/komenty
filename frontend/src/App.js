import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {Button, Card, Comment, CommentGroup, Form, Header} from 'semantic-ui-react';
import demon from './nodemon';

let articleJson = [];

class App extends Component {
    state = {
            avatar: null,
            author: null,
            text: null,
        articleNow: null,
        articles: [{
            _id: null,
            title: null,
            comments: [{
                avatar: null,
                author: null,
                text: null
            }]
        }],
        id: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
        dbConnect: null
    };

    // when component mounts, first thing it does is fetch all existing data from our db
    componentDidMount() {
        let interval;
        this.getArticlesFromDb()

        if (!this.state.intervalIsSet) {
            interval =
                setInterval(this.getArticlesFromDb, 1000);
            this.setState({intervalIsSet: interval});
        }
        if (!this.state.articleNow) {
            this.setState({articleNow: 0});
        }
    }

    _handleTextFieldChange = (e) => {

        if (this.state) {
            this.setState({
               text: e.target.value
            });
            console.log(this.state.text);
        }
    };
    _handleAuthorFieldChange = (e) => {

        if (this.state) {
            this.setState( {author: e.target.value}
            );
            console.log(this.state.author);
        }
    };
    _handleAvatarFieldChange = (e) => {

        if (this.state) {
            this.setState({
             avatar: e.target.value}
            );
            console.log(this.state.avatar);
        }
    };

    _handleAddComment = () => {
        const commentObj = demon.states.article.comments;
        const articleObj = demon.states.article;
        let i = this.state.articleNow;
        if (this.state.articles[i]) {
            const com = Object.create(commentObj);
            this.state.text ? com.text = this.state.text : com.text = demon.commentExample.text;
            this.state.avatar ? com.avatar = this.state.avatar : com.avatar = demon.commentExample.avatar;
            this.state.author ? com.author = this.state.author : com.author = demon.commentExample.author;
            console.log(com);
            const art = Object.create(articleObj);
            art._id = this.state.articles[i]._id;

            this.addCommentDB(art._id, com) ? console.log('Update succesed') : console.log('Update failed');
        }

    }

    // kills a process everytime is used
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({intervalIsSet: null});
        }
    }

    // fetch data from DB
    getArticlesFromDb = () => {
        fetch('http://localhost:3001/api/getArticles')
            .then((article) => article.json())
            .then((res) => this.setState({articles: res.articles}));
    };

    addCommentDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        parseInt(idToUpdate);
        this.state.articles.forEach((dat) => {
            if (dat._id === idToUpdate) {
                objIdToUpdate = dat._id;
            }
        });
        axios.post('http://localhost:3001/api/addCommentToArticle', {
            id: objIdToUpdate,
            update: {message: updateToApply},
        }) ? console.log('axios post successful') : console.log('axios post failed');
    };

    render() {
        let rows = [];
        let main;
        let article = this.state.articles[this.state.articleNow];
        let articleTitle;
        if (article === undefined) {
            articleJson = [];
            articleTitle = 'Není vybrán žádný příspěvek'
            main = <title>{articleTitle}</title>
        } else {
            articleTitle = article.title;
            articleJson = article.comments;
            for (let i = 0; i < articleJson.length; i++) {
                rows.push(<Comment key={("Comment" + i)}>
                    <Comment.Avatar key={("Avatar" + i)} src={articleJson[i].avatar}/>
                    <Comment.Content key={("Content" + i)}>
                        <Comment.Author key={("Author" + i)}>
                            {articleJson[i].author}
                        </Comment.Author>
                        <Comment.Metadata key={("Metadata" + i)}>{articleJson[i].createdAt}</Comment.Metadata>
                        <Comment.Text key={("Text" + i)}>
                            {articleJson[i].text}
                        </Comment.Text>
                        <Comment.Actions>
                            {/*<Comment.Action key={("Reply" + i)}>Reply</Comment.Action>*/}
                        </Comment.Actions>
                    </Comment.Content>

                </Comment>)
                ;
            }
            main = <main className="App-main">
                <Card style={{
                    padding: '10px',
                    margin: '10px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '50%'
                }}>
                    <CommentGroup style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <Header as='h3' dividing>
                            Comments
                        </Header>
                        {rows}
                        <Form id={'addComment'}>
                            <Form.Input id={'addingCommentAuthor'} onChange={this._handleAuthorFieldChange}
                                        onBlur={this._handleAuthorFieldChange}/>
                            <Form.Input id={'addingCommentAvatar'} onChange={this._handleAvatarFieldChange}
                                        onBlur={this._handleAvatarFieldChange}/>
                            <Form.TextArea id={'addingCommentText'} onChange={this._handleTextFieldChange}/>
                            <Button content='Add Comment' labelPosition='left' icon='edit' primary
                                    onClick={this._handleAddComment}/>
                        </Form>
                    </CommentGroup>
                </Card>
            </main>;
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        {articleTitle}
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    </a>
                </header>
                {main}
            </div>
        );
    };


}

export default App;
